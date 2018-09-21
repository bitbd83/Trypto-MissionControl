import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import EditBillingInfo from './EditBillingInfo';
import EditShippingInfo from './EditShippingInfo';
import IntlMessages from 'util/IntlMessages';


class BuyerInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showBillingForm: false,
      showShippingForm: false,
    };
  }

  openBillingForm = (status) => event => {
    this.setState({showBillingForm: status})
  }

  openShippingForm = (status) => event => {
    this.setState({showShippingForm: status})
  }

  render() {
    const { billingInfo, shippingInfo } = this.props;
    return (
      <React.Fragment>
       {(billingInfo || shippingInfo) ?<div className="col p-0 mb-4">
          <Typography className="col mr-4 p-0 mb-2" variant="title">
            <IntlMessages id="containers.Orders.OrderInfo.buyer_information" />
          </Typography>
          <div className="d-lg-flex">
           { billingInfo ? ( <Card className="col mr-2 mb-3 mb-lg-0 p-3">
              <div className="d-flex justify-content-between mb-2">
                <Typography className="mr-2 font-weight-bold" variant="subheading">
                  <IntlMessages id="containers.Orders.OrderInfo.buyerInfo.billingInfo" />
                </Typography>
                <div>
                  <Button onClick={this.openBillingForm(true)} variant="outlined" color="primary">Change</Button>
                </div>
              </div>

                  <div className="">
                    <Typography className="mr-2" variant="body2">
                      {billingInfo ? billingInfo.name.firstName + ' '+ billingInfo.name.middleName + ' '+ billingInfo.name.lastName : ''}
                    </Typography>
                    <Typography className="mr-2" variant="body1">
                    {billingInfo ? billingInfo.address.addressLine1+' , ' + billingInfo.address.addressLine2 : ''}
                    </Typography>
                    <Typography className="mr-2" variant="body1">
                    {billingInfo ? billingInfo.address.cityLocality+' , ' + billingInfo.address.stateProvince + billingInfo.address.postalCode : ''}

                    </Typography>
                    <Typography className="mr-2" variant="body1">
                      Email : {billingInfo ? billingInfo.email : ''}
                    </Typography>
                    <Typography className="mr-2">
                      Phone : {billingInfo ? billingInfo.phoneNumber.number : ''}
                    </Typography>
                  </div>
            </Card> ) :''}
            { shippingInfo ? ( <Card className="col mr-4 p-3">
            <div className="d-flex justify-content-between mb-2">
              <Typography className="mr-2 font-weight-bold" variant="subheading">
                <IntlMessages id="containers.Orders.OrderInfo.buyerInfo.shippingInfo" />
              </Typography>
              <div>
                <Button onClick={this.openShippingForm(true)} variant="outlined" color="primary">Change</Button>
              </div>
            </div>

                <div>
                  <Typography className="mr-2" variant="body2">
                    {shippingInfo ? shippingInfo.name.firstName + ' '+ shippingInfo.name.middleName + ' '+ shippingInfo.name.lastName : ''}
                  </Typography>
                  <Typography className="mr-2" variant="body1">
                    {shippingInfo ? shippingInfo.address.addressLine1+' , ' + shippingInfo.address.addressLine2 : ''}
                  </Typography>
                  <Typography className="mr-2" variant="body1">
                    {shippingInfo ? shippingInfo.address.cityLocality+' , ' + shippingInfo.address.stateProvince + ' ' + shippingInfo.address.postalCode : ''}
                  </Typography>
                  <Typography className="mr-2">
                    Phone : {shippingInfo ? shippingInfo.phoneNumber.number : ''}
                  </Typography>
                </div>
            </Card> ) : ''
            }
          </div>
        </div>:''}
        <EditBillingInfo
          showForm={this.state.showBillingForm}
          closeForm={this.openBillingForm(false)}
          data = {this.props.billingInfo}
          orderId={this.props.orderId}
        />
        <EditShippingInfo
          showForm={this.state.showShippingForm}
          closeForm={this.openShippingForm(false)}
          data = {this.props.shippingInfo}
          orderId={this.props.orderId}
        />
      </React.Fragment>
    );
  }
}

export default BuyerInfo;
