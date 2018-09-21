import userManager from '../config/userManager';

class AuthenticationService {
  signIn() {
    return userManager.signinRedirect();
  }

  signOut() {
    // debugger
    // userManager.signoutRedirect();
    return userManager.removeUser();
  }
}

export default new AuthenticationService();
