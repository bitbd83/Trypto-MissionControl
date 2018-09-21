import React from 'react';
import Button from '@material-ui/core/Button';
import FormDrawer from 'components/FormDrawer';
import IntlMessages from 'util/IntlMessages';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import { connect } from 'react-redux';
import FormDrawerHeader from 'components/FormDrawer/FormDrawerHeader';
import FormDrawerContent from 'components/FormDrawer/FormDrawerContent';
import FormDrawerFooter from 'components/FormDrawer/FormDrawerFooter';
import { fetchAllTaxGroup } from '../../../Taxes/TaxGroup/actions';
import Select from '@material-ui/core/Select';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { addTaxGroup, fetchTicketTypes } from '../../actions';
import AsyncSelect from 'react-select/lib/Async';
import { addUpSelles } from '../actions'

class AddUp extends React.Component {
  state = {
    selectUp: '',
    selectedUp: [],
  };

  componentWillReceiveProps(nextProps) {
    if(!nextProps.actionLoader && this.state.submit){
      this.setState({selectedUp:[], selectUp:'', submit: false})
      this.props.closeForm();
    }
  }

  onCloseUpForm = () => {
    const { selectedUp } = this.state;
    if (selectedUp.name) {
      this.props.onCloseUpForm(this.state.selectedUp);
    }
    this.setState({ selectUp: '', selectedUp: {} });
    this.props.closeForm();
  };

  handleSubmit = () => {
    const { eventId, ticketTypeId } = this.props.match.params;
    const tenantId  = this.props.tenantsByDomain.id
    const { selectedUp } = this.state;
    const UpIds = [];
    const data = {};

    selectedUp.map(up => {
      UpIds.push(up.id);
    });
      data.ids = UpIds;
    if(UpIds.length){
      this.props.addUpSelles({ data, tenantId, eventId, ticketTypeId });
      this.setState({submit: true})
    }else{
      this.props.closeForm();
    }
  };

  componentWillMount() {
    this.getTickets();
  }

  getTickets = (inputValue = '') => {
    const { eventId } = this.props.match.params;
    const tenantId  = this.props.tenantsByDomain.id
    this.props.fetchTicketTypes({searchTerm: inputValue, take:20, tenantId, eventId, archived:false});
  }

  handleChange = name => value => {
    this.setState({
      selectUp: value,
    });
  };

  onAddUp = () => {
    const { selectUp } = this.state;
    const { tickets } = this.props;
    const selectedUp = this.state.selectedUp;
    let isAlready = false;
    selectedUp.map(select => {
      if (select.id === selectUp.value) {
        isAlready = true;
      }
    });

    if (!isAlready) {
      tickets.items.map(ticket => {
        if (selectUp.value === ticket.id) {
          selectedUp.push(ticket);
        }
      });
    }
    this.setState({ selectedUp });
  };

  onDeleteUp = () => {
    this.setState({ selectedUp: {} });
  };

  onDelete = id => {
    const selectedUp = this.state.selectedUp;
    selectedUp.map((up, index) => {
      if (up.id === id) {
        selectedUp.splice(index, 1);
      }
    });
    this.setState({ selectedUp });
  };

  onClose = () => {
    this.setState({selectedFees: [], selectFee: ''})
    this.props.closeForm();
  }

  handleInputChange = (inputValue) => {
    this.setState({inputValue})
    this.getTickets(inputValue)
  };

  getTicketOptions = () => {
    const allTickets = [];
    const { ticketTypeId } = this.props.match.params;
    const { tickets, selectedUp } = this.props;
    const { inputValue } = this.state;
    const selectedSales = selectedUp.map((cross => cross.id))

    if(tickets.items.length){
      // const filterOptions =  tickets.items.filter(i => i.name.toLowerCase().includes(inputValue.toLowerCase()));

      tickets.items.map((ticket, index)=> {
        if(selectedSales.indexOf(ticket.id) === -1 && ticket.id !== ticketTypeId){
          allTickets.push({label: ticket.name, value: ticket.id})
        }
      })
    }
    return allTickets
  }

  loadOptions = inputValue =>
    new Promise(resolve => {
        resolve({options: this.getTicketOptions(inputValue)});
    });


  render() {
    const { tickets, currTaxGroup } = this.props;
    const { selectedUp } = this.state;
    return (
      <FormDrawer open={this.props.showForm}>
        <FormDrawerHeader closeClick={this.onClose}>
         <IntlMessages id="pages.ticketTypesPage.Sells.label.add_upSells" />
        </FormDrawerHeader>
        <FormDrawerContent>
          <div className="mb-5 d-flex align-items-center">
            <FormControl className="mt-3 mb-3 w-50 mr-2">
                <AsyncSelect
                  cacheOptions
                  value={this.state.selectUp}
                  loadOptions={this.loadOptions}
                  onChange={this.handleChange('selectUp')}
                  defaultOptions
                  onInputChange={this.handleInputChange}
                />
            </FormControl>
            <div className="col-1">{this.props.isFetching && <CircularProgress size={24} color="secondary" />}</div>
            <div>
              <Button onClick={this.onAddUp} className="mr-2" variant="raised" color="primary">
                <IntlMessages id="pages.ticketTypesPage.CreateTaxGroup.label.add" />
              </Button>
            </div>
          </div>
          <div>
            {selectedUp.name !== undefined ? <Typography className="my-3" variant="headline" color="textSecondary">
              <IntlMessages id="pages.ticketTypesPage.Sells.label.crossSell_title" />
            </Typography> : ''}

            {/* {selectedUp.name !== undefined && (
              <Card className="d-flex justify-content-between align-items-center mb-3">
                <CardContent className="d-flex  flex-column">
                  <Typography className="" variant="headline" color="textSecondary">
                    {selectedUp.name}
                  </Typography>
                </CardContent>
                <CardContent className="d-flex  flex-column">
                  <IconButton onClick={this.onDeleteUp}>
                    <DeleteIcon />
                  </IconButton>
                </CardContent>
              </Card>
            )} */}
            {selectedUp &&
              selectedUp.map(up => {
                return (
                  <Card key={up.id} className="d-flex justify-content-between mb-3">
                    <CardContent className="d-flex align-items-center">
                      <Typography className="" variant="headline" color="textSecondary">
                        {up.name}
                      </Typography>
                    </CardContent>
                    <CardContent className="d-flex  flex-column">
                      <IconButton onClick={() => this.onDelete(up.id)}>
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

const mapStateToProps = ({ settings, ticketTypes, taxes, tenants, sells }) => {
  return {
    width: settings.width,
    isFetching: ticketTypes.get('isFetching'),
    actionLoader: sells.get('actionLoader'),
    tenantsByDomain: tenants.tenantsByDomain,
    tickets: ticketTypes.get('ticketTypesList').toJS(),
  };
};

export default connect(
  mapStateToProps,
  { fetchAllTaxGroup, addTaxGroup, fetchTicketTypes, addUpSelles },
)(AddUp);
