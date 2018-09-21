import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import FormDrawer from 'components/FormDrawer';
import FormDrawerHeader from 'components/FormDrawer/FormDrawerHeader';
import FormDrawerContent from 'components/FormDrawer/FormDrawerContent';
import FormDrawerFooter from 'components/FormDrawer/FormDrawerFooter';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';
import * as Immutable from 'immutable';
import { addFees, patchCode, postCode } from '../actions';
import { createObject } from 'util/helpers';
import IntlMessages from 'util/IntlMessages';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import PercentageInput from '../../../components/CommonInputs/PercentageInput'
import CurrencyInput from '../../../components/CommonInputs/CurrencyInput';
import moment from 'moment';
import { DatePickers, TimePickers } from 'components/Events/CreateAnEvent/DateAndTimePickers';
import diff from 'immutablediff';


class DiscountCodeForm extends React.Component {

    constructor (props) {
      super();
      this.state = this.getInitialState();
    }

    getInitialState = () => {
      const initialState = {
        loading: false,
        edit: false,
        effectiveStartDate: moment.utc().format('YYYY-MM-DD'),
        effectiveStartTime:moment.utc().format('YYYY-MM-DD') + ' ' + moment.utc().format('HH:mm:ss.SSS'),
        effectiveEndDate: null,
        effectiveEndTime: null,
        codeData: {
          groupId: "",
          code: "",
          totalRedemptions: "",
          totalRedemptionsPerOrder: "",
          minimumCartAmount: "",
          minimumItemsInCart: "",
          effectiveDates: {
            from: '',
            to: ""
          },
          tieredRateSetup: {
            strategy: "Percentage",
            rates: [
              {
                range: {
                  from: 1,
                  to: null
                },
                rate: 0
              }
            ]
          }
        }
      };
      return initialState;
    }

    componentWillReceiveProps = (nextProps) => {
      let states = {};

      if(!nextProps.actionLoader && this.state.loading){
        this.setState({
            loading: false
          });
          if(nextProps.refetchList){
            this.props.closeForm()
          }
      }

      if(!this.state.loading && !nextProps.actionLoader){
        if(nextProps.edit){
          states['codeData'] = nextProps.data;
          states['edit'] = true;

          if(nextProps.data.effectiveDates.from
            && moment(nextProps.data.effectiveDates.from).isValid())
          {
            states['effectiveStartDate'] =  moment.utc(nextProps.data.effectiveDates.from).format('YYYY-MM-DD');
            states['effectiveStartTime'] = moment.utc(nextProps.data.effectiveDates.from).format('YYYY-MM-DD') + ' ' + moment.utc(nextProps.data.effectiveDates.from).format('HH:mm:ss.SSS');
          }
          if(nextProps.data.effectiveDates.to
            && moment(nextProps.data.effectiveDates.to).isValid())
          {
            states['effectiveEndDate'] = moment.utc(nextProps.data.effectiveDates.to).format('YYYY-MM-DD');
            states['effectiveEndTime'] =  moment.utc(nextProps.data.effectiveDates.to).format('YYYY-MM-DD') + ' ' + moment.utc(nextProps.data.effectiveDates.to).format('HH:mm:ss.SSS');
          }
        }

        this.setState(states);
      }
    }

    handleChange = (key) => event => {
      let {codeData} = this.state;
      let feeMap = Immutable.fromJS(codeData)
      let value = event.target ? event.target.value :  event;
      this.setState({
        codeData: feeMap.mergeDeep(createObject(key, value)).toJS()
      });
    }

    handleSwitchChange = key => (event, checked) => {
      if(!checked){

      }
      let {codeData} = this.state;
      let feeMap = Immutable.fromJS(codeData)
      this.setState({
        codeData: feeMap.mergeDeep(createObject(key, checked)).toJS(),
      });
    }

    handleChangeRate = (name) => event => {
      const codeData = this.state.codeData
      let value = event.target ? event.target.value :  event;
      codeData.tieredRateSetup.rates[0][name] = value;
      this.setState({codeData})
    }

