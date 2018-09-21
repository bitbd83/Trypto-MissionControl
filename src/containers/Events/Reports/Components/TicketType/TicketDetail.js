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
import TicketChart from './TicketChart'


class TicketDetail extends React.Component {
    render() {
      const { ticketReport, tenantsByDomain } = this.props;

      return (
        <FormDrawer open={this.props.showDetail}>

          <FormDrawerHeader closeClick={this.props.closeDetail}>
              <div className="d-flex align-items-center">
                <IntlMessages id="pages.ticketTypesPage.title"/>
                <Typography className="align-self-center ml-2 mt-1" variant="body2">
                  {this.props.dates}
                </Typography>
              </div>
          </FormDrawerHeader>

          <FormDrawerContent>
            <div className="mb-4">
              <div className="my-4">
                <TicketChart/>
              </div>
              <div className="col mt-2 pt-2 px-2">
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
                  return <Grid key={index} container className={`${index !== (ticketReport.items.length - 1) ? 'border-bottom' : 'pb-2'} pt-1`} spacing={16}>
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
                </Grid>
                }) : ''}
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

const mapStateToProps = ({ eventreports, tenants }) => {
  return {
    isFetching: eventreports.get('isFetchingTicket'),
    tenantsByDomain: tenants.tenantsByDomain,
    ticketReport: eventreports.get('ticketReport').toJS(),
  };
};
export default connect(
  mapStateToProps
)(TicketDetail);

