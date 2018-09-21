/**
 *
 * EventsDashboard Page
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import IntlMessages from 'util/IntlMessages';
import ContainerHeader from 'components/ContainerHeader/index';
import Button from '@material-ui/core/Button';
import { postEventsClear } from 'containers/Events/CreateAnEvent/actions';
import OnSaleEventSection from './OnSaleEventSection';
import PastEventSection from './PastEventSection';
import DraftEventSection from './DraftEventSection';
import CardBox from 'components/CardBox/index';

export class EventsDashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      createAnEvent: null,
    };
  }
  createAnEvent() {
    this.props.postEventsClear();
    this.setState({ createAnEvent: '/app/events/create' });
  }

  noEvent = () => (
    <div className="row p-4">
      <CardBox styleName="col-12 text-center" heading={<IntlMessages id="containers.events.noEvent.heading" />} childrenStyle="text-center">
        <div>
          <p><IntlMessages id="containers.events.noEvent.description" /></p>
        </div>
      </CardBox>
    </div>
  );

  render() {
    const { createAnEvent } = this.state;
    if (createAnEvent) return <Redirect to={createAnEvent} />;
    const { isFetchingSaleEvent, isFetchingPastEvent, isFetchingDraftEvent, onSaleEvents, draftEvents, pastEvents} = this.props;
    let noEvent = false;
    if(!isFetchingPastEvent && !isFetchingSaleEvent && !isFetchingDraftEvent){
      if(!onSaleEvents.items.length && !draftEvents.items.length && !pastEvents.items.length){
       noEvent = true;
      }
    }

    return (
      <div className="app-wrapper">
        <Helmet>
          <title>Events Dashboard</title>
          <meta name="description" content="Description of Events Dashboard page" />
        </Helmet>
        <ContainerHeader match={this.props.match} title={<IntlMessages id="containers.Events.EventsDashboard" />} />
        <div className="d-flex flex-row mb-2 justify-content-end">
          <Button variant="raised" className="jr-btn text-white bg-primary" onClick={() => this.createAnEvent()}>
            <IntlMessages id="containers.Events.EventsDashboard.createAnEvent" />
          </Button>
        </div>

        <Grid container direction="column" justify="center" spacing={40}>
         { noEvent ? this.noEvent() : ''}
          <Grid item>
            <OnSaleEventSection {...this.props}/>
          </Grid>
          <Grid item>
            <DraftEventSection {...this.props}/>
          </Grid>
          <Grid item>
            <PastEventSection {...this.props}/>
          </Grid>
        </Grid>
      </div>
    );
  }
}


const mapStateToProps = ({ tenants, eventsdashboard }) => {
  return {
    isFetchingSaleEvent: eventsdashboard.get('onSaleEventsLoader'),
    isFetchingPastEvent: eventsdashboard.get('pastEventsLoader'),
    isFetchingDraftEvent: eventsdashboard.get('draftEventsLoader'),
    onSaleEvents: eventsdashboard.get('onSaleEvents').toJS(),
    draftEvents: eventsdashboard.get('draftEvents').toJS(),
    pastEvents: eventsdashboard.get('pastEvents').toJS(),
    tenantsByDomain: tenants.tenantsByDomain,
  };
};
export default connect(
  mapStateToProps,
  {
    postEventsClear
  },
)(EventsDashboard);


