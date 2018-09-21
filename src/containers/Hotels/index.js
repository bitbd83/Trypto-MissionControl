import React from 'react';
import {  Route, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import asyncComponent from '../../util/asyncComponent';

const Hotels = ({ match }) => (
  <React.Fragment>
    <Helmet>
      <title>Hotel Inventory</title>
      <meta name="description" content="Hotel Contracted Inventory" />
    </Helmet>
    <Switch>
      <Route path={`${match.path}/:hotelInventoryId`} exact component={asyncComponent(() => import('./HotelDetail'))} />
      <Route path={`${match.url}/`} component={asyncComponent(() => import('./LandingPage'))} />
      <Route component={asyncComponent(() => import('components/Error404'))} />
    </Switch>
  </React.Fragment>
);

export default Hotels;
