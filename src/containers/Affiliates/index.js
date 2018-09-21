import React from 'react';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import IntlMessages from 'util/IntlMessages';
import CustomScrollbars from 'util/CustomScrollbars';
import CardBox from 'components/CardBox/index';
import AffiliateCell from './components/AffiliateCell';
import AffiliateForm from './components/AffiliateForm';
import { fetchAllAffiliates, putAffiliate } from './actions';
import { Helmet } from 'react-helmet';
import Pagination from 'components/Pagination'
import InnerSidebar from '../InnerSidebar'
import IconButton from '@material-ui/core/IconButton';


class Affiliates extends React.Component {

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
    if(nextProps.refetchAffiliates){
      this.getAllAffiliates();
    }
    if(nextProps.codeSaveFail && nextProps.newAffiliate.id){
      this.props.history.push(`/app/affiliates/${nextProps.newAffiliate.id}`);
    }
  }

  componentWillMount = () => {
    this.getAllAffiliates();
  }

  handleChangePage = (page) => {
    this.setState({ page: page ? page : 0 },
    () => this.getAllAffiliates());
  }

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value, page: 0 },
      () => this.getAllAffiliates());
  };

  getAllAffiliates = (reset = false) => {
    const { page, rowsPerPage, archived, inactive } = this.state;
    const tenantId = this.props.tenantsByDomain.id;
    let skip = page * rowsPerPage;
    let take = rowsPerPage;
    if(reset){
      skip = 0;
      take = rowsPerPage;
      this.setState({page: 0});
    }
    this.props.fetchAllAffiliates({ tenantId, skip, take, archived, inactive });
  }

  openAffiliateForm = (status) => event => {
    this.setState({showForm: status, editForm: false, editData: {}, editIndex: 0});
  }

  noAffiliates = () => (
    <div className="row p-4">
      <CardBox styleName="col-12 text-center" heading="No Affiliates Setup" childrenStyle="text-center">
        <div>
          <p><IntlMessages id="pages.AffiliatesPage.btn.no_affiliate_description" /></p>
            <Button
              variant="raised"
              className="jr-btn text-white bg-primary"
              onClick={this.openAffiliateForm(true)}>
              <span><IntlMessages id="pages.AffiliatesPage.btn.no_affiliate_added" /></span>
            </Button>
        </div>
      </CardBox>
    </div>
  );

  openEditAffiliateForm = (data, index) => event => {
    this.setState({ editForm: true, editData: data, editIndex: index, renderForm: false},
    () => this.setState({ renderForm: true}, () => this.setState({showForm: true,})));
  }

  handleStatusChange = (action, affiliateId) => {
    const tenantId = this.props.tenantsByDomain.id;
    this.props.putAffiliate({tenantId, action, affiliateId});
  }

  handleMenu = (selectedMenu) => event => {
    let filterOptions  = {
      archived: false,
      inactive: false,
    }
    this.setState({...filterOptions, [selectedMenu]: true, selectedMenu}, () => this.getAllAffiliates(true));
  }

  handleChange = (name) => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  listAffiliates = (items) => {
    return items.map( (item, index) => (
      <AffiliateCell
        item={item}
        index={index}
        key={index}
        editGroup={this.openEditAffiliateForm(item, index)}
        changeStatus={this.handleStatusChange}
        tenantsByDomain = {this.props.tenantsByDomain}
        path={this.props.match.url}
        history = {this.props.history}
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
    const { isFetching, affiliate } = this.props;
    const { selectedMenu, searchText } = this.state;
    let content = this.showLoader();
    if(!isFetching && affiliate) {
      if(affiliate.items && affiliate.items.length){
        content = this.listAffiliates(affiliate.items)
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
              heading = {<IntlMessages id="pages.AffiliatesPage.title" />}
              addButtonTxt = {<IntlMessages id="pages.AffiliatesPage.btn.add_affiliates"/>}
              addBtnClick = {this.openAffiliateForm(true)}
              onSelect={this.handleMenu}
              selected={selectedMenu}
              allTxt = {<IntlMessages id="pages.AffiliatesPage.label.all_affiliates"/>}
              icon = {<i className="zmdi zmdi-view-subtitles mr-2"></i>}
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
                  totalPages={affiliate.totalPages}
                  count={affiliate.totalCount}
                  rowsPerPage={this.state.rowsPerPage}
                  page={this.state.page}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  name={<IntlMessages id="sidebar.affiliates" />}
                  styleName={"position-absolute fixed-bottom ml-0"}
                />
                </div>
              </div>
            </div>
           {this.state.renderForm ? <AffiliateForm
              showForm={this.state.showForm}
              closeForm={this.openAffiliateForm(false)}
              edit={this.state.editForm}
              data={this.state.editData}
              match={this.props.match}
            /> : ''}
          </div>
    );
  }
}
const mapStateToProps = ({ tenants, settings, affiliates }) => {
  return {
    isFetching: affiliates.get('isFetching'),
    codeSaveFail: affiliates.get('codeSaveFail'),
    width: settings.width,
    actionLoader: affiliates.get('actionLoader'),
    refetchAffiliates: affiliates.get('refetchAffiliates'),
    affiliate: affiliates.get('affiliate').toJS(),
    newAffiliate: affiliates.get('newAffiliate').toJS(),
    tenantsByDomain: tenants.tenantsByDomain,
  };
};
export default connect(
  mapStateToProps,
  {
    fetchAllAffiliates,
    putAffiliate
  }
)(Affiliates);
