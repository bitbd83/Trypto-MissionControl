/**
 *
 * Venues
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import IntlMessages from 'util/IntlMessages';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { listVenues, getVenueByIdClear, addUpdateVenueState, putVenueById } from './actions';
import { hideMessage } from 'containers/Events/CreateAnEvent/actions';
import ContainerHeader from 'components/ContainerHeader/index';
import CustomScrollbars from 'util/CustomScrollbars';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import Drawer from '@material-ui/core/Drawer';
import Switch from '@material-ui/core/Switch';
import AppModuleHeader from 'components/AppModuleHeader/index';
import InnerSidebar from '../InnerSidebar';
import VenuesListItem from 'components/Venues/VenuesListItem/index';
import Pagination from 'components/Pagination';
import VenuesDrawer from 'components/Venues/VenuesDrawer/index';
import CardBox from 'components/CardBox/index';

class Venues extends React.Component {
  constructor() {
    super();
    this.state = {
      showForm: false,
      skipPaging: false,
      rowsPerPage: 10,
      page: 0,
      archived: false,
      flag: 1,
      searchText: '',
      drawerState: false,
      selectedMenu: '',
    };
  }

  componentDidMount() {
    this.getAllVenues();
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.putVenue !== undefined || nextProps.postedVenue !== undefined) {
      this.getAllVenues();
    }
  };

  handleChangePage = page => {
    this.setState({  page: page ? page : 0 }, () => this.getAllVenues());
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value, page: 0 }, () => this.getAllVenues());
  };

  archivedChange() {
    this.setState({ archived: !this.state.archived }, () => this.getAllVenues());
  }

  onToggleDrawer() {
    this.setState({
      drawerState: !this.state.drawerState,
    });
  }

  getAllVenues = () => {
    const { page, rowsPerPage, skipPaging, archived } = this.state;
    var tenantId = this.props.tenantsByDomain.id;
    const skip = page * rowsPerPage;
    const take = rowsPerPage;
    this.props.listVenues({ tenantId, skipPaging, skip, take, archived });
  };

  hiddenForm = status => event => {
    this.setState({ showForm: status, flag: 1 });
    this.props.getVenueByIdClear();
    if (!status) this.props.addUpdateVenueState(false);
  };

  handleStatusChange = (action, venueId) => {
    this.props.putVenueById({ venueId, action });
  };

  addNewButton() {
    this.props.getVenueByIdClear();
    this.props.addUpdateVenueState(false);
    this.setState({ showForm: true, flag: 1 });
  }

  handleChange = name => event => this.setState({ [name]: event.target.value });

  handleMenu = selectedMenu => event => {
    if (selectedMenu === 'archived') {
      this.setState({ archived: true, selectedMenu }, () => this.getAllVenues());
    } else {
      this.setState({ archived: false, selectedMenu }, () => this.getAllVenues(true));
    }
  };

  NoVenuesList = () => {
    return (
      <div className="row m-4">
        <CardBox styleName="col-12 text-center" heading={<IntlMessages id="containers.Venues.noVenuesListTxt" />} childrenStyle="text-center">
          <div>
            <p><IntlMessages id="containers.Venues.addNewVenueTxt" /></p>
          </div>
        </CardBox>
      </div>
    );
  };

  listedVenues(items) {
    const { tenantsByDomain } = this.props;
    let { searchText, archived } = this.state;
    return items
      .filter(item => item.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1)
      .map((item, index) => (
        <VenuesListItem key={item.id} tenantsByDomain={tenantsByDomain} venuesItems={item} archived={archived} showForm={this.hiddenForm(true)} changeStatus={this.handleStatusChange} />
      ));
  }

  showLoader = () => (
    <div className="d-flex justify-content-center align-items-center mt-5 animated slideInUpTiny animation-duration-3">
      <div className="loader-view">
        <CircularProgress />
      </div>
    </div>
  );

  PaymentSideBar = () => {
    return (
      <InnerSidebar
        width={this.props.width}
        heading={<IntlMessages id="containers.Venues" />}
        addButtonTxt={<IntlMessages id="containers.Venues.addNewVenue" />}
        addBtnClick={() => this.addNewButton()}
        onSelect={this.handleMenu}
        selected={this.state.selectedMenu}
        allTxt="All Venues"
        icon={<i className="zmdi zmdi-view-list zmdi-hc-lg mr-4" />}
        useFilters = {['archived']}
      />
    );
  };

  render() {
    const { loader, venuesList, tenantsByDomain } = this.props;
    const { showForm, skipPaging, rowsPerPage, page, archived, searchText } = this.state;
    let content = this.showLoader();
    if (!loader && venuesList && Object.keys(venuesList).length > 0) {
      if (venuesList.items.length) {
        content = this.listedVenues(venuesList.items);
      } else {
        content = this.NoVenuesList();
      }
    }
    return (
      <div className="app-wrapper">
        <Helmet>
          <title>Venues</title>
          <meta name="description" content="Description of Venues" />
        </Helmet>
        <div className="animated slideInUpTiny animation-duration-3">
          <div className="app-module">
            <div className="d-block d-xl-none">
              <Drawer open={this.state.drawerState} onClose={this.onToggleDrawer.bind(this)}>
                {this.PaymentSideBar()}
              </Drawer>
            </div>
            <div className="app-module-sidenav d-none d-xl-flex">{this.PaymentSideBar()}</div>
            <div className="module-box">
              <div className="module-box-header">
                <IconButton className="drawer-btn d-block d-xl-none" aria-label="Menu" onClick={this.onToggleDrawer.bind(this)}>
                  <i className="zmdi zmdi-menu" />
                </IconButton>
                <AppModuleHeader placeholder="Search Venues" onChange={this.handleChange('searchText')} value={searchText} />
              </div>
              <div className="module-box-content">
                <CustomScrollbars
                  className="module-list-scroll scrollbar"
                  style={{
                    height: this.props.width >= 1200 ? 'calc(100vh - 200px)' : 'calc(100vh - 130px)',
                  }}>
                  {content}
                </CustomScrollbars>
              </div>
              {venuesList &&
                Object.keys(venuesList).length > 0 && (
                  <Pagination
                    colspan={3}
                    totalPages={venuesList.totalPages}
                    count={venuesList.totalCount}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    name={<IntlMessages id="containers.Venues" />}
                    styleName={'position-absolute fixed-bottom ml-0'}
                  />
                )}
            </div>
          </div>
        </div>
        <VenuesDrawer showForm={showForm} hiddenForm={this.hiddenForm(false)} />
      </div>
    );
  }
}

const mapStateToProps = ({ tenants, venues, createanevent, settings }) => {
  const { tenantsByDomain } = tenants;
  const { loader, venuesList, putVenue, postedVenue } = venues;
  const { alertMessage, showMessage } = createanevent;
  return { tenantsByDomain, loader, venuesList, alertMessage, showMessage, putVenue, postedVenue, width: settings.width };
};

export default connect(
  mapStateToProps,
  { listVenues, getVenueByIdClear, addUpdateVenueState, hideMessage, putVenueById },
)(Venues);
