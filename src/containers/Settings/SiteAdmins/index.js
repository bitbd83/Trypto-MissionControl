/**
 *
 * siteAdmins
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import CircularProgress from '@material-ui/core/CircularProgress';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import CustomScrollbars from 'util/CustomScrollbars';
import IntlMessages from 'util/IntlMessages';
import AppModuleHeader from 'components/AppModuleHeader/index';
import Pagination from 'components/Pagination';
import InnerSidebar from '../../InnerSidebar';
import CardBox from 'components/CardBox/index';
import AdminsCell from './components/AdminsCell';
import AdminsForm from './components/AdminsForm';
import { fetchSiteAdmins, putSiteAdmin } from './actions';

class SiteAdmins extends React.Component {
  constructor() {
    super();
    this.state = {
      showForm: false,
      editForm: false,
      editData: {},
      editIndex: 0,
      searchText: '',
      drawerState: false,
      rowsPerPage: 10,
      page: 0,
      skipPaging: false,
      inactive: false,
      archived: false,
      selectedMenu: '',
    };
  }
  componentDidMount = () => {
    this.getAllAdmins();
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.refetchList) {
      this.setState({showForm:false})
      this.getAllAdmins();
    }
  };

  handleChangePage = page => {
    this.setState({ page: page ? page : 0 }, () => this.getAllAdmins());
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value, page: 0 }, () => this.getAllAdmins());
  };

  handleChange = name => event => this.setState({ [name]: event.target.value });

  onToggleDrawer() {
    this.setState({
      drawerState: !this.state.drawerState,
    });
  }

  handleSwitchChange = name => {
    this.setState(
      {
        [name]: !this.state[name],
      },
      () => this.getAllAdmins(),
    );
  };

  getAllAdmins = () => {
    const { page, rowsPerPage, skipPaging, inactive, archived } = this.state;
    const skip = page * rowsPerPage;
    const take = rowsPerPage;
    const { organizationId } = this.props.tenantsByDomain
    this.props.fetchSiteAdmins({organizationId, skipPaging, skip, take, inactive, archived });
  };

  openAdminsForm = status => event => {
    this.setState({ showForm: status, editForm: false, editData: {}, editIndex: 0 });
  };

  openEditAdminsForm = (data, index) => event => {
    this.setState({ showForm: true, editForm: true, editData: data, editIndex: index });
  };

  handleStatusChange = (action, userId) => {
    const { organizationId } = this.props.tenantsByDomain;
    this.props.putSiteAdmin({ userId, organizationId, action });
  };

  handleMenu = selectedMenu => event => {
    if (selectedMenu === 'archived') {
      this.setState({ archived: true, selectedMenu, inactive: false }, () => this.getAllAdmins());
    } else if(selectedMenu === 'inactive'){
      this.setState({ archived: false, selectedMenu, inactive: true }, () => this.getAllAdmins(true));
    } else {
      this.setState({archived: false, selectedMenu, inactive: false}, () => this.getAllAdmins())
    }
  };

  listAdmins = items => {
    return items.map((item, index) => (
        <AdminsCell
          item={item}
          index={index}
          key={index}
          tenantsByDomain={this.props.tenantsByDomain}
          editGroup={this.openEditAdminsForm(item, index)}
          changeStatus={this.handleStatusChange}
        />
      ));
  };

  noAdmins = () => (
    <div className="row">
      <CardBox styleName="col-12 text-center" heading={<IntlMessages id="containers.Settings.SiteAdmins.label.noAdminsTitle" />} childrenStyle="text-center">
        <p>
          <IntlMessages id="containers.Settings.SiteAdmins.label.noAdminsDesc" />
        </p>
      </CardBox>
    </div>
  );

  showLoader = () => (
    <div className="d-flex justify-content-center align-items-center mt-5 animated slideInUpTiny animation-duration-3">
      <div className="loader-view">
        <CircularProgress />
      </div>
    </div>
  );

  AdminsSideBar = () => {
    return (
      <InnerSidebar
        width={this.props.width}
        heading={<IntlMessages id="containers.Settings.SiteAdmins.title" />}
        addButtonTxt={<IntlMessages id="containers.Settings.SiteAdmins.btn.addSiteAdmins" />}
        addBtnClick={this.openAdminsForm(true)}
        onSelect={this.handleMenu}
        selected={this.state.selectedMenu}
        allTxt= {<IntlMessages id="containers.Settings.SiteAdmins.label.allText" />}
        icon={<i className="zmdi zmdi-accounts zmdi-hc-lg mr-4" />}
      />
    );
  };

  render() {
    const { searchText, page, rowsPerPage, showForm, editForm, editData } = this.state;
    const { isFetching, siteAdmins, tenantsByDomain } = this.props;
    let content = this.showLoader();
    if (!isFetching && siteAdmins) {
      if (siteAdmins.items.length) {
        content = this.listAdmins(siteAdmins.items);
      } else {
        content = this.noAdmins();
      }
    }
    return (
      <div className="app-wrapper">
        <Helmet>
          <title>Site Admins</title>
          <meta name="description" content="Description of PaymentProcessors" />
        </Helmet>
        <div className="animated slideInUpTiny animation-duration-3">
          <div className="app-module">
            <div className="d-block d-xl-none">
              <Drawer open={this.state.drawerState} onClose={this.onToggleDrawer.bind(this)}>
                {this.AdminsSideBar()}
              </Drawer>
            </div>
            <div className="app-module-sidenav d-none d-xl-flex">{this.AdminsSideBar()}</div>
            <div className="module-box">
              <div className="module-box-header">
                <IconButton className="drawer-btn d-block d-xl-none" aria-label="Menu" onClick={this.onToggleDrawer.bind(this)}>
                  <i className="zmdi zmdi-menu" />
                </IconButton>
                {/* <AppModuleHeader
                  placeholder= "Search Site Admins"
                  onChange={this.handleChange('searchText')}
                  value={searchText} /> */}
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
              <Pagination
                colspan={3}
                totalPages={siteAdmins.totalPages}
                count={siteAdmins.totalCount}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                name={<IntlMessages id="containers.Settings.SiteAdmins.title" />}
                styleName={'position-absolute fixed-bottom ml-0'}
              />
            </div>
          </div>
        </div>
        <AdminsForm
          showForm={showForm}
          closeForm={this.openAdminsForm(false)}
          edit={editForm}
          data={editData}
          tenantsByDomain={tenantsByDomain}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ tenants, paymentprocessors, settings, siteadmins }) => {
  const { tenantsByDomain } = tenants;
  return {
    isFetching: siteadmins.get('isFetching'),
    refetchList: siteadmins.get('refetchList'),
    siteAdmins: siteadmins.get('siteAdmins').toJS(),
    tenantsByDomain,
    width: settings.width,
  };
};

export default connect(
  mapStateToProps,
  { fetchSiteAdmins, putSiteAdmin },
)(SiteAdmins);
