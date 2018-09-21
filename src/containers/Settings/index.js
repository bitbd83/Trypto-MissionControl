import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import asyncComponent from '../../util/asyncComponent';

const Settings = ({ match }) => (
  <Switch>
    <Redirect exact from={`${match.path}/`} to={`${match.url}/tenantsettings`} />
    <Route path={`${match.url}/tenant`} component={asyncComponent(() => import('./TenantSettings'))} />
    <Route path={`${match.url}/siteadministrators`} component={asyncComponent(() => import('./SiteAdmins'))} />
    <Route path={`${match.url}/paymentprocessors`} component={asyncComponent(() => import('./PaymentProcessors'))} />
    <Route path={`${match.url}/transactionfee`} component={asyncComponent(() => import('./TransactionFee'))} />
    <Route component={asyncComponent(() => import('components/Error404'))} />
  </Switch>
);

export default Settings;
