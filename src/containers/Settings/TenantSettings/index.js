/**
 *
 * TenantSettings
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import CustomScrollbars from 'util/CustomScrollbars';
import IntlMessages from 'util/IntlMessages';
import SiteSettings from './components/SiteSettings';
import Policies from './components/Policies';
import { getTenantSettings } from './actions';

/* eslint-disable react/prefer-stateless-function */
export class TenantSettings extends React.Component {
  constructor() {
    super();
    this.state = {
      drawerState: false,
      settingsFlag: true,
    };
  }
  componentDidMount() {
    this.props.getTenantSettings();
  }
  onToggleDrawer() {
    this.setState({ drawerState: !this.state.drawerState });
  }
  handleSwitchChange = status => {
    this.setState({ settingsFlag: status });
  };
  TenantSideBar = () => {
    return (
      <div className="module-side">
        <div className="module-side-header">
          <div className="module-logo">
            <i className="zmdi zmdi-settings mr-3" />
            <IntlMessages id="containers.Settings.TenantSettings.settings" />
          </div>
        </div>
        <div className="module-side-content">
          <CustomScrollbars
            className="module-side-scroll scrollbar"
            style={{
              height: this.props.width >= 1200 ? 'calc(100vh - 150px)' : 'calc(100vh - 150px)',
            }}>
            <ul className="module-nav">
              <li onClick={() => this.handleSwitchChange(true)}>
                <a href="javascript:void(0)" className={`${this.state.settingsFlag ? 'active' : ''}`}>
                  <i className={`zmdi zmdi-wrench`} />
                  <IntlMessages id="containers.Settings.TenantSettings.yourSiteSettings" />
                </a>
              </li>
              <li onClick={() => this.handleSwitchChange(false)}>
                <a href="javascript:void(0)" className={`${!this.state.settingsFlag ? 'active' : ''}`}>
                  <i className={`zmdi zmdi-label`} />
                  <IntlMessages id="containers.Settings.TenantSettings.policies" />
                </a>
              </li>
            </ul>
          </CustomScrollbars>
        </div>
      </div>
    );
  };

  render() {
    const { settingsFlag } = this.state;
    const { tenantSettings } = this.props;
    return (
      <div className="app-wrapper">
        <Helmet>
          <title>Site Settings</title>
          <meta name="description" content="Description of Site Settings" />
        </Helmet>
        <div className="animated slideInUpTiny animation-duration-3">
          <div className="app-module">
            <div className="d-block d-xl-none">
              <Drawer open={this.state.drawerState} onClose={this.onToggleDrawer.bind(this)}>
                {this.TenantSideBar()}
              </Drawer>
            </div>
            <div className="app-module-sidenav d-none d-xl-flex">{this.TenantSideBar()}</div>
            <div className="module-box">
              <IconButton className="drawer-btn d-block d-xl-none" aria-label="Menu" onClick={this.onToggleDrawer.bind(this)}>
                <i className="zmdi zmdi-menu" />
              </IconButton>
              <div className="module-box-content">{settingsFlag ? <SiteSettings /> : <Policies policySettings={tenantSettings && tenantSettings.policySettings} />}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ tenantsettings }) => {
  return {
    tenantSettings: tenantsettings.get('tenantSettings').toJS(),
  };
};

export default connect(
  mapStateToProps,
  { getTenantSettings },
)(TenantSettings);
