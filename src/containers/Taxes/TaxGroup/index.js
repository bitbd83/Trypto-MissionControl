import React from 'react';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import IntlMessages from 'util/IntlMessages';
import CardBox from 'components/CardBox/index';
import TaxGroupCell from './components/TaxGroupCell';
import TaxGroupForm from './components/TaxGroupForm';
import { fetchAllTaxGroup, putTaxGroup, resetTaxGroup } from './actions';
import Pagination from 'components/Pagination';
import { Helmet } from 'react-helmet';
import InnerSidebar from '../../InnerSidebar'
import IconButton from '@material-ui/core/IconButton';
import AppModuleHeader from 'components/AppModuleHeader/index';
import CustomScrollbars from 'util/CustomScrollbars';
import TaxRateForm from '../TaxRate/components/TaxRateForm'

class TaxGroup extends React.Component {
  state = {
    showTaxForm: false,
    showTaxRateForm: false,
    editForm: false,
    editData: {},
    editIndex: 0,
    rowsPerPage: 10,
    archived: false,
    inactive: false,
    page: 0,
    selectedMenu: '',
    searchText: '',
  };

  componentWillReceiveProps = (nextProps) => {

    if(nextProps.refetchList){
      this.getAllTaxGroup();
    }
  }

  componentWillMount = () => {
    this.getAllTaxGroup();
  };

  handleChangePage = page => {
    this.setState({ page: page ? page : 0 }, () => this.getAllTaxGroup());
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value, page: 0 }, () => this.getAllTaxGroup());
  };

  getAllTaxGroup = (reset = false) => {
    const { page, rowsPerPage, archived, inactive, searchText } = this.state;
    let skip = page * rowsPerPage;
    let take = rowsPerPage;
    if(reset){
      skip = 0;
      take = rowsPerPage;
      this.setState({page: 0});
    }
    this.props.fetchAllTaxGroup({ skip, take, archived, inactive, searchText });
  };

  openTaxGroupForm = status => event => {
    const {editForm, showTaxForm, showTaxRateForm} = this.state;
    this.setState({
      showTaxForm: status,
      editForm: false,
      editData: {},
      editIndex: 0,
      showTaxRateForm: !status ? true : false,
    }, () => {
      if(editForm) {
        this.props.resetTaxGroup();
      }
    });
  };

  openTaxRateForm = status => event => {
    this.setState({
      showTaxRateForm: status,
      editForm: false,
      editData: {},
      editIndex: 0
    }, () => {
      if(!status) {
        this.props.resetTaxGroup();
      }
    });
  };

  noTaxes = () => (
    <div className="row p-3">
      <CardBox styleName="col-12 text-center" heading={<IntlMessages id="pages.taxesPage.taxeGroup.noTax_title" />} childrenStyle="text-center">
        <div>
          <p>{<IntlMessages id="pages.taxesPage.taxeGroup.noTax_description" />}</p>
          <Button variant="raised" className="jr-btn text-white bg-primary" onClick={this.openTaxGroupForm(true)}>
            <span>
              <IntlMessages id="pages.taxesPage.btn.no_tax_added" />
            </span>
          </Button>
        </div>
      </CardBox>
    </div>
  );

  openEditTaxGroupForm = (data, index) => event => {
    this.setState({
      showTaxForm: true,
      editForm: true,
      editData: data,
      editIndex: index,
    });
  };

  // openEditTaxRateForm = (data, index) => event => {
  //   this.setState({ showTaxRateForm: true, editForm: true, editData: data, editIndex: index });
  // };

  handleStatusChange = (action, taxGroupId) => {
    var tenantId = this.props.tenantsByDomain.id;
    this.setState({ loading: true });
    this.props.putTaxGroup({ action, taxGroupId, tenantId });
  };

  listTaxGroup = items => {
    return items.map((item, index) => (
      <TaxGroupCell
        item={item}
        index={index}
        key={index}
        tenantsByDomain={this.props.tenantsByDomain}
        editGroup={this.openEditTaxGroupForm(item, index)}
        changeStatus={this.handleStatusChange}
      />
    ));
  };

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
    }, () => this.getAllTaxGroup());
  }

  handleChange = (name) => event => {
    this.setState({
      [name]: event.target.value
    }, () => {
      if(name === 'searchText'){
        this.getAllTaxGroup(true)
      }
    })
  }

  handleMenu = (selectedMenu) => event => {
    let items = {
      archived: false,
      inactive: false
    }
    this.setState({...items,[selectedMenu]: true, selectedMenu}, () => {
      this.getAllTaxGroup(true);
    });
  }

  render() {
    const { isFetching, taxGroups, tenantsByDomain, newGroup } = this.props;
    const { selectedMenu, searchText } = this.state;
    let content = this.showLoader();
    if (!isFetching && taxGroups) {
      if (taxGroups.items.length) {
        content = this.listTaxGroup(taxGroups.items);
      } else {
        content = this.noTaxes();
      }
    }

    let showTaxRate = false;
    if (newGroup.id !== undefined) {
      showTaxRate = true;
    }

    return (
      <div className="">
        <div className="app-module animated slideInUpTiny animation-duration-3">
          <div className="app-module-sidenav d-none d-xl-flex">
            <InnerSidebar
              width={this.props.width}
              heading={<IntlMessages id="pages.taxesPage.title" />}
              addButtonTxt={<IntlMessages id="pages.taxesPage.btn.add_tax"/>}
              addBtnClick={this.openTaxGroupForm(true)}
              onSelect={this.handleMenu}
              selected={selectedMenu}
              allTxt={<IntlMessages id="pages.taxesPage.btn.allTaxGroups"/>}
              icon={<span style={{fontSize:'30px'}} className="mr-2 font-weight-bold">%</span>}
            />
          </div>
          <div className="module-box">
            <div className="module-box-header">
              <IconButton className="drawer-btn d-block d-xl-none" aria-label="Menu">
                <i className="zmdi zmdi-menu"/>
              </IconButton>
              <AppModuleHeader
                placeholder="Search Tax Groups"
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
                  {content}
              </CustomScrollbars>
              </div>
                <Pagination
                  colspan={3}
                  totalPages={taxGroups.totalPages}
                  count={taxGroups.totalCount}
                  rowsPerPage={this.state.rowsPerPage}
                  page={this.state.page}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  name="Taxes"
                  styleName={"position-absolute fixed-bottom ml-0"}
                />
            </div>
          </div>
        </div>
          <TaxGroupForm
            showForm={this.state.showTaxForm}
            closeForm={this.openTaxGroupForm(false)}
            edit={this.state.editForm}
            data={this.state.editData}
            tenantsByDomain={tenantsByDomain}
          />

          <TaxRateForm
            showForm={Boolean(this.state.showTaxRateForm && showTaxRate)}
            closeForm={this.openTaxRateForm(false)}
            taxGroup={newGroup}
            tenantsByDomain={tenantsByDomain}
            resetData={true}
        />
      </div>
    );
  }
}
const mapStateToProps = ({ tenants, taxes, settings }) => {
  const { tenantsByDomain } = tenants;
  return {
    width: settings.width,
    isFetching: taxes.get('isFetching'),
    actionLoader: taxes.get('actionLoader'),
    refetchList: taxes.get('refetchList'),
    taxGroups: taxes.get('taxGroups').toJS(),
    newGroup: taxes.get('newGroup').toJS(),
    tenantsByDomain,
  };
};
export default connect(
  mapStateToProps,
  {
    fetchAllTaxGroup,
    putTaxGroup,
    resetTaxGroup,
  },
)(TaxGroup);
