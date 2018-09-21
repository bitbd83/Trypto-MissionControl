import React, {Component} from 'react';
import {connect} from 'react-redux';
import IntlMessages from 'util/IntlMessages';
import Button from '@material-ui/core/Button';
import CardBox from 'components/CardBox';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import RoomTypeCell from './RoomTypeCell';
import RoomTypeForm from './RoomTypeForm';
import Loader from '../../../../components/Loader';
import { fetchRoomTypeInventories, putRoomType } from "./actions";
import InlinePagination from 'components/Pagination/InlinePagination'


class RoomTypes extends Component {
  constructor(props) {
    super();
    this.state = {
      rowsPerPage: 10,
      page: 0,
      edit: false,
      editData: {},
      editDailyInventory: false,
      showForm:false,
      savedRoomTypes: [],
      archived: false
    }
  }

  componentWillReceiveProps = (nextProps) => {
    const { refetchList } = nextProps
    if(refetchList){
      this.getAllRoomTypes();
    }
  }

  componentWillMount(){
    this.getAllRoomTypes();
  }

  handleChangePage = page => {
    this.setState({ page },
    () => this.getAllRoomTypes());
  }

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value },
      () => this.getAllRoomTypes());
  };

  getAllRoomTypes = (reset = false) => {
    const { page, rowsPerPage, archived } = this.state;
    const { tenantsByDomain, hotelInventory } = this.props
    let skip = page * rowsPerPage;
    let take = rowsPerPage;
    if(reset){
      skip = 0;
      take = rowsPerPage;
    }
    this.props.fetchRoomTypeInventories({
      tenantId: tenantsByDomain.id,
      hotelInventoryId: hotelInventory.id,
      skip,
      take,
      archived
    });
  };

  openAddForm = status => event => {
    this.setState({
      showForm: status,
      edit: false,
      editData: {},
      editDailyInventory: false
    });
  };

  openEditForm = (item, daily = false) => {
    this.setState({
      showForm: true,
      edit: true,
      editData: item,
      editDailyInventory: daily
    });
  };

  onCloseForm = (data) => {
    const taxData = this.state.taxData;
    taxData.push(data)
    this.setState({
      taxData
    })
  }

  changeStatus = (action, roomTypeInventoryId) => {
    const { tenantsByDomain, hotelInventory } = this.props
    this.props.putRoomType({
      action,
      roomTypeInventoryId,
      tenantId: tenantsByDomain.id,
      hotelInventoryId: hotelInventory.id
    });
  };

  noRoomTypes = () => (
    <div className="row">
      <CardBox styleName="col-12 text-center" heading={<IntlMessages id="containers.Hotels.HotelDetails.noRoomTypes.heading" />} childrenStyle="text-center">
        <div>
          <p>{<IntlMessages id="containers.Hotels.HotelDetails.noRoomTypes.description" />}</p>
          <Button
            variant="raised"
            onClick={this.openAddForm(true)}
            className="jr-btn text-white bg-primary">
            <span>
              <IntlMessages id="containers.Hotels.HotelDetails.noRoomTypes.btnText" />
            </span>
          </Button>
        </div>
      </CardBox>
    </div>
  );

  render() {
    const { tenantsByDomain, hotelInventory, isFetching, roomTypeList } = this.props;
    const { showForm, edit, editData, editDailyInventory } = this.state;

    return (
      <React.Fragment>
        <Grid container justify={'space-between'} alignItems={'center'}>
          <Grid item>
            <Typography variant={'title'}>
              <IntlMessages id="containers.Hotels.HotelDetails.roomTypes.heading" />
            </Typography>
          </Grid>

          {roomTypeList.items.length > 0 && (
            <Grid item>
              <Button
                variant="raised"
                onClick={this.openAddForm(true)}
                className="jr-btn text-white bg-primary">
                <span>
                  <IntlMessages id="containers.Hotels.HotelDetails.noRoomTypes.btnText" />
                </span>
              </Button>
            </Grid>
          )}

        </Grid>
        <div className={'app-wrapper'}>
          { isFetching && <Loader /> }

          {!isFetching && !roomTypeList.items.length ? (
            this.noRoomTypes()
          ) : (
            <React.Fragment>
              <Paper elevation={1}>
                {roomTypeList.items.map((item, index) => (
                  <RoomTypeCell
                    key={index}
                    index={index}
                    item={item}
                    onChangeStatus={this.changeStatus}
                    tenantsByDomain={tenantsByDomain}
                    hotelInventory={hotelInventory}
                    onEdit={this.openEditForm}
                  />
                ))}
              </Paper>
              <InlinePagination
                colspan={3}
                totalPages = {roomTypeList.totalPages}
                count={roomTypeList.totalCount}
                rowsPerPage={this.state.rowsPerPage}
                page={this.state.page}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                name={<IntlMessages id="containers.Hotels.HotelDetails.roomTypes.heading" />}
              />
            </React.Fragment>
          )}
        </div>

        <RoomTypeForm
          showForm={showForm}
          closeForm={this.openAddForm(false)}
          onCloseTaxForm = {this.onCloseForm}
          hotelInventory={hotelInventory}
          tenantsByDomain={tenantsByDomain}
          saveRoomType={this.saveRoomType}
          edit={edit}
          editData={editData}
          editDailyInventory={editDailyInventory}
        />

      </React.Fragment>
    )
  }
}
const mapStateToProps = ({ tenants, hotelRoomTypes }) => {
  return {
    tenantsByDomain: tenants.tenantsByDomain,
    roomTypeList: hotelRoomTypes.get('roomTypeList').toJS(),
    isFetching: hotelRoomTypes.get('isFetching'),
    refetchList: hotelRoomTypes.get('refetchList'),
    newRoomTypeId: hotelRoomTypes.get('newRoomTypeId'),
  };
}

export default connect(mapStateToProps, {
  fetchRoomTypeInventories,
  putRoomType,
})(RoomTypes);
