import React from 'react';
import { Route, Switch } from 'react-router-dom';
import asyncComponent from '../../util/asyncComponent';

const TicketTypes = ({ match }) => (
  <div className="app-wrapper">
    <Switch>
      <Route path={`${match.path}/create/paid`} component={asyncComponent(() => import('./PaidTicket'))} />
      <Route path={`${match.path}/:ticketTypeId/edit`} component={asyncComponent(() => import('./PaidTicket/EditPaidTicket'))} />
      <Route exact path={`${match.path}/:ticketTypeId/options`} component={asyncComponent(() => import('./Options'))} />
      <Route path={`${match.path}/:ticketTypeId/inventory`} component={asyncComponent(() => import('./Inventory'))} />
      <Route path={`${match.path}/:ticketTypeId/fees-taxes`} component={asyncComponent(() => import('./FeesTaxes'))} />
      <Route path={`${match.path}/:ticketTypeId/questions`} component={asyncComponent(() => import('./TicketQuestions'))} />
      <Route path={`${match.path}/:ticketTypeId/media`} component={asyncComponent(() => import('./MultiMedia'))} />
      <Route path={`${match.path}/:ticketTypeId/sells`} component={asyncComponent(() => import('./Sells'))} />
      <Route component={asyncComponent(() => import('./LandingPage'))} />
      <Route component={asyncComponent(() => import('components/Error404'))} />
    </Switch>
  </div>
);
export default TicketTypes;
