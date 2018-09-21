import React from 'react';
import Button from '@material-ui/core/Button';
import FormDrawer from 'components/FormDrawer';
import FormDrawerHeader from 'components/FormDrawer/FormDrawerHeader';
import FormDrawerContent from 'components/FormDrawer/FormDrawerContent';
import FormDrawerFooter from 'components/FormDrawer/FormDrawerFooter';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';
import { patchBillingInfo } from '../../../actions';
import IntlMessages from 'util/IntlMessages';
import FormControl from '@material-ui/core/FormControl';
import CountrySelect from 'components/Geography/CountrySelect';
import StateSelect from 'components/Geography/StateSelect';
import Typography from '@material-ui/core/Typography';


class EditBillingInfo extends React.Component {

    constructor (props) {
      super();
      this.state = this.getInitialState(props);
    }

    getInitialState = (props) => {
      const data = props.data !== undefined ? props.data : {phoneNumber: {}, name: {}, address: {}};
      const  initialInfo = {
        billingEmail: data.email,
        billingPhoneNumber: data.phoneNumber.number,
        billingFirstName: data.name.firstName,
        billingMiddleName: data.name.middleName,
        billingLastName: data.name.lastName,
        billingAddressLine1: data.address.addressLine1,
        billingAddressLine2: data.address.addressLine2,
        billingCity: data.address.cityLocality,
        billingStateProvince: data.address.stateProvince,
        billingPostalCode: data.address.postalCode,
        billingCountry: data.address.countryCode,
      }
      const initialState = {
        billingInfo:{
          ...initialInfo
        },
        initialInfo,
        patchInfo:{},
      };
      return initialState;
    }

    handleChange = (name) => event => {
      const { billingInfo, initialInfo, patchInfo } = this.state;
      const value = event.target ? event.target.value : event;
        patchInfo[name] = {value, op: 'replace', path: '/'+[name]}
        billingInfo[name] = value;
        this.setState({billingInfo, patchInfo})
    }

    handleSubmit = () => {
      const { patchInfo } = this.state;
      const tenantId = this.props.tenantsByDomain.id;
      const { orderId } = this.props;
      let patchData = [];
      Object.keys(patchInfo).map((patch, index) => {
        patchData.push(patchInfo[patch])
      })
      this.props.patchBillingInfo({tenantId, orderId, data: patchData})
    }

    handleCloseDrawer = () => {
      this.props.closeForm();
    }


    render() {
      const { billingInfo } = this.state;
      return (
        <FormDrawer open={this.props.showForm}>
          <FormDrawerHeader
            closeClick={this.handleCloseDrawer}>
              <IntlMessages id="containers.Orders.OrderInfo.billingInfo.editBuyerInformation" />
          </FormDrawerHeader>

          <FormDrawerContent>
            <div className="">
              <Typography className="mr-2 mb-3" variant="title">
                <IntlMessages id="containers.Orders.OrderInfo.buyerInfo.billingInfo" />
              </Typography>
              <TextField
                className="my-3"
                label={<IntlMessages id="containers.Orders.OrderInfo.billingInfo.billingEmail" />}
                id="address-line1"
                value={billingInfo.billingEmail}
                onChange={this.handleChange('billingEmail')}
                fullWidth
              />
              <TextField
                className="my-3"
                label={<IntlMessages id="containers.Orders.OrderInfo.billingInfo.PhoneNumber" />}
                id="address-line1"
                value={billingInfo.billingPhoneNumber}
                onChange={this.handleChange('billingPhoneNumber')}
                fullWidth
              />
              <TextField
                className="my-3"
                label={<IntlMessages id="containers.Orders.OrderInfo.billingInfo.FirstName" />}
                id="address-line1"
                value={billingInfo.billingFirstName}
                onChange={this.handleChange('billingFirstName')}
                fullWidth
              />
              <TextField
                className="my-3"
                label={<IntlMessages id="containers.Orders.OrderInfo.billingInfo.MiddleName" />}
                id="address-line1"
                value={billingInfo.billingMiddleName}
                onChange={this.handleChange('billingMiddleName')}
                fullWidth
              />
              <TextField
                className="my-3"
                label={<IntlMessages id="containers.Orders.OrderInfo.billingInfo.LastName" />}
                id="address-line1"
                value={billingInfo.billingLastName}
                onChange={this.handleChange('billingLastName')}
                fullWidth
              />
              <TextField
                className="my-3"
                label={<IntlMessages id="components.Venues.VenuesDrawer.addressLine1" />}
                id="address-line1"
                value={billingInfo.billingAddressLine1}
                onChange={this.handleChange('billingAddressLine1')}
                fullWidth
              />
              <TextField
                className="my-3"
                label={<IntlMessages id="components.Venues.VenuesDrawer.addressLine2" />}
                id="address-line2"
                value={billingInfo.billingAddressLine2}
                onChange={this.handleChange('billingAddressLine2')}
                fullWidth
              />
              <TextField
                className="my-3"
                label={<IntlMessages id="components.Venues.VenuesDrawer.cityLocality" />}
                id="city-locality"
                value={billingInfo.billingCity}
                onChange={this.handleChange('billingCity')}
                fullWidth
              />
              <FormControl className="w-100 my-3">
                <CountrySelect
                  onChange={this.handleChange('billingCountry')}
                  value={billingInfo.billingCountry}
                  label={<IntlMessages id="components.Venues.VenuesDrawer.country" />}
                />
                <FormControl className="w-100 my-3">
                  <StateSelect
                    onChange={this.handleChange('billingStateProvince')}
                    value={billingInfo.billingStateProvince}
                    countryCode={billingInfo.billingCountry}
                    multiple={false}
                    label={<IntlMessages id="components.Venues.VenuesDrawer.stateProvince" />}
                  />
                </FormControl>
                <TextField className="my-2" label={<IntlMessages id="components.Venues.VenuesDrawer.zipCode" />} id="zip-code"
                  value={billingInfo.billingPostalCode}
                  onChange={this.handleChange('billingPostalCode')}
                  fullWidth
                  inputProps={{ min: 0 }}
                  type="number"
                />
              </FormControl>
            </div>
          </FormDrawerContent>
          <FormDrawerFooter>
            <Button
              type="submit"
              onClick={this.handleSubmit}
              className="mr-2"
              variant="raised"
              color="primary">
              {this.props.actionLoader ? <CircularProgress size={24} color="secondary" /> : <IntlMessages id="button.save_btn" />}
            </Button>
            <Button onClick={this.handleCloseDrawer} color="secondary">
              <IntlMessages id="button.cancel_btn" />
            </Button>
          </FormDrawerFooter>
        </FormDrawer>
      );
    }
}

const mapStateToProps = ({ tenants, orders }) => {
  return {
    actionLoader: orders.get('actionLoader'),
    tenantsByDomain: tenants.tenantsByDomain,
  };
};
export default connect(
  mapStateToProps,
  {
    patchBillingInfo
  }
)(EditBillingInfo);

