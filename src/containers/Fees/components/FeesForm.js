import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import FormDrawer from 'components/FormDrawer';
import FormDrawerHeader from 'components/FormDrawer/FormDrawerHeader';
import FormDrawerContent from 'components/FormDrawer/FormDrawerContent';
import FormDrawerFooter from 'components/FormDrawer/FormDrawerFooter';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import Switch from '@material-ui/core/Switch';
import Radio from '@material-ui/core/Radio';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';
import * as Immutable from 'immutable';
import { addFees, patchFees } from '../actions';
import { createObject } from 'util/helpers';
import IntlMessages from 'util/IntlMessages';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import PercentageInput from '../../../components/CommonInputs/PercentageInput'
import CurrencyInput from '../../../components/CommonInputs/CurrencyInput';
import Typography from '@material-ui/core/Typography';


class FeesForm extends React.Component {

    constructor (props) {
      super();
      this.state = this.getInitialState();
    }

    getInitialState = () => {
      const initialState = {

        loading: false,
        edit: false,
        feeData: {
          "name": "",
          "displayName": "",
          // "compound": false,
          "feeCriteria": {
            "strategy": {
              "amount": 0,
              "factor": "Percentage"
            },
            "maxAmount": '',
            "minAmount": '',
            "compound": false
          },
          "priority": 1
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
            this.handleCloseDrawer()
          }
      }

      if(!this.state.loading && !nextProps.actionLoader){
        if(nextProps.edit){
          states['feeData'] = nextProps.data;
          states['edit'] = true;
        }

        this.setState(states);
      }
    }

    handleChange = (key) => event => {
      let {feeData} = this.state;
      let feeMap = Immutable.fromJS(feeData)
      let value = event.target ? event.target.value :  event;
      this.setState({
        feeData: feeMap.mergeDeep(createObject(key, value)).toJS()
      });
    }

    handleOnBlur = (key) => event => {
      let {feeData} = this.state;
      let value = event.target ? event.target.value :  event;
      if(key === 'name'){
        this.setState({
          feeData: {
            ...feeData,
            name: value,
            displayName: feeData.displayName=== '' ? value : feeData.displayName,
          }
        });
      }
    }

    handleSwitchChange = key => (event, checked) => {
      let {feeData} = this.state;
      let feeMap = Immutable.fromJS(feeData)
      this.setState({
        feeData: feeMap.mergeDeep(createObject(key, checked)).toJS(),
      });
    }

    handleSubmit = event => {
      event.preventDefault();
      let { feeData } = this.state;
      this.setState({loading: true})

      let data = {
        "name": feeData.name,
        "displayName": feeData.displayName,
        // "compound": feeData.compound,
        "feeCriteria": {
          "strategy": {
            "amount": feeData.feeCriteria.strategy.amount,
            "factor": feeData.feeCriteria.strategy.factor
          },
          "maxAmount": feeData.feeCriteria.maxAmount,
          "minAmount": feeData.feeCriteria.minAmount || 0,
          "compound": feeData.feeCriteria.compound
        },
        "priority": feeData.priority,
      };
      if(feeData.feeCriteria.strategy.factor === 'Flat'){
        delete data["feeCriteria"]["compound"];
        delete data["feeCriteria"]["maxAmount"];
        delete data["feeCriteria"]["minAmount"];
      }else{
        if(feeData.feeCriteria.maxAmount === ''){
          delete data["feeCriteria"]["maxAmount"];
        }
      }

      if(this.props.edit){
        this.props.patchFees({feeId:this.props.data.id, data});
      } else {
        this.props.addFees({data});
      }
    }

    handleCloseDrawer = () => {
      let states = this.getInitialState();
      this.setState(states);
      this.props.closeForm();
    }

