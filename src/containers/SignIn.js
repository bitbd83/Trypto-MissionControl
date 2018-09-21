import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import IntlMessages from 'util/IntlMessages';
import CircularProgress from '@material-ui/core/CircularProgress';
import { hideMessage, showAuthLoader, userFacebookSignIn, userGithubSignIn, userGoogleSignIn, userSignIn, userTwitterSignIn } from 'actions/Auth';
import authenticationService from '../services/AuthenticationService';
import BackgroundSlider from 'components/SignIn/BackgroundSlider'

class SignIn extends React.Component {

  // componentWillMount = () => {
  //   if(this.props.authUser === null && !this.props.signupProcess){
  //     this.props.showAuthLoader();
  //     authenticationService.signIn();
  //   }
  // }

  componentDidUpdate() {
    if (this.props.showMessage) {
      setTimeout(() => {
        this.props.hideMessage();
      }, 100);
    }
    if (this.props.authUser !== null) {
      this.props.history.push('/');
    }
  }

  render() {
    const { showMessage, loader, alertMessage } = this.props;
    return (
      <div className="animated slideInUpTiny animation-duration-3 custom-login-page">
        <BackgroundSlider />
        <div className="login-box">
          <div className="app-login-form">
            <Button
              onClick={() => {
                this.props.showAuthLoader();
                authenticationService.signIn();
              }}
              variant="raised"
              >
              {loader ? (
                <CircularProgress size={20} style={{ color: "white" }}/>
              ) : (
                <IntlMessages id="appModule.login" />
              )}
            </Button>
          </div>
        </div>
        {showMessage && NotificationManager.error(alertMessage)}
        <NotificationContainer />
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { loader, alertMessage, showMessage, authUser, signupProcess } = auth;
  return { loader, alertMessage, showMessage, authUser, signupProcess };
};

export default connect(
  mapStateToProps,
  {
    userSignIn,
    hideMessage,
    showAuthLoader,
    userFacebookSignIn,
    userGoogleSignIn,
    userGithubSignIn,
    userTwitterSignIn,
  },
)(SignIn);
