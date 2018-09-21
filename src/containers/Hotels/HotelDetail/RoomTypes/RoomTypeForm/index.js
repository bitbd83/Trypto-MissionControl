import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import FormDrawer from 'components/FormDrawer';
import IntlMessages from 'util/IntlMessages';
import FormDrawerHeader from 'components/FormDrawer/FormDrawerHeader';
import FormDrawerContent from 'components/FormDrawer/FormDrawerContent';
import FormDrawerFooter from 'components/FormDrawer/FormDrawerFooter';
import CircularProgress from '@material-ui/core/CircularProgress';
import { createObject } from 'util/helpers';
import * as Immutable from 'immutable';
import RoomTypeInventory from './RoomTypeInventory'
import RoomTypeDailyInventory from './RoomTypeDailyInventory'
import moment from 'moment';
import {
  addRoomType,
  patchRoomType,
  resetRoomType,
  addRoomTypeDailyInventory,
} from "../actions";


class RoomTypeForm extends React.Component {
  constructor(props) {
    super(props);

    let submitRoomTypeInventory = false;
    let roomtypes = this.getDefaultRoomTypes(props);

    this.state = {
      editFlag: false,
      focusedInput:null,
      nextStep:false,
      selectedRoomTypeKey: null,
      submitRoomTypeInventory,
      roomtypes
    }
  }

  getDefaultRoomTypes = (props) => {

    return {
      "description": "",
      "inventoryDates": {
        "from": moment(props.hotelInventory.inventoryDates.from).utc(),
        "to": moment(props.hotelInventory.inventoryDates.to).utc(),
      },
      "roomTypeId": {
        "id": "",
        "provider": '',
        "name": ""
      },
      "occupancy": {
        "maxGuests": 0,
        "maxAdults": 0,
        "maxChildren": 0,
        "minNights": props.hotelInventory.minNights || 0,
        "otherOccupancyDetails": ""
      },
      "amenities": [],
      "concessions": "",
      "cancellationPolicy": {
        "customerPolicy": "",
        "hotelPolicy": ""
      }
    };
  }


  handleChange = (key) => event => {
    let {roomtypes} = this.state;
    let roomMap = Immutable.fromJS(roomtypes)
    let value = event.target ? event.target.value :  event;
    if(key === 'roomType'){
      roomtypes['roomTypeId'] = value.data.roomTypeId;
      roomtypes['occupancy'] = {
          "maxGuests": value.data.occupancy.maxOccupants || 0,
          "maxAdults": value.data.occupancy.maxAdults || 0,
          "maxChildren": value.data.occupancy.maxChildren || 0,
          "minNights": roomtypes.occupancy.minNights || (this.props.hotelInventory.minNights || 0),
          "otherOccupancyDetails": value.data.occupancy.otherOccupancyDetails,
        };
        this.setState({ roomtypes, selectedRoomTypeKey: value.key });
    } else{
      this.setState({
        roomtypes: roomMap.mergeDeep(createObject(key, value)).toJS()
      });
    }
  }

  handleSaveRoom = data => {
    let { roomtypes } = this.state;
    roomtypes['dailyInventoryList'] = data
    this.setState({roomtypes})
  }


  componentWillReceiveProps = (nextProps) => {
    if(this.state.nextStep && !nextProps.actionLoader && nextProps.newRoomTypeId !== null){
      this.setState({submitRoomTypeInventory: true, nextStep:false})
    }

    if(nextProps.edit && !this.state.editFlag){
      let roomtypes = nextProps.editData;
      roomtypes["inventoryDates"]= {
        "from": moment(moment(nextProps.editData.inventoryDates.from).utc().format('YYYY-MM-DD')),
        "to": moment(moment(nextProps.editData.inventoryDates.to).utc().format('YYYY-MM-DD')),
      };
      let submitRoomTypeInventory = nextProps.editDailyInventory;
      let selectedRoomTypeKey = nextProps.editData.roomTypeId.id
      this.setState({submitRoomTypeInventory, roomtypes, editFlag: true, selectedRoomTypeKey });
    }
  }


