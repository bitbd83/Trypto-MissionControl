import React from 'react';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import FormDrawer from 'components/FormDrawer';
import TextField from '@material-ui/core/TextField';
import IntlMessages from 'util/IntlMessages';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormDrawerHeader from 'components/FormDrawer/FormDrawerHeader';
import FormDrawerContent from 'components/FormDrawer/FormDrawerContent';
import FormDrawerFooter from 'components/FormDrawer/FormDrawerFooter';
import PercentageInput from 'components/CommonInputs/PercentageInput'
import CurrencyInput from 'components/CommonInputs/CurrencyInput';
import { addSurcharge, patchSurcharge } from './actions';
import CircularProgress from '@material-ui/core/CircularProgress';
import Immutable from "immutable";
import { createObject, parseBoolean } from 'util/helpers';
import _ from 'lodash';

class SurchargeForm extends React.Component {
  constructor(props) {
    super();
    this.state = {
      type: null,
      editForm: false,
      name: "",
      displayName: "",
      isTax: true,
      strategy: {
        amount: 0,
        factor: "Percentage"
      }
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if(!nextProps.actionLoader && this.state.type !== ''){
      let type = _.clone( this.state.type);
      this.setState({
        type: null,
        editForm: false,
        name: "",
        displayName: "",
        strategy: {
          amount: 0,
          factor: "Percentage"
        }
      }, () => {
        if(type === 'close'){
          this.props.closeForm();
        }
      })
    }

    if(nextProps.edit && this.state.editForm === false){
      this.setState({
        type: null,
        editForm: true,
        name: nextProps.editData.name || '',
        displayName: nextProps.editData.displayName || '',
        isTax: nextProps.editData.isTax,
        strategy: nextProps.editData.strategy || '',
      })
    }
  }

  handleChange = (key) => (event) => {
    let state = Immutable.fromJS(this.state)
    let value = (event && event.target) ? event.target.value :  event;
    let data = createObject(key, value);
    if(key=== 'isTax'){
      value = parseBoolean(value);
      data = {isTax: value}
      if(value)
        data = {...data, ...createObject('strategy.factor', "Percentage")}
    }
    this.setState( state.mergeDeep(data).toJS() );
  }


  handleBlur = (key) => event => {
    const {displayName} = this.state;
    let value = (event && event.target) ? event.target.value :  event;
    if(key === 'name'){
      this.setState({
          name: value,
          displayName: displayName=== '' ? value : displayName,
      });
    }
  }

  handleClose = (type) => {
    const {name, displayName, isTax, strategy} = this.state;
    const { tenantsByDomain, hotelInventory } = this.props

    this.setState({
      type: type
    })
    if(!this.props.edit){
      const data = {
        "name": name,
        "displayName": displayName,
        "isTax": isTax,
        "strategy": strategy
      }
      this.props.addSurcharge({
        data,
        tenantId: tenantsByDomain.id,
        hotelInventoryId: hotelInventory.id
      });
    } else{
      const data = {
        name,
        displayName,
        strategy,
        isTax
      };
      this.props.patchSurcharge({
        data,
        surchargeId: this.props.editData.id,
        tenantId: tenantsByDomain.id,
        hotelInventoryId: hotelInventory.id
      });
    }
  }

  onChangeRoomType = (room) => {
    this.setState({
      roomType: room,
    })
  }

  render() {
    const { hotelInventory } = this.props
    return (
      <FormDrawer open={this.props.showForm}>
        <FormDrawerHeader closeClick={this.props.closeForm}>
          {this.props.edit ? (
            <React.Fragment>
              <IntlMessages id="pages.hotelsPage.hotelDetail.label.editHeading" />
              <span> {this.props.editData.name}</span>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <IntlMessages id="pages.hotelsPage.hotelDetail.label.heading" />
              <span> {this.props.hotelInventory.name}</span>
            </React.Fragment>
          )}

        </FormDrawerHeader>
        <FormDrawerContent>

          <FormControl className="w-100 mb-2">
            <TextField
              id="title"
              value={this.state.name}
              onChange={this.handleChange('name')}
              onBlur={this.handleBlur('name')}
              label={<IntlMessages id="pages.hotelsPage.hotelDetail.label.title" />}
              rowsMax="4"
              margin="normal"
              fullWidth
            />
          </FormControl>
          <FormControl className="w-100 mb-2">
            <TextField
              id="displayName"
              value={this.state.displayName}
              onChange={this.handleChange('displayName')}
              label={<IntlMessages id="pages.hotelsPage.hotelDetail.label.displayName" />}
              rowsMax="4"
              margin="normal"
              fullWidth
            />
          </FormControl>

          <FormControl component="fieldset" className={'my-2'}>
            <FormLabel component="legend"><IntlMessages id="pages.hotelsPage.hotelDetail.label.surchargeType" /></FormLabel>
            <RadioGroup
              aria-label="Surcharge"
              name="surcharge"
              value={String(this.state.isTax)}
              onChange={this.handleChange('isTax')}
              className={'d-flex flex-row justify-items-start align-items-center'}
            >
              <FormControlLabel value={String(true)} control={<Radio />} label="Tax" />
              <FormControlLabel value={String(false)} control={<Radio />} label="Fee" />
            </RadioGroup>
          </FormControl>
          <div className="d-flex my-2 align-items-end">
            <FormControl className="col-3 mr-5">
              <Select
                value={this.state.strategy.factor}
                onChange={this.handleChange('strategy.factor')}
                input={<Input id="questionType"/>}
                disabled={this.state.isTax}
              >
                <MenuItem value="Percentage"><IntlMessages id="pages.feesPage.feesForm.assignPercentage_label" /></MenuItem>
                <MenuItem value="Flat"><IntlMessages id="pages.feesPage.feesForm.assignFlat_label" /></MenuItem>
              </Select>
            </FormControl>

            <FormControl className="col-3">
              <InputLabel htmlFor="rate"><IntlMessages id="pages.feesPage.feesForm.rate_label" /></InputLabel>
              {!this.state.isTax ? (
                this.state.strategy.factor === 'Percentage' ? (
                  <PercentageInput
                    value = {this.state.strategy.amount}
                    label={<IntlMessages id="pages.feesPage.feesForm.rate_label" />}
                    onChange={this.handleChange('strategy.amount')}
                  />
                ) : (
                  <CurrencyInput
                    value = {this.state.strategy.amount}
                    label={<IntlMessages id="pages.feesPage.feesForm.rate_label" />}
                    onChange={this.handleChange('strategy.amount')}
                    symbol={hotelInventory.currency.symbol}
                  />
                )
              ) : (
                <PercentageInput
                  value = {this.state.strategy.amount}
                  label={<IntlMessages id="pages.feesPage.feesForm.rate_label" />}
                  onChange={this.handleChange('strategy.amount')}
                />
              )}
            </FormControl>
          </div>
        </FormDrawerContent>
        <FormDrawerFooter>
          {this.props.edit ? (
            <Button type="submit" onClick={() => this.handleClose('close')} className="mr-2" variant="raised" color="primary">
              {(this.props.actionLoader && this.state.type === 'close') ? <CircularProgress size={20} style={{ color: 'white' }} /> : <IntlMessages id="pages.hotelsPage.hotelDetail.btn.save" />}
            </Button>
          ) : (
            <React.Fragment>
              <Button disabled={this.props.actionLoader} type="submit" onClick={() => this.handleClose('addMore')} className="mr-2" variant="raised" color="primary">
                {(this.props.actionLoader && this.state.type === 'addMore') ? <CircularProgress size={20} style={{ color: 'white' }} /> : <IntlMessages id="pages.hotelsPage.hotelDetail.btn.save_and_addmore" />}
              </Button>
              <Button disabled={this.props.actionLoader} type="submit" onClick={() => this.handleClose('close')} className="mr-2" variant="raised" color="primary">
                {(this.props.actionLoader && this.state.type === 'close') ? <CircularProgress size={20} style={{ color: 'white' }} /> : <IntlMessages id="pages.hotelsPage.hotelDetail.btn.save_and_close" />}
              </Button>
            </React.Fragment>
          )}
          <Button disabled={this.props.actionLoader} onClick={this.props.closeForm} color="secondary" className="mt-1">
            <IntlMessages id="pages.questionPage.btn.question_type_cancel" />
          </Button>
        </FormDrawerFooter>
      </FormDrawer>
    );
  }
}
const mapStateToProps = ({ tenants, hotelSurcharges }) => {
  return {
    tenantsByDomain: tenants.tenantsByDomain,
    actionLoader: hotelSurcharges.get("actionLoader"),
    newSurchargeID: hotelSurcharges.get("newSurchargeId")
  };
}

export default connect(mapStateToProps, {
  addSurcharge,
  patchSurcharge
})(SurchargeForm);
