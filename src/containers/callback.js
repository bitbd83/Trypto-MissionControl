import React from 'react';
import { connect } from 'react-redux';
import { CallbackComponent } from 'redux-oidc';
import { push } from 'react-router-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import userManager from '../config/userManager';
import { userIdentitySignIn, getUserInfo, signupProcessDone } from 'actions/Auth';
import { getTenantsByDomain } from 'actions/Tenants';
import { getTimezones, getCurrencies, getLocales } from 'actions/Geography';

class CallbackPage extends React.Component {
  successCallback(user) {
    this.props.userIdentitySignIn(user);
    this.props.getUserInfo();
    this.props.getTenantsByDomain();
    this.props.getTimezones();
    this.props.getCurrencies();
    this.props.getLocales();
    this.props.signupProcessDone();
    this.props.push('/app/dashboard');
  }
  render() {
    return (
      <CallbackComponent
        userManager={userManager}
        successCallback={user => this.successCallback(user)}
        errorCallback={error => {
          this.props.signupProcessDone();
          this.props.push('/signin');
          console.error(error);
        }}>
        <div className="app-login-container d-flex justify-content-center align-items-center animated slideInUpTiny animation-duration-3">
          <div className="loader-view">
            <CircularProgress />
          </div>
        </div>
      </CallbackComponent>
    );
  }
}
const mapStateToProps = ({ auth }) => {
  const { loader, authUser } = auth;
  return { loader, authUser };
};

export default connect(
  mapStateToProps,
  {
    push,
    userIdentitySignIn,
    getUserInfo,
    getTenantsByDomain,
    getTimezones,
    getCurrencies,
    getLocales,
    signupProcessDone,
  },
)(CallbackPage);
