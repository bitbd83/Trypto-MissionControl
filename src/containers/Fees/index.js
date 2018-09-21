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
import FeesCell from './components/FeesCell';
import FeesForm from './components/FeesForm';
import { fetchAllFees, putFees } from './actions';
import { Helmet } from 'react-helmet';
import Pagination from 'components/Pagination'
import InnerSidebar from '../InnerSidebar'
import IconButton from '@material-ui/core/IconButton';
import AppModuleHeader from 'components/AppModuleHeader/index';
import filters from '../InnerSidebar/filters';
import queryString from 'query-string';

class Fees extends React.Component {

  constructor(props, context){
    super(props, context)

    const {location: { search }} = props;

    let selected = Object.keys(queryString.parse(search));
    let filterState = {};
    selected.map(key => {
      filterState[filters[key].handle] = true;
    })

    this.state = {
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
      ...filterState
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if(nextProps.refetchList){
      this.getAllFees();
    }
  }

  componentWillMount = () => {
    this.getAllFees();
  }

  handleChangePage = (page) => {
    this.setState({ page: page ? page : 0 },
    () => this.getAllFees());
  }

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value, page: 0 },
      () => this.getAllFees());
  };

  getAllFees = (reset= false) => {
    const { page, rowsPerPage, archived, inactive, searchText } = this.state;

    let skip = page * rowsPerPage;
    let take = rowsPerPage;
    if(reset){
      skip = 0;
      take = rowsPerPage;
      this.setState({page: 0});
    }
    this.props.fetchAllFees({ skip, take, archived, inactive, searchText });
  }

  openFeesForm = (status) => event => {
    this.setState({showForm: status, editForm: false, editData: {}, editIndex: 0});
  }

  nofees = () => (
    <div className="row p-4">
      <CardBox styleName="col-12 text-center" heading="No Fees Setup" childrenStyle="text-center">
        <div>
          <p>You have not added any fees yet.</p>
            <Button
              variant="raised"
              className="jr-btn text-white bg-primary"
              onClick={this.openFeesForm(true)}>
              <span><IntlMessages id="pages.feesPage.btn.no_fees_added" /></span>
            </Button>
        </div>
      </CardBox>
    </div>
  );

  openEditFeesForm = (data, index) => event => {
    this.setState({showForm: true, editForm: true, editData: data, editIndex: index});
  }

  handleStatusChange = (action, feeId) => {
    this.setState({loading: true});
    this.props.putFees({action, feeId});
  }

  handleMenu = (selectedMenu) => event => {
    let filterOptions  = {
      archived: false,
      inactive: false,
    }
    this.setState({...filterOptions, [selectedMenu]: true, selectedMenu}, () => this.getAllFees(true));
  }

  handleChange = (name) => event => {
    this.setState({
      [name]: event.target.value
    }, () => this.getAllFees())
  }

  listFees = (items) => {
    return items.map( (item, index) => (
      <FeesCell
        item={item}
        index={index}
        key={index}
        editGroup={this.openEditFeesForm(item, index)}
        changeStatus={this.handleStatusChange}
        tenantsByDomain = {this.props.tenantsByDomain}
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
    const { isFetching, fees } = this.props;
    const { selectedMenu, searchText } = this.state;
    let content = this.showLoader();
    if(!isFetching && fees) {
      if(fees.items.length){
        content = this.listFees(fees.items)
      } else {
        content = this.nofees()
      }
    }

    return (
      <div className="app-wrapper">
        <div className="app-module animated slideInUpTiny animation-duration-3">
          <div className="app-module-sidenav d-none d-xl-flex">
            <InnerSidebar
              width={this.props.width}
              heading = {<IntlMessages id="pages.feesPage.title" />}
              addButtonTxt = {<IntlMessages id="pages.feesPage.btn.add_fee"/>}
              addBtnClick = {this.openFeesForm(true)}
              onSelect={this.handleMenu}
              selected={selectedMenu}
              allTxt = {<IntlMessages id="pages.feesPage.btn.all_fee"/>}
              icon = {<i className="zmdi zmdi-assignment mr-2"></i>}
            />
          </div>
          <div className="module-box">
            <div className="module-box-header">
              <IconButton className="drawer-btn d-block d-xl-none" aria-label="Menu">
                <i className="zmdi zmdi-menu"/>
              </IconButton>
              <AppModuleHeader
                placeholder="Search Fee"
                onChange={this.handleChange('searchText')}
                value={searchText}
              />
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
                  <title>Fees</title>
                  <meta name="description" content="Fees Description" />
                </Helmet>
                  {content}
              </CustomScrollbars>
              </div>
              <Pagination
                  colspan={3}
                  totalPages={fees.totalPages}
                  count={fees.totalCount}
                  rowsPerPage={this.state.rowsPerPage}
                  page={this.state.page}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  name={<IntlMessages id="pages.feesPage.pagination_title" />}
                  styleName={"position-absolute fixed-bottom ml-0"}
                />
                </div>
              </div>
            </div>
            <FeesForm
              showForm={this.state.showForm}
              closeForm={this.openFeesForm(false)}
              edit={this.state.editForm}
              data={this.state.editData}
            />
          </div>
    );
  }
}

const mapStateToProps = ({ fees, tenants, settings }) => {
  return {
    isFetching: fees.get('isFetching'),
    width: settings.width,
    actionLoader: fees.get('actionLoader'),
    refetchList: fees.get('refetchList'),
    fees: fees.get('fees').toJS(),
    tenantsByDomain: tenants.tenantsByDomain,
  };
};
export default connect(
  mapStateToProps,
  {
    fetchAllFees,
    putFees
  },
)(Fees);
