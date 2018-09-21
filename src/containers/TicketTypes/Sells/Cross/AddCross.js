import React from 'react';
import Button from '@material-ui/core/Button';
import FormDrawer from 'components/FormDrawer';
import TextField from '@material-ui/core/TextField';
import IntlMessages from 'util/IntlMessages';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
// import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import { connect } from 'react-redux';
import FormDrawerHeader from 'components/FormDrawer/FormDrawerHeader';
import FormDrawerContent from 'components/FormDrawer/FormDrawerContent';
import FormDrawerFooter from 'components/FormDrawer/FormDrawerFooter';
import { addFees } from '../../actions';
import { fetchAllFees } from '../../../Fees/actions';
import Select from 'react-select';
import FormLabel from '@material-ui/core/FormLabel';
import Dropdown from '@material-ui/core/Select';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { getAllTicketTypes } from '../actions'
import AsyncSelect from 'react-select/lib/Async';
import {addCrossSelles} from '../actions'
import { fetchAllEvents } from '../../../Events/EventsDashboard/actions';


class AddCross extends React.Component {
  constructor(props){
    super();
    // const selected = props.selectedCross.length ? props.selectedCross : [];
    this.state = {
      selectCross: '',
      selectedCross: [],
      ticketInput:'',
      eventInput:'',
      event:'',
      eventTickets: [],
    };
  }


  componentWillReceiveProps(nextProps) {
    if(!nextProps.actionLoader && this.state.submit){
      this.setState({selectedCross:[], selectCross:'', submit: false})
      this.onClose();
    }

    if(nextProps.ticketTypesLoader !== this.props.ticketTypesLoader ){
      if(nextProps.tickets.items.length)
        this.setState({eventTickets: nextProps.tickets.items})
      else
        this.setState({eventTickets: []})
    }
  }

  componentWillMount(){
    this.getEvents({});
  }

  handleSubmit = () => {
    const { eventId, ticketTypeId } = this.props.match.params;
    let tenantId  = this.props.tenantsByDomain.id
    const { selectedCross } = this.state;
    const CrossIds = [];
    const data = {};

    selectedCross.map(fee => {
      CrossIds.push(fee.id);
    });
      data.ids = CrossIds;
    if(CrossIds.length){
      this.props.addCrossSelles({ data, tenantId, eventId, ticketTypeId });
      this.setState({submit: true})
    }else{
      this.onClose();
    }
  };

  getTickets = (searchTerm ='') => {
    const tenantId  = this.props.tenantsByDomain.id
    this.props.getAllTicketTypes({searchTerm, take:100, archived: false, tenantId, eventId: this.state.event});
  }

  getEvents = ( searchText = '') => {
    this.props.fetchAllEvents({searchText});
  }

  handleChange = name => value => {
    this.setState({
      selectCross: value,
    });
  };

  onAddCross = () => {
    const { selectCross } = this.state;
    const { tickets } = this.props;
    const selectedCross = this.state.selectedCross;
    let isAlready = false;
    selectedCross.map(select => {
      if (select.id === selectCross.value) {
        isAlready = true;
      }
    });

    if (!isAlready) {
      tickets.items.map(ticket => {
        if (selectCross.value === ticket.id) {
          selectedCross.push(ticket);
        }
      });
    }
    this.setState({ selectedCross });
  };

  onDelete = id => {
    const selectedCross = this.state.selectedCross;
    selectedCross.map((fee, index) => {
      if (fee.id === id) {
        selectedCross.splice(index, 1);
      }
    });
    this.setState({ selectedCross });
  };

  onClose = () => {
    this.setState({selectedCross: [], selectCross: '', event: ''})
    this.props.closeForm();
  }

  handleEventInput = name => (inputValue) => {
    this.setState({[name]: inputValue}, () => this.getEvents(inputValue));
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
    this.setState({[name]: value.value, selectCross:''}, () => {
      if(name === 'event'){
        this.getTickets('');
      }
    })
  }

  filterTickets  = (eventTickets, selectedSells, ticketTypeId ) => {
    let allTickets = [];
    eventTickets.length && eventTickets.map((ticket, index)=> {
      if(selectedSells.indexOf(ticket.id) === -1 && ticket.id !== ticketTypeId){
        allTickets.push({label: ticket.name, value: ticket.id})
      }
    })

    return allTickets;
  }


