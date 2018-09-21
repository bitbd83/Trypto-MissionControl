import React from 'react';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import IntlMessages from 'util/IntlMessages';
import CustomScrollbars from 'util/CustomScrollbars';
import CardBox from 'components/CardBox/index';
import TrackingCodeCell from './TrackingCodeCell';
import TrackingCodesForm from './TrackingCodesForm';
import { fetchTrackingCodes, putTrackingCodes, addTrackingCodes } from '../../actions';
import { Helmet } from 'react-helmet';
import Pagination from 'components/Pagination'
import InnerSidebar from '../../../InnerSidebar'
import IconButton from '@material-ui/core/IconButton';
import AppModuleHeader from 'components/AppModuleHeader/index';

class AffiliateDetail extends React.Component {

  state = {
    affiliateData: '',
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
    renderForm: true,
  }

  componentWillReceiveProps = (nextProps) => {
    if(nextProps.refetchTrackingCode){
      this.getTrackingCodes();
    }
  }

  componentDidMount(){
    this.getTrackingCodes();
  }

  handleChangePage = (page) => {
    this.setState({ page: page ? page : 0 },
    () => this.getTrackingCodes());
  }

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value, page: 0 },
      () => this.getTrackingCodes());
  };

  getTrackingCodes = (reset = false) => {
    const { page, rowsPerPage, archived, inactive } = this.state;
    const tenantId = this.props.tenantsByDomain.id;
    const { affiliateId } = this.props.match.params;
    let skip = page * rowsPerPage;
    let take = rowsPerPage;
    if(reset){
      skip = 0;
      take = rowsPerPage;
      this.setState({page: 0});
    }
    this.props.fetchTrackingCodes({ tenantId, affiliateId, skip, take, archived, inactive });
  }

  openAffiliateDetailForm = (status) => event => {
    this.setState({showForm: status, editForm: false, editData: {}, editIndex: 0});
  }

  noAffiliates = () => (
    <div className="row p-4">
      <CardBox styleName="col-12 text-center" heading="No Tracking Codes Setup" childrenStyle="text-center">
        <div>
          <p>You have not added any Tracking Codes yet.</p>
            <Button
              variant="raised"
              className="jr-btn text-white bg-primary"
              onClick={this.openAffiliateDetailForm(true)}>
              <span><IntlMessages id="pages.AffiliatesPage.trackingCodes.btn.no_trackingCodes_added" /></span>
            </Button>
        </div>
      </CardBox>
    </div>
  );

  openEditCodeForm = (data, index) => event => {
    this.setState({ editForm: true, editData: data, editIndex: index, renderForm: false},
    () => this.setState({ renderForm: true}, () => this.setState({showForm: true,})));
  }

  handleStatusChange = (action, codeId) => {
    const { affiliateId } = this.props.match.params;
    const tenantId = this.props.tenantsByDomain.id;
    this.props.putTrackingCodes({ tenantId, affiliateId, codeId, action});
  }

  handleMenu = (selectedMenu) => event => {
    let filterOptions  = {
      archived: false,
      inactive: false,
    }
    this.setState({...filterOptions, [selectedMenu]: true, selectedMenu}, () => this.getTrackingCodes(true));
  }

  handleChange = (name) => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  onCloseForm = (formData) => {
    const { affiliateData } = this.state;
    formData.active = true;
    affiliateData.items.unshift(formData)
    this.setState({affiliateData, editData: {}})
  }

  listAffiliates = (items) => {
    return items.map( (item, index) => (
      <TrackingCodeCell
        item={item}
        index={index}
        key={index}
        editGroup={this.openEditCodeForm(item, index)}
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
    const { isCodeFetching, trackingCodes } = this.props;
    const { selectedMenu, searchText, affiliateData } = this.state;
    let content = this.showLoader();
    if(!isCodeFetching && trackingCodes) {
      if(trackingCodes.items.length){
        content = this.listAffiliates(trackingCodes.items)
      } else {
        content = this.noAffiliates()
      }
    }

    return (
      <div className="app-wrapper">
        <div className="app-module animated slideInUpTiny animation-duration-3">
          <div className="app-module-sidenav d-none d-xl-flex">
            <InnerSidebar
              width={this.props.width}
              heading = {<IntlMessages id="pages.AffiliatesPage.trackingCodes.label.title"/>}
              addButtonTxt = {<IntlMessages id="pages.AffiliatesPage.trackingCodes.btn.add_tracking_codes"/>}
              addBtnClick = {this.openAffiliateDetailForm(true)}
              onSelect={this.handleMenu}
              selected={selectedMenu}
              allTxt = {<IntlMessages id="pages.AffiliatesPage.trackingCodes.btn.all_tracking_codes"/>}
              icon = {<i className="zmdi zmdi-assignment mr-2"></i>}
              backLink={{url: '/app/affiliates', label: <IntlMessages id="pages.AffiliatesPage.trackingCodes.btn.backToAffiliates" />}}
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
                  <title>Affiliates</title>
                  <meta name="description" content="Affiliates Description" />
                </Helmet>
                  {content}
              </CustomScrollbars>
              </div>
              <Pagination
                  colspan={3}
                  totalPages={trackingCodes.totalPages}
                  count={trackingCodes.totalCount}
                  rowsPerPage={this.state.rowsPerPage}
                  page={this.state.page}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  name={<IntlMessages id="pages.AffiliatesPage.trackingCodes.label.title" />}
                  styleName={"position-absolute fixed-bottom ml-0"}
                />
                </div>
              </div>
            </div>
            {this.state.renderForm ? <TrackingCodesForm
                showForm={this.state.showForm}
                closeForm={this.openAffiliateDetailForm(false)}
                edit={this.state.editForm}
                data={this.state.editData}
                onCloseForm = {this.onCloseForm}
                match = { this.props.match }
              /> : ''}
          </div>
    );
  }
}
const mapStateToProps = ({ tenants, settings, affiliates }) => {
  return {
    isFetching: affiliates.get('isFetching'),
    isCodeFetching: affiliates.get('isCodeFetching'),
    width: settings.width,
    actionLoader: affiliates.get('actionLoader'),
    refetchTrackingCode: affiliates.get('refetchTrackingCode'),
    trackingCodes: affiliates.get('trackingCodes').toJS(),
    tenantsByDomain: tenants.tenantsByDomain,
    codeSaveFail: affiliates.get('codeSaveFail'),
  };
};
export default connect(
  mapStateToProps,
  {
    fetchTrackingCodes,
    putTrackingCodes,
    addTrackingCodes
  }
)(AffiliateDetail);
