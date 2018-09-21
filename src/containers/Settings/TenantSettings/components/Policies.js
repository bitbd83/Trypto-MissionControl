import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import Button from '@material-ui/core/Button';
import IntlMessages from 'util/IntlMessages';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import CKEditor from 'react-ckeditor-component';
import { postPolicySettings, getTenantSettings } from '../actions';

export class Policies extends React.Component {
  constructor() {
    super();
    this.state = {
      policySettings: {
        termsAndConditions: '',
        privacyPolicy: '',
      },
    };
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.policyData !== undefined) {
      this.props.getTenantSettings();
    }
  };

  componentDidMount() {
    if (this.props.policySettings) {
      this.setState({
        policySettings: {
          termsAndConditions: this.props.policySettings.termsAndConditions,
          privacyPolicy: this.props.policySettings.privacyPolicy,
        },
      });
    }
  }

  handleChange = name => event => {
    const newContent = event.editor.getData();
    this.setState({
      policySettings: {
        ...this.state.policySettings,
        [name]: newContent,
      },
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.postPolicySettings({ data: this.state.policySettings });
  };

  render() {
    const { policySettings } = this.state;
    const { tenantLoader } = this.props;
    return (
      <div className="app-wrapper animated slideInUpTiny animation-duration-3">
        <div className="col-12 mt-3 mb-5">
          <InputLabel htmlFor="currency" required shrink>
            <IntlMessages id="containers.Settings.TenantSettings.termsConditions" />
          </InputLabel>
          <CKEditor
            activeClass="p10"
            content={policySettings.termsAndConditions}
            events={{
              change: this.handleChange('termsAndConditions'),
            }}
          />
          <FormHelperText>
            <IntlMessages id="containers.Settings.TenantSettings.termsConditionsHelper" />
          </FormHelperText>
        </div>
        <div className="col-12 my-5">
          <InputLabel htmlFor="currency" required shrink>
            <IntlMessages id="containers.Settings.TenantSettings.privacyPolicy" />
          </InputLabel>
          <CKEditor
            activeClass="p10"
            content={policySettings.privacyPolicy}
            events={{
              change: this.handleChange('privacyPolicy'),
            }}
          />
          <FormHelperText>
            <IntlMessages id="containers.Settings.TenantSettings.privacyPolicyHelper" />
          </FormHelperText>
        </div>
        <div className="col-12 mt-5 mb-3">
          <Button type="submit" onClick={this.handleSubmit} variant="raised" color="primary">
            {tenantLoader ? <CircularProgress size={20} style={{ color: 'white' }} /> : <IntlMessages id="containers.Settings.TenantSettings.save" />}
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ tenantsettings }) => {
  return {
    tenantLoader: tenantsettings.get('tenantLoader'),
    policyData: tenantsettings.get('policyData'),
  };
};

export default connect(
  mapStateToProps,
  { postPolicySettings, getTenantSettings },
)(Policies);
