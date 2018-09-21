import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import IntlMessages from 'util/IntlMessages';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import FormLabel from '@material-ui/core/FormLabel';
import FormDrawerContent from 'components/FormDrawer/FormDrawerContent';
import FormDrawerFooter from 'components/FormDrawer/FormDrawerFooter';
import { searchHotels, addHotelInventoryDetail, patchHotelInventoryDetail } from  '../../actions'
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CurrencySelect from 'components/Currency/CurrencySelect'
import Loader from 'components/Loader';
import Select from 'react-select';
import { DateRangePicker } from "react-dates";
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';
import moment from 'moment';
import PercentageInput from '../../../../components/CommonInputs/PercentageInput'
import CurrencyInput from '../../../../components/CommonInputs/CurrencyInput';


class HotelInventoryDetails extends React.Component {
  constructor(props){
    super(props);

    const name = props.hotelDetail ? props.hotelDetail.name : '';
    let hotelData = {
      name: name,
      description: '',
      minNights: 1,
      currencyCode:props.tenantsByDomain.currency.code,
      inventoryDates: {
        from: null,
        to:null,
      },
      listOnDirectSearch: true,
      paymentOptionsType:  'HotelRoomNights',
      paymentOptionsValue:  1,
    };

    if(props.edit === true){
      hotelData = props.hotelDetail;
      hotelData['currencyCode'] = hotelData.currency.code;

      hotelData['paymentOptionsType'] = 'HotelRoomNights';
      hotelData['paymentOptionsValue'] = 1;
      hotelData['paymentOptionsType'] = 'HotelRoomNights';
      hotelData['paymentOptionsValue'] = hotelData['hotelPaymentType'] === 'HotelRoomNights' && hotelData['roomNightPaymentStrategy']['totalNights'];
      hotelData['inventoryDates']['from'] = moment(moment(hotelData.inventoryDates.from).utc().format('YYYY-MM-DD'));
      hotelData['inventoryDates']['to'] = moment(moment(hotelData.inventoryDates.to).utc().format('YYYY-MM-DD'));


      if(hotelData['hotelPaymentType'] === 'DownPayment'){
        let factor = hotelData['downPaymentStrategy']['payment'];
        hotelData['paymentOptionsType'] = `${factor['factor']}${hotelData['hotelPaymentType']}`;
        hotelData['paymentOptionsValue'] = factor['amount'];
      }
    }

    this.state = {
      hotelData,
      focusedInput:null,
      currencySymbol: props.tenantsByDomain.currency.symbol,
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if(nextProps.hotelDetail && !nextProps.edit){
      let hotelData = this.state.hotelData;
      hotelData['name'] = nextProps.hotelDetail ? nextProps.hotelDetail.name : '';
      this.setState({hotelData})
    }
  }

  handleChange = (name) => event => {
    let value = event.target? event.target.value: event
    const hotelData = this.state.hotelData;
    let {currencySymbol} = this.state;
    if(name === 'listOnDirectSearch'){
      hotelData[name] = event.target.checked
    } else if(name === 'currencyCode'){
      hotelData[name] = event.id;
      currencySymbol = event.symbol
    } else{
      hotelData[name] = value
    }

    this.setState({
      hotelData,
      currencySymbol
    })
  }

  onDatesChange = (startDate, endDate) => {
    const { hotelData } = this.state;
    hotelData.inventoryDates.from = startDate
    hotelData.inventoryDates.to = endDate
    this.setState({hotelData})
  }

  handleSubmit = () => {
    const { name, description, currencyCode, listOnDirectSearch, minNights, paymentOptionsType, paymentOptionsValue } = this.state.hotelData;
    const { tenantsByDomain } = this.props;
    let Dates = {};
    const inventoryDates = this.state.hotelData.inventoryDates;
    Dates['from'] = moment(inventoryDates.from).format('YYYY-MM-DD');
    Dates['to'] = moment(inventoryDates.to).format('YYYY-MM-DD');

    let hotelPaymentType = paymentOptionsType === 'HotelRoomNights' ? 'HotelRoomNights' : 'DownPayment';
    let totalNights = paymentOptionsType === 'HotelRoomNights' ? paymentOptionsValue: 0;

    let payment = null;
    if(paymentOptionsType === 'PercentageDownPayment'){
      payment = {
        amount: paymentOptionsValue,
        factor: "Percentage"
      }
    } else if(paymentOptionsType === 'FlatDownPayment') {
      payment = {
        amount: paymentOptionsValue,
        factor: "Flat"
      }
    }

    let data = {
      name,
      description,
      currencyCode,
      minNights,
      listOnDirectSearch,
      inventoryDates: Dates,
      hotelPaymentType
    };

    if(this.props.edit){
      let hotelpayment = {
        payment: hotelPaymentType === 'DownPayment' ? payment : null
      }
      if(hotelPaymentType !== 'DownPayment'){
        hotelpayment = {
          totalNights
        }
      }
      let paymentPatch = {
        "value": hotelpayment,
        "path": "/hotelPayment",
        "op": "replace"
     }
      this.props.patchHotelInventoryDetail({data, paymentPatch ,hotelInventoryId: this.props.hotelDetail.id, tenantId: tenantsByDomain.id});
    } else {
      data = {
        ...data,
        totalNights,
        payment,
        hotelId: this.props.hotelDetail.thirdPartyId,
      }
      this.props.addHotelInventoryDetail({data, tenantId: tenantsByDomain.id});
    }


    this.setState({submit: true})
  }

  render() {
    const { newHotelId, edit,  isSearcing} = this.props;
    const hotelDetail = edit ? this.props.hotelDetail.hotel : this.props.hotelDetail;
    const { hotelData } = this.state;
    if(isSearcing || !hotelDetail.name){
      return <Loader />
    }
    if(newHotelId) {
      return <Redirect to={`/app/hotels/${newHotelId}`} />
    }
    return (
      <React.Fragment>
        <FormDrawerContent>
          <Grid container justify={'flex-start'} alignItems={'flex-start'} alignContent={'flex-start'} className="col text-truncate mb-3">
            <Grid item>
              {(!hotelDetail.photos) ?
              <div style={{fontSize: 10}}>
                  <img className="size-100 mr-1" src="http://via.placeholder.com/100x100"/>
              </div> :
              <img className="size-100 mr-1" src={hotelDetail.photos[0] && hotelDetail.photos[0].photoUrl}/>}
            </Grid>
            <Grid item xs>
              <h3 className="font-weight-bold mb-1 col-12 text-truncate" >
                  {hotelDetail.name}
              </h3>
              <Typography className="col-12 text-truncate">
                  {Object.keys(hotelDetail.address).map((address, index) => {
                    return hotelDetail.address[address] !== '' ? `${index !== 0 ? ', ' : ''}${hotelDetail.address[address]}` : null;
                  })}
              </Typography>
            </Grid>
          </Grid>
          <Divider light className={'mb-3'} />
          <Typography variant={'subheading'} className={'form-drawer-section-header'}>
            Basic Details
          </Typography>
          <div className={'pl-4 mb-5'}>
            <FormControl fullWidth>
              <TextField
                id="name"
                label={<IntlMessages id="pages.hotelsPage.searchHotel.label.name"/>}
                rowsMax="4"
                value={hotelData.name}
                onChange={this.handleChange('name')}
                margin="normal"
                fullWidth
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                id="description"
                label={
                  <React.Fragment>
                    <IntlMessages id="pages.hotelsPage.searchHotel.label.description" />
                    <small> (optional)</small>
                  </React.Fragment>
                }
                rowsMax="4"
                multiline
                value={hotelData.description}
                onChange={this.handleChange('description')}
                margin="normal"
                fullWidth
              />
              <FormHelperText className="mt-0"><IntlMessages id="pages.hotelsPage.searchHotel.label.description_description" /></FormHelperText>
            </FormControl>
          </div>
          <Typography variant={'subheading'} className={'form-drawer-section-header'}>
            Contract Info
          </Typography>
          <div className={'pl-4 mb-5'}>
            <FormControl className="w-50">
              <TextField
                id="description"
                label={<IntlMessages id="pages.hotelsPage.searchHotel.min_nights.label" />}
                value={hotelData.minNights}
                onChange={this.handleChange('minNights')}
                margin="normal"
                type={'number'}
              />
            </FormControl>

            <div className="w-50 my-3">
              <CurrencySelect
                onChange={this.handleChange('currencyCode')}
                value={hotelData.currencyCode}
              />
            </div>
            <div className="d-flex flex-column">
              <FormLabel className={'shrink'}><IntlMessages id="pages.hotelsPage.searchHotel.inventoryDates.label" /></FormLabel>
              <DateRangePicker
                startDate={hotelData.inventoryDates.from ? moment(hotelData.inventoryDates.from) : null} // momentPropTypes.momentObj or null,
                startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                endDate={hotelData.inventoryDates.to ? moment(hotelData.inventoryDates.to) : null} // momentPropTypes.momentObj or null,
                endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                onDatesChange ={({ startDate, endDate }) => this.onDatesChange(startDate, endDate)}
                focusedInput={this.state.focusedInput}
                onFocusChange={focusedInput => this.setState({ focusedInput })}
                openDirection="up"
              />
            </div>
            <div>
              <div className="d-flex my-3">
                <FormControl component="fieldset"  required >
                  <FormControlLabel value="listOnDirectSearch"
                    control={
                      <Checkbox
                        checked={hotelData.listOnDirectSearch}
                        onChange={this.handleChange('listOnDirectSearch')}
                        color="primary"
                        disableRipple={true}
                      />
                    }
                    label={<IntlMessages id="pages.hotelsPage.searchHotel.label.list_directSearch_title" />}
                  />
                  <FormHelperText className="mt-0"><IntlMessages id="pages.hotelsPage.searchHotel.label.list_directSearch_description" /></FormHelperText>
                </FormControl>
              </div>
            </div>
          </div>

          <Typography variant={'subheading'} className={'form-drawer-section-header'} gutterBottom>
            Payment Options
          </Typography>
          <div className={'pl-4'}>
            <FormControl component="fieldset" className="w-100 my-2">
              <Select
                placeholder={<IntlMessages id="component.currency.currencySelect.placeHolder" />}
                value={hotelData.paymentOptionsType}
                onChange={this.handleChange('paymentOptionsType')}
                options={[
                  {
                    value: 'HotelRoomNights',
                    label: 'By Hotel Room Nights'
                  },
                  {
                    value: 'FlatDownPayment',
                    label: 'Flat Down Payment'
                  },
                  {
                    value: 'PercentageDownPayment',
                    label: 'Percentage Down Payment'
                  }
                ]}
                simpleValue={true}
              />
            </FormControl>
            {hotelData.paymentOptionsType === 'HotelRoomNights' && (
              <FormControl className="w-50 my-3">
                <TextField
                  id="description"
                  label={<IntlMessages id="containers.Hotels.HotelDetails.Form.paymentOption.label.nights" />}
                  value={hotelData.paymentOptionsValue}
                  onChange={this.handleChange('paymentOptionsValue')}
                  margin="dense"
                  type={'number'}
                />
              </FormControl>
            )}
            {hotelData.paymentOptionsType === 'FlatDownPayment' && (
              <FormControl className="w-50 my-3">
                <CurrencyInput
                  value = {hotelData.paymentOptionsValue}
                  label={<IntlMessages id="containers.Hotels.HotelDetails.Form.paymentOption.label.amount" />}
                  onChange={this.handleChange('paymentOptionsValue')}
                  symbol={this.state.currencySymbol}
                />
              </FormControl>
            )}
            {hotelData.paymentOptionsType === 'PercentageDownPayment' && (
              <FormControl className="w-50 my-3">
                <PercentageInput
                  value = {hotelData.paymentOptionsValue}
                  label={<IntlMessages id="containers.Hotels.HotelDetails.Form.paymentOption.label.percent" />}
                  onChange={this.handleChange('paymentOptionsValue')}
                />
              </FormControl>
            )}
          </div>
        </FormDrawerContent>
        <FormDrawerFooter>
            <Button
              onClick={this.handleSubmit}
              className="mr-2"
              variant="raised"
              disabled={this.props.actionLoader}
              color="primary">
              {this.props.actionLoader ? <CircularProgress size={20} style={{ color: "white" }}/> : <IntlMessages id="pages.hotelsPage.searchHotel.btn.save"/>}
            </Button>
            <Button disabled={this.props.actionLoader} onClick={this.props.onCancel} color="secondary" className="mt-1">
              <IntlMessages id="pages.questionPage.btn.question_type_cancel"/>
            </Button>
        </FormDrawerFooter>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ settings, hotels, tenants }) => {
    return {
        width: settings.width,
        isSearcing: hotels.get('isSearcing'),
        actionLoader: hotels.get('actionLoader'),
        tenantsByDomain: tenants.tenantsByDomain,
        hotelsList: hotels.get('hotelsList').toJS(),
        newHotelId: hotels.get('newHotelInventoryId'),
    };
  };

export default connect(
  mapStateToProps,
  {
    searchHotels,
    addHotelInventoryDetail,
    patchHotelInventoryDetail
  }
)(HotelInventoryDetails);

