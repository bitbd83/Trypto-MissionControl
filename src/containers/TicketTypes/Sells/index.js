import React from 'react';
import TicketSidebar from '../Sidebar';
import CustomScrollbars from 'util/CustomScrollbars';
import { connect } from 'react-redux';
import IntlMessages from 'util/IntlMessages';
import Button from '@material-ui/core/Button';
import { fetchInventory, addFees, addTaxGroup, fetchFees, fetchTaxGroup, deleteFees, deleteTaxGroup, fetchTicketType } from '../actions';
import { fetchCrossSells, fetchUpSells } from './actions'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import AddCross from './Cross/AddCross';
import AddUp from './Up/AddUp';
import CircularProgress from '@material-ui/core/CircularProgress';
import CrossCell from './Cross/CrossCell'
import UpCell from './Up/UpCell'
import Paper from '@material-ui/core/Paper';


class Sells extends React.Component {
  constructor() {
    super();
    this.state = {
      inventoryType: 'dedicated',
      showCrossForm: false,
      showUpForm: false,
      selectedCross: [],
      selectedUp: {},
      anchorElCross: undefined,
      menuStateCross: false,
      menuStateTax: false
    };
  }

  componentDidMount() {
    const { ticketTypeId, eventId } = this.props.match.params;
    const tenantId  = this.props.tenantsByDomain.id
    this.getCross();
   this.getUpSells();
   this.props.fetchTicketType({tenantId, eventId, ticketTypeId});
  }

  getUpSells = () => {
    const { eventId, ticketTypeId } = this.props.match.params;
    const tenantId  = this.props.tenantsByDomain.id
    this.props.fetchUpSells({
      tenantId,
      ticketTypeId,
      eventId,
    });
  };

  getCross = () => {
    const { eventId, ticketTypeId } = this.props.match.params;
    const tenantId  = this.props.tenantsByDomain.id
    this.props.fetchCrossSells({
      tenantId,
      eventId,
      ticketTypeId
    });
  };

  componentWillReceiveProps(nextProps) {
    const { eventId, ticketTypeId } = this.props.match.params;

    if (this.state.submit && !nextProps.actionLoader) {
      this.props.history.push(`/app/events/${eventId}/ticket-types/${ticketTypeId}/options`);
    }

    if (nextProps.refetchUp) {
      this.  getUpSells();
    }

    if (nextProps.refetchCross) {
      this.getCross();
    }

    if (nextProps.newTaxRate.id !== undefined) {
      const selectedUp = [nextProps.newTaxRate];
      this.setState({
        selectedUp,
      });
    }


  if (nextProps.Cross.items) {
    this.setState({selectedCross: nextProps.Cross.items})
  }

  if(nextProps.Up.items){
    this.setState({selectedUp: nextProps.Up.items})
  }

}

  onCloseUpForm = selectedUp => {
    this.setState({
      selectedUp: [selectedUp],
    });
  };

  handleChange = name => event => {
    this.setState({
      inventoryType: name,
    });
  };

  openAddCrossForm = status => event => {
    this.setState({
      showCrossForm: status,
    });
  };

  openCreateFeeForm = status => event => {
    const { eventId, ticketTypeId } = this.props.match.params;
    const { newFees } = this.props
    if(status === false && newFees.id){
      const data ={ids: [ newFees.id]}
    }
    this.setState({
      showCreateFeeForm: status,
    });
  };

  openAddUpForm = status => event => {
    this.handleRequestCloseTax();
    this.setState({
      showUpForm: status,
    });
  };

  openCreateTaxGroupForm = status => event => {
    this.handleRequestCloseTax();
       this.setState({
      showCreateTaxGroupForm: status,
      showTaxRateForm: !status ? true : false,
    });
  };

  handleRequestCloseTax = () => {
    this.setState({menuStateTax: false});
  };

  loaderShow = () => {
    return (
      <div className="d-flex justify-content-center">
        {' '}
        <CircularProgress size={40} />
      </div>
    );
  };

  noCrossSells = () => {
    return   <div className="contact-main-content mr-1">
                <Card className="d-flex mr-3 justify-content-center w-100">
                  <CardContent className="d-flex justify-content-center align-items-center flex-column">
                    <Typography className="mt-3 font-weight-bold" variant="subheading" color="textSecondary">
                      <IntlMessages id="pages.ticketTypesPage.Sells.label.crossSell_description" />
                      <br />
                    </Typography>
                  </CardContent>
                </Card>
            </div>
  }

  noUpSells = () => {
    return <div className="contact-main-content mr-1">
    <Card className="d-flex mr-3 justify-content-center w-100">
      <CardContent className="d-flex justify-content-center align-items-center flex-column">
        <Typography className="mt-3 font-weight-bold text-center" variant="subheading" color="textSecondary">
          <IntlMessages id="pages.ticketTypesPage.Sells.label.UpSell_description" />
        </Typography>
      </CardContent>
    </Card>
    </div>
  }

