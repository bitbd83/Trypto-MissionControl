import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import FormDrawer from 'components/FormDrawer';
import FormDrawerHeader from 'components/FormDrawer/FormDrawerHeader';
import FormDrawerContent from 'components/FormDrawer/FormDrawerContent';
import FormDrawerFooter from 'components/FormDrawer/FormDrawerFooter';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import IntlMessages from 'util/IntlMessages';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Dropdown from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import CurrencyInput from '../../../components/CommonInputs/CurrencyInput';
import * as Immutable from 'immutable';
import { createObject } from 'util/helpers';
import { DateRangePicker, SingleDatePicker } from "react-dates";
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';
import moment from 'moment';
import Select from 'react-select';
import Divider from '@material-ui/core/Divider';
import { connect } from 'react-redux';
import { fetchAllEvents } from '../../../containers/Events/EventsDashboard/actions';
import { fetchTicketTypes } from '../../../containers/TicketTypes/actions';
import { fetchAllAffiliates, fetchTrackingCodes } from '../../../containers/Affiliates/actions';
import Typography from '@material-ui/core/Typography';


class OrdersFilterForm extends React.Component {

    constructor (props) {
      super();
      this.state = this.getInitialState(props);
    }

    getInitialState = (props) => {
      return {
        loading: false,
        filterData: {
          purchaserEmail:'',
          purchaserName: '',
          purchaseDateLogic:'days',
          purchaseData: {
            days: '',
            purchasedOnDateRange:{
              from: null,
              to: null,
            },
            afterDate: null,
            beforeDate: null,
          },
          saleAmountLogic:'lessThan',
          saleData: {
            lessThan: '',
            greaterThan: '',
            equalTo: '',
            between:{
              amount1: '',
              amount2: '',
            },
          }
        }
      };
    }

    componentWillReceiveProps = (nextProps) => {
      if(nextProps.currentFilter.purchaseData && nextProps.showForm !== this.props.showForm){
        this.setState({filterData: nextProps.currentFilter})
      }else if(nextProps.showForm !== this.props.showForm){
        let states = this.getInitialState();
        this.setState(states);
      }
    }

    componentWillMount(){
      const tenantId = this.props.tenantsByDomain.id;
      this.props.fetchAllEvents({tenantId});
      this.props.fetchAllAffiliates({ tenantId });
    }

    handleChange = (key) => event => {
      let { filterData } = this.state;
      let value = event.target ? event.target.value :  event;
      if(key === 'purchaseData.days'){
        // alert(value)
        filterData.purchaseData.purchasedOnDateRange.from = moment().subtract(value, 'days');
        filterData.purchaseData.purchasedOnDateRange.to = moment();

        this.setState({filterData})
      }
      let filterMap = Immutable.fromJS(filterData)
      if(key === 'saleData.between.amount1' && Number(filterData.saleData.between.amount2) <= Number(value)){
       return
      }
      this.setState({
        filterData: filterMap.mergeDeep(createObject(key, value)).toJS()
      });
    }

    handleSubmit = event => {
      event.preventDefault();
      this.props.onApplyFilter(this.state.filterData)
      this.handleCloseDrawer()
    }

    handleCloseDrawer = () => {
      let states = this.getInitialState();
      this.setState(states);
      this.props.closeForm();
    }

    onDatesChange = (startDate, endDate) => {
      const { filterData } = this.state;
      filterData.purchaseData.purchasedOnDateRange.from = startDate
      filterData.purchaseData.purchasedOnDateRange.to = endDate
      this.setState({filterData})
    }

    onAfterDateChange = (date) => {
      const { filterData } = this.state;
      filterData.purchaseData.afterDate = date
      filterData.purchaseData.purchasedOnDateRange.from = date
      filterData.purchaseData.purchasedOnDateRange.to = moment();
      this.setState({filterData});
    }

    onBeforeDateChange = (date) => {
      const { filterData } = this.state;
      filterData.purchaseData.beforeDate = date
      filterData.purchaseData.purchasedOnDateRange.from = moment('01/01/2010')
      filterData.purchaseData.purchasedOnDateRange.to = date
      this.setState({filterData});
    }

    onChangeEvent = name => event => {
      const { filterData } = this.state;
      let value = event.target ? event.target.value : event;
      filterData[name] = value;
      this.setState({filterData}, () => {
        this.props.fetchTicketTypes({ tenantId: this.props.tenantsByDomain.id, eventId: value, archived: false });
      })
    }

