import React from 'react';
import { connect } from 'react-redux';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import Select from 'react-select';
import { fetchAllRoomTypes } from 'containers/Hotels/actions';
import IntlMessages from 'util/IntlMessages';

class Amenities extends React.Component {

  componentWillMount = () => {
    const {hotelInventoryId, tenantsByDomain} = this.props
    this.props.fetchAllRoomTypes({ hotelInventoryId, tenantId: tenantsByDomain.id });
  }

  onChangeAmenities = amenities => {
    this.props.onChangeAmenities(amenities)
  }

  render() {
    const { amenities } = this.props;
    let options =  [];
    if(amenities.length){
      amenities.map((amenity) => options.push({label: amenity.name, value: amenity.name}))
    }
    return (
      <FormControl className="w-100 mb-2">
        <FormLabel className={'shrink'}><IntlMessages id="component.hotelInventory.amenities.title" /></FormLabel>
        <FormGroup>
        <Select
          placeholder={<IntlMessages id="component.hotelInventory.amenities.placeholder" />}
          isLoading={this.props.loader}
          value={this.props.value}
          multi={true}
          onChange={this.onChangeAmenities}
          options={options}
          joinValues={true}
          simpleValue={true}
        />
        </FormGroup>
      </FormControl>
    );
  }
}

const mapStateToProps = ({ hotels}) => {
  return {
    amenities: hotels.get('amenities').toJS(),
    loader: hotels.isFetching,
  };
}

export default connect(mapStateToProps, {fetchAllRoomTypes})(Amenities);
