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
import AffiliateChart from './AffiliateChart'


class AffiliateDetail extends React.Component {

    render() {
      const { affiliateReport, tenantsByDomain } = this.props;

      return (
        <FormDrawer open={this.props.showDetail}>
          <FormDrawerHeader closeClick={this.props.closeDetail}>
              <div className="d-flex align-items-center">
                <IntlMessages id="containers.reports.affiliates.title"/>
                <Typography className="align-self-center ml-2 mt-1" variant="body2">
                  {this.props.dates}
                </Typography>
              </div>
          </FormDrawerHeader>

          <FormDrawerContent>
            <div className="mb-4">
              <div className="my-4">
                <AffiliateChart/>
              </div>
              <div className="d-flex">
                  <div className="col mt-2 pt-2 px-2">
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
                    {affiliateReport.items && affiliateReport.items.length && affiliateReport.items.map((affiliate, index)=> {
                      return <Grid key={index} container className={`${index !== (affiliateReport.items.length - 1) ? 'border-bottom' :''} pt-1`} spacing={16}>
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
                    </Grid>
                    })}
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
    isFetching: eventreports.get('isFetchingAffiliate'),
    tenantsByDomain: tenants.tenantsByDomain,
    affiliateReport: eventreports.get('affiliateReport').toJS(),
  };
}

export default connect(
  mapStateToProps
)(AffiliateDetail);

