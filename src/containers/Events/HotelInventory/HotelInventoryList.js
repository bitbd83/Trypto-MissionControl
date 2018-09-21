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
import HotelInventorySidebar from './HotelSidebar'
import HotelInventoryCell from './HotelInventoryCell'
import Pagination from 'components/Pagination';
import { fetchHotelInventoryList }  from "../../Hotels/actions"
import { postHotelInventory, deleteHotelInventory } from '../EventOptions/actions'
import Button from '@material-ui/core/Button';

class HotelInventoryList extends Component {
  constructor(props) {
    super();
    const hotelInventoryIds = props.eventById ? props.eventById.hotelInventoryIds: [];
    const hotels = hotelInventoryIds.length ? hotelInventoryIds.map(hotel => hotel) : [];
    this.state = {
      rowsPerPage: 10,
      page: 0,
      searchText: '',
      selectedSectionId: 1,
      drawerState: false,
      searchUser: '',
      archived: false,
      showForm: false,
      selectedMenu: '',
      selectedHotel: hotels,
      deletedHotel: [],
      ...hotels,
    }
  }

  handleChange = name => event =>
    this.setState({[name]: event.target.value}, () => this.getAllHotelInvenory(true));

  handleChangePage = page => {
    this.setState({ page: page ? page : 0 }, () => this.getAllHotelInvenory());
  };

  handleChangeRowsPerPage = event => {
    this.setState({rowsPerPage: event.target.value, page: 0}, () => this.getAllHotelInvenory());
  };

  showLoader = () => (
    <div className="d-flex justify-content-center mt-4">
      <CircularProgress/>
    </div>
  )

  componentWillMount = () => {
    const { eventId } = this.props.match.params;
    const tenantId = this.props.tenantsByDomain.id;
    this.getAllHotelInvenory();
  };

  componentWillReceiveProps(nextProps){
    if(this.state.submit && !nextProps.actionLoader){
      this.props.history.push(`/app/events/${this.props.match.params.eventId}/options`);
    }
  }

  handleMenu = (selectedMenu) => event => {
    if(selectedMenu === 'archived'){
      this.setState({archived: true, selectedMenu}, () => this.getAllHotelInvenory(true));
    } else{
      this.setState({archived: false, selectedMenu}, () => this.getAllHotelInvenory(true));
    }
  }

  getAllHotelInvenory = (reset = false) => {
    const { page, rowsPerPage, archived, searchText } = this.state;
    const tenantId = this.props.tenantsByDomain.id;
    let skip = page * rowsPerPage;
    let take = rowsPerPage;
    if(reset){
      skip = 0;
      take = rowsPerPage;
    }
    this.props.fetchHotelInventoryList({ skip, take, archived, searchText, tenantId, complete:true });
  };

  onSubmit = () => {
    const { selectedHotel, deletedHotel } = this.state;
    const { eventId } = this.props.match.params;
    const { hotelInventoryIds } = this.props.eventById;
    let selectedData = [];
    if(hotelInventoryIds.length){
      selectedHotel.map((hotel, index) => {
        const selectInidex = hotelInventoryIds.indexOf(hotel);
        if(selectInidex === -1){
          selectedData.push(hotel)
        }
      })
    }else{
      selectedData = selectedHotel
    }
    const data = { ids: selectedData}
    if(deletedHotel.length) this.props.deleteHotelInventory({eventId, data: {ids: deletedHotel}})
    if(selectedData.length){
      this.props.postHotelInventory({eventId, data})
    }
    this.setState({submit: true})
  }

  handleSelectHotel = (event) => {
    const selectedHotel = this.state.selectedHotel;
    const deletedHotel = this.state.deletedHotel;
    const { hotelInventoryIds } = this.props.eventById;
    const id = event.target.value;
    const selected = event.target.checked;
    let isDelete = false;
    if(selected){
      selectedHotel.push(id)
      if(deletedHotel.indexOf(id) !== -1) deletedHotel.splice(deletedHotel.indexOf(id), 1)
    }else{
      if(selectedHotel.indexOf(id) !== -1){
        selectedHotel.splice(selectedHotel.indexOf(id), 1)
      }

      if(hotelInventoryIds.length && deletedHotel.indexOf(id) === -1 && hotelInventoryIds.indexOf(id) !== -1){
          isDelete = true;
      }
    }
    if(isDelete) {
      if(deletedHotel.indexOf())
      deletedHotel.push(id)
    }
    this.setState({selectedHotel, deletedHotel})

  }

  listHotels = (items) => {
    let {searchText} = this.state;
    return items.filter(item => item.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1).map((item, index) => {
      return <HotelInventoryCell
                item={item}
                index={index}
                key={index}
                tenantsByDomain={this.props.tenantsByDomain}
                onSelectHotel={this.handleSelectHotel}
                selectedHotel = {this.state.selectedHotel}
              />
            })
  }

  noHotels = () => {
    return (
      <div className="app-wrapper">
        <div className="col-12 px-0">
          <Card className="m-0">
            <CardContent className="d-flex flex-column align-items-center">
              <Typography variant="headline">No Hotel Inventory added yet.</Typography>
              <div className="d-flex flex-column align-items-center">
                <span>
                  Please add one or more hotel inventory by
                </span>
                <span>
                  clicking add hotels.
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
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

    const { eventId } = this.props.match.params;

    return (
      <div className="">
        <div className="app-module animated slideInUpTiny animation-duration-3">
          <div className="app-module-sidenav d-none d-xl-flex">
            <HotelInventorySidebar
              width={this.props.width}
              heading =  {<IntlMessages id="pages.hotelsPage.label.title" />}
              onSelect={this.handleMenu}
              selected={selectedMenu}
              backLink={{url: `/app/events/${eventId}/options`, label: <IntlMessages id="pages.ticketTypesPage.backEventOptions" />}}
            />
          </div>

          <div className="module-box">
            <div className="d-flex justify-content-between">
              <div className="module-box-header w-100 d-flex justify-content-between flex-row">
                <div>
                  <IconButton className="drawer-btn d-block d-xl-none" aria-label="Menu">
                    <i className="zmdi zmdi-menu"/>
                  </IconButton>
                  <AppModuleHeader
                    placeholder="Search Hotels"
                    onChange={this.handleChange('searchText')}
                    value={searchText}
                  />
              </div>
              <div className="align-self-center mr-3">
                <Button onClick={this.onSubmit} className="btn-block mb-2" variant="raised" aria-label="add new" color="primary">
                  {this.props.actionLoader ? (
                      <CircularProgress size={20} style={{ color: 'white' }} />
                    ) : (
                      <IntlMessages id="button.save_btn" />
                    )}
                </Button>
              </div>
              </div>
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

      </div>
    )
  }
}
const mapStateToProps = ({settings, tenants, hotels, createanevent, eventoptions }) => {
  return {
    width: settings.width,
    tenantsByDomain: tenants.tenantsByDomain,
    isFetching: hotels.get('isFetching'),
    inventoryList: hotels.get('inventoryList').toJS(),
    eventById: createanevent.eventById,
    actionLoader: eventoptions.actionLoader
  };
}

export default connect(mapStateToProps,{
  fetchHotelInventoryList,
  postHotelInventory,
  deleteHotelInventory
})(HotelInventoryList);
