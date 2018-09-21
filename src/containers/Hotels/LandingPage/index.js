import React, {Component} from 'react';
import IconButton from '@material-ui/core/IconButton';
import {connect} from 'react-redux';
import IntlMessages from 'util/IntlMessages';
import CustomScrollbars from 'util/CustomScrollbars';
import AppModuleHeader from 'components/AppModuleHeader/index';
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import HotelSidebar from '../components/Sidebar'
import HotelCell from '../components/HotelsList/HotelCell'
import Pagination from 'components/Pagination';
import AddHotels from '../components/AddHotels';
import { fetchHotelInventoryList, resetSearchHotels, putHotelInventoryDetail }  from "../actions"
import CardBox from 'components/CardBox/index';

class LandingPage extends Component {
  constructor() {
    super();
    this.state = {
      rowsPerPage: 10,
      page: 0,
      searchText: '',
      selectedSectionId: 1,
      drawerState: false,
      searchUser: '',
      archived: false,
      inactive: false,
      showForm: false,
      selectedMenu: ''
    }
  }

  handleChange = name => event =>
    this.setState({[name]: event.target.value}, () => this.getAllHotelInvenory(true));

  handleChangePage = page => {
    this.setState({page: page ? page : 0}, () => this.getAllHotelInvenory());
  };

  handleChangeRowsPerPage = event => {
    this.setState({rowsPerPage: event.target.value, page: 0}, () => this.getAllHotelInvenory());
  };

  openAddHotelForm = (status) => event => {
    this.props.resetSearchHotels();
    this.setState({showForm: status});
  }

  showLoader = () => (
    <div className="d-flex justify-content-center mt-4">
      <CircularProgress/>
    </div>
  )

  componentWillMount = () => {
    this.getAllHotelInvenory();
  };

  componentWillReceiveProps = (nextProps) => {
    if(nextProps.refetchList){
      this.getAllHotelInvenory();
    }
  }

  handleMenu = (selectedMenu) => event => {
    let items = {
      archived: false,
      inactive: false
    }
    this.setState({...items,[selectedMenu]: true, selectedMenu}, () => this.getAllHotelInvenory(true));
  }

  getAllHotelInvenory = (reset = false) => {
    const { page, rowsPerPage, archived, inactive, searchText } = this.state;
    const { id } = this.props.tenantsByDomain
    let skip = page * rowsPerPage;
    let take = rowsPerPage;
    if(reset){
      skip = 0;
      take = rowsPerPage;
    }
    this.props.fetchHotelInventoryList({ tenantId: id, skip, take, archived, inactive, searchText });
  };

  listHotels = (items) => {
    let {searchText} = this.state;
    return items.filter(item => item.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1).map((item, index) => {
      return <HotelCell
        item={item}
        index={index}
        key={index}
        changeStatus={this.onChangeStatus}
        tenantsByDomain={this.props.tenantsByDomain}/>
    })
  }

  onChangeStatus = (action, hotelInventoryId) => {
    const { tenantsByDomain } = this.props
    this.props.putHotelInventoryDetail({
      action,
      tenantId: tenantsByDomain.id,
      hotelInventoryId,
    });
  };

  noHotels = () => {
    return (
      <div className="row m-4">
        <CardBox styleName="col-12 text-center" heading={<IntlMessages id="pages.hotelsPage.noHotel.label.title" />} childrenStyle="text-center">
          <div>
            <p><IntlMessages id="pages.hotelsPage.noHotel.label.description" /></p>
          </div>
        </CardBox>
    </div>
    );
  }

  render() {
    const {searchText, selectedMenu} = this.state;
    const {isFetching, inventoryList} = this.props;
    let content = this.showLoader();

    if (!isFetching && inventoryList) {
      if (inventoryList.items.length) {
        content = this.listHotels(inventoryList.items);
      } else {
        content = this.noHotels();
      }
    }

    return (
      <div className="app-wrapper">
        <div className="app-module animated slideInUpTiny animation-duration-3">
          <div className="app-module-sidenav d-none d-xl-flex">
            <HotelSidebar
              width={this.props.width}
              openAddHotelForm = {this.openAddHotelForm(true)}
              onSelect={this.handleMenu}
              selected={selectedMenu}
            />
          </div>

          <div className="module-box">
            <div className="module-box-header">
              <IconButton className="drawer-btn d-block d-xl-none" aria-label="Menu">
                <i className="zmdi zmdi-menu"/>
              </IconButton>
              <AppModuleHeader
                placeholder="Search Hotels"
                onChange={this.handleChange('searchText')}
                value={searchText}/>
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
                totalPages={inventoryList.totalPages}
                count={inventoryList.totalCount}
                rowsPerPage={this.state.rowsPerPage}
                page={this.state.page}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                name="Hotels"
                styleName={"position-absolute fixed-bottom ml-0"}/>
            </div>
          </div>
        </div>

        <AddHotels
          showForm={this.state.showForm}
          closeForm={this.openAddHotelForm(false)}
          edit={false}
          editData={null}
        />
      </div>
    )
  }
}
const mapStateToProps = ({settings, tenants, hotels}) => {
  return {
    width: settings.width,
    tenantsByDomain: tenants.tenantsByDomain,
    isFetching: hotels.get('isFetching'),
    refetchList: hotels.get('refetchList'),
    inventoryList: hotels.get('inventoryList').toJS(),
  };
}

export default connect(mapStateToProps,{
  fetchHotelInventoryList,
  resetSearchHotels,
  putHotelInventoryDetail,
})(LandingPage);