    handleSubmit = event => {
      event.preventDefault();
      let { codeData, effectiveStartDate, effectiveStartTime, effectiveEndDate, effectiveEndTime } = this.state;
      const tenantId = this.props.tenantsByDomain.id;
      this.setState({loading: true})

      let { effectiveDates } = codeData;
      effectiveDates.from = effectiveStartDate+'T'+moment(effectiveStartTime).format('HH:mm:ss.SSS')+'Z';
      if(effectiveEndDate){
        effectiveDates.to = effectiveEndDate+'T'+moment(effectiveEndTime).format('HH:mm:ss.SSS')+'Z';
      } else if(moment(effectiveDates.to).isValid()){
        effectiveDates.to = effectiveDates.to
      } else{
        delete effectiveDates['to'];
      }


      let data = {
        groupId: null,
        code: codeData.code,
        effectiveDates: effectiveDates,
        tieredRateSetup: codeData.tieredRateSetup,
      }
      if(codeData.totalRedemptions)
        data['totalRedemptions'] = codeData.totalRedemptions
      if(codeData.totalRedemptionsPerOrder)
        data['totalRedemptionsPerOrder'] = codeData.totalRedemptionsPerOrder
      if(codeData.minimumCartAmount)
        data['minimumCartAmount'] = codeData.minimumCartAmount
      if(codeData.minimumItemsInCart)
        data['minimumItemsInCart'] = codeData.minimumItemsInCart


      if(this.props.edit){
        const origData = {
          groupId: null,
          code: this.props.data.code,
          effectiveDates: this.props.data.effectiveDates,
          tieredRateSetup: this.props.data.tieredRateSetup,
          totalRedemptions: this.props.data.totalRedemptions,
          totalRedemptionsPerOrder: this.props.data.totalRedemptionsPerOrder,
          minimumCartAmount: this.props.data.minimumCartAmount,
          minimumItemsInCart: this.props.data.minimumItemsInCart,
        };

        const orig = Immutable.fromJS(origData);
        const curr = Immutable.fromJS(data);
        const patchData = diff(orig, curr);
        const couponId = this.props.data.id
        this.props.patchCode({tenantId, couponId, data: patchData})
      }else{
        this.props.postCode({tenantId, data})
      }

    }

    handleCloseDrawer = () => {
      let states = this.getInitialState();
      this.setState(states);
      this.props.closeForm();
    }

    dateChange = name => date => {
      let dates = date.format('YYYY-MM-DD');
      let times = date.format('HH:mm:ss.SSS');

      if (name === 'effectiveStartDate') {
        this.setState({ effectiveStartDate: dates});
      } else if (name === 'effectiveEndDate' && this.state.effectiveStartDate <= dates) {
        this.setState({ effectiveEndDate: dates});
      }

      let timesFormat = dates + ' ' + times;

      if (name === 'effectiveStartTime') {
        this.setState({ effectiveStartTime: timesFormat });
      } else if (name === 'effectiveEndTime') {
        this.setState({ effectiveEndTime: timesFormat});
      }
    };