  render() {
    const { tickets, ticketTypesLoader, currFees, eventLoader, events } = this.props;
    const { selectedCross, eventTickets } = this.state;
    const ticketOptions = this.filterTickets(eventTickets, this.props.selectedCross, this.props.match.params.ticketTypeId);

     return (
      <FormDrawer open={this.props.showForm}>
        <FormDrawerHeader closeClick={this.onClose}>
          <IntlMessages id="pages.ticketTypesPage.Sells.btn.add_CrossSells" />
        </FormDrawerHeader>
        <FormDrawerContent>
          <Grid container justify={'space-between'} alignItems="flex-end">
            <Grid item xs={4}>
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
            </Grid>
            <Grid item xs={4}>
              <FormControl component="fieldset" className="w-100" >
                <FormLabel className={'shrink mb-1'}>
                  <IntlMessages id="pages.ticketTypesPage.title" />
                </FormLabel>
                {/* <AsyncSelect
                  disabled ={!this.state.event}
                  placeholder={<IntlMessages id="containers.Orders.FilterForm.Form.input.ticketTypes.label" />}
                  value={this.state.selectCross}
                  loadOptions={this.loadOptionsTicket}
                  onChange={this.handleChange('selectCross')}
                  defaultOptions
                  onInputChange={this.handleTicketInput('ticketInput')}
                /> */}
                <Select
                  options={ticketOptions}
                  isLoading={ticketTypesLoader}
                  disabled ={!this.state.event}
                  placeholder={<IntlMessages id="containers.Orders.FilterForm.Form.input.ticketTypes.label" />}
                  value={this.state.selectCross}
                  onChange={this.handleChange('selectCross')}
                />
              </FormControl>
            </Grid>
            <Grid item xs={2}>
              <Button onClick={this.onAddCross} className="mr-2" variant="raised" color="primary">
                <IntlMessages id="pages.ticketTypesPage.Sells.btn.add" />
              </Button>
            </Grid>
          </Grid>

          <div>
           {selectedCross && selectedCross.length ? <Typography className="my-3" variant="headline" color="textSecondary">
              <IntlMessages id="pages.ticketTypesPage.Sells.label.crossSell_title" />
            </Typography> : ''}

            {selectedCross &&
              selectedCross.map(fee => {
                return (
                  <Card key={fee.id} className="d-flex justify-content-between mb-3">
                    <CardContent className="d-flex align-items-center">
                      <Typography className="" variant="headline" color="textSecondary">
                        {fee.name}
                      </Typography>
                    </CardContent>
                    <CardContent className="d-flex  flex-column">
                      <IconButton onClick={() => this.onDelete(fee.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </CardContent>
                  </Card>
                );
              })}
          </div>
        </FormDrawerContent>
        <FormDrawerFooter>
        <Button onClick={this.handleSubmit}  variant="raised" color="primary" className="mt-1">
            {this.props.actionLoader ? <CircularProgress size={20} style={{ color: 'white' }} /> : <IntlMessages id="pages.ticketTypesPage.addFees.btn.save" />}
          </Button>
          <Button onClick={this.onClose} color="secondary" className="mt-1">
            <IntlMessages id="pages.ticketTypesPage.addFees.btn.cancel" />
          </Button>
        </FormDrawerFooter>
      </FormDrawer>
    );
  }
}

const mapStateToProps = ({ settings, ticketTypes, sells, tenants, eventsdashboard }) => {
  return {
    width: settings.width,
    actionLoader: sells.get('actionLoader'),
    isFetchingTickets: sells.get('isFetchingTickets'),
    tenantsByDomain: tenants.tenantsByDomain,
    currFees: ticketTypes.get('fees').toJS(),
    eventLoader: eventsdashboard.get('allEventsLoader'),
    events: eventsdashboard.get('allEvents').toJS(),
    ticketTypesLoader: sells.get('isFetchingTickets'),
    tickets: sells.get('allTickets').toJS(),
  };
};

export default connect(
  mapStateToProps,
  { fetchAllFees, addFees, getAllTicketTypes, addCrossSelles, fetchAllEvents },
)(AddCross);
