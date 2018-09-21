import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import Button from '@material-ui/core/Button';
import IntlMessages from 'util/IntlMessages';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import CircularProgress from '@material-ui/core/CircularProgress';
import SelectMediaDrawer from 'components/Events/EventDescriptions/SelectMediaDrawer';
import TypeableDropdown from 'components/Events/CreateAnEvent/TypeableDropdown';
import { getSelectedMediaClear } from 'containers/Events/EventDescriptions/actions';
import { patchTenant, postTenant, patchTenantClear, deleteTenantLogo, postTenantLogo } from '../actions';
import { getTenantsByDomain } from 'actions/Tenants';
import Immutable from 'immutable';
import diff from 'immutablediff';

export class SiteSettings extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      tenantData: {
        organizationId: '',
        tenantName: '',
        eventDomainName: window.location.port ? `${window.location.hostname}:${window.location.port}` : `${window.location.hostname}`,
        timeZoneId: '',
        currencyCode: '',
        locale: '',
      },
      editTenant: false,
      showForm: false,
    };
  }

  componentWillReceiveProps = nextProps => {
    if (!nextProps.tenantLoader && this.state.loading) {
      this.setState({ loading: false });
    }

    if (nextProps.tenantData !== undefined) {
      this.props.getTenantsByDomain();
      this.props.patchTenantClear();
    }

    if (nextProps.mediaData) {
      let data = {
        mediaId: nextProps.mediaData.selectedImage.id,
        caption: 'TenantLogo',
        altText: 'TenantLogo',
        dimension: {
          height: nextProps.mediaData.imgHeight,
          width: nextProps.mediaData.imgWidth,
        },
      };
      this.props.postTenantLogo({ data });
      this.props.getSelectedMediaClear();
    }
  };

  componentDidMount() {
    const { tenantsByDomain } = this.props;
    if (tenantsByDomain && tenantsByDomain.id) {
      this.setState({
        editTenant: true,
        tenantData: {
          ...this.state.tenantData,
          organizationId: tenantsByDomain.organizationId,
          tenantName: tenantsByDomain.tenantName,
          timeZoneId: tenantsByDomain.timeZone.id,
          currencyCode: tenantsByDomain.currency.code,
          locale: tenantsByDomain.locale,
        },
      });
    } else {
      this.setState({
        editTenant: false,
        tenantData: {
          ...this.state.tenantData,
        },
      });
    }
    this.props.getSelectedMediaClear();
  }

  handleChange = name => value => {
    this.setState({
      tenantData: {
        ...this.state.tenantData,
        [name]: name === 'tenantName' ? value.target.value : value,
      },
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { editTenant, tenantData } = this.state;
    this.setState({ loading: true });
    if (editTenant) {
      let { tenantsByDomain, patchTenant } = this.props;
      let tenantsData = {
        organizationId: tenantsByDomain.organizationId,
        tenantName: tenantsByDomain.tenantName,
        eventDomainName: tenantsByDomain.eventDomainName,
        timeZoneId: tenantsByDomain.timeZone.id,
        currencyCode: tenantsByDomain.currency.code,
        locale: tenantsByDomain.locale,
      };
      var list = Immutable.Map(tenantsData);
      var ops = Immutable.Map(tenantData);
      var patchedData = diff(list, ops);
      patchTenant({ data: patchedData });
    } else {
      this.props.postTenant({ data: tenantData });
    }
    this.setState({ editTenant: true });
  };

  logoUpload() {
    this.setState({ showForm: true });
    this.props.getSelectedMediaClear();
  }

  photoRemove() {
    this.props.deleteTenantLogo();
  }

  hiddenForm = status => event => {
    this.setState({ showForm: status });
  };

  noLogo = () => {
    return (
      <div className="d-flex flex-row align-items-center card shadow pointer" onClick={() => this.logoUpload()}>
        <i className="zmdi zmdi-upload zmdi-hc-2x ml-5 my-4" />
        <span className="ml-2 my-4">
          <IntlMessages id="containers.Settings.TenantSettings.uploadYourLogoHere" />
        </span>
      </div>
    );
  };

  onePhoto = imageUrl => {
    return (
      <div className="d-flex flex-row align-items-center card shadow mb-1">
        <div className="img-thumbnail my-4 ml-4">
          <img src={imageUrl} className="mw-100 mh-100" height={80} width={132} />
        </div>
        <Button color="secondary" className="ml-3" onClick={() => this.photoRemove()}>
          <IntlMessages id="containers.Events.EventMultimedia.remove" />
        </Button>
      </div>
    );
  };

  render() {
    const { loading, tenantData, showForm } = this.state;
    const { tenantsByDomain, timezones, currencies, locales, tenantLoader } = this.props;

    var timezoneItems = [];
    if (timezones.length) {
      timezoneItems = timezones.map(suggestion => ({
        value: suggestion.id,
        label: suggestion.id,
      }));
    }

    var currencyItems = [];
    if (currencies.length) {
      currencyItems = currencies.map(suggestion => ({
        value: suggestion.code,
        label: `${suggestion.name} (${suggestion.symbol})`,
      }));
    }

    var localeItems = [];
    if (locales.length) {
      localeItems = locales.map(suggestion => ({
        value: suggestion.name,
        label: `${suggestion.nativeName} (${suggestion.name})`,
      }));
    }

    return (
      <div className="app-wrapper animated slideInUpTiny animation-duration-3">
        <div className="col-lg-7 col-sm-9 col-12 my-3">
          <TextField
            id="tenantName"
            label={<IntlMessages id="containers.Settings.TenantSettings.siteName" />}
            type="text"
            helperText={<IntlMessages id="containers.Settings.TenantSettings.siteNameHelper" />}
            required
            fullWidth
            value={tenantData.tenantName}
            onChange={this.handleChange('tenantName')}
          />
        </div>
        <div className="col-lg-5 col-sm-7 col-12">
          <FormControl className="w-100 my-3">
            <div className="mb-3">
              <InputLabel htmlFor="timeZone" required shrink>
                <IntlMessages id="containers.Settings.TenantSettings.timezone" />
              </InputLabel>
            </div>
            <TypeableDropdown suggestions={timezoneItems} single={tenantData.timeZoneId} handleChangeSingle={this.handleChange('timeZoneId')} />
            <FormHelperText>
              <IntlMessages id="containers.Settings.TenantSettings.timezoneHelper" />
            </FormHelperText>
          </FormControl>
          <FormControl className="w-100 my-3">
            <div className="mb-3">
              <InputLabel htmlFor="currency" required shrink>
                <IntlMessages id="containers.Settings.TenantSettings.currency" />
              </InputLabel>
            </div>
            <TypeableDropdown suggestions={currencyItems} single={tenantData.currencyCode} handleChangeSingle={this.handleChange('currencyCode')} />
            <FormHelperText>
              <IntlMessages id="containers.Settings.TenantSettings.currencyHelper" />
            </FormHelperText>
          </FormControl>
          <FormControl className="w-100 my-3">
            <div className="mb-3">
              <InputLabel htmlFor="locale" required shrink>
                <IntlMessages id="containers.Settings.TenantSettings.locale" />
              </InputLabel>
            </div>
            <TypeableDropdown suggestions={localeItems} single={tenantData.locale} handleChangeSingle={this.handleChange('locale')} />
            <FormHelperText>
              <IntlMessages id="containers.Settings.TenantSettings.localeHelper" />
            </FormHelperText>
          </FormControl>
        </div>
        <div className="col-12 my-4">
          <Button type="submit" onClick={this.handleSubmit} variant="raised" color="primary">
            {loading ? <CircularProgress size={20} style={{ color: 'white' }} /> : <IntlMessages id="containers.Settings.TenantSettings.save" />}
          </Button>
        </div>
        <div className="col-12 mt-5">
          <h1>Your Site Logo</h1>
          {tenantsByDomain && tenantsByDomain.logo && tenantsByDomain.logo.imageUrl ? this.onePhoto(tenantsByDomain.logo.imageUrl) : this.noLogo()}
        </div>
        <SelectMediaDrawer showForm={showForm} hiddenForm={this.hiddenForm(false)} />
      </div>
    );
  }
}

const mapStateToProps = ({ tenants, geography, tenantsettings, eventdescriptions }) => {
  const { tenantsByDomain } = tenants;
  const { mediaData } = eventdescriptions;
  return {
    tenantsByDomain,
    mediaData,
    timezones: geography.get('timezones').toJS(),
    currencies: geography.get('currencies').toJS(),
    locales: geography.get('locales').toJS(),
    tenantLoader: tenantsettings.get('tenantLoader'),
    tenantData: tenantsettings.get('tenantData'),
  };
};

export default connect(
  mapStateToProps,
  { patchTenant, postTenant, patchTenantClear, deleteTenantLogo, getTenantsByDomain, getSelectedMediaClear, postTenantLogo },
)(SiteSettings);
