import React from 'react';
import TicketSidebar from '../Sidebar';
import CustomScrollbars from 'util/CustomScrollbars';
import { connect } from 'react-redux';
import IntlMessages from 'util/IntlMessages';
import Button from '@material-ui/core/Button';
import { fetchInventory, addFees, addTaxGroup, fetchFees, fetchTaxGroup, fetchTicketType } from '../actions';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import AddFee from './Fees/AddFee';
import AddTaxGroup from './TaxGroup/AddTaxGroup';
import FeesForm from '../../Fees/components/FeesForm';
import TaxGroupForm from '../../Taxes/TaxGroup/components/TaxGroupForm';
import TaxRateForm from '../../Taxes/TaxRate/components/TaxRateForm';
import CircularProgress from '@material-ui/core/CircularProgress';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import FeesCell from './Fees/FeesCell'
import TaxGroupCell from './TaxGroup/TaxGroupCell'
import Paper from '@material-ui/core/Paper';
import CopyFeesTaxes from './CopyFeesTaxes'


class FeesAndTaxes extends React.Component {
  constructor() {
    super();
    this.state = {
      inventoryType: 'dedicated',
      showFeeForm: false,
      showTaxGroupForm: false,
      showCreateFeeForm: false,
      showCreateTaxGroupForm: false,
      showTaxRateForm: false,
      showCopyForm: false,
      copyType: '',
      selectedFees: [],
      deletedFees: [],
      selectedTaxGroup: {},
      deletedTaxGroup: [],
      anchorElFee: undefined,
      menuStateFee: false,
      anchorElTax: undefined,
      menuStateTax: false
    };
  }

  componentDidMount() {
    const { ticketTypeId, eventId } = this.props.match.params;
    const tenantId  = this.props.tenantsByDomain.id
    this.getFees();
   this.getTaxGroup();
   this.props.fetchTicketType({ tenantId, eventId, ticketTypeId});
  }

  getTaxGroup = () => {
    const { eventId, ticketTypeId } = this.props.match.params;
    const tenantId  = this.props.tenantsByDomain.id
    this.props.fetchTaxGroup({
      tenantId,
      ticketTypeId,
      eventId,
    });
  };

  getFees = () => {
    const { eventId, ticketTypeId } = this.props.match.params;
    const tenantId  = this.props.tenantsByDomain.id
    this.props.fetchFees({
      tenantId,
      ticketTypeId,
      eventId,
    });
  };

  componentWillReceiveProps(nextProps) {
    const { eventId, ticketTypeId } = this.props.match.params;

    if (this.state.submit && !nextProps.actionLoader) {
      this.props.history.push(`/app/events/${eventId}/ticket-types/${ticketTypeId}/options`);
    }

    if (nextProps.refetchTaxGroup) {
      if(this.state.showCopyForm){
        this.setState({showCopyForm:false})
      }
      this.getTaxGroup();
    }

    if (nextProps.refetchFees) {
      if(this.state.showCopyForm){
        this.setState({showCopyForm:false})
      }
      this.getFees();
    }

    if (nextProps.newTaxRate.id !== undefined) {
      const selectedTaxGroup = [nextProps.newTaxRate];
      this.setState({
        selectedTaxGroup,
      });
    }


  if (nextProps.Fees.items) {
    this.setState({selectedFees: nextProps.Fees.items})
  }

  if(nextProps.taxGroup.items){
    this.setState({selectedTaxGroup: nextProps.taxGroup.items})
  }

}

  onCloseTaxGroupForm = selectedTaxGroup => {
    this.setState({
      selectedTaxGroup: [selectedTaxGroup],
    });
  };

  onDeleteTaxGroup = id => {
    const { ticketTypeId, eventId } = this.props.match.params;
    const tenantId  = this.props.tenantsByDomain.id
    this.props.deleteTaxGroup({ data: { ids: [id] }, tenantId, eventId, ticketTypeId });
  };

  handleChange = name => event => {
    this.setState({
      inventoryType: name,
    });
  };

  openAddFeeForm = status => event => {
    this.handleRequestCloseFee();
    this.setState({
      showFeeForm: status,
    });
  };

