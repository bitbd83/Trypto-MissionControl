/**
 *
 * CreateAnEvent Page
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import moment from 'moment';
import IntlMessages from 'util/IntlMessages';
import ContainerHeader from 'components/ContainerHeader/index';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Tooltip from '@material-ui/core/Tooltip';
import Switch from '@material-ui/core/Switch';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { DatePickers, TimePickers } from 'components/Events/CreateAnEvent/DateAndTimePickers';
import TypeableDropdown from 'components/Events/CreateAnEvent/TypeableDropdown';
import VenuesDrawer from 'components/Venues/VenuesDrawer/index';
import { listVenues, getVenueById, getVenueByIdClear, addUpdateVenueState, postVenuesClear } from 'containers/Venues/actions';
import { postEvents, hideMessage, getEventById, getEventByIdClear, patchEvents } from './actions';
import { selectedEventFunc } from 'containers/Events/EventsDashboard/actions';
import getSlug from 'speakingurl';
import Immutable from 'immutable';
import diff from 'immutablediff';
import ContainerHeaderUpdated from 'components/ContainerHeaderUpdated';

export class CreateAnEvent extends React.Component {
  constructor() {
    super();
    this.state = {
      eventOptions: null,
      showForm: false,
      skipPaging: false,
      skip: 0,
      take: 100,
      archived: false,
      title: '',
      subTitle: '',
      url: '',
      venueId: '',
      timezoneId: '',
      currencyId: '',
      eventStartDate: moment.utc().format('YYYY-MM-DD'),
      eventStartTime: moment.utc().format('YYYY-MM-DD') + ' ' + moment.utc().format('HH:mm:ss.SSS'),
      eventEndDate: moment.utc().format('YYYY-MM-DD'),
      eventEndTime: moment.utc().format('YYYY-MM-DD') + ' ' + moment.utc().format('HH:mm:ss.SSS'),
      saleStartDate: moment.utc().format('YYYY-MM-DD'),
      saleStartTime: moment.utc().format('YYYY-MM-DD') + ' ' + moment.utc().format('HH:mm:ss.SSS'),
      saleEndDate: moment.utc().format('YYYY-MM-DD'),
      saleEndTime: moment.utc().format('YYYY-MM-DD') + ' ' + moment.utc().format('HH:mm:ss.SSS'),
      multi: false,
      ticket: false,
      hotel: false,
      gotEventById: undefined,
      eventName: '',
    };
  }

  componentWillMount() {
    const { tenantsByDomain } = this.props;
    if (tenantsByDomain && Object.keys(tenantsByDomain).length > 0) {
      this.setState({ timezoneId: tenantsByDomain.timeZone.id, currencyId: tenantsByDomain.currency.code });
    }
  }

  componentDidMount() {
    const { tenantsByDomain, listVenues, match, selectedEventFunc, getEventById } = this.props;
    var tenantId = tenantsByDomain.id;
    var { skipPaging, skip, take, archived } = this.state;

    listVenues({ tenantId, skipPaging, skip, take, archived });
    if (match.params.id) {
      selectedEventFunc(match.params.id);
      getEventById({ tenantId, selectedEventId: match.params.id });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { postedVenue, tenantsByDomain, listVenues, postedData, patchedEvent, selectedEventFunc, match, eventById, getEventByIdClear } = nextProps;
    if (postedVenue !== undefined) {
      var tenantId = tenantsByDomain.id;
      var { skipPaging, skip, take, archived } = this.state;
      listVenues({ tenantId, skipPaging, skip, take, archived });
      this.setState({ venueId: postedVenue.id });
    }
    if (postedData && Object.keys(postedData).length > 0) {
      const selectedEventId = postedData.id;
      selectedEventFunc(selectedEventId);
      this.setState({ eventOptions: `/app/events/${selectedEventId}/options` });
    }
    if (patchedEvent !== undefined) {
      this.setState({ eventOptions: `/app/events/options` });
    }

    let eventName = '';
    if (eventById !== undefined) {
      if (eventById.title !== undefined) {
        eventName = eventById.title.length > 25 ? eventById.title.substr(0, 24).concat('...') : eventById.title;
      }
    }

    if (match.params.id && eventById) {
      this.setState({
        eventName,
        gotEventById: eventById,
        title: eventById.title,
        subTitle: eventById.subTitle,
        url: eventById.urlSlug,
        venueId: eventById.venue.id,
        currencyId: eventById.currency.code,
        eventStartDate: eventById.eventDuration.from.split('T')[0],
        eventStartTime: eventById.eventDuration.from.split('T')[0] + ' ' + eventById.eventDuration.from.split('T')[1].split('Z')[0],
        eventEndDate: eventById.eventDuration.to.split('T')[0],
        eventEndTime: eventById.eventDuration.to.split('T')[0] + ' ' + eventById.eventDuration.to.split('T')[1].split('Z')[0],
        saleStartDate: eventById.salesDuration.from.split('T')[0],
        saleStartTime: eventById.salesDuration.from.split('T')[0] + ' ' + eventById.salesDuration.from.split('T')[1].split('Z')[0],
        saleEndDate: eventById.salesDuration.to.split('T')[0],
        saleEndTime: eventById.salesDuration.to.split('T')[0] + ' ' + eventById.salesDuration.to.split('T')[1].split('Z')[0],
        ticket: eventById.featureList ? eventById.featureList.ticketSales : this.state.ticket,
        hotel: eventById.featureList ? eventById.featureList.hotelRoomInventory : this.state.hotel,
      });
      getEventByIdClear();
    }
  }

  hiddenForm = status => event => {
    this.setState({ showForm: status });
    if (!status) this.props.addUpdateVenueState(false);
  };

  addNewButton() {
    this.props.getVenueByIdClear();
    this.props.postVenuesClear();
    this.props.addUpdateVenueState(false);
    this.setState({ showForm: true });
  }

  checkChange = name => (event, checked) => {
    this.setState({ [name]: checked });
  };

  handleChange = name => event => {
    const { match, tenantsByDomain } = this.props;
    this.setState({
      [name]: event.target.value,
    });

    if (name === 'title') {
      var slug = getSlug(event.target.value);
      this.setState({ url: slug });
    }

    if (name === 'venueId' && match.params.id) {
      getVenueById({ tenantId: tenantsByDomain.id, venueId: event.target.value });
    }
  };

  dateChange = name => date => {
    let dates = date.format('YYYY-MM-DD');
    let times = date.format('HH:mm:ss.SSS');

    let oneBeforeTime = '';
    let timesArray = times.split(':');
    if (timesArray[0] > 0 && timesArray[0] <= 10) {
      oneBeforeTime = '0' + (timesArray[0] - 1) + ':' + timesArray[1] + ':' + timesArray[2];
    } else if (timesArray[0] === '00') {
      oneBeforeTime = '23:' + timesArray[1] + ':' + timesArray[2];
    } else {
      oneBeforeTime = timesArray[0] - 1 + ':' + timesArray[1] + ':' + timesArray[2];
    }

    if (name === 'eventStartDate') {
      this.setState({ eventStartDate: dates, eventEndDate: dates, saleStartDate: dates, saleEndDate: dates });
    } else if (name === 'eventEndDate' && this.state.eventStartDate <= dates) {
      this.setState({ eventEndDate: dates, saleEndDate: dates });
    } else if (name === 'saleStartDate' && dates <= this.state.eventEndDate && dates <= this.state.saleEndDate) {
      this.setState({ saleStartDate: dates });
    } else if (name === 'saleEndDate' && dates <= this.state.eventEndDate && this.state.saleStartDate <= dates) {
      this.setState({ saleEndDate: dates });
    }

    let timesFormat = dates + ' ' + times;
    let oneBeforeTimesFormat = dates + ' ' + oneBeforeTime;

    if (name === 'eventStartTime') {
      this.setState({ eventStartTime: timesFormat, eventEndTime: timesFormat, saleEndTime: oneBeforeTimesFormat });
    } else if (name === 'eventEndTime') {
      this.setState({ eventEndTime: timesFormat, saleEndTime: oneBeforeTimesFormat });
    } else if (name === 'saleStartTime') {
      this.setState({ saleStartTime: timesFormat });
    } else if (name === 'saleEndTime' && this.state.saleStartDate <= this.state.eventEndDate && this.state.eventEndTime > oneBeforeTime) {
      this.setState({ saleEndTime: timesFormat });
    }
  };

  timezoneSelect(value) {
    this.setState({ timezoneId: value });
  }

  currencySelect(value) {
    this.setState({ currencyId: value });
  }

  saveEvent = e => {
    e.preventDefault();
    const {
      title,
      subTitle,
      url,
      venueId,
      timezoneId,
      currencyId,
      eventStartDate,
      eventStartTime,
      eventEndDate,
      eventEndTime,
      multi,
      saleStartDate,
      saleStartTime,
      saleEndDate,
      saleEndTime,
      ticket,
      hotel,
      gotEventById,
    } = this.state;

    const { match, postEvents, tenantsByDomain, venueById, patchEvents } = this.props;

    var eventStartDates = eventStartDate + 'T' + eventStartTime.split(' ')[1] + 'Z';
    var eventEndDates = eventEndDate + 'T' + eventEndTime.split(' ')[1] + 'Z';
    var eventSalesStartDate = saleStartDate + 'T' + saleStartTime.split(' ')[1] + 'Z';
    var eventSalesStopDate = saleEndDate + 'T' + saleEndTime.split(' ')[1] + 'Z';

    var dateCompare = '';
    if (eventStartDates > eventEndDates) {
      dateCompare = 'Event Start Date should be prior to Event End Date.';
    } else if (eventSalesStartDate > eventSalesStopDate) {
      dateCompare = 'Sales Start Date should be prior to Sales Stop Date.';
    } else if (eventSalesStartDate > eventEndDates) {
      dateCompare = 'Sales Start Date should be prior to Event End Date.';
    } else if (eventSalesStopDate > eventEndDates) {
      dateCompare = 'Sales Stop Date should be prior to Event End Date.';
    }

    if (match.params.id) {
      let eventData = {
        venueId: gotEventById.venue.id,
        title: gotEventById.title,
        urlSlug: gotEventById.urlSlug,
        subTitle: gotEventById.subTitle,
        eventDuration: {
          from: gotEventById.eventDuration.from,
          to: gotEventById.eventDuration.to,
        },
        salesDuration: {
          from: gotEventById.salesDuration.from,
          to: gotEventById.salesDuration.to,
        },
        eventTimeZoneId: timezoneId,
        currencyCode: gotEventById.currency.code,
        multiDayEvent: multi,
        featureList: {
          ticketSales: gotEventById.featureList ? gotEventById.featureList.ticketSales : ticket,
          hotelRoomInventory: gotEventById.featureList ? gotEventById.featureList.hotelRoomInventory : hotel,
          sponsorOffers: false,
          crowdFundedEvent: false,
        },
      };
      var list = Immutable.Map(eventData);
      let patchData = {
        venueId,
        title,
        urlSlug: url,
        subTitle,
        eventDuration: {
          from: eventStartDates,
          to: eventEndDates,
        },
        salesDuration: {
          from: eventSalesStartDate,
          to: eventSalesStopDate,
        },
        eventTimeZoneId: timezoneId,
        currencyCode: currencyId,
        multiDayEvent: multi,
        featureList: {
          ticketSales: ticket,
          hotelRoomInventory: hotel,
          sponsorOffers: false,
          crowdFundedEvent: false,
        },
      };
      var ops = Immutable.Map(patchData);
      var data = diff(list, ops);

      if (dateCompare === '') {
        patchEvents({ selectedEventId: match.params.id, data });
      } else {
        NotificationManager.error(dateCompare);
      }
    } else {
      let data = {
        venueId,
        title,
        urlSlug: url,
        subTitle,
        eventStartDate: eventStartDates,
        eventEndDate: eventEndDates,
        eventSalesStartDate,
        eventSalesStopDate,
        eventTimeZoneId: timezoneId,
        currencyCode: currencyId,
        multiDayEvent: multi,
        featureList: {
          ticketSales: ticket,
          hotelRoomInventory: hotel,
          sponsorOffers: false,
          crowdFundedEvent: false,
        },
      };

      if (dateCompare === '') {
        postEvents({ tenantId: tenantsByDomain.id, data });
      } else {
        NotificationManager.error(dateCompare);
      }
    }
  };

  render() {
    const { match, tenantsByDomain, venuesList, eventsLoader, timezones, currencies, postedData, alertMessage, showMessage, eventById } = this.props;
    const {
      eventOptions,
      showForm,
      title,
      subTitle,
      url,
      venueId,
      timezoneId,
      currencyId,
      eventStartDate,
      eventStartTime,
      eventEndDate,
      eventEndTime,
      multi,
      saleStartDate,
      saleStartTime,
      saleEndDate,
      saleEndTime,
      ticket,
      hotel,
      eventName
    } = this.state;

    var timezoneItems = [];
    if (timezones.length) {
      timezoneItems = timezones.map(suggestion => ({
        value: suggestion.id,
        label: suggestion.id,
      }));
    }

    var currencyItems = [];
    if (currencies.length) {
      currencyItems = currencies.map(suggestion => ({
        value: suggestion.code,
        label: `${suggestion.name} (${suggestion.symbol})`,
      }));
    }
    const { id } = this.props.match.params;

    const BreadcrumbBasic = [
      { name: 'App', url: '/' },
      { name: 'Events', url: '#/app/events' },
      { name: eventName, url: `#/app/events/${id}/options` },
      { name: 'basic', url: `#/app/events/${id}/basic` },
    ];

    const BreadcrumbNew = [
      { name: 'App', url: '/' },
      { name: 'Events', url: '#/app/events' },
      { name: 'new', url: `#/app/events/new` },
    ];

    if (eventOptions && (Object.keys(postedData).length > 0 || match.params.id)) return <Redirect to={eventOptions} />;

    return (
      <div className="app-wrapper animated slideInUpTiny animation-duration-3">
        <Helmet>
          <title>{match.params.id ? 'Event Basics' : 'Create An Event'}</title>
          <meta name="description" content={match.params.id ? 'Description of Event Basics page' : 'Description of Create An Event page'} />
        </Helmet>
        {/* <ContainerHeader
          match={match}
          title={match.params.id ? <IntlMessages id="containers.Events.CreateAnEvent.eventBasics" /> : <IntlMessages id="containers.Events.EventsDashboard.createAnEvent" />}
          replacePath={match.params.id ? ':id' : 'create'}
          replaceText={match.params.id ? 'options' : 'new'}
        /> */}
        <ContainerHeaderUpdated
          match={this.props.match}
          title={match.params.id ? <IntlMessages id="containers.Events.CreateAnEvent.eventBasics" /> : <IntlMessages id="containers.Events.EventsDashboard.createAnEvent" />}
          data={this.props.match.params.id ? BreadcrumbBasic : BreadcrumbNew}
          title={<IntlMessages id="containers.Events.EventOptions.eventOptions" />}
        />
        <div className="col-md-8 col-12">
          <TextField
            label={<IntlMessages id="containers.Events.CreateAnEvent.title" />}
            id="title"
            value={title}
            onChange={this.handleChange('title')}
            fullWidth
            helperText={<IntlMessages id="containers.Events.CreateAnEvent.titleHelperText" />}
            inputProps={{ maxLength: 140 }}
          />
        </div>
        <div className="col-md-8 col-12">
          <TextField
            className="my-4"
            label={<IntlMessages id="containers.Events.CreateAnEvent.subTitle" />}
            id="sub-title"
            value={subTitle}
            onChange={this.handleChange('subTitle')}
            fullWidth
            helperText={<IntlMessages id="containers.Events.CreateAnEvent.subTitleHelperText" />}
            inputProps={{ maxLength: 140 }}
          />
        </div>
        <div className="col-md-8 col-12">
          <h4 className="mb-1">
            <IntlMessages id="containers.Events.CreateAnEvent.eventUrl" />
          </h4>
          <div className="d-flex flex-row align-items-center ">
            <h4>
              {'http://'}
              {tenantsByDomain.eventDomainName}
              {'/events/{eventId}/'}
            </h4>
            <TextField className="mt-0 ml-1" id="event-url" value={url} onChange={this.handleChange('url')} margin="normal" fullWidth />
          </div>
          <h5 className="font-italic text-gray-500">
            <IntlMessages id="containers.Events.CreateAnEvent.eventUrlHelperText" />
          </h5>
        </div>
        <div className="col-md-8 col-12 mt-5">
          <h4 className="mb-1">
            <IntlMessages id="containers.Events.CreateAnEvent.eventVenue" />
          </h4>
          <div className="d-flex flex-row align-items-center">
            <Select displayEmpty className="col-md-6 mt-1" value={venueId} onChange={this.handleChange('venueId')}>
              {!venueId && (
                <MenuItem value="">
                  <IntlMessages id="containers.Events.CreateAnEvent.selectAVenue" />
                </MenuItem>
              )}
              {Object.keys(venuesList).length > 0 &&
                venuesList.items.map((item, index) => (
                  <MenuItem key={index} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
            </Select>
            <Button type="submit" className="ml-2" variant="raised" color="primary" onClick={() => this.addNewButton()}>
              <IntlMessages id="containers.Events.CreateAnEvent.addAVenue" />
            </Button>
          </div>
        </div>
        <div className="col-md-8 col-12 my-5">
          <h4 className="mb-1">
            <IntlMessages id="containers.Events.CreateAnEvent.eventTimezone" />
          </h4>
          <div className="col-md-6 mt-1">
            <TypeableDropdown
              placeholder={<IntlMessages id="containers.Events.CreateAnEvent.selectATimezone" />}
              suggestions={timezoneItems}
              single={timezoneId}
              handleChangeSingle={value => this.timezoneSelect(value)}
            />
          </div>
        </div>
        <div className="col-md-8 col-12 my-5">
          <h4 className="mb-1">
            <IntlMessages id="containers.Events.CreateAnEvent.eventCurrency" />
          </h4>
          <div className="col-md-6 mt-1">
            <TypeableDropdown
              placeholder={<IntlMessages id="containers.Events.CreateAnEvent.selectACurrency" />}
              suggestions={currencyItems}
              single={currencyId}
              handleChangeSingle={value => this.currencySelect(value)}
            />
          </div>
        </div>
        <fieldset className="col-md-8 col-12 mb-5">
          {/*  <legend className="legend">
            <IntlMessages id="containers.Events.CreateAnEvent.eventDates" />
          </legend>
          <div className="d-flex flex-row justify-content-end">
            <Tooltip className="d-inline-block" id="tooltip-top-start" title={<IntlMessages id="containers.Events.CreateAnEvent.eventDatesTitle" />} placement="top-start">
              <Button variant="fab" className="jr-fab-btn jr-btn-fab-xxs">
                <i className="zmdi zmdi-help zmdi-hc-fw" />
              </Button>
            </Tooltip>
          </div> */}
          <div className="row">
            <div className="col-sm-4 mt-2">
              <IntlMessages id="containers.Events.CreateAnEvent.eventStartDate" />
              <div className="row">
                <div className="col-sm-6 mt-2">
                  <DatePickers selectedDate={eventStartDate} dateChange={this.dateChange('eventStartDate')} />
                </div>
                <div className="col-sm-6 mt-2">
                  <TimePickers selectedTime={eventStartTime} timeChange={this.dateChange('eventStartTime')} />
                </div>
              </div>
            </div>
            <div className="col-sm-2 mt-2 text-center align-items-center" />
            <div className="col-sm-4 mt-2">
              <IntlMessages id="containers.Events.CreateAnEvent.eventEndDate" />
              <div className="row">
                <div className="col-sm-6 mt-2">
                  <DatePickers selectedDate={eventEndDate} dateChange={this.dateChange('eventEndDate')} />
                </div>
                <div className="col-sm-6 mt-2">
                  <TimePickers selectedTime={eventEndTime} timeChange={this.dateChange('eventEndTime')} />
                </div>
              </div>
            </div>
          </div>
          {/*<div className="d-flex flex-row col-12 mt-5 justify-content-end">
            <div>
              <Switch
                classes={{
                  checked: 'text-success',
                  bar: 'bg-success',
                }}
                checked={multi}
                onChange={this.checkChange('multi')}
              />
              <span>
                <IntlMessages id="containers.Events.CreateAnEvent.multiDayEvent" />
              </span>
            </div>
            <Tooltip className="d-inline-block" id="tooltip-top-start" title={<IntlMessages id="containers.Events.CreateAnEvent.multiDayEventTitle" />} placement="top-start">
              <Button variant="fab" className="ml-4 mt-3 jr-fab-btn jr-btn-fab-xxs">
                <i className="zmdi zmdi-help zmdi-hc-fw" />
              </Button>
            </Tooltip>
          </div>*/}
        </fieldset>
        <fieldset className="col-md-8 col-12 my-5">
          {/*  <legend className="legend">
            <IntlMessages id="containers.Events.CreateAnEvent.saleDates" />
          </legend>
          <div className="d-flex flex-row justify-content-end">
            <Tooltip className="d-inline-block" id="tooltip-top-start" title={<IntlMessages id="containers.Events.CreateAnEvent.saleDatesTitle" />} placement="top-start">
              <Button variant="fab" className="jr-fab-btn jr-btn-fab-xxs">
                <i className="zmdi zmdi-help zmdi-hc-fw" />
              </Button>
            </Tooltip>
          </div>*/}
          <div className="row">
            <div className="col-sm-4 mt-2">
              <IntlMessages id="containers.Events.CreateAnEvent.salesStartDate" />
              <div className="row">
                <div className="col-sm-6 mt-2">
                  <DatePickers selectedDate={saleStartDate} dateChange={this.dateChange('saleStartDate')} />
                </div>
                <div className="col-sm-6 mt-2">
                  <TimePickers selectedTime={saleStartTime} timeChange={this.dateChange('saleStartTime')} />
                </div>
              </div>
            </div>
            <div className="col-sm-2 mt-2 text-center align-items-center" />
            <div className="col-sm-4 mt-2">
              <IntlMessages id="containers.Events.CreateAnEvent.salesEndDate" />
              <div className="row">
                <div className="col-sm-6 mt-2">
                  <DatePickers selectedDate={saleEndDate} dateChange={this.dateChange('saleEndDate')} />
                </div>
                <div className="col-sm-6 mt-2">
                  <TimePickers selectedTime={saleEndTime} timeChange={this.dateChange('saleEndTime')} />
                </div>
              </div>
            </div>
          </div>
          {/*  <div className="col-12 mt-5" />*/}
        </fieldset>
        <fieldset className="col-md-8 col-12 app-wrapper card shadow my-5">
          <legend className="legend">
            <IntlMessages id="containers.Events.CreateAnEvent.eventFeatures" />
          </legend>
          <span className="my-2 ml-3">
            <IntlMessages id="containers.Events.CreateAnEvent.selectAllOptions" />
          </span>
          <div className="d-flex flex-row align-items-center">
            <Checkbox color="primary" checked={ticket} onChange={this.checkChange('ticket')} />
            <span>
              <IntlMessages id="containers.Events.CreateAnEvent.iWantTickets" />
            </span>
          </div>
          <div className="d-flex flex-row align-items-center">
            <Checkbox color="primary" checked={hotel} onChange={this.checkChange('hotel')} />
            <span>
              <IntlMessages id="containers.Events.CreateAnEvent.iWantHotelRooms" />
            </span>
          </div>
        </fieldset>
        {match.params.id ? (
          <div className="d-flex my-3 flex-row">
            <Button type="submit" className="mr-2" variant="raised" color="primary" onClick={this.saveEvent}>
              {eventsLoader ? <CircularProgress size={20} style={{ color: 'white' }} /> : <IntlMessages id="containers.Events.EventDescriptions.saveGoBack" />}
            </Button>
            <Button color="secondary" onClick={() => this.setState({ eventOptions: '/app/events/options' })}>
              <IntlMessages id="components.Venues.VenuesDrawer.cancel" />
            </Button>
          </div>
        ) : (
          <Button type="submit" className="my-3" variant="raised" color="primary" onClick={this.saveEvent}>
            {eventsLoader ? <CircularProgress size={20} style={{ color: 'white' }} /> : <IntlMessages id="containers.Events.CreateAnEvent.saveMyEvent" />}
          </Button>
        )}
        <VenuesDrawer showForm={showForm} hiddenForm={this.hiddenForm(false)} />
      </div>
    );
  }
}

const mapStateToProps = ({ tenants, geography, venues, createanevent }) => {
  const { tenantsByDomain } = tenants;
  const { venuesList, postedVenue, venueById } = venues;
  const { eventsLoader, postedData, alertMessage, showMessage, eventById, patchedEvent } = createanevent;
  return {
    tenantsByDomain,
    eventsLoader,
    venuesList,
    postedVenue,
    patchedEvent,
    postedData,
    alertMessage,
    showMessage,
    eventById,
    venueById,
    timezones: geography.get('timezones').toJS(),
    currencies: geography.get('currencies').toJS(),
  };
};

export default connect(
  mapStateToProps,
  {
    listVenues,
    getVenueById,
    getVenueByIdClear,
    postVenuesClear,
    addUpdateVenueState,
    postEvents,
    hideMessage,
    selectedEventFunc,
    getEventById,
    getEventByIdClear,
    patchEvents,
  },
)(CreateAnEvent);
