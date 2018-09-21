import React from 'react';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Add from '@material-ui/icons/Add';
import ContainerHeader from 'components/ContainerHeader/index';
import IntlMessages from 'util/IntlMessages';
import CustomScrollbars from 'util/CustomScrollbars';
import CardBox from 'components/CardBox/index';
import DiscountCodeCell from './components/DiscountCodeCell';
import DiscountCodeForm from './components/DiscountCodeForm';
import { fetchAllCodes, putCode } from './actions';
import { Helmet } from 'react-helmet';
import Pagination from 'components/Pagination'
import InnerSidebar from '../InnerSidebar'
import IconButton from '@material-ui/core/IconButton';
import AppModuleHeader from 'components/AppModuleHeader/index';
// import discountCodes  from './data.json';

class DiscountCodes extends React.Component {

  state = {
    showForm: false,
    editForm: false,
    editData:{},
    editIndex:0,
    rowsPerPage: 10,
    page: 0,
    archived: false,
    inactive: false,
    selectedMenu: '',
    searchText:'',
    discountCodes: {},
  }

  componentWillReceiveProps = (nextProps) => {

    if(nextProps.refetchList){
      this.getAllDiscountCodes();
    }
  }

  componentWillMount = () => {
    const { search } = this.props.location
    if(search === '?archived'){
      this.setState({archived: true}, () => this.getAllDiscountCodes())
    }else if(search === '?deactivated'){
      this.setState({inactive: true}, () => this.getAllDiscountCodes())
    }else{
      this.getAllDiscountCodes()
    }
    // this.getAllDiscountCodes();
  }

  handleChangePage = (page) => {
    this.setState({ page: page ? page : 0 },
    () => this.getAllDiscountCodes());
  }

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value, page: 0 },
      () => this.getAllDiscountCodes());
  };

  getAllDiscountCodes = (reset = false) => {
    const { page, rowsPerPage, archived, inactive } = this.state;
    const tenantId = this.props.tenantsByDomain.id;
    let skip = page * rowsPerPage;
    let take = rowsPerPage;
    if(reset){
      skip = 0;
      take = rowsPerPage;
      this.setState({page: 0});
    }
    this.props.fetchAllCodes({ tenantId, skip, take, archived, inactive });
  }

  openDiscountCodeForm = (status) => event => {
    this.setState({showForm: status, editForm: false, editData: {}, editIndex: 0});
  }

  noCodes = () => (
    <div className="row p-4">
      <CardBox styleName="col-12 text-center" heading={<IntlMessages id="containers.DiscountCodes.noCodes.heading" />} childrenStyle="text-center">
        <div>
          <p><IntlMessages id="containers.DiscountCodes.noCodes.description" /></p>
        </div>
      </CardBox>
    </div>
  );

  openEditDiscountCodesForm = (data, index) => event => {
    this.setState({showForm: true, editForm: true, editData: data, editIndex: index});
  }

  handleStatusChange = (action, couponId) => {
    const tenantId = this.props.tenantsByDomain.id;
    this.props.putCode({action, tenantId, couponId});
  }

  handleMenu = (selectedMenu) => event => {
    let filterOptions  = {
      archived: false,
      inactive: false,
    }
    this.setState({...filterOptions, [selectedMenu]: true, selectedMenu}, () => this.getAllDiscountCodes(true));
  }

  handleChange = (name) => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  listDiscountCodes = (items) => {
    return items.map( (item, index) => (
      <DiscountCodeCell
        item={item}
        index={index}
        key={index}
        editGroup={this.openEditDiscountCodesForm(item, index)}
        changeStatus={this.handleStatusChange}
        tenantsByDomain = {this.props.tenantsByDomain}
        match={this.props.match}
      />
    ))
  }

  showLoader = () => (
    <div className="d-flex justify-content-center align-items-center animated slideInUpTiny animation-duration-3 mt-3">
      <div className="loader-view">
        <CircularProgress />
      </div>
    </div>
  );

  render() {
    const { isFetching, discountCodes } = this.props;
    const { selectedMenu, searchText } = this.state;
    let content = this.showLoader();
    if(!isFetching && discountCodes) {
      if(discountCodes.items.length){
        content = this.listDiscountCodes(discountCodes.items)
      } else {
        content = this.noCodes()
      }
    }

    return (
      <div className="app-wrapper">
      <div className="app-module animated slideInUpTiny animation-duration-3">
        <div className="app-module-sidenav d-none d-xl-flex">
          <InnerSidebar
            heading = {<IntlMessages id="containers.DiscountCodes.label.title" />}
            addButtonTxt = {<IntlMessages id="containers.DiscountCodes.label.addBtn"/>}
            addBtnClick = {this.openDiscountCodeForm(true)}
            onSelect={this.handleMenu}
            selected={selectedMenu}
            allTxt = {<IntlMessages id="containers.DiscountCodes.Sidebar.Menu.all"/>}
            icon = {<i className="zmdi zmdi-paypal mr-2"></i>}
            {...this.props}
          />
        </div>
        <div className="module-box">
          <div className="module-box-header">
            <IconButton className="drawer-btn d-block d-xl-none" aria-label="Menu">
              <i className="zmdi zmdi-menu"/>
            </IconButton>
            {/* <AppModuleHeader
              placeholder="Search Fee"
              onChange={this.handleChange('searchText')}
              value={searchText}
            /> */}
          </div>
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
                <title>Discount Codes</title>
                <meta name="description" content="Dicsount Codes Description" />
              </Helmet>
                {content}
            </CustomScrollbars>
            </div>
            <Pagination
                colspan={3}
                totalPages = {discountCodes.totalPages}
                count={discountCodes.totalCount}
                rowsPerPage={this.state.rowsPerPage}
                page={this.state.page}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                name={<IntlMessages id="containers.DiscountCodes.label.title" />}
                styleName={"position-absolute fixed-bottom ml-0"}
              />
              </div>
            </div>
          </div>
          <DiscountCodeForm
              showForm={this.state.showForm}
              closeForm={this.openDiscountCodeForm(false)}
              edit={this.state.editForm}
              data={this.state.editData}
            />
        </div>
    );
  }
}
const mapStateToProps = ({ tenants, settings, discountCodes }) => {
  return {
    width: settings.width,
    tenantsByDomain: tenants.tenantsByDomain,
    discountCodes: discountCodes.get('discountCodes').toJS(),
    isFetching: discountCodes.get('isFetching'),
    refetchList: discountCodes.get('refetchList'),
  };
};
export default connect(
  mapStateToProps,
  {
    fetchAllCodes,
    putCode
  }
)(DiscountCodes);
