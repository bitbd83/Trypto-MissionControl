import React from 'react';
import Button from '@material-ui/core/Button';
import FormDrawer from 'components/FormDrawer';
import FormDrawerHeader from 'components/FormDrawer/FormDrawerHeader';
import FormDrawerContent from 'components/FormDrawer/FormDrawerContent';
import FormDrawerFooter from 'components/FormDrawer/FormDrawerFooter';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';
// import { addFees, patchCode, postCode } from '../actions';
import IntlMessages from 'util/IntlMessages';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import Select from 'react-select'
import Dropdown from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import CurrencyInput from 'components/CommonInputs/CurrencyInput';
import  RoomType from 'components/HotelInventory/RoomType'
import Grid from '@material-ui/core/Grid';
import { DateRangePicker, isInclusivelyAfterDay, isInclusivelyBeforeDay } from "react-dates";
import FormLabel from '@material-ui/core/FormLabel';
import moment from 'moment'


class EditHotelForm extends React.Component {

    constructor (props) {
      super();
      this.state = this.getInitialState();
    }

    getInitialState = () => {
      const initialState = {
        "from": moment(moment().utc().format('YYYY-MM-DD')),
        "to": moment(moment().utc().format('YYYY-MM-DD')),
        maxAdults:1,
        maxChildren: 2,
      };
      return initialState;
    }

    handleCloseDrawer = () => {
      let states = this.getInitialState();
      this.setState(states);
      this.props.closeForm();
    }

    handleChangeRoom = (name) => event => {
      const value = event.key;
      this.setState({[name]: value})
    }

    handleChange = (name) => event => {
      this.setState({[name]: event.target.value})
    }

    onDatesChange = (startDate, endDate) => {
      this.setState({from:startDate, to:endDate})
    }

    render() {
      const { questions } = this.state;
      const currencySymbol = this.props.tenantsByDomain.currency ? this.props.tenantsByDomain.currency.symbol : '';

      return (
        <FormDrawer open={this.props.showForm}>
          <FormDrawerHeader
            closeClick={this.handleCloseDrawer}>
              <IntlMessages id="containers.orders.orderInfo.edit_hotels" />
          </FormDrawerHeader>
          <FormDrawerContent>
          <div className="d-flex p-0 align-items-center justify-content-between">
            <div className="mr-4 col">
              <RoomType
                value={this.state.roomType}
                onChangeRoomType={this.handleChangeRoom('roomType')}
                hotelInventoryId="5b68e60607d41b299c37f64b"
                tenantsByDomain={this.props.tenantsByDomain}
              />
            </div>
            <div className={'d-flex flex-column'}>
              <FormLabel className={'shrink'}><IntlMessages id="pages.hotelsPage.searchHotel.inventoryDates.label" /></FormLabel>
              <DateRangePicker
                startDate={this.state.from} // momentPropTypes.momentObj or null,
                startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                endDate={this.state.to} // momentPropTypes.momentObj or null,
                endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                onDatesChange ={({ startDate, endDate }) => onDatesChange(startDate, endDate)}
                focusedInput={this.state.focusedInput}
                onFocusChange={focusedInput => this.setState({ focusedInput })}
                daySize={40}
                small
              />
            </div>
          </div>

          <div className="d-flex px-3 mb-2 mt-4">
            <TextField
              id="maxAmount"
              label={<IntlMessages id="containers.Hotels.HotelDetails.roomTypes.Form.step1.max_adults" />}
              value={this.state.maxAdults}
              onChange={this.handleChange('maxAdults')}
              margin="dense"
              inputProps={{ min: 0 }}
              type="number"
              className="mr-4"
            />
            <TextField
              id="maxAmount"
              label={<IntlMessages id="containers.Hotels.HotelDetails.roomTypes.Form.step1.max_children" />}
              value={this.state.maxChildren}
              onChange={this.handleChange('maxChildren')}
              margin="dense"
              inputProps={{ min: 0 }}
              type="number"
              className={'col-4'}
            />
        </div>
        </FormDrawerContent>
          <FormDrawerFooter>
            <Button
              type="submit"
              onClick={this.handleCloseDrawer}
              className="mr-2"
              variant="raised"
              color="primary">
              {this.props.actionLoader ? <CircularProgress size={24} color="secondary" /> : <IntlMessages id="button.save_btn" />}
            </Button>
            <Button onClick={this.handleCloseDrawer} color="secondary">
              <IntlMessages id="button.cancel_btn" />
            </Button>
          </FormDrawerFooter>

        </FormDrawer>
      );
    }
}

const mapStateToProps = ({ tenants, discountCodes }) => {
  return {
    actionLoader: discountCodes.get('actionLoader'),
    tenantsByDomain: tenants.tenantsByDomain,
    newCode: discountCodes.get('newCode').toJS(),
  };
};
export default connect(
  mapStateToProps,
)(EditHotelForm);

