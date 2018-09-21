import React from 'react';
import TicketSidebar from '../../Sidebar';
import CustomScrollbars from 'util/CustomScrollbars';
import { connect } from 'react-redux';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import IntlMessages from 'util/IntlMessages';
import Button from '@material-ui/core/Button';
import { fetchInventory, createInventory, patchInventory, fetchTicketType } from '../../actions';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import CreateInventory from './CreateInventory';
import SelectInventory from './SelectInventory';
import Typography from '@material-ui/core/Typography';

class AddInventory extends React.Component {
  constructor(props) {
    super();
    const Inventory = props.inventory;
    const type = Inventory.optionType ? Inventory.optionType : '';
    // const type = Inventory.unlimited !== undefined ? Inventory.unlimited ? 'unlimited' : (Inventory.shared ? 'shared' : 'Dedicated') : '';
    // const editInventory = Inventory.inventory ? ((!Inventory.unlimited && !Inventory.shared) ? true : false) : false;
    const editInventory = Inventory.optionType === 'Dedicated';
    this.state = {
      optionType: type,
      showCreateInventoryForm: false,
      showSelectInventoryForm: false,
      editCreateInventory: editInventory,
      editData: {},
      inventoryDataDedicated: {},
      patchDedicated: {},
      inventoryDataUnlimited: { optionType: 'Unlimited', stockSettings: null },
      inventoryDataShared: {},
      patchShared: {},
      submitBtn: '',
      renderForm: true,
    };
  }

  handleChange = name => event => {
    this.setState({
      optionType: name, renderForm : false
    }, () => this.setState({renderForm: true}));
  };

  openCreateInventoryForm = status => event => {
    this.setState({ showCreateInventoryForm: status });
  };

  openSelectInventoryForm = status => event => {
    this.setState({ showSelectInventoryForm: status });
  };

  onCancel = () => {
    this.props.history.push(`/app/events/${this.props.match.params.eventId}/ticket-types/${this.props.match.params.ticketTypeId}/options`);
  };

  handleSubmit = btnType => {
    const { optionType } = this.state;
    const { ticketTypeId, eventId } = this.props.match.params;
    const tenantId  = this.props.tenantsByDomain.id
    let data = {};
    this.setState({ submitBtn: btnType });
    if (optionType === 'Unlimited'){
      data = this.state.inventoryDataUnlimited;
      this.props.createInventory({ data, tenantId, eventId, ticketTypeId });
      setTimeout(
        () => this.props.history.push(`/app/events/${eventId}/ticket-types/${ticketTypeId}/options`),
        1000
      )
    } else {
      this.props.history.push(`/app/events/${eventId}/ticket-types/${ticketTypeId}/options`);
    }
  }

