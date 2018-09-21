import React from 'react';
import {connect} from 'react-redux';
import IntlMessages from 'util/IntlMessages';
import Typography from '@material-ui/core/Typography';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import ChartCard from 'components/dashboard/Common/ChartCard';
import Grid from '@material-ui/core/Grid';
import HotelChart from './HotelChart'
import Paper from '@material-ui/core/Paper'
import { fetchHotelReport } from '../../actions'
import CircularProgress from '@material-ui/core/CircularProgress';
import TenantsCurrencyVal from 'components/Tenants/Currency';
import {formatHotelData} from './formatHotelData.js'
import HotelDetail from './HotelDetail'
import Button from '@material-ui/core/Button';

class Hotels extends React.Component {
  constructor(){
    super();
    this.state = {
      showDetail: false
    }
  }

  openDetail = (status) => event => {
    this.setState({showDetail: status});
  }

  showLoader = () => (
    <div className="">
      <div className="loader-view">
        <CircularProgress />
      </div>
    </div>
  );

    render() {
      const { hotelReport, isFetching, tenantsByDomain, dates, hotelGraph, isFetchingHotelGraph } = this.props;

      let data = [];
      if(hotelReport.items && hotelReport.items.length){
        data = formatHotelData(hotelReport.items)
      }
        return (
            <div className="">
              <div className="d-flex align-items-center justify-content-between px-0 col-lg-8">
                <div className="d-flex">
                  <Typography className="mr-2 mb-1" variant="title">
                      <IntlMessages id="sidebar.hotels"/>
                  </Typography>
                  <Typography className="mr-2 align-self-center" variant="body2">
                    {dates}
                  </Typography>
                </div>
               {data.length ? data.length > 5 ? <div>
                  <Button onClick={this.openDetail(true)} variant="outlined" size="small" color="primary">
                    <IntlMessages id="button.showMoreBtn"/>
                  </Button>
                </div> : '' : ''}
              </div>
               <Typography className="mr-1" variant="subheading">
                  Caesar Palace
                </Typography>
               {!isFetching ? <div className="d-lg-flex">
                  <Paper className="col mt-2 pt-2 px-2">
                    <Grid container className="border-bottom font-weight-bold" spacing={16}>
                      <Grid item xs={3} >
                        <div>
                          <IntlMessages id="pages.events.reports.tableCell.name"/>
                        </div>
                      </Grid>
                      <Grid item xs={3}>
                        <div className="d-flex justify-content-center" >
                          <IntlMessages id="pages.events.reports.tableCell.totalRooms"/>
                        </div>
                      </Grid>
                      <Grid item xs={2}>
                        <div className="d-flex justify-content-center">
                          <IntlMessages id="pages.events.reports.tableCell.totalSales"/>
                        </div>
                      </Grid>
                      <Grid item xs={2}>
                        <div className="d-flex justify-content-center">
                          <IntlMessages id="pages.events.reports.tableCell.totalFees"/>
                        </div>
                      </Grid>
                      <Grid item xs={2}>
                        <div className="d-flex justify-content-center">
                          <IntlMessages id="pages.events.reports.tableCell.totalTaxes"/>
                        </div>
                      </Grid>
                    </Grid>
                    {data.length ? data.map((hotel, index)=> {
                      return index < 5 ? <Grid key={index} className={`${index !== (data.length - 1) && index !== 4 ? 'border-bottom' :'pb-1'} pt-1`} container spacing={16}>
                      <Grid item xs={3} >
                        <div>{hotel.name}</div>
                      </Grid>
                      <Grid item xs={3}>
                        <div  className="d-flex justify-content-center">{hotel.totalRooms + '/'+ hotel.totalRoomsAvailable}</div>
                      </Grid>
                      <Grid item xs={2}>
                        <div className="d-flex justify-content-center"><TenantsCurrencyVal showNA={true} data={tenantsByDomain} value={hotel.totalSales} key={hotel.totalSales}/></div>
                      </Grid>
                      <Grid item xs={2}>
                        <div className="d-flex justify-content-center"><TenantsCurrencyVal showNA={true} data={tenantsByDomain} value={hotel.totalFees} key={hotel.totalFees}/></div>
                      </Grid>
                      <Grid item xs={2}>
                        <div className="d-flex justify-content-center"><TenantsCurrencyVal showNA={true} data={tenantsByDomain} value={hotel.totalTaxes} key={hotel.totalTaxes}/></div>
                      </Grid>
                    </Grid> : ''
                    }) : <div className="my-3 d-flex h-50 align-items-center justify-content-center">{dates} <IntlMessages id="pages.events.reports.hotels.noHotels"/></div>}
                  </Paper>
                  <div className="col-lg-4 col-12 d-flex align-items-center mt-4">
                    {!isFetchingHotelGraph ? <HotelChart graphData={hotelGraph}/> : <div className="d-flex justify-content-center w-100">{this.showLoader()}</div>}
                  </div>
                </div> : this.showLoader()}
                <HotelDetail
                  showDetail={this.state.showDetail}
                  closeDetail={this.openDetail(false)}
                  dates={dates}
                />
            </div>
        );
    }
}

const mapStateToProps = ({eventreports, tenants }) => {
  return {
    isFetching: eventreports.get('isFetchingTicket'),
    isFetchingHotelGraph: eventreports.get('isFetchingHotelGraph'),
    tenantsByDomain: tenants.tenantsByDomain,
    hotelReport: eventreports.get('hotelReport').toJS(),
    hotelGraph: eventreports.get('hotelGraph').toJS(),
  };
}

export default connect(mapStateToProps,
  {
    fetchHotelReport
  }
)(Hotels);
