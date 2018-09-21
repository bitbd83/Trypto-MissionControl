import React from 'react';
import Button from '@material-ui/core/Button';
import FormDrawer from 'components/FormDrawer';
import FormDrawerHeader from 'components/FormDrawer/FormDrawerHeader';
import FormDrawerContent from 'components/FormDrawer/FormDrawerContent';
import FormDrawerFooter from 'components/FormDrawer/FormDrawerFooter';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import IntlMessages from 'util/IntlMessages';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import { connect } from 'react-redux';
import { postSiteAdmin, patchSiteAdmin } from '../actions';
import Immutable from 'immutable';
import diff from 'immutablediff';
import Typography from '@material-ui/core/Typography';
import { createObject } from 'util/helpers';

class AdminsForm extends React.Component {
  constructor(props) {
    super();
    this.state = this.getInitialState();
  }

  getInitialState = () => {
    const initialState = {
      adminData :{
        phone:{},
        name: {},
        email: {},
      },
      patchData: {},
    };
    return initialState;
  };

  componentWillReceiveProps(nextProps){
    if(nextProps.refetchList){
      this.handleCloseDrawer();
    }
    const data = nextProps.data;
    let adminData = { phone: {}}
    if(nextProps.showForm !== this.props.showForm && nextProps.showForm && Object.keys(data).length){
      adminData = {
        name: data.name,
        phone: data.phone,
        email: data.email,
      }
      this.setState({adminData})
    }
    if(nextProps.showForm !== this.props.showForm && !nextProps.showForm){
      this.handleCloseDrawer();
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    const { organizationId } = this.props.tenantsByDomain;
    const userId = this.props.data.subjectId;
    const { adminData, patchData } = this.state;
    const data = {
      firstName: adminData.name.firstName,
      lastName: adminData.name.lastName,
      middleName: adminData.name.middleName,
      salutation: adminData.name.salutation,
      suffix: adminData.name.suffix,
      emailAddress: adminData.email.email,
      phone: {
        countryCode: adminData.phone.countryCode,
        number: adminData.phone.number,
        extension: adminData.phone.extension,
        phoneType: adminData.phone.phoneType
      },
      password: adminData.password,
      confirmPassword: adminData.confirmPassword,
      orgTypeKey: adminData.orgTypeKey
    }

    if(this.props.edit){
      const patch = Object.keys(patchData).map(item => patchData[item])
      this.props.patchSiteAdmin({organizationId, userId, data: patch})
    }else{
      console.log('addadmindata', data)
      this.props.postSiteAdmin({organizationId, data})
    }
  };

  handleChange = (key, type) => event => {
    let {adminData, patchData} = this.state;
    let value = event.target ? event.target.value :  event;
    adminData[type][key] = value;
    if(this.props.edit){
      patchData[type] = {value: adminData[type], op:'replace', path: '/'+type}
    }
    this.setState({adminData, patchData})
  }

  handlePassChange = (key) => event => {
    let {adminData} = this.state;
    let value = event.target ? event.target.value : event;
    adminData[key] = value
    this.setState({adminData})
    ;
  }

  handleCloseDrawer = () => {
    let states = this.getInitialState();
    this.setState(states);
    this.props.closeForm();
  };

  render() {
    const { adminData } = this.state;

    return (
      <FormDrawer open={this.props.showForm}>
        <FormDrawerHeader closeClick={this.handleCloseDrawer}>
          {this.props.edit ? <IntlMessages id="containers.Settings.SiteAdmins.AdminForm.editTitle" /> : <IntlMessages id="containers.Settings.SiteAdmins.AdminForm.title" />}
        </FormDrawerHeader>
        <FormDrawerContent styleName="mb-5">
        <div className="">
              <TextField
                className="mb-3"
                label={<IntlMessages id="containers.Settings.SiteAdmins.AdminForm.firstName" />}
                value={adminData.name.firstName}
                onChange={this.handleChange('firstName', 'name')}
                fullWidth
              />
              <TextField
                className="my-3"
                label={<IntlMessages id="containers.Settings.SiteAdmins.AdminForm.middleName" />}
                value={adminData.name.middleName}
                onChange={this.handleChange('middleName', 'name')}
                fullWidth
              />
              <TextField
                className="my-3"
                label={<IntlMessages id="containers.Settings.SiteAdmins.AdminForm.lastName" />}
                value={adminData.name.lastName}
                onChange={this.handleChange('lastName', 'name')}
                fullWidth
              />
              <TextField
                className="my-3"
                label={<IntlMessages id="containers.Settings.SiteAdmins.AdminForm.salutation" />}
                value={adminData.name.salutation}
                onChange={this.handleChange('salutation', 'name')}
                fullWidth
              />
              {/* <FormControl className="w-100">
                <InputLabel htmlFor="salutation">Salutation</InputLabel>
                <Select
                  value={adminData.salutation}
                  onChange={this.handleChange('salutation')}
                  input={<Input id="salutation"/>}
                >
                  <MenuItem value="Mr."><IntlMessages id="pages.feesPage.feesForm.assignPercentage_label" /></MenuItem>
                  <MenuItem value="Flat"><IntlMessages id="pages.feesPage.feesForm.assignFlat_label" /></MenuItem>
                </Select>
              </FormControl> */}
              <TextField
                className="my-3"
                label={<IntlMessages id="containers.Settings.SiteAdmins.AdminForm.suffix" />}
                value={adminData.name.suffix}
                onChange={this.handleChange('suffix', 'name')}
                fullWidth
              />
              <TextField
                className="my-3"
                label={<IntlMessages id="containers.Settings.SiteAdmins.AdminForm.emailAddress" />}
                value={adminData.email.email}
                onChange={this.handleChange('email', 'email')}
                fullWidth
              />
              <TextField
                className="my-3"
                label={<IntlMessages id="containers.Settings.SiteAdmins.AdminForm.countryCode" />}
                value={adminData.phone.countryCode}
                onChange={this.handleChange('countryCode', 'phone')}
                fullWidth
              />
              <TextField
                className="my-3"
                label={<IntlMessages id="containers.Settings.SiteAdmins.AdminForm.number" />}
                value={adminData.phone.number}
                onChange={this.handleChange('number', 'phone')}
                fullWidth
              />
              <TextField
                className="my-3"
                label={<IntlMessages id="containers.Settings.SiteAdmins.AdminForm.extension" />}
                value={adminData.phone.extension}
                onChange={this.handleChange('extension', 'phone')}
                fullWidth
              />
              <TextField
                className="my-3"
                label={<IntlMessages id="containers.Settings.SiteAdmins.AdminForm.phoneType" />}
                value={adminData.phone.phoneType}
                onChange={this.handleChange('phoneType', 'phone')}
                fullWidth
              />
             {!this.props.edit ? <div>
                <TextField className="my-3"
                  label={<IntlMessages id="containers.Settings.SiteAdmins.AdminForm.password" />}
                  value={adminData.password}
                  onChange={this.handlePassChange('password')}
                  fullWidth
                  type="password"
                />
                <TextField className="my-3"
                  label={<IntlMessages id="containers.Settings.SiteAdmins.AdminForm.confirmPassword" />}
                  value={adminData.confirmPassword}
                  onChange={this.handlePassChange('confirmPassword')}
                  fullWidth
                  type="password"
                />
                <TextField className="mt-3"
                  label={<IntlMessages id="containers.Settings.SiteAdmins.AdminForm.orgTypeKey" />}
                  value={adminData.orgTypeKey}
                  onChange={this.handlePassChange('orgTypeKey')}
                  fullWidth
                />
              </div> : ''}
            </div>
        </FormDrawerContent>
        <FormDrawerFooter>
          <Button type="submit" onClick={this.handleSubmit} className="mr-2" variant="raised" color="primary">
            {this.props.actionLoader ? <CircularProgress size={20} style={{ color: 'white' }} /> : <IntlMessages id="pages.taxeRatePage.TaxRateForm.btn.save_add_close" />}
          </Button>
          <Button onClick={this.handleCloseDrawer} color="secondary">
            <IntlMessages id="button.cancel_btn" />
          </Button>
        </FormDrawerFooter>
      </FormDrawer>
    );
  }
}

const mapStateToProps = ({ tenants, siteadmins }) => {
  const { tenantsByDomain } = tenants;
  return {
    actionLoader: siteadmins.get('actionLoader'),
    refetchList: siteadmins.get('refetchList'),
    tenantsByDomain,
  };
};

export default connect(
  mapStateToProps,
  { postSiteAdmin, patchSiteAdmin },
)(AdminsForm);
