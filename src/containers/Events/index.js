import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import asyncComponent from '../../util/asyncComponent';

const Events = ({ match, selectedEventId }) => (
  <Switch>
    <Redirect from={`${match.path}/options`} to={`${match.url}/${selectedEventId}/options`} />
    <Route path={`${match.path}/:eventId/hotel-inventory`} exact component={asyncComponent(() => import('./HotelInventory'))} />
    <Route path={`${match.path}/:eventId/ticket-types`} exact component={asyncComponent(() => import('containers/TicketTypes'))} />
    <Route path={`${match.path}/:eventId/questions`} component={asyncComponent(() => import('./EventQuestions'))} />
    <Route path={`${match.path}/:id/basic`} component={asyncComponent(() => import('./CreateAnEvent'))} />
    <Route path={`${match.url}/:id/description`} component={asyncComponent(() => import('./EventDescriptions'))} />
    <Route path={`${match.url}/:id/media`} component={asyncComponent(() => import('./EventMultimedia'))} />
    <Route path={`${match.path}/:id/options`} component={asyncComponent(() => import('./EventOptions'))} />
    <Route path={`${match.path}/:eventId/reports`} component={asyncComponent(() => import('./Reports'))} />
    <Route path={`${match.path}/create`} component={asyncComponent(() => import('./CreateAnEvent'))} />
    <Route component={asyncComponent(() => import('./EventsDashboard'))} />
    <Route component={asyncComponent(() => import('components/Error404'))} />
  </Switch>
);

const mapStateToProps = ({ eventsdashboard }) => {
  return { selectedEventId: eventsdashboard.get('selectedEventId') };
};

export default connect(mapStateToProps)(Events);
