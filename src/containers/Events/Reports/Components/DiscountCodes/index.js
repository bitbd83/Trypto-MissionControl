import React from 'react';
import {connect} from 'react-redux';
import IntlMessages from 'util/IntlMessages';
import Typography from '@material-ui/core/Typography';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import ChartCard from 'components/dashboard/Common/ChartCard';
import Grid from '@material-ui/core/Grid';
import DiscountChart from './DiscountChart'
import Paper from '@material-ui/core/Paper'
import { fetchDiscountCodeReport } from '../../actions'
import CircularProgress from '@material-ui/core/CircularProgress';
import TenantsCurrencyVal from 'components/Tenants/Currency';
import Button from '@material-ui/core/Button';
import DiscountDetail from './DiscountDetail';


class DiscountCodes extends React.Component {
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
      const { discountCodeReport, isFetching, tenantsByDomain, dates } = this.props;
        return (
            <div className="">
            <div className="d-flex align-items-center justify-content-between px-0 col-lg-8">
                <div className="d-flex">
                  <Typography className="mr-2 mb-1" variant="title">
                    <IntlMessages id="containers.reports.discountcodes.title"/>
                    </Typography>
                  <Typography className="align-self-center" variant="body2">
                      {this.props.dates}
                    </Typography>
                </div>
               {discountCodeReport.items ? discountCodeReport.items.length > 5 ? <div>
                  <Button onClick={this.openDetail(true)} variant="outlined" size="small" color="primary">
                    <IntlMessages id="button.showMoreBtn"/>
                  </Button>
                </div> : '' : ''}
              </div>
                {!isFetching ? <div className="d-lg-flex">
                  <Paper className="col mt-2 pt-2 px-2">
                    <Grid container className="border-bottom font-weight-bold" spacing={16}>
                      <Grid item xs={4} >
                        <div>
                          <IntlMessages id="pages.events.reports.tableCell.code"/>
                        </div>
                      </Grid>
                      <Grid item xs={4}>
                        <div className="d-flex justify-content-center">
                          <IntlMessages id="pages.events.reports.tableCell.totalRedemption"/>
                        </div>
                      </Grid>
                      <Grid item xs={4}>
                        <div className="d-flex justify-content-center">
                          <IntlMessages id="pages.events.reports.tableCell.totalDiscounts"/>
                        </div>
                      </Grid>
                    </Grid>
                    {discountCodeReport.items && discountCodeReport.items.length ? discountCodeReport.items.map((code, index)=> {
                      return index < 5 ? <Grid key={index} container className={`${index !== (discountCodeReport.items.length - 1) && index !== 4 ? 'border-bottom' :'pb-1'} pt-1`} spacing={16}>
                      <Grid item xs={4} >
                        <div>{code.code}</div>
                      </Grid>
                      <Grid item xs={4}>
                        <div className="d-flex justify-content-center"><TenantsCurrencyVal showNA={true} data={tenantsByDomain} value={code.totalRedemptions} key={code.totalRedemptions}/></div>
                      </Grid>
                      <Grid item xs={4}>
                        <div className="d-flex justify-content-center">
                          <TenantsCurrencyVal showNA={true} data={tenantsByDomain} value={code.totalDiscounts} key={code.totalDiscounts}/>
                        </div>
                      </Grid>
                    </Grid> : ''
                    }) : <div className="my-3 d-flex h-50 align-items-center justify-content-center">{dates} <IntlMessages id="pages.events.reports.discount.noDiscount"/></div>}
                  </Paper>
                  <div className="col-lg-4 d-flex align-items-center mt-4">
                    <DiscountChart/>
                  </div>
                </div>: this.showLoader()}
                <DiscountDetail
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
    isFetching: eventreports.get('isFetchingDiscountCode'),
    tenantsByDomain: tenants.tenantsByDomain,
    discountCodeReport: eventreports.get('discountCodeReport').toJS(),
  };
}

export default connect(mapStateToProps,
  {
    fetchDiscountCodeReport
  }
)(DiscountCodes);
