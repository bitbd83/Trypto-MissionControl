import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import IntlMessages from 'util/IntlMessages';
import ContainerHeader from 'components/ContainerHeader/index';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getFeatureOptions, getEventPaymentProcessor } from './actions';
import { selectedEventFunc } from 'containers/Events/EventsDashboard/actions';
import { postEventsClear, getEventById } from 'containers/Events/CreateAnEvent/actions';
import { getEventDescription } from 'containers/Events/EventDescriptions/actions';
import { listPaymentProcessors } from 'containers/Settings/PaymentProcessors/actions';
import PaymentProcessorForm from './components/PaymentProcessorForm';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ContainerHeaderUpdated from 'components/ContainerHeaderUpdated';

export const eventStatic = {
  Basic: {
    icon: 'zmdi-label',
    link: 'basic',
  },
  Description: {
    icon: 'zmdi-sort-amount-asc',
    link: 'description',
  },
  Media: {
    icon: 'zmdi-image',
    link: 'media',
  },
  SeoSettings: {
    icon: 'zmdi-settings',
    link: '',
  },
  TicketTypes: {
    icon: 'zmdi-ticket-star',
    link: 'ticket-types',
  },
  HotelInventory: {
    icon: 'zmdi-hotel',
    link: 'hotel-inventory',
  },
  PaymentProcessor: {
    icon: 'zmdi-paypal-alt',
    link: 'paymentprocessor',
  },
  BuyerQuestions: {
    icon: 'zmdi-help',
    link: 'questions',
  },
  ReceiptsAndETicketSettings: {
    icon: 'zmdi-view-carousel',
    link: '',
  },
  AffiliatesManagement: {
    icon: 'zmdi-view-quilt',
    link: '',
  },
  DiscountCouponCodes: {
    icon: 'zmdi-money-box',
    link: '',
  },
  CustomDesigns: {
    icon: 'zmdi-photo-size-select-large',
    link: '',
  },
};

class EventOptions extends React.Component {
  constructor() {
    super();
    this.state = {
      showForm: false,
    };
  }

