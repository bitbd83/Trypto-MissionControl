/**
 *
 * PaymentProcessors
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
import PaymentProcessorsCell from './components/PaymentProcessorsCell';
import PaymentProcessorsForm from './components/PaymentProcessorsForm';
import { listPaymentProcessors, putPaymentProcessor } from './actions';

class PaymentProcessors extends React.Component {
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
    this.getAllPaymentProcessors();
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.refetchList) {
      this.getAllPaymentProcessors();
    }
  };

  handleChangePage = page => {
    this.setState({ page: page ? page : 0 }, () => this.getAllPaymentProcessors());
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value, page: 0 }, () => this.getAllPaymentProcessors());
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
      () => this.getAllPaymentProcessors(),
    );
  };

  getAllPaymentProcessors = () => {
    const { page, rowsPerPage, skipPaging, inactive, archived } = this.state;
    const skip = page * rowsPerPage;
    const take = rowsPerPage;
    this.props.listPaymentProcessors({ skipPaging, skip, take, inactive, archived });
  };

  openPaymentProcessorsForm = status => event => {
    this.setState({ showForm: status, editForm: false, editData: {}, editIndex: 0 });
  };

  openEditPaymentProcessorsForm = (data, index) => event => {
    this.setState({ showForm: true, editForm: true, editData: data, editIndex: index });
  };

  handleStatusChange = (action, paymentProcessorsId) => {
    this.props.putPaymentProcessor({ processorId: paymentProcessorsId, action });
  };

  handleMenu = selectedMenu => event => {
    if (selectedMenu === 'archived') {
      this.setState({ archived: true, selectedMenu, inactive: false }, () => this.getAllPaymentProcessors());
    } else if(selectedMenu === 'inactive'){
      this.setState({ archived: false, selectedMenu, inactive: true }, () => this.getAllPaymentProcessors(true));
    } else {
      this.setState({archived: false, selectedMenu, inactive: false}, () => this.getAllPaymentProcessors())
    }
  };

  listPaymentProcessor = items => {
    let { searchText } = this.state;
    return items
      .filter(item => item.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1)
      .map((item, index) => (
        <PaymentProcessorsCell
          item={item}
          index={index}
          key={index}
          tenantsByDomain={this.props.tenantsByDomain}
          editGroup={this.openEditPaymentProcessorsForm(item, index)}
          changeStatus={this.handleStatusChange}
        />
      ));
  };

  noPayment = () => (
    <div className="row">
      <CardBox styleName="col-12 text-center" heading={<IntlMessages id="containers.Settings.PaymentProcessors.noPaymentTitle" />} childrenStyle="text-center">
        <p>
          <IntlMessages id="containers.Settings.PaymentProcessors.noPaymentDesc" />
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

  PaymentSideBar = () => {
    return (
      <InnerSidebar
        width={this.props.width}
        heading={<IntlMessages id="containers.Settings.PaymentProcessors.processors" />}
        addButtonTxt={<IntlMessages id="containers.Settings.PaymentProcessors.addProcessor" />}
        addBtnClick={this.openPaymentProcessorsForm(true)}
        onSelect={this.handleMenu}
        selected={this.state.selectedMenu}
        allTxt="All Processors"
        icon={<i className="zmdi zmdi-paypal zmdi-hc-lg mr-4" />}
      />
    );
  };

  render() {
    const { searchText, page, rowsPerPage, showForm, editForm, editData } = this.state;
    const { isFetching, paymentProcessors, tenantsByDomain } = this.props;
    let content = this.showLoader();
    if (!isFetching && paymentProcessors) {
      if (paymentProcessors.items.length) {
        content = this.listPaymentProcessor(paymentProcessors.items);
      } else {
        content = this.noPayment();
      }
    }
    return (
      <div className="app-wrapper">
        <Helmet>
          <title>PaymentProcessors</title>
          <meta name="description" content="Description of PaymentProcessors" />
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
                <AppModuleHeader placeholder="Search Processors" onChange={this.handleChange('searchText')} value={searchText} />
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
                totalPages={paymentProcessors.totalPages}
                count={paymentProcessors.totalCount}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                name={<IntlMessages id="containers.Settings.PaymentProcessors.processors" />}
                styleName={'position-absolute fixed-bottom ml-0'}
              />
            </div>
          </div>
        </div>
        <PaymentProcessorsForm showForm={showForm} closeForm={this.openPaymentProcessorsForm(false)} edit={editForm} data={editData} tenantsByDomain={tenantsByDomain} />
      </div>
    );
  }
}

const mapStateToProps = ({ tenants, paymentprocessors, settings }) => {
  const { tenantsByDomain } = tenants;
  return {
    isFetching: paymentprocessors.get('isFetching'),
    refetchList: paymentprocessors.get('refetchList'),
    paymentProcessors: paymentprocessors.get('paymentProcessors').toJS(),
    newProcessors: paymentprocessors.get('newProcessors').toJS(),
    tenantsByDomain,
    width: settings.width,
  };
};

export default connect(
  mapStateToProps,
  { listPaymentProcessors, putPaymentProcessor },
)(PaymentProcessors);