  openCopyForm = (status, copyType = '') => event => {
    // this.setState({})
    this.setState({showCopyForm: status, copyType});
  };

  openCreateFeeForm = status => event => {
    const { eventId, ticketTypeId } = this.props.match.params;
    const tenantId  = this.props.tenantsByDomain.id
    const { newFees } = this.props
    this.handleRequestCloseFee();
    if(status === false && newFees.id){
      const data ={ids: [ newFees.id]}
      this.props.addFees({ data, tenantId, eventId, ticketTypeId });
    }
    this.setState({
      showCreateFeeForm: status,
    });
  };

  openAddTaxGroupForm = status => event => {
    this.handleRequestCloseTax();
    this.setState({
      showTaxGroupForm: status,
    });
  };

  openCreateTaxGroupForm = status => event => {
    this.handleRequestCloseTax();
       this.setState({
      showCreateTaxGroupForm: status,
      showTaxRateForm: !status ? true : false,
    });
  };

  openTaxRateForm = status => event => {
    const { eventId, ticketTypeId } = this.props.match.params;
    const tenantId  = this.props.tenantsByDomain.id
    const { newGroup } = this.props
    if(status === false && newGroup.id){
      const taxGroupId = newGroup.id
      this.props.addTaxGroup({ taxGroupId, tenantId, eventId, ticketTypeId });
    }

    this.setState({
      showTaxRateForm: status,
    });
  };

  handleRequestCloseFee = () => {
    this.setState({menuStateFee: false});
  };

  handleRequestCloseTax = () => {
    this.setState({menuStateTax: false});
  };

  openOptionMenuFee = event => {
    this.setState({menuStateFee: true, anchorElFee: event.currentTarget});
  };

  openOptionMenuTax = event => {
    this.setState({menuStateTax: true, anchorElTax: event.currentTarget});
  };

  onCancel = () => {
    this.props.history.push(`/app/events/${this.props.match.params.eventId}/ticket-types/${this.props.match.params.ticketTypeId}/options`);
  };

  loaderShow = () => {
    return (
      <div className="d-flex justify-content-center">
        {' '}
        <CircularProgress size={40} />
      </div>
    );
  };

  noFees = () => {
    return <div className="contact-main-content mr-1">
              <Card className="d-flex mr-3 justify-content-center w-100">
                <CardContent className="d-flex justify-content-center align-items-center flex-column">
                  <Typography className="mt-3 font-weight-bold" variant="subheading" color="textSecondary">
                    <IntlMessages id="pages.ticketTypesPage.feesAndTaxes.label.fee_description1" />
                    <br />
                  </Typography>
                  <Typography className="" variant="subheading" color="textSecondary">
                    <IntlMessages id="pages.ticketTypesPage.feesAndTaxes.label.fee_description3" />
                  </Typography>
                </CardContent>
              </Card>
          </div>
  }

  noTaxGroup = () => {
    return <div className="contact-main-content mr-1">
    <Card className="d-flex mr-3 justify-content-center w-100">
      <CardContent className="d-flex justify-content-center align-items-center flex-column">
        <Typography className="mt-3 font-weight-bold text-center" variant="subheading" color="textSecondary">
          <IntlMessages id="pages.ticketTypesPage.feesAndTaxes.label.taxes_description1" />
        </Typography>
        <Typography className="text-center" variant="subheading" color="textSecondary">
          <IntlMessages id="pages.ticketTypesPage.feesAndTaxes.label.taxes_description3" />
        </Typography>
      </CardContent>
    </Card>
    </div>
  }

