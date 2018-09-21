import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import Add from '@material-ui/icons/Add';
import ContainerHeader from 'components/ContainerHeader';
import IntlMessages from 'util/IntlMessages';
import CardBox from 'components/CardBox/index';
import TaxRateCell from './components/TaxRateCell';
import TaxRateForm from './components/TaxRateForm';
import { fetchAllTaxRates, putTaxRate, getTaxGroup } from './actions';
import Pagination from 'components/Pagination'
import InnerSidebar from '../../InnerSidebar'
import AppModuleHeader from 'components/AppModuleHeader/index';
import IconButton from '@material-ui/core/IconButton';
import CustomScrollbars from 'util/CustomScrollbars';

class TaxRate extends React.Component {

  constructor (props) {
    super();
    let showForm = props.location.search === "?open" ? true: false;
    this.state = {
      showForm: false,
      editForm: false,
      editData:{},
      editIndex:0,
      taxGroupId: props.match.params.id,
      rowsPerPage: 10,
      page: 0,
      archived: false,
      inactive: false,
      selectedMenu: '',
      searchText: '',
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if(nextProps.refetchList){
      this.getAllTaxRates()
    }
  }

  componentWillMount = () => {
    let { taxGroupId } = this.state;
    this.getAllTaxRates();
    this.props.getTaxGroup({ taxGroupId });
  }

  handleChangePage = (page) => {
    this.setState({ page: page ? page : 0 },
    () => this.getAllTaxRates());
  }

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value, page: 0 },
      () => this.getAllTaxRates());
  };

  getAllTaxRates = (reset = false) => {
    const { page, rowsPerPage, archived, taxGroupId, inactive } = this.state;
    let skip = page * rowsPerPage;
    let take = rowsPerPage;
    if(reset){
      skip = 0;
      take = rowsPerPage;
      this.setState({page: 0});
    }
    this.props.fetchAllTaxRates({ taxGroupId, skip, take, archived, inactive });
  }

  openTaxRateForm = (status) => event => {
    this.setState({showForm: status, editForm: false, editData: {}, editIndex: 0});
  }

  noTaxes = () => (
    <div className="row">
      <CardBox styleName="col-12 text-center" heading={<IntlMessages id="pages.taxeRatePage.label.no_tax_rates" />} childrenStyle="text-center">
        <div>
          <p><IntlMessages id="pages.taxeRatePage.label.no_tax_rates_description" /></p>
            <Button
              variant="raised"
              className="jr-btn text-white bg-primary"
              onClick={this.openTaxRateForm(true)}>
              <span><IntlMessages id="pages.taxRatesPage.btn.no_tax_added" /></span>
            </Button>
        </div>
      </CardBox>
    </div>
  );

  openEditTaxRateForm = (data, index) => event => {
    this.setState({showForm: true, editForm: true, editData: data, editIndex: index});
  }

  handleStatusChange = (action, taxRateId) => {
    this.setState({loading: true});
    this.props.putTaxRate({action, taxRateId, taxGroupId: this.props.taxGroup.id});
  }

  listTaxRate = (items) => {
    return items.map( (item, index) => (
      <TaxRateCell
        item={item}
        index={index}
        key={index}
        /* loading={this.props.actionLoader && editData.id && editData.id===item.id} */
        tenantsByDomain={this.props.tenantsByDomain}
        editGroup={this.openEditTaxRateForm(item, index)}
        changeStatus={this.handleStatusChange}
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

  handleSwitchChange = name => (event, checked) => {
    this.setState({
      [name]: checked
    }, () => this.getAllTaxRates());
  }

  handleMenu = (selectedMenu) => event => {
    let filterOptions  = {
      archived: false,
      inactive: false,
    }
    this.setState({...filterOptions, [selectedMenu]: true, selectedMenu}, () => this.getAllTaxRates(true));
  }

  handleChange = (name) => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  render() {
    const { isFetching, taxRates, tenantsByDomain, taxGroup } = this.props;
    const { selectedMenu,searchText } = this.state;
    let content = this.showLoader();
    if(!isFetching && taxRates) {
      if(taxRates.items.length){
        content = this.listTaxRate(taxRates.items)
      } else {
        content = this.noTaxes()
      }
    }

    return (
      <div className="app-wrapper">
         <div className="app-module animated slideInUpTiny animation-duration-3">
          <div className="app-module-sidenav d-none d-xl-flex">
            <InnerSidebar
              width={this.props.width}
              heading = {<IntlMessages id="pages.taxesPage.title" />}
              addButtonTxt = {<IntlMessages id="pages.taxRatesPage.btn.add_tax_rate" />}
              addBtnClick = {this.openTaxRateForm(true)}
              onSelect={this.handleMenu}
              selected={selectedMenu}
              allTxt = {<IntlMessages id="pages.taxesPage.btn.allTaxRates"/>}
              backLink={{url: '/app/taxes', label: <IntlMessages id="pages.taxRatesPage.btn.backToTaxGroup" />}}
            />
          </div>
          <div className="module-box">
            <div className="module-box-header">
              <IconButton className="drawer-btn d-block d-xl-none" aria-label="Menu">
                <i className="zmdi zmdi-menu"/>
              </IconButton>
              {/* <AppModuleHeader
                    placeholder={pages.taxeRatePage.TaxRateForm.label.search_tax_rate}
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

        <Helmet>
          <title>Taxe Rates </title>
          <meta name="description" content="Taxes Description" />
        </Helmet>
          <CustomScrollbars
            className="module-list-scroll scrollbar"
            style={{
              height: this.props.width >= 1200 ? 'calc(100vh - 150px)' : 'calc(100vh - 130px)'
            }}>
              {content}
          </CustomScrollbars>
        </div>
        <Pagination
          colspan={3}
          totalPages = {taxRates.totalPages}
          count={taxRates.totalCount}
          rowsPerPage={this.state.rowsPerPage}
          page={this.state.page}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
          name={<IntlMessages id="pages.taxeRatePage.label.pagination_title" />}
          styleName={"position-absolute fixed-bottom ml-0"}
        />
        </div>
        </div>
        </div>
        <TaxRateForm
          showForm={this.state.showForm}
          closeForm={this.openTaxRateForm(false)}
          edit={this.state.editForm}
          data={this.state.editData}
          taxGroup={this.props.taxGroup}
          tenantsByDomain={tenantsByDomain}
        />
      </div>
    );
  }
}
const mapStateToProps = ({  tenants, taxRate, settings }) => {
  const { tenantsByDomain } = tenants;
  return {
    width: settings.width,
    isFetching: taxRate.get('isFetching'),
    actionLoader: taxRate.get('actionLoader'),
    refetchList: taxRate.get('refetchList'),
    taxRates: taxRate.get('taxRates').toJS(),
    taxGroup: taxRate.get('taxGroup').toJS(),
    tenantsByDomain,
  };
};
export default connect(
  mapStateToProps,
  {
    fetchAllTaxRates,
    putTaxRate,
    getTaxGroup
  },
)(TaxRate);
