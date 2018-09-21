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
import DiscountChart from './DiscountChart'


class DiscountDetail extends React.Component {
    render() {
      const { discountCodeReport, tenantsByDomain, dates } = this.props;

      return (
        <FormDrawer open={this.props.showDetail}>

          <FormDrawerHeader closeClick={this.props.closeDetail}>
              <div className="d-flex align-items-center">
                <IntlMessages id="containers.reports.discountcodes.title"/>
                <Typography className="align-self-center ml-2 mt-1" variant="body2">
                  {this.props.dates}
                </Typography>
              </div>
          </FormDrawerHeader>

          <FormDrawerContent>
            <div className="mb-4">
              <div className="my-4">
                <DiscountChart/>
              </div>
              <div className="d-flex">
                  <div className="col mt-2 pt-2 px-2">
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
                      return <Grid key={index} container className={`${index !== (discountCodeReport.items.length - 1) ? 'border-bottom' :''} pt-1`} spacing={16}>
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
                    </Grid>
                    }) : <div className="mt-3 d-flex h-50 align-items-center justify-content-center">{dates} <IntlMessages id="pages.events.reports.discount.noDiscount"/></div>}
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
    isFetching: eventreports.get('isFetchingDiscountCode'),
    tenantsByDomain: tenants.tenantsByDomain,
    discountCodeReport: eventreports.get('discountCodeReport').toJS(),
  };
}
export default connect(
  mapStateToProps
)(DiscountDetail);