    render() {
      const { loading, feeData } = this.state;
      const { hideCompound = false} = this.props;
      const factor = feeData.feeCriteria.strategy.factor;
      const currencySymbol = this.props.tenantsByDomain.currency ? this.props.tenantsByDomain.currency.symbol : '';
      return (
        <FormDrawer open={this.props.showForm}>

          <FormDrawerHeader
            closeClick={this.handleCloseDrawer}>
            {this.props.edit ? (
              <IntlMessages id="pages.feesPage.feesForm.edit_title" />
            ) : (
              <IntlMessages id="pages.feesPage.feesForm.create_title" />
            )}
          </FormDrawerHeader>

          <FormDrawerContent>
            <p><IntlMessages id="pages.feesPage.feesForm.description" /></p>
            <div className="my-3">
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label={<IntlMessages id="pages.feesPage.feesForm.name_label" />}
                type="text"
                required
                disabled={loading}
                value={feeData.name}
                onChange={this.handleChange('name')}
                onBlur={this.handleOnBlur('name')}
                fullWidth
              />
            </div>
            <div className="my-3">
              <TextField
                margin="dense"
                id="displayName"
                label={<IntlMessages id="pages.feesPage.feesForm.displayName_label" />}
                type="text"
                required
                disabled={loading}
                value={feeData.displayName}
                onChange={this.handleChange('displayName')}
                fullWidth
              />
            </div>
            <FormControl className="w-25 my-1 mb-4">
              <TextField
                id="priority"
                label={<IntlMessages id="pages.feesPage.feesForm.priority_label" />}
                value={feeData.priority}
                onChange={this.handleChange('priority')}
                margin="normal"
                type="number"
              />
            </FormControl>
            <Typography variant={'subheading'} className={'form-drawer-section-header mb-4'} gutterBottom>
              <IntlMessages id="pages.feesPage.feesForm.feeCriteria_label" />
            </Typography>
            {/* <FormLabel className="my-3" component="legend">{<IntlMessages id="pages.feesPage.feesForm.feeCriteria_label" />}</FormLabel> */}
            <div className="ml-4" >
              <FormGroup className="">
              <FormLabel component="legend">{<IntlMessages id="pages.feesPage.feesForm.assignResponsibility_label" />}</FormLabel>
              <div className="d-flex my-2 align-items-end">
                <FormControl className="pr-4 col-4 mt-3" component="fieldset">
                  <FormControl className="w-100">
                    <Select
                      value={feeData.feeCriteria.strategy.factor}
                      onChange={this.handleChange('feeCriteria.strategy.factor')}
                      input={<Input id="questionType"/>}
                    >
                      <MenuItem value="Percentage"><IntlMessages id="pages.feesPage.feesForm.assignPercentage_label" /></MenuItem>
                      <MenuItem value="Flat"><IntlMessages id="pages.feesPage.feesForm.assignFlat_label" /></MenuItem>
                    </Select>
                  </FormControl>
                </FormControl>

                <FormControl className="col-3">
                  <InputLabel htmlFor="rate"><IntlMessages id="pages.feesPage.feesForm.rate_label" /></InputLabel>
                {factor === 'Percentage' ?
                  <PercentageInput
                    value = {feeData.feeCriteria.strategy.amount}
                    label={<IntlMessages id="pages.feesPage.feesForm.rate_label" />}
                    onChange={this.handleChange('feeCriteria.strategy.amount')}
                  />
                  :
                  <CurrencyInput
                    value = {feeData.feeCriteria.strategy.amount}
                    label={<IntlMessages id="pages.feesPage.feesForm.rate_label" />}
                    onChange={this.handleChange('feeCriteria.strategy.amount')}
                    symbol={currencySymbol}
                  />
                  }
              </FormControl>
            </div>
            { factor === 'Percentage' ? <div>
                <FormControl className="pr-4">
                  <TextField
                    id="minAmount"
                    label={<IntlMessages id="pages.feesPage.feesForm.minAmount_label" />}
                    value={feeData.feeCriteria.minAmount}
                    onChange={this.handleChange('feeCriteria.minAmount')}
                    margin="normal"
                    inputProps={{ min: 0 }}
                    type="number"
                  />
                </FormControl>
                <FormControl className="">
                  <TextField
                    id="maxAmount"
                    label={<IntlMessages id="pages.feesPage.feesForm.maxAmount_label" />}
                    value={feeData.feeCriteria.maxAmount}
                    onChange={this.handleChange('feeCriteria.maxAmount')}
                    margin="none"
                    inputProps={{ min: 0 }}
                    type="number"
                  />
                </FormControl>
              </div> : ''}
              </FormGroup>
              {!hideCompound && (
                <FormControl component="fieldset" className="w-100 my-3">
                  <FormControlLabel
                    control={
                      <Switch
                        disabled = {factor !== 'Percentage'}
                        checked={feeData.feeCriteria.compound}
                        onChange={this.handleSwitchChange('feeCriteria.compound')}
                        classes={{ checked: 'text-success', bar: 'bg-success',}}
                      />
                    }
                    label={<IntlMessages id="pages.feesPage.feesForm.compound_label" />}
                  />
                  <FormHelperText>{<IntlMessages id="pages.feesPage.feesForm.compound_description" />}</FormHelperText>
                </FormControl>
              )}
            </div>
          </FormDrawerContent>

          <FormDrawerFooter>
            <Button
              type="submit"
              onClick={this.handleSubmit}
              className="mr-2"
              variant="raised"
              color="primary">
              {loading ? <CircularProgress size={24} color="secondary" /> : <IntlMessages id="button.save_btn" />}
            </Button>
            <Button onClick={this.handleCloseDrawer} color="secondary">
              <IntlMessages id="button.cancel_btn" />
            </Button>
          </FormDrawerFooter>

        </FormDrawer>
      );
    }
}

const mapStateToProps = ({ taxes, tenants, fees }) => {
  return {
    actionLoader: taxes.get('actionLoader'),
    tenantsByDomain: tenants.tenantsByDomain,
    refetchList: fees.get('refetchList'),
  };
};
export default connect(
  mapStateToProps,
  {
    addFees,
    patchFees,
  },
)(FeesForm);