  render() {
    const { selectedFees, selectedTaxGroup, anchorElFee, menuStateFee, anchorElTax, menuStateTax } = this.state;
    const { newGroup, isFetchingFee, isFetchingTaxGroup, ticketTypesList, Fees, tenantsByDomain, currTicketType } = this.props;
    const tenantId = tenantsByDomain.id;
    const { eventId, ticketTypeId } = this.props.match.params;

    let ticketTypeName = '';
    if(currTicketType !== undefined) {
      if(currTicketType.name !== undefined){
        ticketTypeName = currTicketType.name;
      }
    }

    let showTaxRate = false;
    if (newGroup.id !== undefined) {
      showTaxRate = true;
    }

    return (
      <div className="app-module animated slideInUpTiny animation-duration-3">
        <div className="app-module-sidenav d-none d-xl-flex">
          <TicketSidebar
            eventId={eventId}
            width={this.props.width}
            currType = {"Manage Fees & Taxes"}
            ticketTypeId = {ticketTypeId}
            heading={<IntlMessages id="pages.ticketTypesPage.feesAndTaxes.label.sidebar_heading" />}
            history={this.props.history}
            optionType="ticketType"
            backLink={{url: `/app/events/${eventId}/ticket-types/${ticketTypeId}/options`, label: <IntlMessages id="pages.ticketTypesPage.feesAndTaxes.backTicketOptions" />}}
          />
        </div>
        <div className="module-box">
          <div className="module-box-header">
            <h2 className="mb-1 mt-1">
              <IntlMessages id="pages.ticketTypesPage.feesAndTaxes.title" /> {ticketTypeName}
            </h2>
            <p className="m-0">
              <IntlMessages id="pages.ticketTypesPage.feesAndTaxes.description1" /> <IntlMessages id="pages.ticketTypesPage.feesAndTaxes.description2" />
            </p>
          </div>
          <div className="module-box-content hotel-main-content p-0">
            <CustomScrollbars className="module-list-scroll scrollbar" style={{ height: this.props.width >= 1200 ? 'calc(100vh - 150px)' : 'calc(100vh - 130px)' }}>
              <div className="p-4">
                <div className="mb-5">
                  <div className="mb-3 d-flex justify-content-between">
                    <Typography className="" variant="headline" color="textSecondary">
                      <IntlMessages id="pages.ticketTypesPage.feesAndTaxes.label.fee_title" />
                    </Typography>
                    <div className="d-flex">
                      <Button type="submit" onClick={this.openCopyForm(true, 'fees')} className="mr-2" variant="raised" color="primary">
                        <IntlMessages id="pages.ticketTypesPage.CreateFee.label.copy_title_fees" />
                      </Button>
                      <Button type="submit" onClick={this.openOptionMenuFee} className="mr-1" variant="raised" color="primary">
                        <IntlMessages id="pages.ticketTypesPage.feesAndTaxes.btn.add_fee" />
                      </Button>
                    </div>
                  </div>
                  {isFetchingFee ? (
                    this.loaderShow()
                  ) : !selectedFees.length ? (
                      this.noFees()
                  ) : (
                  <Paper elevation={1} className="mr-1">
                    { selectedFees.map((item, index) => {
                      return <FeesCell
                                index={index}
                                item={item}
                                tenantsByDomain={this.props.tenantsByDomain}
                                match={this.props.match}
                              />
                        })}
                  </Paper>
                  )}

                  <Menu id="long-menu"
                    anchorEl={anchorElFee}
                    open={menuStateFee}
                    onClose={this.handleRequestCloseFee}

                    MenuListProps={{
                        style: {
                            width: 150,
                        },
                    }}>
                    <MenuItem key={'options'} onClick={this.openCreateFeeForm(true)}>
                      <IntlMessages id="pages.ticketTypesPage.feesAndTaxes.btn.add_new_fee" />
                    </MenuItem>
                    <MenuItem key={'options'} onClick={this.openAddFeeForm(true)}>
                      <IntlMessages id="pages.ticketTypesPage.feesAndTaxes.btn.add_existing_fee" />
                    </MenuItem>
                  </Menu>
                </div>
                <div>
                  <div className="mb-3 d-flex justify-content-between">
                    <Typography className="" variant="headline" color="textSecondary">
                      <IntlMessages id="pages.ticketTypesPage.feesAndTaxes.label.taxes_title" />
                    </Typography>

                    {!(selectedTaxGroup.length > 0) ?
                    <div className="d-flex">
                      <Button type="submit" onClick={this.openCopyForm(true, 'taxes')} className="mr-2" variant="raised" color="primary">
                        <IntlMessages id="pages.ticketTypesPage.feesAndTaxes.btn.copyTaxGroup" />
                      </Button>
                      <Button type="submit" onClick={this.openOptionMenuTax} className="mr-1" variant="raised" color="primary">
                        <IntlMessages id="pages.ticketTypesPage.feesAndTaxes.btn.add_tax_group" />
                      </Button>
                    </div>
                       : ''}
                  </div>
                  <div className="contact-main-content ">
                    {isFetchingTaxGroup || !tenantId ? (
                      this.loaderShow()
                    ) : !selectedTaxGroup.length ? (
                      this.noTaxGroup()
                    ) : (
                      <Paper elevation={1} className="mr-1">
                      {selectedTaxGroup.map((item, index) => {
                        return (
                          <TaxGroupCell
                            index={index}
                            item={item}
                            tenantsByDomain={this.props.tenantsByDomain}
                            match={this.props.match}
                          />
                        );
                      })}
                    </Paper>
                    )}
                  </div>

                    <Menu id="long-menu"
                      anchorEl={anchorElTax}
                      open={menuStateTax}
                      onClose={this.handleRequestCloseTax}

                      MenuListProps={{
                          style: {
                              width: 220,
                          },
                      }}>
                      <MenuItem key={'options'} onClick={this.openCreateTaxGroupForm(true)}>
                        <IntlMessages id="pages.ticketTypesPage.feesAndTaxes.btn.add_new_tax_group" />
                      </MenuItem>
                      <MenuItem key={'options'} onClick={this.openAddTaxGroupForm(true)}>
                        <IntlMessages id="pages.ticketTypesPage.feesAndTaxes.btn.add_existing_tax_group" />
                      </MenuItem>
                    </Menu>
                </div>
              </div>
            </CustomScrollbars>
          </div>
        </div>
        <AddFee selectedFees={this.props.Fees.items} match={this.props.match} showForm={this.state.showFeeForm} closeForm={this.openAddFeeForm(false)} onCloseFeesForm={this.onCloseFeesForm} />

        <AddTaxGroup match={this.props.match} showForm={this.state.showTaxGroupForm} closeForm={this.openAddTaxGroupForm(false)} onCloseTaxGroupForm={this.onCloseTaxGroupForm} />

        <FeesForm match={this.props.match} showForm={this.state.showCreateFeeForm} closeForm={this.openCreateFeeForm(false)} />

        <TaxGroupForm match={this.props.match} showForm={this.state.showCreateTaxGroupForm} closeForm={this.openCreateTaxGroupForm(false)} tenantsByDomain={this.props.tenantsByDomain} />

        <TaxRateForm match={this.props.match} showForm={this.state.showTaxRateForm && showTaxRate} closeForm={this.openTaxRateForm(false)} taxGroup={newGroup} resetData={true} tenantsByDomain={this.props.tenantsByDomain} />

        <CopyFeesTaxes
          match={this.props.match}
          showForm={this.state.showCopyForm}
          closeForm = {this.openCopyForm(false)}
          tenantsByDomain={this.props.tenantsByDomain}
          copyType = {this.state.copyType}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ settings, tenants, taxes, taxRate, fees, ticketTypes }) => {
  return {
    width: settings.width,
    tenantsByDomain: tenants.tenantsByDomain,
    newGroup: taxes.get('newGroup').toJS(),
    newTaxRate: taxRate.get('newTaxRate').toJS(),
    newFees: fees.get('newFees').toJS(),
    actionLoader: ticketTypes.get('actionLoader'),
    refetchTaxGroup: ticketTypes.get('refetchTaxGroup'),
    Fees: ticketTypes.get('fees').toJS(),
    taxGroup: ticketTypes.get('taxGroup').toJS(),
    ticketTypesList: ticketTypes.get('ticketTypesList').toJS(),
    isFetchingFee: ticketTypes.get('isFetchingFee'),
    isFetchingTaxGroup: ticketTypes.get('isFetchingTaxGroup'),
    refetchFees: ticketTypes.get('refetchFees'),
    currTicketType: ticketTypes.get('ticketType').toJS(),
  };
};

export default connect(
  mapStateToProps,
  {
    fetchInventory,
    addFees,
    addTaxGroup,
    fetchFees,
    fetchTaxGroup,
    fetchTicketType
  },
)(FeesAndTaxes);
