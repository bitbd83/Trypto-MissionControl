import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import { connect } from 'react-redux';
import IntlMessages from 'util/IntlMessages';
import CustomScrollbars from 'util/CustomScrollbars';
import AppModuleHeader from 'components/AppModuleHeader/index';
import { fetchTicketTypes, putTicketType, switchTicketSale, cloneTickets } from '../actions';
import CircularProgress from '@material-ui/core/CircularProgress';
import TicketCell from './TicketsList/TicketCell';
import { NotificationContainer } from 'react-notifications';
import TicketSidebar from '../Sidebar';
import CopyTicketForm from './CopyTicketForm'
import CardBox from 'components/CardBox/index';
import Typography from '@material-ui/core/Typography';

const filterOptions = [
  {
    id: 1,
    title: 'Active Only',
    handle: 'activeOnly',
    icon: 'menu',
  },
  {
    id: 2,
    title: 'Show Archived',
    handle: 'archived',
    icon: 'time-restore',
  },
];

class TicketTypes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
      searchText: '',
      selectedSectionId: 1,
      drawerState: false,
      searchUser: '',
      archived: false,
      selectedFilter: 'activeOnly'
    };
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.refetchTicketType){
      if(this.state.showForm){
        this.setState({showForm: false})
      }
      this.getTicketTypeList();
    }
  }

  handleFilter = (selectedFilter) => event => {
    if(selectedFilter === 'archived'){
      this.setState({selectedFilter, archived: true}, () => this.getTicketTypeList())
    }else{
      this.setState({selectedFilter, archived: false}, () => this.getTicketTypeList())
    }
  }

  componentDidMount() {
    this.getTicketTypeList();
  }

  getTicketTypeList = () => {
    let eventId = this.props.match.params.eventId;
    const tenantId  = this.props.tenantsByDomain.id
    const { archived, searchText } = this.state;
    this.props.fetchTicketTypes({ tenantId, eventId, archived, searchText });
  };

  openCopyTicketForm = (status) => event => {
    this.setState({showForm: status});
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value }, () => this.getTicketTypeList());
  }

  handleStatusChange = (action, ticketTypeId) => {
    const { eventId } = this.props.match.params;
    const tenantId  = this.props.tenantsByDomain.id
    if(['on-sale', 'off-sale', 'hide', 'show'].indexOf(action) !== -1){
      this.props.switchTicketSale({ tenantId, eventId, ticketTypeId, action })
    }else{
      this.props.putTicketType({ tenantId, eventId, ticketTypeId, action});
    }
  }

  cloneTicket = (ticketTypeId) => {
    const { eventId } = this.props.match.params;
    const tenantId = this.props.tenantsByDomain.id;
    this.props.cloneTickets({tenantId, eventId, ticketTypeId})
  }

  noTicketTypes = () => (
    <div className="row p-4">
      <CardBox styleName="col-12 text-center" heading={<IntlMessages id="pages.events.ticketTypes.title.noTicketType" />} childrenStyle="text-center">
        <div>
          <p><IntlMessages id="pages.events.ticketTypes.description.noTicketType" /></p>
        </div>
      </CardBox>
    </div>
  );

  showLoader = () => (
    <div className="d-flex justify-content-center mt-4">
      <CircularProgress />
    </div>
  );

  listTicketTyps = items => {
    let { searchText } = this.state;
    return items.filter(item => item.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1).map((item, index) => {
      return <TicketCell
        item={item}
        index={index}
        path={this.props.match.url}
        match={this.props.match}
        changeStatus={this.handleStatusChange}
        cloneTicket = {this.cloneTicket}
        />;
    });
  };

  render() {
    const { user, searchText, selectedFilter } = this.state;
    const { isFetching, ticketsTypesList, rowsPerPage, page } = this.props;
    let content = this.showLoader();
    if (!isFetching && ticketsTypesList.items) {
      if (ticketsTypesList.items.length) {
        content = this.listTicketTyps(ticketsTypesList.items);
      } else {
        content = this.noTicketTypes();
      }
    }
    const { eventId, ticketTypeId } = this.props.match.params;
    return (
      <div className="app-module animated slideInUpTiny animation-duration-3">
        <div className="app-module-sidenav d-none d-xl-flex">
          <TicketSidebar
            eventId={eventId}
            ticketTypeId={ticketTypeId}
            currType="Manage Ticket Types"
            width={this.props.width}
            heading={ <IntlMessages id="pages.ticketTypesPage.title" />}
            history={this.props.history}
            filterOptions={filterOptions}
            optionType="event"
            selectedFilter = {selectedFilter}
            onSelect={this.handleFilter}
            onCopyTicket={this.openCopyTicketForm(true)}
            backLink={{url: `/app/events/${eventId}/options`, label: <IntlMessages id="pages.ticketTypesPage.backEventOptions" />}}
          />
        </div>

        <div className="module-box">
          <div className="module-box-header">
            <IconButton className="drawer-btn d-block d-xl-none" aria-label="Menu">
              <i className="zmdi zmdi-menu" />
            </IconButton>
            <AppModuleHeader
              placeholder="Search Tickets"
              onChange={this.handleChange('searchText')}
              value={searchText}
            />
          </div>
          <div className="module-box-content">
            <CustomScrollbars
              className="module-list-scroll scrollbar"
              style={{
                height: this.props.width >= 1200 ? 'calc(100vh - 150px)' : 'calc(100vh - 180px)',
              }}>
              {content}
            </CustomScrollbars>
          </div>
        </div>
        <NotificationContainer />
        <CopyTicketForm
          showForm={this.state.showForm}
          closeForm={this.openCopyTicketForm(false)}
          tenantsByDomain = {this.props.tenantsByDomain}
          match={this.props.match}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ ticketTypes, settings, tenants, eventoptions }) => {
  const { tenantsByDomain } = tenants;
  const { optionsLoader, options } = eventoptions;
  return {
    width: settings.width,
    isFetching: ticketTypes.get('isFetching'),
    refetchList: ticketTypes.get('refetchList'),
    ticketsTypesList: ticketTypes.get('ticketTypesList').toJS(),
    refetchTicketType: ticketTypes.get('refetchTicketType'),
    tenantsByDomain,
    optionsLoader,
    options
  };
};

export default connect(
  mapStateToProps,
  { fetchTicketTypes, putTicketType, switchTicketSale, cloneTickets },
)(TicketTypes);
