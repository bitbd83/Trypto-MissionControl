import React from 'react';
import {connect} from 'react-redux';
import IntlMessages from 'util/IntlMessages';
import Typography from '@material-ui/core/Typography';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import ChartCard from 'components/dashboard/Common/ChartCard';
import Grid from '@material-ui/core/Grid';
import TicketChart from './TicketChart'
import Paper from '@material-ui/core/Paper'
import { fetchTicketSalesReport } from '../../actions'
import CircularProgress from '@material-ui/core/CircularProgress';
import TenantsCurrencyVal from 'components/Tenants/Currency';
import Button from '@material-ui/core/Button';
import TicketDetail from './TicketDetail';

class TicketTypes extends React.Component {
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
      const { ticketReport, isFetching, tenantsByDomain, dates, range, isFetchingTicketGraph, ticketGraph } = this.props;

        return (
            <div className="">
              <div className="d-flex align-items-center justify-content-between px-0 col-lg-8">
                <div className="d-flex">
                  <Typography className="mr-2 mb-1" variant="title">
                      <IntlMessages id="pages.ticketTypesPage.title"/>
                    </Typography>
                  <Typography className="align-self-center" variant="body2">
                      {this.props.dates}
                    </Typography>
                </div>
               {ticketReport.items ? ticketReport.items.length > 5 ? <div>
                  <Button onClick={this.openDetail(true)} variant="outlined" size="small" color="primary">
                    <IntlMessages id="button.showMoreBtn"/>
                  </Button>
                </div> : '' : ''}
              </div>
                {!isFetching ? <div className="d-lg-flex mb-sm-4">
                  <Paper className="col mt-2 pt-2 px-2">
                    <Grid container className="border-bottom font-weight-bold" spacing={16}>
                      <Grid item xs={3} >
                        <div>
                          <IntlMessages id="pages.events.reports.tableCell.name"/>
                        </div>
                      </Grid>
                      <Grid item xs={3}>
                        <div className="d-flex justify-content-center" >
                          <IntlMessages id="pages.events.reports.tableCell.totalTicketSold"/>
                        </div>
                      </Grid>
                      <Grid item xs={2}>
                        <div className="d-flex justify-content-center" >
                          <IntlMessages id="pages.events.reports.tableCell.totalSales"/>
                        </div>
                      </Grid>
                      <Grid item xs={2}>
                        <div className="d-flex justify-content-center">
                          <IntlMessages id="pages.events.reports.tableCell.totalFees"/>
                        </div>
                      </Grid>
                      <Grid item xs={2}>
                        <div  className="d-flex justify-content-center">
                          <IntlMessages id="pages.events.reports.tableCell.totalTaxes"/>
                        </div>
                      </Grid>
                    </Grid>
                    {ticketReport.items && ticketReport.items.length ? ticketReport.items.map((ticket, index)=> {
                      return index < 5 ? <Grid key={index} container className={`${index !== (ticketReport.items.length - 1) && index !== 4 ? 'border-bottom' : 'pb-2'} pt-1`} spacing={16}>
                      <Grid item xs={3} >
                        <div>{ticket.name}</div>
                      </Grid>
                      <Grid item xs={3}>
                        <div className="d-flex justify-content-center" >
                          {(ticket.totalTicketsSold ? ticket.totalTicketsSold : '(N/A)') + '/'+ (ticket.totalTicketsAvailable ? ticket.totalTicketsAvailable : '(N/A)')}
                        </div>
                      </Grid>
                      <Grid item xs={2}>
                        <div className="d-flex justify-content-center"><TenantsCurrencyVal showNA={true} data={tenantsByDomain} value={ticket.totalSales} key={ticket.totalSales}/></div>
                      </Grid>
                      <Grid item xs={2}>
                        <div className="d-flex justify-content-center"><TenantsCurrencyVal showNA={true} data={tenantsByDomain} value={ticket.totalFees} key={ticket.totalFees}/></div>
                      </Grid>
                      <Grid item xs={2}>
                        <div className="d-flex justify-content-center"><TenantsCurrencyVal showNA={true} data={tenantsByDomain} value={ticket.totalTaxes} key={ticket.totalTaxes}/></div>
                      </Grid>
                    </Grid> : ''
                    }) : <div className="my-3 d-flex h-50 align-items-center justify-content-center">
                            <IntlMessages id="pages.events.reports.ticketType.noTicketType"/>
                          </div>}
                  </Paper>
                  <div className="col-lg-4 d-flex align-items-center p-0 mt-4">
                    {!isFetchingTicketGraph ? <TicketChart graphData={ticketGraph}/> : <div className="d-flex justify-content-center w-100">{this.showLoader()}</div>}
                  </div>
                </div> : this.showLoader()}
                <TicketDetail
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
    tenantsByDomain: tenants.tenantsByDomain,
    ticketReport: eventreports.get('ticketReport').toJS(),
    ticketGraph: eventreports.get('ticketGraph').toJS(),
    isFetchingTicketGraph: eventreports.get('isFetchingTicketGraph'),
  };
}

export default connect(mapStateToProps,
  {
    fetchTicketSalesReport
  }
)(TicketTypes);
