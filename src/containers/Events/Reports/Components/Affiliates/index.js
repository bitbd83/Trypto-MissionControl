import React from 'react';
import {connect} from 'react-redux';
import IntlMessages from 'util/IntlMessages';
import Typography from '@material-ui/core/Typography';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import ChartCard from 'components/dashboard/Common/ChartCard';
import Grid from '@material-ui/core/Grid';
import AffiliateChart from './AffiliateChart'
import Paper from '@material-ui/core/Paper'
import { fetchAffiliateReport } from '../../actions'
import CircularProgress from '@material-ui/core/CircularProgress';
import TenantsCurrencyVal from 'components/Tenants/Currency';
import Button from '@material-ui/core/Button'
import AffiliateDetail from './AffiliateDetail'

class Affiliates extends React.Component {
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
      const { affiliateReport, isFetching, tenantsByDomain, dates } = this.props;
        return (
            <div className="">
              <div className="d-flex align-items-center justify-content-between px-0 col-lg-8">
                <div className="d-flex">
                  <Typography className="mr-2 mb-1" variant="title">
                    <IntlMessages id="containers.reports.affiliates.title"/>
                  </Typography>
                  <Typography className="align-self-center" variant="body2">
                      {dates}
                    </Typography>
                </div>
               {affiliateReport.items ? affiliateReport.items.length > 5 ? <div>
                  <Button onClick={this.openDetail(true)} variant="outlined" size="small" color="primary">
                    <IntlMessages id="button.showMoreBtn"/>
                  </Button>
                </div> : '' : ''}
              </div>
                {!isFetching ? <div className="d-lg-flex">
                  <Paper className="col mt-2 pt-2 px-2">
                    <Grid container className="border-bottom font-weight-bold" spacing={16}>
                      <Grid item xs={2} >
                        <div><IntlMessages id="pages.events.reports.tableCell.name"/></div>
                      </Grid>
                      <Grid item xs={3}>
                        <div className="d-flex justify-content-center">
                          <IntlMessages id="pages.events.reports.tableCell.trackingCode"/>
                        </div>
                      </Grid>
                      <Grid item xs={2}>
                        <div className="d-flex justify-content-center">
                          <IntlMessages id="pages.events.reports.tableCell.conversions"/>
                        </div>
                      </Grid>
                      <Grid item xs={2}>
                        <div className="d-flex justify-content-center">
                          <IntlMessages id="pages.events.reports.tableCell.totalSales"/>
                        </div>
                      </Grid>
                      <Grid item xs={3}>
                        <div className="d-flex justify-content-center">
                          <IntlMessages id="pages.events.reports.tableCell.commisionPaid"/>
                        </div>
                      </Grid>
                    </Grid>
                    {affiliateReport.items && affiliateReport.items.length ? affiliateReport.items.map((affiliate, index)=> {
                      return index < 5 ? <Grid key={index} container className={`${index !== (affiliateReport.items.length - 1) && index !== 4 ? 'border-bottom' : 'pb-1'} pt-1`} spacing={16}>
                      <Grid item xs={2} >
                        <div>{affiliate.name}</div>
                      </Grid>
                      <Grid item xs={3}>
                        <div className="d-flex justify-content-center">{affiliate.trackingCode}</div>
                      </Grid>
                      <Grid item xs={2}>
                        <div className="d-flex justify-content-center">{affiliate.totalConversions}</div>
                      </Grid>
                      <Grid item xs={2}>
                        <div className="d-flex justify-content-center">
                          <TenantsCurrencyVal
                            data={tenantsByDomain}
                            value={affiliate.totalSales}
                            key={affiliate.totalSales}
                            showNA={true}
                          />
                        </div>
                      </Grid>
                      <Grid item xs={3}>
                        <div className="d-flex justify-content-center"><TenantsCurrencyVal showNA={true} data={tenantsByDomain} value={affiliate.commissionsPaid} key={affiliate.commissionsPaid}/></div>
                      </Grid>
                    </Grid> : ''
                    }) : <div className="my-3 d-flex h-50 align-items-center justify-content-center">{dates} <IntlMessages id="pages.events.reports.affiliates.noAffiliates"/></div>}
                  </Paper>
                  <div className="col-lg-4 d-flex align-items-center mt-4">
                    <AffiliateChart/>
                  </div>
                </div> : this.showLoader()}
                <AffiliateDetail
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
    isFetching: eventreports.get('isFetchingAffiliate'),
    tenantsByDomain: tenants.tenantsByDomain,
    affiliateReport: eventreports.get('affiliateReport').toJS(),
  };
}

export default connect(mapStateToProps,
  {
    fetchAffiliateReport
  }
)(Affiliates);