  render() {
    const { selectedCross, selectedUp, } = this.state;
    const { isFetchingCross, isFetchingUp, ticketTypesList, Cross, tenantsByDomain, currTicketType } = this.props;
    const tenantId = tenantsByDomain.id;
    const { eventId, ticketTypeId } = this.props.match.params;

    let ticketTypeName = '';
    if(currTicketType !== undefined) {
      if(currTicketType.name !== undefined){
        ticketTypeName = currTicketType.name;
      }
    }

    return (
      <div className="app-module animated slideInUpTiny animation-duration-3">
        <div className="app-module-sidenav d-none d-xl-flex">
          <TicketSidebar
            eventId={eventId}
            width={this.props.width}
            currType = {"Manage Fees & Taxes"}
            ticketTypeId = {ticketTypeId}
            heading={<IntlMessages id="pages.ticketTypesPage.Sells.label.sidebar_heading" />}
            history={this.props.history}
            optionType="Sells"
            backLink={{url: `/app/events/${eventId}/ticket-types/${ticketTypeId}/options`, label: <IntlMessages id="pages.ticketTypesPage.feesAndTaxes.backTicketOptions" />}}
          />
        </div>
        <div className="module-box">
          <div className="module-box-header">
            <h2 className="mb-1 mt-1">
              <IntlMessages id="pages.ticketTypesPage.Sells.title" /> -  {ticketTypeName}
            </h2>
            <p className="m-0">
              <IntlMessages id="pages.ticketTypesPage.Sells.description" />
            </p>
          </div>
          <div className="module-box-content hotel-main-content p-0">
            <CustomScrollbars className="module-list-scroll scrollbar" style={{ height: this.props.width >= 1200 ? 'calc(100vh - 150px)' : 'calc(100vh - 130px)' }}>
              <div className="p-4">
                <div className="mb-5">
                  <div className="mb-3 d-flex justify-content-between">
                    <Typography className="" variant="headline" color="textSecondary">
                      <IntlMessages id="pages.ticketTypesPage.Sells.label.crossSell_title" />
                    </Typography>

                    <Button type="submit" onClick={this.openAddCrossForm(true)} className="mr-1" variant="raised" color="primary">
                      <IntlMessages id="pages.ticketTypesPage.Sells.btn.add_CrossSells" />
                    </Button>
                  </div>

                    {isFetchingCross ? (
                      this.loaderShow()
                    ) : !selectedCross.length ? (
                        this.noCrossSells()
                    ) : (
                      <Paper elevation={1} className="mr-1">
                        { selectedCross.map((item, index) => {
                          return <CrossCell
                                    index={index}
                                    item={item}
                                    match={this.props.match}
                                    tenantsByDomain={this.props.tenantsByDomain}
                                  />
                        })}
                    </Paper>
                    )}
                </div>
                <div>
                  <div className="mb-3 d-flex justify-content-between">
                    <Typography className="" variant="headline" color="textSecondary">
                      <IntlMessages id="pages.ticketTypesPage.Sells.label.up_title" />
                    </Typography>
                    <Button type="submit" onClick={this.openAddUpForm(true)} className="mr-1" variant="raised" color="primary">
                      <IntlMessages id="pages.ticketTypesPage.Sells.btn.add_upSells" />
                    </Button>
                  </div>
                  <div className="contact-main-content ">
                    {isFetchingUp || !tenantId ? (
                      this.loaderShow()
                    ) : !selectedUp.length ? (
                      this.noUpSells()
                    ) : (
                      <Paper elevation={1} className="mr-1">
                      {selectedUp.map((item, index) => {
                        return (
                          <UpCell
                            index={index}
                            item={item}
                            match={this.props.match}
                            tenantsByDomain={this.props.tenantsByDomain}
                          />
                        );
                      })}
                    </Paper>
                    )}
                  </div>
                </div>
              </div>
            </CustomScrollbars>
          </div>
        </div>
        <AddCross
          selectedCross={this.props.Cross.items}
          match={this.props.match}
          showForm={this.state.showCrossForm}
          closeForm={this.openAddCrossForm(false)}
        />

        <AddUp
          match={this.props.match}
          showForm={this.state.showUpForm}
          closeForm={this.openAddUpForm(false)}
          onCloseUpForm={this.onCloseUpForm}
          selectedUp = {this.props.Up.items}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ settings, tenants, taxRate, fees, ticketTypes, sells }) => {
  return {
    width: settings.width,
    tenantsByDomain: tenants.tenantsByDomain,
    newTaxRate: taxRate.get('newTaxRate').toJS(),
    newFees: fees.get('newFees').toJS(),
    actionLoader: sells.get('actionLoader'),
    refetchUp: sells.get('refetchUp'),
    Cross: sells.get('crossSells').toJS(),
    Up: sells.get('upSells').toJS(),
    ticketTypesList: ticketTypes.get('ticketTypesList').toJS(),
    isFetchingCross: sells.get('isFetchingCross'),
    isFetchingUp: sells.get('isFetchingUp'),
    refetchCross: sells.get('refetchCross'),
    currTicketType: ticketTypes.get('ticketType').toJS(),
  };
};

export default connect(
  mapStateToProps,
  {
    fetchInventory,
    addFees,
    fetchTicketType,

    fetchCrossSells,
    fetchUpSells

  },
)(Sells);
