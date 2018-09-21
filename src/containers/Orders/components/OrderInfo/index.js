import React from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import IntlMessages from 'util/IntlMessages';
import TenantsDate from 'components/Tenants/TenantsDate';
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';
import Typography from '@material-ui/core/Typography';
import { IconButton } from '../../../../../node_modules/@material-ui/core';
import TicketTypeInfo from './TicketTypeInfo'
import HotelInfo from './HotelInfo'
import Transactions from './Transactions'
import QuestionInfo from './QuestionInfo'
import OrderActivityInfo from './OrderActivityInfo'
import { fetchOneOrder } from '../../actions'
import CustomScrollbars from 'util/CustomScrollbars';
import { data } from './data'
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CloseIcon from '@material-ui/icons/Close';
import TenantsCurrencyVal from 'components/Tenants/Currency';
import BuyerInfo from './BuyerInfo'
import CircularProgress from '@material-ui/core/CircularProgress';


class OrderInfo extends React.Component {
    constructor (props) {
      super();
      this.state = this.getInitialState();
    }

    getInitialState = () => {
      return {
        expandedQuestion:false,
        selected: ''
      }
    }

    componentWillMount(){
     this.getOrderInfo();
    }

    componentWillReceiveProps(nextProps){
      if(nextProps.refetchOrderInfo){
        this.getOrderInfo();
      }
    }

    getOrderInfo = () => {
      const tenantId = this.props.tenantsByDomain.id;
      const { orderId } = this.props;
      this.props.fetchOneOrder({tenantId, orderId})
    }


    showLoader = () => (
      <div className="mt-3 d-flex justify-content-center align-items-center animated slideInUpTiny animation-duration-3">
        <div className="loader-view">
          <CircularProgress />
        </div>
      </div>
    );

    processStatus = (status) => {
      let classes = '';
      switch(status.key){
        case 0:
          classes = 'text-warning';
          break;
        case 1:
          classes = 'text-info';
          break;
        case 2:
          classes = 'text-success';
          break;
        case 3:
          classes = 'text-danger';
          break;
        default:
          classes = 'text-info';
          break;
      }
      return <span className={`text-uppercase ${classes} ml-3`} style={{fontSize:'15px'}}>{status.value}</span>;
    }

    errorView() {
      return (
        <div className="page-error-container animated slideInUpTiny animation-duration-3">
          <div className="page-error-content">
            <div className="error-code mb-4 animated zoomInDown">500</div>
            <h2 className="text-center fw-regular title animated bounceIn animation-delay-10">
              <IntlMessages id="extraPages.500Msg" />
            </h2>
          </div>
        </div>
      );
    }

