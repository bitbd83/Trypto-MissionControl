import React from 'react';
import { connect } from 'react-redux';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Select from 'react-select';
import { fetchAllRoomTypes } from 'containers/Hotels/actions';
import IntlMessages from 'util/IntlMessages';
import _ from 'lodash';

class RoomType extends React.Component {

  componentWillMount = () => {
    const {hotelInventoryId, tenantsByDomain} = this.props
    this.props.fetchAllRoomTypes({ hotelInventoryId,tenantId: tenantsByDomain.id });
  }

  onChangeRoomType = key => {
    let data = _.find(this.props.roomTypes, (room) => room.roomTypeId.id === key);
    this.props.onChangeRoomType({data, key: key})
  }

  render() {
    const { roomTypes, value, loader } = this.props;
    let options =  []
    if(roomTypes.length){
      roomTypes.map((room, key) => options.push({label: room.name, value: room.roomTypeId.id}))
    }
    return (
      <div>
        <FormControl component="fieldset" className="w-100 mb-2">
          <FormLabel className={'shrink'}><IntlMessages id="component.hotelInventory.roomType.title" /></FormLabel>
          <Select
            placeholder={<IntlMessages id="component.hotelInventory.roomType.placeholder" />}
            isLoading={loader}
            value={value}
            onChange={this.onChangeRoomType}
            options={options}
            simpleValue={true}
          />
        </FormControl>
      </div>
    );
  }
}

const mapStateToProps = ({ hotels}) => {
  return {
    roomTypes: hotels.get('roomTypes').toJS(),
    loader: hotels.get('isFetchingRoomType'),
  };
}

export default connect(mapStateToProps, {fetchAllRoomTypes})(RoomType);