    onChangeAffiliate = name => event => {
      const { filterData } = this.state;
      let value = event.target ? event.target.value :  event;
      filterData[name] = value;
      const tenantId = this.props.tenantsByDomain.id;
      this.setState({filterData}, () =>  this.props.fetchTrackingCodes({ affiliateId: value, tenantId }))
    }

    render() {
      const { loading, filterData } = this.state;
      const { purchaseData, saleData } = filterData;
      let width = window.innerWidth;
      const { tenantsByDomain, events, eventLoader, ticketTypesLoader, ticketsTypes, affiliates, affiliatesLoader, trackingCodes, trackingCodesLoader } = this.props;

      let eventOptions =  [];
      let ticketsTypeOptions = [];
      let affiliatesOptions = [];
      let trackingCodesOptions = [];

      eventOptions = events.items && events.items.map(item => { return {label: item.title, value: item.id} })
      ticketsTypeOptions = ticketsTypes.items && ticketsTypes.items.map(item => { return {label: item.name, value: item.id} })
      affiliatesOptions = affiliates.items && affiliates.items.map(item => { return {label: item.name, value: item.id} })
      trackingCodesOptions = trackingCodes.items && trackingCodes.items.map(item => { return {label: item.code, value: item.id} })

      return (
        <FormDrawer open={this.props.showForm}>
          <FormDrawerHeader
            closeClick={this.handleCloseDrawer}
          >
            <IntlMessages id="containers.Orders.FilterForm.title" />
          </FormDrawerHeader>

          <FormDrawerContent>
            <Grid container direction={'column'}>
              <Grid item className="d-flex align-items-end mb-2" >
                <Grid container className="flex-column flex-lg-row" justify={'space-between'}>
                  <Grid className="mb-2" item lg={5}>
                    <FormControl component="fieldset" className="w-100">
                      <FormLabel className={'shrink mb-1'}>
                        <IntlMessages id="sidebar.events" />
                      </FormLabel>
                      <Select
                        placeholder={<IntlMessages id="containers.Orders.FilterForm.Form.input.events.label" />}
                        isLoading={eventLoader}
                        value={filterData.event}
                        onChange={this.onChangeEvent('event')}
                        options={eventOptions}
                        simpleValue={true}
                      />
                      </FormControl>
                  </Grid>
                  <Grid className="mb-2" item lg={5}>
                    <FormControl component="fieldset" className="w-100" >
                      <FormLabel className={'shrink mb-1'}>
                        <IntlMessages id="pages.ticketTypesPage.title" />
                      </FormLabel>
                      <Select
                        disabled ={!filterData.event}
                        placeholder={<IntlMessages id="containers.Orders.FilterForm.Form.input.ticketTypes.label" />}
                        isLoading={ticketTypesLoader}
                        value={filterData.ticketType}
                        onChange={this.handleChange('ticketType')}
                        options={ticketsTypeOptions}
                        simpleValue={true}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
              {/* <Divider/> */}
              <Grid item className="d-flex align-items-end" >
                <Grid container className="flex-column flex-lg-row" justify={'space-between'}>
                  <Grid className="mb-2" item lg={5}>
                     <FormControl component="fieldset" className="w-100">
                      <FormLabel className={'shrink mb-1'}>
                        <IntlMessages id="sidebar.affiliates" />
                      </FormLabel>
                      <Select
                        placeholder={<IntlMessages id="containers.Orders.FilterForm.Form.input.affiliates.label" />}
                        isLoading={affiliatesLoader}
                        value={filterData.affiliate}
                        onChange={this.onChangeAffiliate('affiliate')}
                        options={affiliatesOptions}
                        simpleValue={true}
                      />
                      </FormControl>
                  </Grid>
                  <Grid className="mb-2" item lg={5}>
                     <FormControl component="fieldset" className="w-100 mb-2">
                      <FormLabel className={'shrink mb-1'}>
                      <IntlMessages id="pages.AffiliatesPage.trackingCodes.label.title"/>
                      </FormLabel>
                      <Select
                        disabled ={!filterData.affiliate}
                        placeholder={<IntlMessages id="containers.Orders.FilterForm.Form.input.trackingCode.label" />}
                        isLoading={trackingCodesLoader}
                        value={filterData.trackingCode}
                        onChange={this.handleChange('trackingCode')}
                        options={trackingCodesOptions}
                        simpleValue={true}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
              {/* <Divider/> */}
              <Grid className="pt-0" item>
                <Grid container className="flex-column flex-lg-row" justify={''}>
                  <Grid item lg={5} className="mr-lg-4 mb-3" >
                    <TextField
                      margin="dense"
                      id="purchaserEmail"
                      label={<IntlMessages id="containers.Orders.FilterForm.Form.input.purchaserEmail.label" />}
                      type="text"
                      value={filterData.purchaserEmail}
                      onChange={this.handleChange('purchaserEmail')}
                      fullWidth
                    />
                  </Grid>
                  <Grid item lg={5}>
                    <TextField
                      margin="dense"
                      id="purchaserName"
                      label={<IntlMessages id="containers.Orders.FilterForm.Form.input.purchaserName.label" />}
                      type="text"
                      value={filterData.purchaserName}
                      onChange={this.handleChange('purchaserName')}
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item className="pb-0" >
                <Typography variant={'subheading'} className={'form-drawer-section-header mt-5 mb-3'} gutterBottom>
                  <IntlMessages id="containers.Orders.FilterForm.Form.input.purchaserDate.label" />
                </Typography>
                <Grid container className="px-4 mb-4 flex-lg-row flex-column" spacing={16}>
                  <Grid className="d-flex" item lg={3} >
                    <Dropdown
                      value={filterData.purchaseDateLogic}
                      onChange={this.handleChange('purchaseDateLogic')}
                      input={<Input id="purchaseDateLogic"/>}
                      className={'d-block w-100 align-self-end'}
                    >
                      <MenuItem value="days"><IntlMessages id="containers.Orders.FilterForm.Form.input.purchaserDate.option.days" /></MenuItem>
                      <MenuItem value="betweenDates"><IntlMessages id="containers.Orders.FilterForm.Form.input.purchaserDate.option.betweenDates" /></MenuItem>
                      <MenuItem value="afterDate"><IntlMessages id="containers.Orders.FilterForm.Form.input.purchaserDate.option.afterDate" /></MenuItem>
                      <MenuItem value="beforeDate"><IntlMessages id="containers.Orders.FilterForm.Form.input.purchaserDate.option.beforeDate" /></MenuItem>
                    </Dropdown>
                  </Grid>
                  <Grid item>
                   {filterData.purchaseDateLogic === 'days' ?
                    <TextField
                        margin="dense"
                        id="purchaseDateLogic"
                        type="number"
                        label={<IntlMessages id="containers.Orders.FilterForm.Form.input.days.label" />}
                        value={purchaseData.days}
                        onChange={this.handleChange('purchaseData.days')}
                        className="mb-0 w-100"
                      /> : ''}
                      {filterData.purchaseDateLogic === 'betweenDates' ?
                        <DateRangePicker
                          startDate={purchaseData.purchasedOnDateRange.from} // momentPropTypes.momentObj or null,
                          startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                          endDate={purchaseData.purchasedOnDateRange.to} // momentPropTypes.momentObj or null,
                          endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                          onDatesChange ={({ startDate, endDate }) => this.onDatesChange(startDate, endDate)}
                          focusedInput={this.state.focusedInput}
                          onFocusChange={focusedInput => this.setState({ focusedInput })}
                          daySize={40}
                          isOutsideRange={(day) => day.isAfter(moment())}
                          showClearDate
                          small
                          numberOfMonths={width < 700 ? 1 : 2}
                        />
                        :''}
                        {filterData.purchaseDateLogic === 'afterDate' ?
                          <SingleDatePicker
                            date={purchaseData.afterDate} // momentPropTypes.momentObj or null
                            onDateChange={date => this.onAfterDateChange(date)} // PropTypes.func.isRequired
                            focused={this.state.focused} // PropTypes.bool
                            onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
                            id="your_unique_id" // PropTypes.string.isRequired,
                            isOutsideRange={(day) => day.isAfter(moment())}
                            showClearDate
                            showDefaultInputIcon
                            small
                            numberOfMonths={width < 700 ? 1 : 2}
                          />
                          : ''}
                        {filterData.purchaseDateLogic === 'beforeDate' ?
                          <SingleDatePicker
                            date={purchaseData.beforeDate} // momentPropTypes.momentObj or null
                            onDateChange={date => this.onBeforeDateChange(date)} // PropTypes.func.isRequired
                            focused={this.state.focused} // PropTypes.bool
                            onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
                            id="your_unique_id" // PropTypes.string.isRequired,
                            isOutsideRange={(day) => day.isAfter(moment())}
                            showClearDate
                            showDefaultInputIcon
                            small
                            numberOfMonths={width < 700 ? 1 : 2}
                          />
                          : ''}
                  </Grid>
                </Grid>
              </Grid>

              <Grid item >
                <Typography variant={'subheading'} className={'form-drawer-section-header mb-4'} gutterBottom>
                  <IntlMessages id="containers.Orders.FilterForm.Form.input.saleAmount.label" />
                </Typography>
                <Grid container className="flex-column flex-lg-row px-4" spacing={16}>
                  <Grid className="d-flex"  item lg={3} className="">
                    <Dropdown
                      value={filterData.saleAmountLogic}
                      onChange={this.handleChange('saleAmountLogic')}
                      input={<Input id="saleAmountLogic"/>}
                      className={'d-block w-100 align-self-end mb-2'}
                    >
                      <MenuItem value="lessThan"><IntlMessages id="containers.Orders.FilterForm.Form.input.saleAmount.option.lessThan" /></MenuItem>
                      <MenuItem value="greaterThan"><IntlMessages id="containers.Orders.FilterForm.Form.input.saleAmount.option.greaterThan" /></MenuItem>
                      <MenuItem value="equalTo"><IntlMessages id="containers.Orders.FilterForm.Form.input.saleAmount.option.equalTo" /></MenuItem>
                      <MenuItem value="between"><IntlMessages id="containers.Orders.FilterForm.Form.input.saleAmount.option.between" /></MenuItem>
                    </Dropdown>
                  </Grid>
                  <Grid item lg={8}>
                    {filterData.saleAmountLogic === 'lessThan' ? <CurrencyInput
                      value = {saleData.lessThan}
                      label={false}
                      onChange={this.handleChange('saleData.lessThan')}
                      symbol={tenantsByDomain.currency.symbol}
                    /> :''}
                    {filterData.saleAmountLogic === 'greaterThan' ? <CurrencyInput
                      value = {saleData.greaterThan}
                      label={false}
                      onChange={this.handleChange('saleData.greaterThan')}
                      symbol={tenantsByDomain.currency.symbol}
                    /> :''}
                    {filterData.saleAmountLogic === 'equalTo' ? <CurrencyInput
                      value = {saleData.equalTo}
                      label={false}
                      onChange={this.handleChange('saleData.equalTo')}
                      symbol={tenantsByDomain.currency.symbol}
                    /> :''}
                    {filterData.saleAmountLogic === 'between' ?
                      <div className="d-flex">
                        <div className="mr-2">
                          <CurrencyInput
                            value = {saleData.between.amount1}
                            label={false}
                            onChange={this.handleChange('saleData.between.amount1')}
                            symbol={tenantsByDomain.currency.symbol}
                          />
                        </div>
                        <div className="ml-2">
                          <CurrencyInput
                            value = {saleData.between.amount2}
                            label={false}
                            onChange={this.handleChange('saleData.between.amount2')}
                            symbol={tenantsByDomain.currency.symbol}
                          />
                        </div>
                    </div> :''}
                  </Grid>
                </Grid>
              </Grid>

            </Grid>

          </FormDrawerContent>

          <FormDrawerFooter>
            <Button
              type="submit"
              onClick={this.handleSubmit}
              className="mr-2"
              variant="raised"
              color="primary">
              {loading ? <CircularProgress size={24} color="secondary" /> : <IntlMessages id="containers.Orders.FilterForm.Form.submit.label" />}
            </Button>
            <Button onClick={this.handleCloseDrawer} color="secondary">
              <IntlMessages id="button.cancel_btn" />
            </Button>
          </FormDrawerFooter>

        </FormDrawer>
      );
    }
}

const mapStateToProps = ({ tenants, eventsdashboard, ticketTypes, affiliates }) => {
  return {
    eventLoader: eventsdashboard.get('allEventsLoader'),
    ticketTypesLoader: ticketTypes.get('isFetching'),
    affiliatesLoader: affiliates.get('isFetching'),
    trackingCodesLoader: affiliates.get('isCodeFetching'),
    events: eventsdashboard.get('allEvents').toJS(),
    ticketsTypes: ticketTypes.get('ticketTypesList').toJS(),
    affiliates: affiliates.get('affiliate').toJS(),
    trackingCodes: affiliates.get('trackingCodes').toJS(),
    tenantsByDomain: tenants.tenantsByDomain,
  };
};
export default connect(
  mapStateToProps,
  {
    fetchAllEvents,
    fetchTicketTypes,
    fetchAllAffiliates,
    fetchTrackingCodes
  },
)(OrdersFilterForm);