    render() {
      const { tenantsByDomain, orderInfo, isFetching } = this.props;
      let item = {};
      if(Object.keys(orderInfo).length){
        item = orderInfo;
      }

      return (
        <div>
          <div className="module-box-header px-2 p-lg-4 d-flex flex-row justify-content-between align-items-center">
            <div className="d-flex">
              <Typography className="mr-1" variant="title">
                <IntlMessages id="containers.orders.orderInfo.order" />
              </Typography>
              <Typography  variant="subheading">
              : {item.orderCode}
              </Typography>
                {item.status ? this.processStatus(item.status) : ''}
            </div>
            <IconButton onClick={this.props.closeModal} aria-label="Close">
                <CloseIcon/>
            </IconButton>
          </div>
          { !item.error ? (!isFetching ? (
            <div className="module-box-content">
              <div
                className="mb-1 position-relative"
                style={{
                  height: this.props.width >= 1200
                    ? 'calc(100vh - 83px)'
                    : 'calc(100vh - 63px)'
                }}
              >
              <CustomScrollbars className="module-list-scroll scrollbar  hotel-main-content">
                <div className="p-4">
                  <div className="mb-4 ">
                    <Typography className="mb-2" variant="title">
                      <IntlMessages id="containers.Orders.OrderInfo.order_source" />
                    </Typography>
                    <div className="w-100 shadow-sm p-3 mb-5 bg-white rounded">
                        <div className="d-flex mb-2">
                          <Typography className="mr-2" variant="body2">
                            <IntlMessages id="containers.Orders.OrderInfo.date_purchased" /> :
                          </Typography>
                          <TenantsDate
                            timezone={Object.keys(tenantsByDomain).length > 0 && tenantsByDomain.timeZone}
                            time={item.datePurchasedUtc}
                            timeFormat="MMM DD, YYYY HH:mm"
                          />
                        </div>
                        <div className="p-0 d-lg-flex col-8 justify-content-between" >
                          <Typography className="mb-2" variant="body2">
                            <IntlMessages id="containers.Orders.OrderInfo.ip_address" /> :
                          </Typography>
                          <Typography className="mb-2" variant="body2">
                            <IntlMessages id="containers.Orders.OrderInfo.channel" /> :
                          </Typography>
                          <Typography className="mb-2" variant="body2">
                            <IntlMessages id="pages.AffiliatesPage.btn.tracking_code" /> :
                          </Typography>
                        </div>
                    </div>
                  </div>

                  <div className="d-lg-flex w-100 mb-5">
                      <BuyerInfo shippingInfo = {item.shippingInfo} billingInfo = {item.billingInfo} orderId={item.id}/>
                    <div className="col-lg-3 p-0">
                      <Typography className="p-0 mb-2" variant="title">
                        <IntlMessages id="containers.Orders.OrderInfo.order_totals" />
                      </Typography>
                      <Card className="p-3">
                          <div className="">
                            <div className="d-flex flex-row-reverse">
                              <span className="">
                              {item.orderSummary ? <TenantsCurrencyVal
                                data={tenantsByDomain}
                                value={item.orderSummary.checkoutTotal}
                                key={item.orderSummary.checkoutTotal}
                              /> : ''}
                              </span>
                              <Typography className="mr-2 text-right" variant="body1">
                                <IntlMessages id="containers.Orders.OrderInfo.sub_total" /> :
                              </Typography>
                            </div>
                            <div className="d-flex flex-row-reverse">
                              <span className="">
                                {item.orderSummary ? <TenantsCurrencyVal
                                  data={tenantsByDomain}
                                  value={item.orderSummary.totalFees}
                                  key={item.orderSummary.totalFees}
                                /> : ''}
                              </span>
                              <Typography className="mr-2" variant="body1">
                                <IntlMessages id="containers.Orders.OrderInfo.total_fees" /> :
                              </Typography>

                            </div>
                            <div className="d-flex flex-row-reverse ">
                            <span  className="">
                             {item.orderSummary ? <TenantsCurrencyVal
                                data={tenantsByDomain}
                                value={item.orderSummary.totalTaxes}
                                key={item.orderSummary.totalTaxes}
                              /> :''}
                            </span>
                              <Typography className="mr-2" variant="body1">
                                <IntlMessages id="containers.Orders.OrderInfo.total_taxes" /> :
                              </Typography>
                            </div>
                            <div className="d-flex flex-row-reverse">
                            <span className="">
                              {item.orderSummary ? <TenantsCurrencyVal
                                data={tenantsByDomain}
                                value={item.orderSummary.totalDiscounts}
                                key={item.orderSummary.totalDiscounts}
                              /> : ''}
                            </span>
                              <Typography className="mr-2" variant="body1">
                                <IntlMessages id="containers.Orders.OrderInfo.total_discounts" /> :
                              </Typography>
                            </div>
                            <Divider className="my-1"/>
                            <div className="d-flex flex-row-reverse">
                            <span className="">
                              {item.orderSummary ? <TenantsCurrencyVal
                                data={tenantsByDomain}
                                value={item.orderSummary.grandTotal}
                                key={item.orderSummary.grandTotal}
                              /> : ''}
                            </span>
                              <Typography className="mr-2" variant="body1">
                                <IntlMessages id="containers.Orders.OrderInfo.grand_total" /> :
                              </Typography>
                            </div>
                          </div>
                      </Card>
                      </div>
                    </div>
                  {/* <div ref="buyer_questions">
                    <QuestionInfo/>
                  </div> */}
                  <div className="my-2">
                    <TicketTypeInfo orderData={item} tenantsByDomain={this.props.tenantsByDomain}/>
                  </div>
                  {/* <div className="my-2">
                    <HotelInfo tenantsByDomain={this.props.tenantsByDomain}/>
                  </div>
                  <div className="my-2">
                    <Transactions tenantsByDomain={this.props.tenantsByDomain}/>
                  </div>
                  <div className="my-2">
                    <OrderActivityInfo tenantsByDomain={this.props.tenantsByDomain}/>
                  </div> */}
                </div>
              </CustomScrollbars>
                </div>
            </div>
          ) : (
            this.showLoader()
          )) : (
            this.errorView()
          )}
          </div>
      );
    }
}

const mapStateToProps = ({ tenants, settings, orders }) => {
  return {
    width: settings.width,
    isFetching: orders.get('isFetching'),
    refetchOrderInfo: orders.get('refetchOrderInfo'),
    orderInfo: orders.get('orderInfo').toJS(),
    tenantsByDomain: tenants.tenantsByDomain,
  };
};
export default connect(
  mapStateToProps,
  {
    fetchOneOrder
  }
)(OrderInfo);

