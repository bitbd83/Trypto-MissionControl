import React from 'react';
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
} from 'recharts';
import {connect} from 'react-redux';
import ContainerHeader from 'components/ContainerHeader/index';
import ContainerHeaderUpdated from 'components/ContainerHeaderUpdated';
import { data1} from '../../Dashboard/components/data/data2'
import {data, data2 } from '../../Dashboard/components/data/data1'
import ChartCard from 'components/dashboard/Common/ChartCard';
import IntlMessages from 'util/IntlMessages';
import TicketTypes from './Components/TicketType'
import Hotels from './Components/Hotels'
import Affiliates from './Components/Affiliates'
import DiscountCodes from './Components/DiscountCodes'
import SummaryChart from './components/SummaryChart'
import DateRangeSelect from './Components/DateRangeSelect'
import moment from 'moment'
import Typography from '@material-ui/core/Typography';
import { getEventById } from '../../Events/CreateAnEvent/actions';
import {
  fetchTicketSalesReport,
  fetchAffiliateReport,
  fetchDiscountCodeReport,
  fetchHotelReport,
  fetchTicketSalesGraph,
  fetchHotelSalesGraph,
} from './actions'

class Reports extends React.Component {
  constructor(){
    super();
    this.state = {
      dateRange: {
        from: moment().subtract(7, "days"),
        to: moment(),
      },
      dateChange: false,
    }
  }

  onDatesChange = (startDate, endDate) => {
    this.setState({dateChange: true})
    const { dateRange } = this.state;
    dateRange.from = startDate
    dateRange.to = endDate
    this.setState({dateRange})
  }

  componentWillMount(){
    const { eventId } = this.props.match.params;
    const tenantId  = this.props.tenantsByDomain.id
    this.props.getEventById({ tenantId, selectedEventId: eventId });
    this.getReportData();
  }

  onClosePicker = () => {
    if(this.state.dateChange){
      this.setState({dateChange: false}, () => this.getReportData())
    }
  }

  getReportData = () => {
    const { dateRange } = this.state;
    const fromDate = moment(dateRange.from).format('YYYY/MM/DD HH:mm:ss.SSS')
    const toDate = moment(dateRange.to).format('YYYY/MM/DD HH:mm:ss.SSS')
    const tenantId = this.props.tenantsByDomain.id;
    const { eventId } = this.props.match.params;

    this.props.fetchAffiliateReport({tenantId, eventId, fromDate, toDate})
    this.props.fetchDiscountCodeReport({tenantId, eventId, fromDate, toDate})
    this.props.fetchTicketSalesReport({tenantId, eventId, fromDate, toDate})
    this.props.fetchHotelReport({tenantId, eventId, fromDate, toDate})

    this.props.fetchTicketSalesGraph({tenantId, eventId, fromDate, toDate})
    this.props.fetchHotelSalesGraph({tenantId, eventId, fromDate, toDate})
  }

  getDate = (dateRange) => {
    let dates = {};
    dates.from = dateRange.from ? dateRange.from.format('YYYY/MM/DD') : '';
    dates.to = dateRange.to ? dateRange.to.format('YYYY/MM/DD') : '';
    let date = <span>({dates.from})</span>;
    if(!moment(dates.from).isSame(dates.to)){
      date = <span> ({dates.from + ' - '+dates.to})</span>
    }
     if(moment(dates.from).isSame(dates.to) && moment(dates.to).isSame(moment().format('YYYY/MM/DD'))){
      date = <span>(Today)</span>
    }
    return date;
  }

  render() {
    const date = this.getDate(this.state.dateRange)
    const { currEvent } = this.props;
    const { eventId } = this.props.match.params;
    let eventName = '';
    if (currEvent !== undefined) {
      if (currEvent.title !== undefined) {
        eventName = currEvent.title.length > 25 ? currEvent.title.substr(0, 24).concat('...') : currEvent.title;
      }
    }
    const breadCrum = [
      { name: 'App', url: '/' },
      { name: 'Events', url: '#/app/events' },
      { name: eventName, url: `#/app/events/${eventId}/options` },
      { name: 'Reports', url: `#/app/events/${eventId}/reports` },
    ];
    return (
      <div className="app-wrapper">
      <ContainerHeaderUpdated match={this.props.match} data={breadCrum} title={<IntlMessages id="sidebar.affiliates.reports" />} />
        {/* <ContainerHeader match={this.props.match} title={<IntlMessages id="sidebar.affiliates.reports" />} replacePath={':eventId/reports'} replaceText={'Reports'} /> */}
        <div className="mb-5 d-lg-flex align-items-center" >
          <Typography className="mr-2 mb-1" variant="subheading">
            <IntlMessages id="containers.reports.label.filter"/> :
          </Typography>
          <div>
            <DateRangeSelect
              range={this.state.dateRange}
              onDatesChange = {this.onDatesChange}
              onClosePicker={this.onClosePicker}
              />
            </div>
        </div>
        <SummaryChart/>
        <div className="mt-4">
          <div className="mb-5">
            <TicketTypes match={this.props.match} range={this.state.dateRange} dates={date}/>
          </div>
          <div className="mb-5">
            <Hotels match={this.props.match} dates={date}/>
          </div>
          <div className="mb-5">
            <Affiliates match={this.props.match} dates={date}/>
          </div>
          <div className="mb-5">
            <DiscountCodes match={this.props.match} dates={date}/>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({createanevent, tenants }) => {
  return {
    tenantsByDomain: tenants.tenantsByDomain,
    currEvent: createanevent.eventById,
  };
}

export default connect(mapStateToProps,
  {
    fetchTicketSalesReport,
    fetchAffiliateReport,
    fetchDiscountCodeReport,
    fetchHotelReport,
    getEventById,
    fetchTicketSalesGraph,
    fetchHotelSalesGraph
  }
)(Reports);