    render() {
      const { loading, codeData,effectiveStartDate,
        effectiveStartTime,
        effectiveEndDate,
        effectiveEndTime, } = this.state;
      const strategy = codeData.tieredRateSetup.strategy;
      const currencySymbol = this.props.tenantsByDomain.currency ? this.props.tenantsByDomain.currency.symbol : '';
      return (
        <FormDrawer open={this.props.showForm}>

          <FormDrawerHeader
            closeClick={this.handleCloseDrawer}>
            {this.props.edit ? (
              <IntlMessages id="containers.DiscountCodes.Form.edit.title" />
            ) : (
              <IntlMessages id="containers.DiscountCodes.Form.create.title" />
            )}
          </FormDrawerHeader>

          <FormDrawerContent>
            <Grid container direction={'column'} spacing={32}>
              <Grid item >
                <TextField
                  autoFocus
                  id="code"
                  label={<IntlMessages id="containers.DiscountCodes.Form.input.code.label" />}
                  helperText={<IntlMessages id="containers.DiscountCodes.Form.input.code.helper" />}
                  type="text"
                  required
                  value={codeData.code}
                  onChange={this.handleChange('code')}
                  InputProps={{className:'w-50'}}
                  fullWidth
                />
              </Grid>

              <Grid item >
                <FormLabel>
                  <IntlMessages id="containers.DiscountCodes.Form.input.stratagy.section.label" />
                </FormLabel>
                <Grid container alignItems={'center'} spacing={16}>
                  <Grid item xs={4}>
                    <Select
                      value={codeData.tieredRateSetup.strategy}
                      onChange={this.handleChange('tieredRateSetup.strategy')}
                      input={<Input id="questionType"/>}
                      className={'d-block'}
                    >
                      <MenuItem value="Percentage"><IntlMessages id="pages.feesPage.feesForm.assignPercentage_label" /></MenuItem>
                      <MenuItem value="Flat"><IntlMessages id="pages.feesPage.feesForm.assignFlat_label" /></MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs={4}>
                    {strategy === 'Percentage' ?
                      <PercentageInput
                        value = {codeData.tieredRateSetup.rates[0].rate}
                        label={false}
                        onChange={this.handleChangeRate('rate')}
                        fullWidth
                      />
                      :
                      <CurrencyInput
                        value = {codeData.tieredRateSetup.rates[0].rate}
                        label={false}
                        onChange={this.handleChangeRate('rate')}
                        symbol={currencySymbol}
                      />
                      }
                  </Grid>
                </Grid>
              </Grid>

              <Grid item >
                <TextField
                  id="totalRedemptions"
                  label={
                    <React.Fragment>
                      <IntlMessages id="containers.DiscountCodes.Form.input.totalRedemptions.label" />
                      <small> (optional)</small>
                    </React.Fragment>
                  }
                  helperText={<IntlMessages id="containers.DiscountCodes.Form.input.totalRedemptions.helper" />}
                  type="number"
                  value={codeData.totalRedemptions}
                  onChange={this.handleChange('totalRedemptions')}
                  InputProps={{className:'w-50'}}
                  fullWidth
                />
              </Grid>
              <Grid item >
                <TextField
                  id="totalRedemptionsPerOrder"
                  label={
                    <React.Fragment>
                      <IntlMessages id="containers.DiscountCodes.Form.input.totalRedemptionsPerOrder.label" />
                      <small> (optional)</small>
                    </React.Fragment>
                  }
                  helperText={<IntlMessages id="containers.DiscountCodes.Form.input.totalRedemptionsPerOrder.helper" />}
                  type="number"
                  value={codeData.totalRedemptionsPerOrder}
                  onChange={this.handleChange('totalRedemptionsPerOrder')}
                  InputProps={{className:'w-50'}}
                  fullWidth
                />
              </Grid>
              <Grid item >
                <TextField
                  id="minimumCartAmount"
                  label={
                    <React.Fragment>
                      <IntlMessages id="containers.DiscountCodes.Form.input.minimumCartAmount.label" />
                      <small> (optional)</small>
                    </React.Fragment>
                  }
                  helperText={<IntlMessages id="containers.DiscountCodes.Form.input.minimumCartAmount.helper" />}
                  type="number"
                  value={codeData.minimumCartAmount}
                  onChange={this.handleChange('minimumCartAmount')}
                  InputProps={{className:'w-50'}}
                  fullWidth
                />
              </Grid>
              <Grid item >
                <TextField
                  id="minimumItemsInCart"
                  label={
                    <React.Fragment>
                      <IntlMessages id="containers.DiscountCodes.Form.input.minimumItemsInCart.label" />
                      <small> (optional)</small>
                    </React.Fragment>
                  }
                  helperText={<IntlMessages id="containers.DiscountCodes.Form.input.minimumItemsInCart.helper" />}
                  type="number"
                  value={codeData.minimumItemsInCart}
                  onChange={this.handleChange('minimumItemsInCart')}
                  InputProps={{className:'w-50'}}
                  fullWidth
                />
              </Grid>
              <Grid item >
                <div className="d-flex">
                  <div className="w-50 mt-2 mr-4">
                    <IntlMessages id="containers.DiscountCodes.Form.input.effectiveFromDateTime.label" />
                    <div className="row">
                      <div className="col-sm-6 mt-2">
                        <DatePickers selectedDate={effectiveStartDate} dateChange={this.dateChange('effectiveStartDate')} />
                      </div>
                      <div className="col-sm-6 mt-2">
                        <TimePickers selectedTime={effectiveStartTime} timeChange={this.dateChange('effectiveStartTime')} />
                      </div>
                    </div>
                  </div>
                  <div className="w-50 mt-2 ml-4">
                  <IntlMessages id="containers.DiscountCodes.Form.input.effectiveUntilDateTime.label" />
                    <div className="row">
                      <div className="col-sm-6 mt-2">
                        <DatePickers selectedDate={effectiveEndDate} dateChange={this.dateChange('effectiveEndDate')} />
                      </div>
                      <div className="col-sm-6 mt-2">
                        <TimePickers selectedTime={effectiveEndTime} timeChange={this.dateChange('effectiveEndTime')} />
                      </div>
                    </div>
                  </div>
                </div>
              </Grid>
            </Grid>
          </FormDrawerContent>

          <FormDrawerFooter>
            <Button
              type="submit"
              onClick={this.handleSubmit}
              className="mr-2"
              variant="raised"
              color="primary">
              {this.props.actionLoader ? <CircularProgress size={24} color="secondary" /> : <IntlMessages id="button.save_btn" />}
            </Button>
            <Button onClick={this.handleCloseDrawer} color="secondary">
              <IntlMessages id="button.cancel_btn" />
            </Button>
          </FormDrawerFooter>

        </FormDrawer>
      );
    }
}

const mapStateToProps = ({ taxes, tenants, discountCodes }) => {
  return {
    actionLoader: discountCodes.get('actionLoader'),
    tenantsByDomain: tenants.tenantsByDomain,
    newCode: discountCodes.get('newCode').toJS(),
    refetchList: discountCodes.get('refetchList'),
  };
};
export default connect(
  mapStateToProps,
  {
    addFees,
    patchCode,
    postCode,
  },
)(DiscountCodeForm);

