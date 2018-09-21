import React, { Component } from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';
import 'react-big-calendar/lib/less/styles.less';
import 'styles/bootstrap.scss';
import 'styles/app.scss';
import 'styles/app-rtl.scss';
import defaultTheme from './themes/defaultTheme';
import AppLocale from '../lngProvider';

import MainApp from './App';
import callback from './callback';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { setInitUrl, userSignOut, getUserInfo } from '../actions/Auth';
import { getTenantsByDomain } from 'actions/Tenants';
import { getTimezones, getCurrencies, getLocales } from 'actions/Geography';
import RTL from 'util/RTL';
import asyncComponent from 'util/asyncComponent';
import { NotificationContainer } from 'react-notifications';

const RestrictedRoute = ({ component: Component, authUser, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      authUser ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/signin',
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

class App extends Component {
  componentDidUpdate() {
    if ((!this.props.user || this.props.user.expired) && this.props.authUser === null) {
      this.props.userSignOut();
    }
  }
  componentDidMount() {
    if (this.props.authUser !== null) {
      this.props.getTenantsByDomain();
      this.props.getUserInfo();
      this.props.getTimezones();
      this.props.getCurrencies();
      this.props.getLocales();
    }
  }
  render() {
    const { match, location, locale, authUser, initURL, isDirectionRTL, user, loadingTenants } = this.props;
    if (authUser !== null && loadingTenants) {
      return (
        <div className="app-login-container d-flex justify-content-center align-items-center animated slideInUpTiny animation-duration-3">
          <div className="loader-view">
            <CircularProgress />
          </div>
        </div>
      );
    }

    if (location.pathname === '/') {
      if (authUser === null) {
        return <Redirect to={'/signin'} />;
      } else if (initURL === '' || initURL === '/' || initURL === '/signin') {
        return <Redirect to={'/app/dashboard'} />;
      } else {
        return <Redirect to={initURL} />;
      }
    }
    const applyTheme = createMuiTheme(defaultTheme);

    if (isDirectionRTL) {
      applyTheme.direction = 'rtl';
      document.body.classList.add('rtl');
    } else {
      document.body.classList.remove('rtl');
      applyTheme.direction = 'ltr';
    }

    const currentAppLocale = AppLocale[locale.locale];
    return (
      <MuiThemeProvider theme={applyTheme}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <IntlProvider locale={currentAppLocale.locale} messages={currentAppLocale.messages}>
            <RTL>
              <div className="app-main">
                <Switch>
                  <RestrictedRoute path={`${match.url}app`} authUser={authUser} component={MainApp} />
                  <Route path="/signin" component={SignIn} />
                  <Route path="/signup" component={SignUp} />
                  <Route path="/callback" component={callback} />
                  <Route component={asyncComponent(() => import('components/Error404'))} />
                </Switch>
                <NotificationContainer />
              </div>
            </RTL>
          </IntlProvider>
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = ({ settings, auth, oidc, tenants }) => {
  const { sideNavColor, locale, isDirectionRTL } = settings;
  const { authUser, initURL } = auth;
  const { user } = oidc;
  const { loadingTenants, tenantsByDomain } = tenants;
  return { sideNavColor, locale, isDirectionRTL, authUser, initURL, user, loadingTenants, tenantsByDomain };
};

export default connect(
  mapStateToProps,
  { setInitUrl, getTenantsByDomain, userSignOut, getTimezones, getCurrencies, getLocales, getUserInfo },
)(App);
