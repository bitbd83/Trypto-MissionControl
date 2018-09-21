import React from 'react';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import FilterIcon from '@material-ui/icons/FilterList';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import IntlMessages from 'util/IntlMessages';
import CustomScrollbars from 'util/CustomScrollbars';
import CardBox from 'components/CardBox/index';
import OrderCell from './components/OrderCell';
import OrdersFilterForm from './components/OrdersFilterForm';
import OrderForm from './components/OrderForm';
import { fetchAllOrders } from './actions';
import { Helmet } from 'react-helmet';
import Pagination from 'components/Pagination'
import Button from '@material-ui/core/Button';
import AppModuleHeader from 'components/AppModuleHeader/index';
import OrderFilter from './components/OrderFilter';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Popover from '@material-ui/core/Popover';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import OrderInfo from './components/OrderInfo'

function Transition(props) {
  return <Slide direction="up" {...props} />;
}


class Orders extends React.Component {
  state = {
    showForm: false,
    showAdvFilters: false,
    editForm: false,
    editData:{},
    infoData: {},
    editIndex:0,
    openDetail:false,
    detailData: {},
    rowsPerPage: 10,
    page: 0,
    archived: false,
    selectedMenu: [],
    searchText:'',
    advFilters: {},
    openFilterSave: false,
    criteria: {
      orderCode: "",
      orderStatusTypeIds: [],
      skip: 0,
      skipPaging: true,
      take: 10,
      purchasedOnDateRange: {
        from: '',
        to: ''
      },
      "paymentMethod": ""
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if(nextProps.refetchList){
      this.getAllOrders();
    }
  }

  componentWillMount = () => {
    this.getAllOrders();
  }

  openOrderDetail = (status, data={}) => event => {
    const detailData = data ? data : {}
    this.setState({openDetail: status, detailData});
  };

  handleChangePage = (page) => {
    this.setState({ page: page ? page : 0 },
    () => this.getAllOrders());
  }

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value, page: 0 },
      () => this.getAllOrders());
  };

  getAllOrders = (reset = false) => {
    let { criteria, rowsPerPage, page, selectedMenu, advFilters } = this.state;
    const { tenantsByDomain } = this.props;
    let filters = {}
    let data = {};
    if(reset){
      filters['skip'] = 0;
      filters['take'] = rowsPerPage;
      this.setState({page: 0});
    } else {
      filters['skip'] = page * rowsPerPage;
      filters['take'] = rowsPerPage;
    }

    if(selectedMenu.length){
      filters['orderStatusTypeIds'] = selectedMenu;
    }

    if(advFilters.purchaseData && advFilters.purchaseData.purchasedOnDateRange.from){
      let purchasedOnDateRange = {from: '', to: ''}
      const fromDate = advFilters.purchaseData.purchasedOnDateRange.from.format('YYYY-MM-DD')
      const fromTime = advFilters.purchaseData.purchasedOnDateRange.from.format('HH:mm:ss.SSS')
      const toDate = advFilters.purchaseData.purchasedOnDateRange.to.format('YYYY-MM-DD')
      const toTime = advFilters.purchaseData.purchasedOnDateRange.to.format('HH:mm:ss.SSS')
      purchasedOnDateRange.from = fromDate+'T'+fromTime+'Z';
      purchasedOnDateRange.to = toDate+'T'+toTime+'Z';
      filters.purchasedOnDateRange = purchasedOnDateRange
    }
    data = { tenantId:tenantsByDomain.id, criteria: filters }
    this.props.fetchAllOrders(data);
  }

  openOrderForm = (status) => event => {
    // this.setState({showForm: status, showAdvFilters: false ,editForm: false, editData: {}, editIndex: 0});
  }
  openOrderFilterForm = (status) => event => {
    this.setState({showAdvFilters: status});
  }

  noOrders = () => (
    <div className="row p-4">
      <CardBox styleName="col-12 text-center" heading={<IntlMessages id="containers.Orders.noOrders.heading" />} childrenStyle="text-center">
        <div>
          <p><IntlMessages id="containers.Orders.noOrders.description" /></p>
        </div>
      </CardBox>
    </div>
  );

  openEditOrderForm = (data, index) => event => {
    this.setState({showForm: true, showAdvFilters: false, editForm: true, editData: data, editIndex: index});
  }

  handleStatusChange = (action, feeId) => {
    // this.setState({loading: true});
    // this.props.putOrder({action, feeId});
  }

  handleMenu = (selected) => event => {
    let {selectedMenu} = this.state;
    selectedMenu.push(selected);

    this.setState({selectedMenu}, () => this.getAllOrders(true));
  }

  handleRemoveMenu = (selected) => event => {
    let {selectedMenu} = this.state;
    selectedMenu = selectedMenu.filter(item => item !== selected)

    this.setState({selectedMenu}, () => this.getAllOrders(true));
  }

  onApplyFilter = (filters) => {
    this.setState({advFilters: filters}, () => this.getAllOrders(true))
  }

  removeFilter = () => {
    this.setState({advFilters: {}}, () => this.getAllOrders(true))
  }

  handleChange = (name) => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  filterOrders = (item) => {
    const { searchText } = this.state;
    return (
      item.orderCode.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
      || item.shippingInfo.name.firstName.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
      || item.shippingInfo.name.lastName.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
    )
  }

  handleClickButton = () => {
    this.setState(state => ({
      openFilterSave: !state.openFilterSave,
    }));
  };

  centerScroll = ref => {
    if (!ref) {
      return;
    }

    const container = ref.parentElement;
    container.scrollTop = ref.clientHeight / 4;
    container.scrollLeft = ref.clientWidth / 4;
  };


  listOrders = (items) => {

    return items.filter(item => this.filterOrders(item)).map( (item, index) => (
      <OrderCell
        item={item}
        index={index}
        key={index}
        editGroup={this.openEditOrderForm(item, index)}
        changeStatus={this.handleStatusChange}
        tenantsByDomain = {this.props.tenantsByDomain}
        path = {this.props.match.path}
        openOrderDetail={this.openOrderDetail(true, item)}
      />
    ))
  }

  showLoader = () => (
    <div className="mt-3 d-flex justify-content-center align-items-center animated slideInUpTiny animation-duration-3">
      <div className="loader-view">
        <CircularProgress />
      </div>
    </div>
  );

  render() {
    const { isFetching, orders, tenantsByDomain } = this.props;
    const { selectedMenu, searchText, showAdvFilters, page } = this.state;

    let content = this.showLoader();
    if(!isFetching && orders) {
      if(orders.items && orders.items.length){
        content = this.listOrders(orders.items)
      } else {
        content = this.noOrders()
      }
    }

    return (
      <div className="app-wrapper">
        <div className="app-module animated slideInUpTiny animation-duration-3">
          <div className="app-module-sidenav d-none d-xl-flex">
            <OrderFilter
              width={this.props.width}
              heading = {<IntlMessages id="containers.Orders.label.title" />}
              addButtonTxt = {<IntlMessages id="containers.Orders.Sidebar.label.addBtn"/>}
              addBtnClick = {this.openOrderForm(true)}
              onSelect={this.handleMenu}
              onRemove={this.handleRemoveMenu}
              selected={selectedMenu}
              allTxt={false}
              icon = {<i className="zmdi zmdi-shopping-cart mr-2"></i>}
            />
          </div>
          <div className="module-box">
            <Grid container alignItems={'center'} justify={'space-between'} className="module-box-header flex-row">
              <Grid item>
                {/* <AppModuleHeader
                  placeholder="Search Orders"
                  onChange={this.handleChange('searchText')}
                  value={searchText}
                /> */}
              </Grid>
              <Grid item>
                <div className="d-flex">
                 {Object.keys(this.state.advFilters).length ? <div className="d-flex">
                    <div className="align-self-center mt-2">
                      <CloseIcon color={'error'} className={'ml-auto'} onClick={this.removeFilter}/>
                    </div>
                    <IconButton buttonRef={node => {
                        this.anchorEl = node;
                      }}
                      variant="contained"
                      onClick={this.handleClickButton}
                    >
                      <ArrowDropDown style={{fontSize:'30px'}}/>
                    </IconButton>
                  <Popover
                    open={this.state.openFilterSave}
                    anchorEl={this.anchorEl}
                  >
                    <div >
                      <DialogContent>
                        <DialogContentText>
                          <TextField
                            margin="dense"
                            id="purchaserName"
                            label={<IntlMessages id="containers.Orders.label.filter_name" />}
                            type="text"
                            // value={this.state.purchaserName}
                            // onChange={this.handleChange('purchaserName')}
                            fullWidth
                          />
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={this.handleClickButton} color="primary">
                          <IntlMessages id="button.save_btn" />
                        </Button>
                        <Button onClick={this.handleClickButton} color="">
                          <IntlMessages id="button.cancel_btn" />
                        </Button>
                      </DialogActions>
                    </div>
                  </Popover>

                  <Typography variant={'body2'} className={`text-uppercase text-warning align-self-center mx-1`}>Filter Active</Typography></div> :''}
                    <Button
                      size="small"
                      aria-label="Menu"
                      onClick={this.openOrderFilterForm(true)}
                    >
                      <FilterIcon/>
                    </Button>
                </div>
              </Grid>
            </Grid>
            <div className="module-box-content">
              <div
                className="mb-1 position-relative"
                style={{
                  height: this.props.width >= 1200
                    ? 'calc(100vh - 210px)'
                    : 'calc(100vh - 190px)'
                }}
              >
              <CustomScrollbars className="module-list-scroll scrollbar">
                <Helmet>
                  <title>Orders</title>
                  <meta name="description" content="Orders Description" />
                </Helmet>
                  {content}
              </CustomScrollbars>
              </div>
                <Pagination
                  colspan={3}
                  totalPages={orders.totalPages}
                  count={orders.totalCount}
                  rowsPerPage={this.state.rowsPerPage}
                  page={page}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  name={<IntlMessages id="containers.Orders.label.title" />}
                  styleName={"position-absolute fixed-bottom ml-0"}
                />
                </div>
              </div>
            </div>
            <OrdersFilterForm
              showForm={showAdvFilters}
              closeForm={this.openOrderFilterForm(false)}
              tenantsByDomain={tenantsByDomain}
              onApplyFilter = {this.onApplyFilter}
              currentFilter = {this.state.advFilters}
            />

            <Dialog
              fullScreen
              open={this.state.openDetail}
              onClose={this.openOrderDetail(false)}
              TransitionComponent={Transition}
            >
              <OrderInfo
                closeModal={this.openOrderDetail(false)}
                orderId = {this.state.detailData ? this.state.detailData.id : ''}
                match={this.props.match}
              />
            </Dialog>
          </div>
    );
  }
}
const mapStateToProps = ({ orders, tenants, settings }) => {
  return {
    isFetching: orders.get('isFetching'),
    width: settings.width,
    actionLoader: orders.get('actionLoader'),
    refetchList: orders.get('refetchList'),
    orders: orders.get('orders').toJS(),
    tenantsByDomain: tenants.tenantsByDomain,
  };
};
export default connect(
  mapStateToProps,
  {
    fetchAllOrders
  },
)(Orders);
