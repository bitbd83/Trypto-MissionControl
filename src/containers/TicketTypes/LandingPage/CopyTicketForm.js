import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import FormDrawer from 'components/FormDrawer';
import FormDrawerHeader from 'components/FormDrawer/FormDrawerHeader';
import FormDrawerContent from 'components/FormDrawer/FormDrawerContent';
import FormDrawerFooter from 'components/FormDrawer/FormDrawerFooter';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import { connect } from 'react-redux';
import IntlMessages from 'util/IntlMessages';
import { fetchAllEvents } from '../../Events/EventsDashboard/actions';
import AsyncSelect from 'react-select/lib/Async';
import CircularProgress from '@material-ui/core/CircularProgress';
import { cloneTicketTypes } from '../actions'


class CopyTicketForm extends React.Component {

    constructor (props) {
      super();
      this.state = this.getInitialState();
    }

    getInitialState = () => {
      const initialState = {
        event: '',
        eventInput: '',
      };
      return initialState;
    }

    handleSubmit = () => {
      const sourceEventId = this.state.event;
      const { eventId } = this.props.match.params;
      const tenantId = this.props.tenantsByDomain.id;
      if(sourceEventId){
        this.props.cloneTicketTypes({tenantId, eventId, sourceEventId})
      }else{
        this.handleCloseDrawer();
      }
      this.setState({submit: true})
    }

    componentWillMount(){
      this.getEvents({})
    }

    getEvents = ( searchText = '') => {
      const tenantId = this.props.tenantsByDomain.id;
      this.props.fetchAllEvents({searchText, tenantId});
    }

    handleCloseDrawer = () => {
      let states = this.getInitialState();
      this.setState(states);
      this.props.closeForm();
    }

    handleEventInput = name => (inputValue) => {
      this.setState({[name]: inputValue})
        this.getEvents(inputValue)
    };

    getEventOptions = () => {
      const allEvents = [];
      const { eventId } = this.props.match.params;
      const { events } = this.props;
      const { eventInput } = this.state;

      let filterOptions = [];
      if(events.items.length){
        if(eventInput){
          filterOptions =  events.items.filter(i => i.title.toLowerCase().includes(eventInput.toLowerCase()));
        }else{
          filterOptions = events.items;
        }
        filterOptions.length && filterOptions.map((event, index)=> {
          if(event.id !== eventId){
            allEvents.push({label: event.title, value: event.id})
          }
        })
      }
      return allEvents
    }

    loadEventOptions = inputValue =>
      new Promise(resolve => {
          resolve({options: this.getEventOptions()});
    });

    onChangeEvent = name => event => {
      let value = event.target ? event.target.value :  event;
      this.setState({[name]: value.value})
    }

    render() {
      let selectedEvent = '';
      if(this.state.event){
        this.props.events.items.map((eve, index) => {
          if(eve.id === this.state.event){
            selectedEvent = eve.title
          }
        })
      }
      return (
        <FormDrawer open={this.props.showForm}>
          <FormDrawerHeader
            closeClick={this.handleCloseDrawer}>
              <IntlMessages id="pages.events.ticketTypes.sidebar.btn.copyTicket" />
          </FormDrawerHeader>

          <FormDrawerContent>
            <FormControl component="fieldset" className="w-100">
              <FormLabel className={'shrink mb-1'}>
                <IntlMessages id="sidebar.events" />
              </FormLabel>
              <AsyncSelect
                placeholder={<IntlMessages id="containers.Orders.FilterForm.Form.input.events.label" />}
                value={this.state.event}
                onChange={this.onChangeEvent('event')}
                loadOptions={this.loadEventOptions}
                defaultOptions
                onInputChange={this.handleEventInput('eventInput')}
              />
            </FormControl>
          </FormDrawerContent>

          <FormDrawerFooter>
            <Button
              type="submit"
              onClick={this.handleSubmit}
              className="mr-2"
              variant="raised"
              color="primary">
              {this.props.actionLoader ? <CircularProgress size={24} color="secondary" /> :
                <span className="d-flex">
                 <span><IntlMessages id="pages.events.ticketTypes.btn.copyTicketFrom" /></span>
                 <span className="ml-1 d-flex" >{selectedEvent}</span>
                </span>}
            </Button>
            <Button onClick={this.handleCloseDrawer} color="secondary">
              <IntlMessages id="button.cancel_btn" />
            </Button>
          </FormDrawerFooter>
        </FormDrawer>
      );
    }
}

const mapStateToProps = ({ taxes, tenants, eventsdashboard, ticketTypes }) => {
  return {
    actionLoader: ticketTypes.get('actionLoader'),
    tenantsByDomain: tenants.tenantsByDomain,
    eventLoader: eventsdashboard.get('allEventsLoader'),
    events: eventsdashboard.get('allEvents').toJS(),
  };
};
export default connect(
  mapStateToProps,
  {
    fetchAllEvents,
    cloneTicketTypes
  },
)(CopyTicketForm);

