import React from 'react';
import TextField from '@material-ui/core/TextField';
import IntlMessages from 'util/IntlMessages';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import  RoomType from 'components/HotelInventory/RoomType'
import  Amenities from 'components/HotelInventory/Amenities'
import { DateRangePicker, isInclusivelyAfterDay, isInclusivelyBeforeDay } from "react-dates";
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';
import moment from 'moment';

class RoomTypeInventory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focusedInput:null,
    }
  }

  isOutsideRange = (day) => {
    const {hotelInventory}  = this.props;
    return !(
      isInclusivelyAfterDay(day, moment(hotelInventory.inventoryDates.from).utc()) &&
      isInclusivelyBeforeDay(day, moment(hotelInventory.inventoryDates.to).utc())
    );
  }

  render() {
    const {roomtypes, onDatesChange, handleChange, hotelInventory, selectedRoomTypeKey, tenantsByDomain}  = this.props;
    return (
     <React.Fragment>
      <Typography className="mb-4" variant={'title'}>
        <IntlMessages id="containers.Hotels.HotelDetails.roomTypes.Form.step1.subheading" />
      </Typography>

      <Typography className={'my-1 form-drawer-section-header'} variant={'subheading'} gutterBottom>
        <IntlMessages id="containers.Hotels.HotelDetails.roomTypes.Form.step1.basicInfoTitle" />
      </Typography>
      <div className={'pl-4  mb-5'}>
        <Grid container spacing={16} justify={'flex-start'} alignItems={'center'}>
          <Grid item xs>
            <RoomType
              value={selectedRoomTypeKey}
              onChangeRoomType={handleChange('roomType')}
              hotelInventoryId={hotelInventory.id}
              tenantsByDomain={tenantsByDomain}
            />
          </Grid>
          <Grid item xs className={'d-flex flex-column'}>
            <FormLabel className={'shrink'}><IntlMessages id="pages.hotelsPage.searchHotel.inventoryDates.label" /></FormLabel>
            <DateRangePicker
              startDate={roomtypes.inventoryDates.from} // momentPropTypes.momentObj or null,
              startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
              endDate={roomtypes.inventoryDates.to} // momentPropTypes.momentObj or null,
              endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
              onDatesChange ={({ startDate, endDate }) => onDatesChange(startDate, endDate)}
              focusedInput={this.state.focusedInput}
              onFocusChange={focusedInput => this.setState({ focusedInput })}
              daySize={40}
              isOutsideRange={this.isOutsideRange}
            />
          </Grid>
        </Grid>

        <FormControl className="w-100 my-3">
          <TextField
            id="description"
            value={roomtypes.description}
            onChange={handleChange('description')}
            label={
              <React.Fragment>
                <IntlMessages id="containers.Hotels.HotelDetails.roomTypes.Form.step1.description" />
                <small> (optional)</small>
              </React.Fragment>
            }
            rowsMax="4"
            margin="none"
            fullWidth
            multiline
          />
          <FormHelperText>{<IntlMessages id="containers.Hotels.HotelDetails.roomTypes.Form.step1.description_description" />}</FormHelperText>
        </FormControl>
      </div>

      <Typography className={'my-1 form-drawer-section-header'} variant={'subheading'}>
        <IntlMessages id="containers.Hotels.HotelDetails.roomTypes.Form.step1.occupancy_title" />
      </Typography>
      <div className="pl-4  mb-5">
        <div className="d-flex justify-content-between my-2">
          <TextField
            id="maxGuests"
            label={<IntlMessages id="containers.Hotels.HotelDetails.roomTypes.Form.step1.max_guests" />}
            value={roomtypes.occupancy.maxGuests}
            onChange={handleChange('occupancy.maxGuests')}
            margin="dense"
            inputProps={{ min: 0 }}
            type="number"
          />
          <TextField
            id="maxAmount"
            label={<IntlMessages id="containers.Hotels.HotelDetails.roomTypes.Form.step1.max_adults" />}
            value={roomtypes.occupancy.maxAdults}
            onChange={handleChange('occupancy.maxAdults')}
            margin="dense"
            inputProps={{ min: 0 }}
            type="number"
          />
          <TextField
            id="maxAmount"
            label={<IntlMessages id="containers.Hotels.HotelDetails.roomTypes.Form.step1.max_children" />}
            value={roomtypes.occupancy.maxChildren}
            onChange={handleChange('occupancy.maxChildren')}
            margin="dense"
            inputProps={{ min: 0 }}
            type="number"
            className={'col-4'}
          />
        </div>
        <TextField
          id="maxAmount"
          label={<IntlMessages id="containers.Hotels.HotelDetails.roomTypes.Form.step1.min_nights" />}
          value={roomtypes.occupancy.minNights}
          onChange={handleChange('occupancy.minNights')}
          margin="none"
          inputProps={{ min: 0 }}
          type="number"
        />
        <FormHelperText>{<IntlMessages id="containers.Hotels.HotelDetails.roomTypes.Form.step1.min_nights_description" />}</FormHelperText>
        <FormControl className="w-100 my-3">
          <TextField
            id="otherOccupancyDetails"
            value={roomtypes.occupancy.otherOccupancyDetails}
            onChange={handleChange('occupancy.otherOccupancyDetails')}
            label={<IntlMessages id="containers.Hotels.HotelDetails.roomTypes.Form.step1.otherOccupancyDetails" />}
            rowsMax="4"
            margin="none"
            fullWidth
            multiline
          />
          <FormHelperText>{<IntlMessages id="containers.Hotels.HotelDetails.roomTypes.Form.step1.otherOccupancyDetails_description" />}</FormHelperText>
        </FormControl>
      </div>

      <Typography variant={'subheading'} className={'form-drawer-section-header'} gutterBottom>
        <IntlMessages id="containers.Hotels.HotelDetails.roomTypes.Form.step1.amenitiesTitle" />
      </Typography>
      <div className="pl-4 mb-5">
        <Amenities
          value={roomtypes.amenities}
          onChangeAmenities= {handleChange('amenities')}
          hotelInventoryId={hotelInventory.id}
          tenantsByDomain={tenantsByDomain}
        />
        <FormControl fullWidth>
          <TextField
            id="concessions"
            value={roomtypes.concessions}
            onChange={handleChange('concessions')}
            label={<IntlMessages id="containers.Hotels.HotelDetails.roomTypes.Form.step1.concessions" />}
            rowsMax="4"
            margin="none"
            fullWidth
            multiline
          />
        </FormControl>
      </div>

      <Typography className={'my-1 form-drawer-section-header'} variant={'subheading'}>
        <IntlMessages id="containers.Hotels.HotelDetails.roomTypes.Form.step1.cancellation" />
      </Typography>
      <div className="pl-4">
        <FormControl fullWidth>
          <TextField
            id="clientDescription"
            value={roomtypes.cancellationPolicy.customerPolicy}
            onChange={handleChange('cancellationPolicy.customerPolicy')}
            label={<IntlMessages id="containers.Hotels.HotelDetails.roomTypes.Form.step1.clientCancellationPolicy" />}
            rowsMax="4"
            margin="normal"
            fullWidth
            multiline
          />
          <FormHelperText>{<IntlMessages id="containers.Hotels.HotelDetails.roomTypes.Form.step1.otherOccupancyDetails_description" />}</FormHelperText>
        </FormControl>

        <FormControl fullWidth>
          <TextField
            id="hotelDescription"
            value={roomtypes.cancellationPolicy.hotelPolicy}
            onChange={handleChange('cancellationPolicy.hotelPolicy')}
            label={<IntlMessages id="containers.Hotels.HotelDetails.roomTypes.Form.step1.hotelCancellationPolicy" />}
            rowsMax="4"
            margin="normal"
            fullWidth
            multiline
          />
          <FormHelperText>{<IntlMessages id="containers.Hotels.HotelDetails.roomTypes.Form.step1.otherOccupancyDetails_description" />}</FormHelperText>
        </FormControl>
      </div>

      </React.Fragment>
    );
  }
}


export default RoomTypeInventory;
