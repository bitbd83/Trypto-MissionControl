import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import IntlMessages from 'util/IntlMessages';
import ContainerHeaderUpdated from 'components/ContainerHeaderUpdated';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import { fetchTicketTypeOptions } from '../actions';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getEventById } from '../../Events/CreateAnEvent/actions';
import { fetchTicketType } from '../actions';

export const StaticOptions = {
  Basic: {
    icon: 'zmdi-sort-amount-asc',
    link: 'edit',
  },
  Media: {
    icon: 'zmdi-image',
    link: 'media',
  },
  Inventory: {
    icon: 'zmdi-widgets',
    link: 'inventory',
  },
  FeesAndTaxes: {
    icon: 'zmdi-ticket-star',
    link: 'fees-taxes',
  },
  DeliveryOptions: {
    icon: 'zmdi-hotel',
    link: '',
  },
  PrintedTicketOptions: {
    icon: 'zmdi-print',
    link: '',
  },
  CrossSellsAndUpSells: {
    icon: 'zmdi-money',
    link: 'sells',
  },
  Questions: {
    icon: 'zmdi-view-carousel',
    link: 'questions',
  },
  MiscellaneousSettings: {
    icon: 'zmdi-settings',
    link: '',
  },
};

export class Options extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.getTicketTypeOptions();
  }

  componentWillMount() {
    const { eventId, ticketTypeId } = this.props.match.params;
    const tenantId  = this.props.tenantsByDomain.id
    this.props.getEventById({ tenantId, selectedEventId: this.props.match.params.eventId });
    this.props.fetchTicketType({ tenantId, eventId, ticketTypeId });
  }

  getTicketTypeOptions = () => {
    let eventId = this.props.match.params.eventId;
    const tenantId  = this.props.tenantsByDomain.id
    let ticketTypeId = this.props.match.params.ticketTypeId;
    this.props.fetchTicketTypeOptions({tenantId, eventId, ticketTypeId });
  };

  render() {
    const { items, isFetching } = this.props;
    const { currEvent, currTicketType } = this.props;
    const { eventId, ticketTypeId } = this.props.match.params;
    let eventName = '';
    let ticketTypeName = '';
    if (currEvent !== undefined) {
      if (currEvent.title !== undefined) {
        eventName = currEvent.title.length > 25 ? currEvent.title.substr(0, 24).concat('...') : currEvent.title;
      }
    }
    if (currTicketType !== undefined) {
      if (currTicketType.name !== undefined) {
        ticketTypeName = ticketTypeName.length > 25 ? currTicketType.name.substr(0, 24).concat('...') : currTicketType.name;
      }
    }

    const data = [
      { name: 'App', url: '/' },
      { name: 'Events', url: '#/app/events' },
      { name: eventName, url: `#/app/events/${eventId}/options` },
      { name: 'Ticket Type', url: `#/app/events/${eventId}/ticket-types` },
      { name: ticketTypeName, url: `#/app/events/${eventId}/ticket-types/${ticketTypeId}/options` },
    ];

    return (
      <div className="app-wrapper">
        <Helmet>
          <title>Ticket Type Options</title>
          <meta name="description" content="Description of Ticket Type Options page" />
        </Helmet>
        <ContainerHeaderUpdated match={this.props.match} data={data} title={<IntlMessages id="containers.Events.EventOptions.ticketType.header" />} />

        <h1>{ticketTypeName}</h1>
        <span>
          <IntlMessages id="containers.Events.EventOptions.thisHandyAssist" />
        </span>

        <div className="my-5">
          {!isFetching ? (
            items.map(
              (item, index) =>
                item.mode === 'Mandatory' && (
                  <div key={index} className="col-12 card shadow my-3">
                    <div className="row my-3">
                      <div className="d-flex flex-row col-sm-9 mb-2">
                        <div className={`flex-row col-sm-4 ${item.status === 'Pending' ? 'text-pink font-italic' : 'text-primary'}`}>
                          <i className={`zmdi ${StaticOptions[item.item].icon} zmdi-hc-lg `} />
                          <span className={`ml-1`}>{item.status}</span>
                        </div>
                        <div className="col-sm-6">
                          <h1>{item.title}</h1>
                          <span>{item.description}</span>
                        </div>
                      </div>
                      <div className="col-sm-3 d-flex flex-row justify-content-center align-items-center">
                        <Button
                          className="jr-btn jr-btn-sm"
                          fullWidth
                          variant="raised"
                          color="primary"
                          component={Link}
                          to={StaticOptions[item.item].link}
                          disabled={StaticOptions[item.item].link === ''}>
                          <span>{item.buttonText}</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                ),
            )
          ) : (
            <div className="d-flex justify-content-center my-5">
              <CircularProgress />
            </div>
          )}
        </div>

        <div className="my-5">
          <h1>
            <IntlMessages id="pages.events.ticketTypes.title.advanced" />
          </h1>

          {!isFetching ? (
            items.map(
              (item, index) =>
                item.mode === 'Optional' && (
                  <div key={index} className="col-12 card shadow my-3">
                    <div className="row my-3">
                      <div className="d-flex flex-row col-sm-9 mb-2">
                        <div className={`flex-row col-sm-4 ${item.status === 'Pending' ? 'text-pink' : 'text-primary'}`}>
                          <i className={`zmdi zmdi-hc-lg ${StaticOptions[item.item].icon}`} />
                          <span className={`ml-1`}>{item.status}</span>
                        </div>
                        <div className="col-sm-6">
                          <h1>{item.title}</h1>
                          <span>{item.description}</span>
                        </div>
                      </div>
                      <div className="col-sm-3 justify-content-center align-items-center">
                        <Button
                          className="jr-btn jr-btn-sm"
                          fullWidth
                          variant="raised"
                          color="primary"
                          component={Link}
                          to={StaticOptions[item.item].link}
                          disabled={StaticOptions[item.item].link === ''}>
                          <span>{item.buttonText}</span>
                        </Button>
                        {/* <div className="d-flex flex-row mt-3 justify-content-between align-items-center">
                          <a href="">I don't need {item.title}</a>
                          <Tooltip id="tooltip-top-start" title={<IntlMessages id="containers.Events.EventOptions.tooltip" />} placement="top-start">
                            <i className="zmdi zmdi-help zmdi-hc-fw" />
                          </Tooltip>
                        </div> */}
                      </div>
                    </div>
                  </div>
                ),
            )
          ) : (
            <div className="d-flex justify-content-center my-5">
              <CircularProgress />
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ tenants, ticketTypes, createanevent }) => {
  const { tenantsByDomain } = tenants;
  return {
    isFetching: ticketTypes.get('isFetching'),
    items: ticketTypes.getIn(['ticketTypeOptions', 'items']).toJS(),
    currTicketType: ticketTypes.get('ticketType').toJS(),
    currEvent: createanevent.eventById,
    tenantsByDomain,
  };
};

export default connect(
  mapStateToProps,
  {
    fetchTicketTypeOptions,
    getEventById,
    fetchTicketType,
  },
)(Options);
