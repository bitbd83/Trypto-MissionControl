import { createUserManager } from 'redux-oidc';
import config from './config';

const userManagerConfig = {
  authority: config.baseUrl + 'idsrv',
  client_id: '12fef68886484107b98c97de0a5338ac',
  redirect_uri: `${window.location.protocol}//${window.location.hostname}:${window.location.port}/#/callback#`,
  response_type: 'id_token token',
  scope: 'openid profile catalog.readonly events.admin hotels.readonly trypto',
  post_logout_redirect_uri: `${window.location.protocol}//${window.location.hostname}:${window.location.port}/#/`,
  // silent_redirect_uri: `${window.location.protocol}//${window.location.hostname}:${window.location.port}/silent_renew.html`,
  // automaticSilentRenew: true,
  // filterProtocolClaims: true,
  // loadUserInfo: true,
  // accessTokenExpiringNotificationTime: 3600,
};

const userManager = createUserManager(userManagerConfig);

export default userManager;