  componentWillMount(){
    if(Object.keys(this.props.postedData).length){
      console.log('postedatais', this.props.postedData)
      this.setState({isNew:true})
    }
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.postedPayment !== undefined) {
      this.optionsCall(nextProps.match.params.id);
    }
  };

  componentDidMount() {
    const { postedData, match, selectedEventFunc, postEventsClear, listPaymentProcessors } = this.props;
    if (postedData && Object.keys(postedData).length > 0) {
      this.optionsCall(postedData.id);
    } else {
      this.optionsCall(match.params.id);
    }
    selectedEventFunc(match.params.id);
    postEventsClear();
    listPaymentProcessors({ skipPaging: false, skip: null, take: null, inactive: false, archived: false });
  }

  optionsCall(eventId) {
    const { getFeatureOptions, getEventDescription, getEventPaymentProcessor, getEventById, tenantsByDomain } = this.props;
    const tenantId = tenantsByDomain.id;
    getFeatureOptions({ eventId });
    getEventDescription({ selectedEventId: eventId });
    getEventPaymentProcessor({ eventId });
    getEventById({ tenantId, selectedEventId: eventId });
  }

  openPaymentProcessorForm = status => {
    this.setState({ showForm: status });
  };

  errorView() {
    return (
      <div className="page-error-container animated slideInUpTiny animation-duration-3">
        <div className="page-error-content">
          <div className="error-code mb-4 animated zoomInDown">500</div>
          <h2 className="text-center fw-regular title animated bounceIn animation-delay-10">
            <IntlMessages id="extraPages.500Msg" />
          </h2>
        </div>
      </div>
    );
  }

  render() {
    const { options, optionsLoader, currEvent } = this.props;
    const { showForm } = this.state;
    const { id } = this.props.match.params;

    let eventName = '';
    if (currEvent !== undefined) {
      if (currEvent.title !== undefined) {
        eventName = currEvent.title.length > 25 ? currEvent.title.substr(0, 24).concat('...') : currEvent.title;
      }
    }

    const Breadcrumb = [
      { name: 'App', url: '/' },
      { name: 'Events', url: '#/app/events' },
      { name: eventName, url: `#/app/events/${id}/options` },
      { name: 'options', url: `#/app/events/${id}/options` },
    ];

    return (
      <div className="app-wrapper animated slideInUpTiny animation-duration-3">
        <Helmet>
          <title>Event Options</title>
          <meta name="description" content="Description of Event Options page" />
        </Helmet>
        {/* <ContainerHeader
          title={<IntlMessages id="containers.Events.EventOptions.eventOptions" />}
          replacePath={':id/options'}
           replaceText={'options'} /> */}
        <ContainerHeaderUpdated
          match={this.props.match}
          data={Breadcrumb}
          title={<IntlMessages id="containers.Events.EventOptions.eventOptions" />}
        />
        {optionsLoader ? (
          <div className="loader-view">
            <CircularProgress />
          </div>
        ) : options && options.items ? (
          <div>
            <h1>
              {this.state.isNew ? (
                  <IntlMessages id="containers.Events.EventOptions.greatCreated" />
                ) : (
                  <IntlMessages id="containers.Events.EventOptions.configureEvent" />
                )
              }
            </h1>
            <span>
              <IntlMessages id="containers.Events.EventOptions.thisHandyAssist" />
            </span>
            <div className="my-5">
              <h1>
                <IntlMessages id="containers.Events.EventOptions.mandatorySetup" />
              </h1>
              {options.items.map(
                (option, index) =>
                  option.mode === 'Mandatory' &&
                  option.item !== 'SeoSettings' && (
                    <div key={index} className="col-12 card shadow my-3">
                      <div className="row my-3">
                        <div className="d-flex flex-row col-sm-9 mb-2">
                          <div className="flex-row col-sm-4">
                            <i className={`zmdi ${eventStatic[option.item].icon} zmdi-hc-lg ${option.status === 'Pending' ? 'text-pink' : 'text-green'}`} />
                            <span className={`ml-1 ${option.status === 'Pending' ? 'text-pink font-italic' : 'text-green'}`}>{option.status}</span>
                          </div>
                          <div className="col-sm-6">
                            <h1>{option.title}</h1>
                            <span>{option.description}</span>
                          </div>
                        </div>
                        <div className="col-sm-3 d-flex flex-row justify-content-center align-items-center">
                          {option.item === 'PaymentProcessor' ? (
                            <Button type="submit" className="jr-btn jr-btn-sm" fullWidth variant="raised" color="primary" onClick={() => this.openPaymentProcessorForm(true)}>
                              <span>{option.buttonText}</span>
                            </Button>
                          ) : (
                            <Button
                              type="submit"
                              className="jr-btn jr-btn-sm"
                              fullWidth
                              variant="raised"
                              color="primary"
                              disabled={eventStatic[option.item].link === ''}
                              component={Link}
                              to={eventStatic[option.item].link}>
                              <span>{option.buttonText}</span>
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ),
              )}
            </div>

            <div className="my-5">
              <div className="d-flex flex-row justify-content-between align-items-center">
                <h1>
                  <IntlMessages id="containers.Events.EventOptions.optionalFeatures" />
                </h1>
                {/*  <a href="">
                  <IntlMessages id="containers.Events.EventOptions.manage" />
                </a> */}
              </div>

              {options.items.map(
                (option, index) =>
                  option.mode === 'Optional' &&
                  option.item !== 'SeoSettings' && (
                    <div key={index} className="col-12 card shadow my-3">
                      <div className="row my-3">
                        <div className="d-flex flex-row col-sm-9 mb-2">
                          <div className="flex-row col-sm-4">
                            <i className={`zmdi ${eventStatic[option.item].icon} zmdi-hc-lg ${option.status === 'Pending' ? 'text-pink' : 'text-green'}`} />
                            <span className={`ml-1 ${option.status === 'Pending' ? 'text-pink font-italic' : 'text-green'}`}>{option.status}</span>
                          </div>
                          <div className="col-sm-6">
                            <h1>{option.title}</h1>
                            <span>{option.description}</span>
                          </div>
                        </div>
                        <div className="col-sm-3 d-flex flex-row justify-content-center align-items-center">
                          {option.item === 'PaymentProcessor' ? (
                            <Button type="submit" className="jr-btn jr-btn-sm" fullWidth variant="raised" color="primary" onClick={() => this.openPaymentProcessorForm(true)}>
                              <span>{option.buttonText}</span>
                            </Button>
                          ) : (
                            <Button
                              type="submit"
                              className="jr-btn jr-btn-sm"
                              fullWidth
                              variant="raised"
                              color="primary"
                              disabled={eventStatic[option.item].link === ''}
                              component={Link}
                              to={eventStatic[option.item].link}>
                              <span>{option.buttonText}</span>
                            </Button>
                          )}
                          {/*    <div className="d-flex flex-row mt-3 justify-content-between align-items-center">
                              <a href="">I don't need {option.item}</a>
                              <Tooltip id="tooltip-top-start" title={<IntlMessages id="containers.Events.EventOptions.tooltip" />} placement="top-start">
                                <Button variant="fab" className="jr-fab-btn jr-btn-fab-xxs">
                                  <i className="zmdi zmdi-help zmdi-hc-fw" />
                                </Button>
                              </Tooltip>
                            </div> */}
                        </div>
                      </div>
                    </div>
                  ),
              )}
            </div>
          </div>
        ) : (
          this.errorView()
        )}
        <PaymentProcessorForm showForm={showForm} closeForm={() => this.openPaymentProcessorForm(false)} />
      </div>
    );
  }
}

const mapStateToProps = ({ createanevent, eventoptions, eventsdashboard, tenants }) => {
  const { optionsLoader, options, postedPayment } = eventoptions;
  const { postedData } = createanevent;
  const { selectedEventId } = eventsdashboard;
  const { tenantsByDomain } = tenants;
  const currEvent = createanevent.eventById;
  return { optionsLoader, postedData, options, postedPayment, selectedEventId, tenantsByDomain, currEvent };
};

export default connect(
  mapStateToProps,
  { getFeatureOptions, selectedEventFunc, postEventsClear, getEventDescription, listPaymentProcessors, getEventPaymentProcessor, getEventById },
)(EventOptions);