  handleSubmit = () => {
    let { roomtypes, submitRoomTypeInventory } = this.state;
    const {tenantsByDomain, hotelInventory} = this.props;
    if(submitRoomTypeInventory){
      let addData = {
        dailyInventoryList: roomtypes.dailyInventoryList,
      }
      let roomTypeInventoryId = this.props.newRoomTypeId || this.props.editData.id;
      this.props.addRoomTypeDailyInventory({data:addData, tenantId: tenantsByDomain.id, hotelInventoryId: hotelInventory.id, roomTypeInventoryId});
      this.onCloseForm();
    } else {
      if(this.props.edit){
        let patchData = {
          description: roomtypes.description,
          inventoryDates: {
            from: moment(roomtypes.inventoryDates.from).format('YYYY-MM-DD'),
            to: moment(roomtypes.inventoryDates.to).format('YYYY-MM-DD'),
          },
          roomTypeId: roomtypes.roomTypeId,
          occupancy: roomtypes.occupancy,
          amenities: (roomtypes.amenities instanceof Array) ? roomtypes.amenities : roomtypes.amenities.split(','),
          concessions: roomtypes.concessions,
          cancellationPolicy: roomtypes.cancellationPolicy
        }
        let roomTypeInventoryId = this.props.newRoomTypeId || this.props.editData.id;
        this.props.patchRoomType({data: patchData, tenantId: tenantsByDomain.id, hotelInventoryId: hotelInventory.id, roomTypeInventoryId });
      } else {
        let addData = {
          basic: {
            description: roomtypes.description,
            inventoryDates: {
              from: moment(roomtypes.inventoryDates.from).format('YYYY-MM-DD'),
              to: moment(roomtypes.inventoryDates.to).format('YYYY-MM-DD'),
            },
            roomTypeId: roomtypes.roomTypeId,
            occupancy: roomtypes.occupancy
          },
          additional:{
            amenities: roomtypes.amenities.length > 0 ? roomtypes.amenities.split(',') : [],
            concessions: roomtypes.concessions,
            cancellationPolicy: roomtypes.cancellationPolicy
          }
        }
        this.props.addRoomType({data:addData, tenantId: tenantsByDomain.id, hotelInventoryId: hotelInventory.id});
      }

      this.setState({nextStep: true})
    }
  }

  onChangeRoomType = (room) => {
    this.setState({
      roomtypes: room
    })
  }

  onDatesChange = (startDate, endDate) => {
    const { roomtypes } = this.state;
    roomtypes.inventoryDates.from = startDate
    roomtypes.inventoryDates.to = endDate
    this.setState({roomtypes})
  }

  onCloseForm = () => {
    this.setState({
      submitRoomTypeInventory:false,
      editFlag: false,
      roomtypes: this.getDefaultRoomTypes(this.props),
      selectedRoomTypeKey: null
    });

    if(this.props.newRoomTypeId){
      this.props.resetRoomType();
    }
    this.props.closeForm();
  }

  render() {
    const { hotelInventory, tenantsByDomain, saveRoomType, edit, editData } = this.props;
    const {roomtypes, submitRoomTypeInventory, selectedRoomTypeKey}  = this.state;

    let content = '';
    if(!submitRoomTypeInventory){
       content = <RoomTypeInventory
          onDatesChange={this.onDatesChange}
          onChangeRoomType={this.onChangeRoomType}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          hotelInventory={hotelInventory}
          roomtypes={roomtypes}
          tenantsByDomain={tenantsByDomain}
          selectedRoomTypeKey={selectedRoomTypeKey}
        />
    }else{
      content = <RoomTypeDailyInventory
          roomtypes={roomtypes}
          hotelInventory={hotelInventory}
          saveRoomType={saveRoomType}
          saveRoomDetails={this.handleSaveRoom}
          tenantsByDomain={tenantsByDomain}
          edit={edit}
        />
    }

    return (
      <FormDrawer open={this.props.showForm} width="large">
        <FormDrawerHeader closeClick={this.onCloseForm}>
          {!submitRoomTypeInventory ? <IntlMessages id="containers.Hotels.HotelDetails.roomTypes.Form.step1.heading" />
            : <IntlMessages id="containers.Hotels.HotelDetails.roomTypes.Form.step2.heading" />}
        </FormDrawerHeader>
        <FormDrawerContent>
         {content}
        </FormDrawerContent>

        <FormDrawerFooter>
          <Button
            type="submit"
            onClick={this.handleSubmit}
            className="mr-2"
            variant="raised"
            color="primary"
            disabled={this.props.actionLoader}>
            {this.props.actionLoader ? (
              <CircularProgress size={20} style={{ color: 'white' }} />
            ) : (
              !submitRoomTypeInventory ? <IntlMessages id="containers.Hotels.HotelDetails.roomTypes.Form.step1.saveBtn" />
                : <IntlMessages id="containers.Hotels.HotelDetails.roomTypes.Form.step2.saveBtn" />
            )}
          </Button>
          <Button disabled={this.props.actionLoader} onClick={this.onCloseForm} color="secondary" className="mt-1">
            <IntlMessages id="pages.questionPage.btn.question_type_cancel" />
          </Button>
        </FormDrawerFooter>
      </FormDrawer>
    );
  }
}

const mapStateToProps = ({ hotelRoomTypes }) => {
  return {
    isFetching: hotelRoomTypes.get('isFetching'),
    actionLoader: hotelRoomTypes.get('actionLoader'),
    newRoomTypeId: hotelRoomTypes.get('newRoomTypeId'),
  };
}

export default connect(mapStateToProps, {
  addRoomType,
  patchRoomType,
  addRoomTypeDailyInventory,
  resetRoomType,
})(RoomTypeForm);

