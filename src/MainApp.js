import React from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { OidcProvider } from 'redux-oidc';

import configureStore, { history } from './store';
import userManager from './config/userManager';
import './config/firebase';
import App from './containers/index';

export const store = configureStore();

const MainApp = () => (
  <Provider store={store}>
    <OidcProvider store={store} userManager={userManager}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/" component={App} />
        </Switch>
      </ConnectedRouter>
    </OidcProvider>
  </Provider>
);

export default MainApp;
