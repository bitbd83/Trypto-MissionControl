import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import FormDrawer from 'components/FormDrawer';
import FormDrawerHeader from 'components/FormDrawer/FormDrawerHeader';
import FormDrawerContent from 'components/FormDrawer/FormDrawerContent';
import FormDrawerFooter from 'components/FormDrawer/FormDrawerFooter';
import { connect } from 'react-redux';
import IntlMessages from 'util/IntlMessages';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper'
import TenantsCurrencyVal from 'components/Tenants/Currency';
import HotelChart from './HotelChart'
import {formatHotelData} from './formatHotelData.js'


class HotelDetail extends React.Component {

    render() {
      const { hotelReport, tenantsByDomain, dates } = this.props;
      let data = [];
      if(hotelReport.items && hotelReport.items.length){
        data = formatHotelData(hotelReport.items)
      }

      return (
        <FormDrawer open={this.props.showDetail}>
          <FormDrawerHeader closeClick={this.props.closeDetail}>
              <div className="d-flex align-items-center">
                <IntlMessages id="sidebar.hotels"/>
                <Typography className="align-self-center ml-2 mt-1" variant="body2">
                  {this.props.dates}
                </Typography>
              </div>
          </FormDrawerHeader>
          <FormDrawerContent>
            <div className="mb-4">
              <div className="my-4">
                <HotelChart/>
              </div>
              <div className="d-flex">
                <div className="col mt-2 pt-2 px-2">
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
                    return <Grid key={index} className={`${index !== (data.length - 1) ? 'border-bottom' :'pb-1'} pt-1`} container spacing={16}>
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
                  </Grid>
                  }) : <div className="mt-3 d-flex h-50 align-items-center justify-content-center">{dates} <IntlMessages id="pages.events.reports.hotels.noHotels"/></div>}
                </div>
                </div>
            </div>
          </FormDrawerContent>
          <FormDrawerFooter>
            <Button onClick={this.props.closeDetail} color="secondary">
              <IntlMessages id="button.close_btn" />
            </Button>
          </FormDrawerFooter>

      </FormDrawer>
    );
  }
}

const mapStateToProps = ({eventreports, tenants }) => {
  return {
    isFetching: eventreports.get('isFetchingTicket'),
    tenantsByDomain: tenants.tenantsByDomain,
    hotelReport: eventreports.get('hotelReport').toJS(),
  };
}
export default connect(
mapStateToProps
)(HotelDetail);

