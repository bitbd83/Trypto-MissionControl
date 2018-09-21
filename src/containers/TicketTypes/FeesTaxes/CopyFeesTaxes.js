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
import AsyncSelect from 'react-select/lib/Async';
import CircularProgress from '@material-ui/core/CircularProgress';
import { fetchTicketTypes, cloneFees, cloneTaxes } from '../actions'


class CopyFeesTaxes extends React.Component {

    constructor (props) {
      super();
      this.state = this.getInitialState();
    }

    getInitialState = () => {
      const initialState = {
        ticket: '',
        ticketInput: '',
      };
      return initialState;
    }

    handleSubmit = () => {
      const sourceTicketTypeId = this.state.ticket;
      const { eventId, ticketTypeId } = this.props.match.params;
      const tenantId = this.props.tenantsByDomain.id;
      if(sourceTicketTypeId){
        if(this.props.copyType === 'fees'){
          this.props.cloneFees({tenantId, eventId, ticketTypeId,  sourceTicketTypeId})
        }else{
          this.props.cloneTaxes({tenantId, eventId, ticketTypeId, sourceTicketTypeId})
        }
      }else{
        this.handleCloseDrawer();
      }
      this.setState({submit: true})
    }

    componentWillMount(){
      this.getTicketTypes()
    }

    getTicketTypes = ( searchTerm = '') => {
      const tenantId = this.props.tenantsByDomain.id;
      const { eventId } = this.props.match.params;
      this.props.fetchTicketTypes({searchTerm, tenantId, eventId});
    }

    handleCloseDrawer = () => {
      let states = this.getInitialState();
      this.setState(states);
      this.props.closeForm();
    }

    handleTicketInput = name => (inputValue) => {
      this.setState({[name]: inputValue})
        this.getTicketTypes(inputValue)
    };

    getTicketOptions = () => {
      const allTicket = [];
      const { ticketTypeId } = this.props.match.params;
      const { tickets } = this.props;
      const { ticketInput } = this.state;

      let filterOptions = [];
      if(tickets.items.length){
        if(ticketInput){
          filterOptions =  tickets.items.filter(i => i.name.toLowerCase().includes(ticketInput.toLowerCase()));
        }else{
          filterOptions = tickets.items;
        }
        filterOptions.length && filterOptions.map((ticket, index)=> {
          if(ticket.id !== ticketTypeId){
            allTicket.push({label: ticket.name, value: ticket.id})
          }
        })
      }
      return allTicket
    }

    loadTicketOptions = inputValue =>
      new Promise(resolve => {
          resolve({options: this.getTicketOptions()});
    });

    onChangeTicket = name => event => {
      let value = event.target ? event.target.value :  event;
      this.setState({[name]: value.value})
    }

    render() {
      let selectedTicket = '';
      if(this.state.ticket){
        this.props.tickets.items.map((eve, index) => {
          if(eve.id === this.state.ticket){
            selectedTicket = eve.name
          }
        })
      }
      return (
        <FormDrawer open={this.props.showForm}>
          <FormDrawerHeader
            closeClick={this.handleCloseDrawer}>
            {this.props.copyType === 'fees' ?  <IntlMessages id="pages.ticketTypesPage.CreateFee.label.copy_title_fees" />
            : <IntlMessages id="pages.ticketTypesPage.CreateFee.label.copy_title_taxes" /> }
          </FormDrawerHeader>

          <FormDrawerContent>
            <FormControl component="fieldset" className="w-100">
              <FormLabel className={'shrink mb-1'}>
                <IntlMessages id="pages.ticketTypesPage.title" />
              </FormLabel>
              <AsyncSelect
                placeholder={<IntlMessages id="containers.Orders.FilterForm.Form.input.ticketTypes.label" />}
                value={this.state.ticket}
                onChange={this.onChangeTicket('ticket')}
                loadOptions={this.loadTicketOptions}
                defaultOptions
                onInputChange={this.handleTicketInput('ticketInput')}
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
                  <span>
                    {this.props.copyType === 'fees' ? <IntlMessages id="pages.ticketTypesPage.feesAndTaxes.btn.copyFeesFrom" />
                    : <IntlMessages id="pages.ticketTypesPage.feesAndTaxes.btn.copyTaxesFrom" />
                  }
                  </span>
                  <span className="ml-1 d-flex" >{selectedTicket}</span>
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

const mapStateToProps = ({ tenants, eventsdashboard, ticketTypes }) => {
  return {
    actionLoader: ticketTypes.get('actionLoader'),
    tenantsByDomain: tenants.tenantsByDomain,
    eventLoader: eventsdashboard.get('allEventsLoader'),
    events: eventsdashboard.get('allEvents').toJS(),
    tickets: ticketTypes.get('ticketTypesList').toJS(),
  };
};
export default connect(
  mapStateToProps,
  {
    fetchTicketTypes,
    cloneFees,
    cloneTaxes
  },
)(CopyFeesTaxes);

