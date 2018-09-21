import React from 'react';
import Button from '@material-ui/core/Button';
import FormDrawer from 'components/FormDrawer';
import FormDrawerHeader from 'components/FormDrawer/FormDrawerHeader';
import FormDrawerContent from 'components/FormDrawer/FormDrawerContent';
import FormDrawerFooter from 'components/FormDrawer/FormDrawerFooter';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import IntlMessages from 'util/IntlMessages';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Switch from '@material-ui/core/Switch';
import ChipInput from 'material-ui-chip-input';
import CountrySelect from 'components/Geography/CountrySelect';
import StateSelect from 'components/Geography/StateSelect';
import { connect } from 'react-redux';
import { addTaxRate, patchTaxRate,resetTaxRate } from '../actions';
import PercentageInput from '../../../../components/CommonInputs/PercentageInput'
import Immutable from 'immutable';
import diff from 'immutablediff';


class TaxRateForm extends React.Component {

  constructor (props) {
    super();
    this.state = this.getInitialState();
  }

  getInitialState = () => {
    const initialState = {
      loading: false,
      close: false,
      edit: false,
      taxRateData: {
        "name": "",
        "displayName": "",
        "rate": {
          "value": 0
        },
        "priority": 0,
        "compound": false,
        "applicableOnShipping": false,
        "countryCode": "",
        "stateProvinceDetails": "",
        "postalCodeDetails": "",
        "cityDetails": ""
      },
      postalCodesArr: [],
      citiesArr: [],
    };
    return initialState;
  }

  handleAdd = (name, data) => {
    let state = new Set(this.state[name]);
    if(data){
      state.add(data);
    }
    this.setState({
      [name]: [...state]
    })
  }

  handleDelete = (name, deleted) => {
    this.setState({
      [name]: this.state[name].filter((c) => c !== deleted)
    })
  }

  formNextAction = () => {
    if(this.state.close){
      this.handleCloseDrawer();
    } else {
      this.setState(this.getInitialState());
      if(this.props.resetData)
        this.props.resetTaxRate();
    }
  }

  pickRequired = (obj) => {
    let keys =[
      "name",
      "displayName",
      "rate",
      "priority",
      "compound",
      "applicableOnShipping",
      "countryCode",
      "stateProvinceDetails",
      "postalCodeDetails",
      "cityDetails"
    ]
    return Object.assign({}, ...keys.map(k => k in obj ? {[k]: obj[k]} : {}))
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.newTaxRate.id !== undefined) {
      this.formNextAction();
    }