  render() {
    const { optionType } = this.state;
    const { ticketTypeId, eventId } = this.props.match.params;
    const { inventory, isFetching, currTicketType } = this.props;
    let ticketTypeName = '';
    if(currTicketType !== undefined) {
      if(currTicketType.name !== undefined){
        ticketTypeName = currTicketType.name;
      }
    }
    let disabledSubmit = false;
    if(optionType !== 'Unlimited'){
      // disabledSubmit = optionType !== (inventory.Unlimited !== undefined ? inventory.Unlimited ? 'Unlimited' : (inventory.shared ? 'shared' : 'Dedicated') : '') ? true : false;
      disabledSubmit = optionType !== inventory.optionType ? true : false;
    }
   return (
      <div className="app-module animated slideInUpTiny animation-duration-3">
        <div className="app-module-sidenav d-none d-xl-flex">
          <TicketSidebar
            eventId={eventId}
            ticketTypeId={ticketTypeId}
            currType="Manage Inventory"
            width={this.props.width}
            heading={<IntlMessages id="pages.ticketTypesPage.inventory.label.sidebar_heading" />}
            history={this.props.history}
            optionType="ticketType"
            backLink={{url: `/app/events/${eventId}/ticket-types/${ticketTypeId}/options`, label: <IntlMessages id="pages.ticketTypesPage.feesAndTaxes.backTicketOptions" />}}
          />
        </div>

        <div className="module-box">
          <div className="module-box-header">
            <h2 className="mb-1 mt-1">
              <IntlMessages id="pages.ticketTypesPage.inventory.title" /> {ticketTypeName}
            </h2>
            <p className="m-0">
              <IntlMessages id="pages.ticketTypesPage.inventory.description" />
            </p>
          </div>
          <div className="module-box-content">
            <CustomScrollbars className="module-list-scroll scrollbar" style={{ height: this.props.width >= 1200 ? 'calc(100vh - 150px)' : 'calc(100vh - 130px)' }}>
              <div className="mb-2 p-4">
                <div className="">
                  <FormControl component="fieldset" required>
                    <FormControlLabel
                      value="Unlimited"
                      control={<Radio disableRipple={true} color="primary" className="d-flex align-items-start" checked={optionType === 'Unlimited'} onChange={this.handleChange('Unlimited')} />}
                      label={
                              <div className="ml-2">
                                <IntlMessages id="pages.ticketTypesPage.inventory.label.unlimited_inventory" />
                                <FormHelperText className="mt-1 mb-3">An Unlimited amount of tickets can be sold for this ticket type.</FormHelperText>
                              </div>}
                    />
                  </FormControl>
                </div>

                <div className="my-3 ">
                  <FormControl component="fieldset" required>
                    <FormControlLabel
                      value="Dedicated"
                      control={<Radio disableRipple={true} color="primary" className="d-flex align-items-start" checked={optionType === 'Dedicated'} onChange={this.handleChange('Dedicated')} />}
                      label={
                        <div className="ml-2">
                          <IntlMessages id="pages.ticketTypesPage.inventory.label.dedicated_inventory" />
                          <FormHelperText className="mt-1 mb-3">
                      <IntlMessages id="pages.ticketTypesPage.inventory.label.dedicated_inventory_description" />
                    </FormHelperText>
                        </div>}
                    />
                  </FormControl>
                    <div className="d-flex ml-5 align-items-center">

                       {inventory && inventory.optionType === 'Dedicated' && optionType === 'Dedicated' ?
                        <div className="mr-3">
                          {inventory.inventory && <Typography>
                            Name: {inventory.inventory.name}
                          </Typography>}
                          {inventory.inventory && <Typography>
                            Quota: {inventory.inventory.quota}
                          </Typography>}
                        </div>
                        : ''
                      }

                      <Button  disabled={optionType !== 'Dedicated'} onClick={this.openCreateInventoryForm(true)} className="mr-2 mb-3" variant="contained" size="small">
                        <IntlMessages id="pages.ticketTypesPage.inventory.btn.assign_inventory" />
                      </Button>
                  </div>
                </div>

                <div className="my-3">
                  <FormControl component="fieldset" required>
                    <FormControlLabel
                      value="Unlimited"
                      control={<Radio disableRipple={true} color="primary" className="d-flex align-items-start" checked={optionType === 'Shared'} onChange={this.handleChange('Shared')} />}
                      label={
                        <div className="ml-2">
                          <IntlMessages id="pages.ticketTypesPage.inventory.label.shared_inventory" />
                          <FormHelperText className="mt-1 mb-3">
                            <IntlMessages id="pages.ticketTypesPage.inventory.label.shared_inventory_description" />
                          </FormHelperText>
                        </div>}
                    />
                  </FormControl>
                    <div className="d-flex align-items-center ml-5">
                      {inventory && inventory.optionType === 'Shared' && optionType === 'Shared' ?
                        <div className="mr-3">
                          {inventory.inventory &&<Typography>
                            Name: {inventory.inventory.name}
                          </Typography>}
                          {inventory.inventory && <Typography>
                            Quota: {inventory.inventory.quota}
                          </Typography>}
                        </div>
                        : ''
                      }

                       <Button disabled={optionType !== 'Shared'} onClick={this.openSelectInventoryForm(true)} className="mr-2 mb-3" variant="contained" size="small">
                        <IntlMessages id="pages.ticketTypesPage.inventory.btn.select_existing_inventory" />
                      </Button>
                      <Button  disabled={optionType !== 'Shared'} onClick={this.openCreateInventoryForm(true)} className="mr-2 mb-3" variant="contained" size="small">
                        <IntlMessages id="pages.ticketTypesPage.inventory.btn.create_shared_inventory" />
                      </Button>
                    </div>
                </div>

                <div className="mt-4">
                  <Button disabled={disabledSubmit} onClick={() => this.handleSubmit('continue')} className="mr-2" variant="raised" color="primary">
                    {this.props.actionLoader && this.state.submitBtn === 'continue' ? (
                      <CircularProgress size={20} style={{ color: 'white' }} />
                    ) : (
                      <IntlMessages id="pages.ticketTypesPage.inventory.btn.save_and_continue" />
                    )}
                  </Button>

                  <Button onClick={this.onCancel} color="secondary">
                    <IntlMessages id="button.cancel_btn" />
                  </Button>
                </div>
              </div>
            </CustomScrollbars>
          </div>
        </div>

        {this.state.renderForm ? <CreateInventory
          showForm={this.state.showCreateInventoryForm}
          closeForm={this.openCreateInventoryForm(false)}
          match = {this.props.match}
          edit={this.state.editCreateInventory && this.state.optionType === 'Dedicated'}
          data = {this.props.inventory}
          optionType={this.state.optionType}
          ticketTypeName = {ticketTypeName}
        /> : ''}

        <SelectInventory
          showForm={this.state.showSelectInventoryForm}
          closeForm={this.openSelectInventoryForm(false)}
          match = {this.props.match}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ settings, ticketTypes, tenants }) => {
  return {
    width: settings.width,
    inventory: ticketTypes.get('inventory').toJS(),
    tenantsByDomain: tenants.tenantsByDomain,
    isFetching: ticketTypes.get('isFetching'),
    ticketTypesList: ticketTypes.get('ticketTypesList').toJS(),
    newInventoryId: ticketTypes.get('newInventoryId'),
    actionLoader: ticketTypes.get('actionLoader'),
    refetchInventory: ticketTypes.get('refetchInventory'),
    currTicketType: ticketTypes.get('ticketType').toJS(),
  };
};

export default connect(
  mapStateToProps,
  { fetchInventory, createInventory, patchInventory, fetchTicketType },
)(AddInventory);