    if(!this.state.loading && !nextProps.actionLoader && !this.state.edit){
      let states = {};
      if(nextProps.edit){
        states['taxRateData'] = this.pickRequired(nextProps.data);
        states['postalCodesArr'] = nextProps.data.postalCodeDetails ? nextProps.data.postalCodeDetails.split(",") : [];
        states['citiesArr'] = nextProps.data.cityDetails ? nextProps.data.cityDetails.split(","): [];
        states['taxRateData']['stateProvinceDetails'] = !Array.isArray(nextProps.data.stateProvinceDetails)
            ? (
              nextProps.data.stateProvinceDetails
                ? nextProps.data.stateProvinceDetails.split(",")
                : []
            ): nextProps.data.stateProvinceDetails;
        states['edit'] = true;
      }
      this.setState(states);
    }
  }

  handleSubmit = close => event => {
    event.preventDefault();
    this.setState({loading: true, close}, () => {
      let {taxRateData, postalCodesArr, citiesArr} = this.state;
      let data = {
        ...taxRateData,
        stateProvinceDetails: Array.isArray(taxRateData.stateProvinceDetails) ? taxRateData.stateProvinceDetails.join(','): taxRateData.stateProvinceDetails,
        postalCodeDetails: postalCodesArr.join(','),
        cityDetails: citiesArr.join(',')
      };
      Object.keys(data).forEach((key) => ((data[key]=== '' || data[key]=== null || data[key]=== undefined || data[key].length === 0) && typeof data[key] !== 'boolean') && delete data[key]);

      if(this.props.edit){
        let orig = Immutable.Map(this.pickRequired(this.props.data))
        data = Immutable.Map(data);
        let patchData = diff(orig, data).toJS();
        this.props.patchTaxRate({
          taxGroupId:this.props.taxGroup.id,
          taxRateId:this.props.data.id,
          patchData
        });
      } else {
        this.props.addTaxRate({taxGroupId:this.props.taxGroup.id, data});
      }
    })
  }

  handleChange = name => event => {
    let value = (event && event.target) ? event.target.value: event
    let data = {};
    if(name === 'rate'){
      data = {
        rate : {
          "value": value
        }
      }
    } else {
      data[name] = value;
    }

    this.setState({
      taxRateData: {
        ...this.state.taxRateData,
        ...data
      }
    });
  }

  handleOnBlur = (key) => event => {
    let {taxRateData} = this.state;
    let value = event.target ? event.target.value :  event;
    if(key === 'name'){
      this.setState({
        taxRateData: {
          ...taxRateData,
          name: value,
          displayName: taxRateData.displayName=== '' ? value : taxRateData.displayName,
        }
      });
    }
  }

  handleSwitchChange = name => (event, checked) => {
    this.setState({
      taxRateData: {
        ...this.state.taxRateData,
        [name]: checked,
      }
    });
  };


  handleCloseDrawer = () => {
    let states = this.getInitialState();
    this.setState(states);
    this.props.closeForm();
  }

  render() {
    const {postalCodesArr, citiesArr, taxRateData, loading, close} = this.state;

    return (
        <FormDrawer open={this.props.showForm} >

          <FormDrawerHeader closeClick={this.handleCloseDrawer}>
            {this.props.edit ? (
              <IntlMessages id="pages.taxeRatePage.TaxRateForm.label.edit_title" />
              ) :(
              <IntlMessages id="pages.taxeRatePage.TaxRateForm.label.add_title" />
            )}
            {" "+this.props.taxGroup.name}
          </FormDrawerHeader>


          <FormDrawerContent>
            <p><IntlMessages id="pages.taxeRatePage.TaxRateForm.label.description" /></p>
            <div className="w-100 my-3">
              <TextField
                autoFocus
                id="name"
                label={<IntlMessages id="pages.taxeRatePage.TaxRateForm.label.name" />}
                type="text"
                required
                value={taxRateData.name}
                onChange={this.handleChange('name')}
                onBlur={this.handleOnBlur('name')}
                fullWidth
              />
            </div>
            <div className="w-100 my-3">
              <TextField
                id="displayName"
                label={<IntlMessages id="pages.taxeRatePage.TaxRateForm.label.displayName" />}
                type="text"
                required
                value={taxRateData.displayName}
                onChange={this.handleChange('displayName')}
                fullWidth
              />
            </div>

            <div className="w-100 my-4">
              <CountrySelect
                onChange={this.handleChange('countryCode')}
                value={taxRateData.countryCode}
              />
            </div>

            <div className="w-100 my-3">
              <StateSelect
                onChange={this.handleChange('stateProvinceDetails')}
                value={taxRateData.stateProvinceDetails}
                countryCode={taxRateData.countryCode}
              />
            </div>

            <FormControl className="w-100 my-3">
              <ChipInput
                label={<IntlMessages id="pages.taxeRatePage.TaxRateForm.label.zip_codes" />}
                value={postalCodesArr}
                onBlur={event => this.handleAdd('postalCodesArr', event.target.value)}
                onAdd={(zip) => this.handleAdd('postalCodesArr', zip)}
                onDelete={(zip) => this.handleDelete('postalCodesArr', zip)}
              />
            </FormControl>

            <FormControl className="w-100 my-3">
              <ChipInput
                label={<IntlMessages id="pages.taxeRatePage.TaxRateForm.label.cities" />}
                value={citiesArr}
                onBlur={event => this.handleAdd('citiesArr', event.target.value)}
                onAdd={(city) => this.handleAdd('citiesArr', city)}
                onDelete={(city) => this.handleDelete('citiesArr', city)}
              />
            </FormControl>

            <FormControl className="w-25 my-3">
                <PercentageInput
                    value = {taxRateData.rate.value}
                    label={<IntlMessages id="pages.taxeRatePage.TaxRateForm.label.rate" />}
                    onChange={this.handleChange('rate')}
                />
            </FormControl>

            <FormControl className="w-100 my-3">
              <TextField
                id="priority"
                label={<IntlMessages id="pages.taxeRatePage.TaxRateForm.label.priority" />}
                value={taxRateData.priority}
                onChange={this.handleChange('priority')}
                margin="normal"
                inputProps={{ min: 0 }}
                type="number"
                className="w-25"
              />
            </FormControl>

            <FormControl component="fieldset" className="w-100 my-3">
              <FormControlLabel
                control={
                  <Switch
                    checked={taxRateData.compound}
                    onChange={this.handleSwitchChange('compound')}
                    classes={{
                      checked: 'text-success',
                      bar: 'bg-success',
                    }}
                  />
                }
                label={<IntlMessages id="pages.taxeRatePage.TaxRateForm.label.compound_title" />}
              />
              <FormHelperText><IntlMessages id="pages.taxeRatePage.TaxRateForm.label.compound_description" /></FormHelperText>
            </FormControl>

            <FormControl component="fieldset" className="w-100 my-3">
              <FormControlLabel
                control={
                  <Switch
                    color="primary"
                    checked={taxRateData.applicableOnShipping}
                    onChange={this.handleSwitchChange('applicableOnShipping')}
                    classes={{
                      checked: 'text-success',
                      bar: 'bg-success',
                    }}
                  />
                }
                label={<IntlMessages id="pages.taxeRatePage.TaxRateForm.label.applyShipping_rate_title" />}
              />
              <FormHelperText><IntlMessages id="pages.taxeRatePage.TaxRateForm.label.applyShipping_rate_description" /></FormHelperText>
            </FormControl>
          </FormDrawerContent>

          <FormDrawerFooter>
            {!this.props.edit ? <Button
              type="submit"
              onClick={this.handleSubmit(false)}
              className="mr-2"
              variant="raised"
              color="primary">
              {(this.props.actionLoader && !close) ? <CircularProgress size={24} color="secondary" /> : <IntlMessages id="pages.taxeRatePage.TaxRateForm.btn.save_add_more" />}
            </Button> : ''}

            <Button
              type="submit"
              onClick={this.handleSubmit(true)}
              className="mr-2"
              variant="raised"
              color="primary">
              {this.props.actionLoader && close ? <CircularProgress size={24} color="secondary" /> : <IntlMessages id="pages.taxeRatePage.TaxRateForm.btn.save_add_close" />}
            </Button>
            <Button onClick={this.handleCloseDrawer} color="secondary">
              <IntlMessages id="button.cancel_btn" />
            </Button>
          </FormDrawerFooter>
        </FormDrawer>
    );
  }
}


const mapStateToProps = ({ taxRate }) => {
  return {
    actionLoader: taxRate.get('actionLoader'),
    newTaxRate: taxRate.get('newTaxRate').toJS(),
  };
};
export default connect(
  mapStateToProps,
  {
    addTaxRate,
    patchTaxRate,
    resetTaxRate,
  },
)(TaxRateForm);
