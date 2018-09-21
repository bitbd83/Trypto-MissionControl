import React from 'react';
import Button from '@material-ui/core/Button';
import FormDrawer from 'components/FormDrawer';
import FormDrawerHeader from 'components/FormDrawer/FormDrawerHeader';
import FormDrawerContent from 'components/FormDrawer/FormDrawerContent';
import FormDrawerFooter from 'components/FormDrawer/FormDrawerFooter';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';
import { patchShippingInfoInfo } from '../../../actions';
import IntlMessages from 'util/IntlMessages';
import FormControl from '@material-ui/core/FormControl';
import CountrySelect from 'components/Geography/CountrySelect';
import StateSelect from 'components/Geography/StateSelect';
import Typography from '@material-ui/core/Typography';


class EditShippingInfo extends React.Component {

    constructor (props) {
      super();
      this.state = this.getInitialState(props);
    }

    getInitialState = (props) => {
      const data = props.data !== undefined ? props.data : {phoneNumber: {}, name: {}, address: {}};
      const  initialInfo = {
        shippingPhoneNumber: data.phoneNumber.number,
        shippingFirstName: data.name.firstName,
        shippingMiddleName: data.name.middleName,
        shippingLastName: data.name.lastName,
        shippingAddressLine1: data.address.addressLine1,
        shippingAddressLine2: data.address.addressLine2,
        shippingCity: data.address.cityLocality,
        shippingStateProvince: data.address.stateProvince,
        shippingPostalCode: data.address.postalCode,
        shippingCountry: data.address.countryCode,
        shippingNotes: data.notes,
      }
      const initialState = {
        shippingInfo:{
          ...initialInfo
        },
        initialInfo,
        patchInfo:{},
      };
      return initialState;
    }

    handleChange = (name) => event => {
      const { shippingInfo, patchInfo } = this.state;
      const value = event.target ? event.target.value : event;
        patchInfo[name] = {value, op: 'replace', path: '/'+[name]}
        shippingInfo[name] = value;
        this.setState({shippingInfo, patchInfo})
    }

    handleSubmit = () => {
      const { patchInfo } = this.state;
      const tenantId = this.props.tenantsByDomain.id;
      const { orderId } = this.props;
      let patchData = [];
      Object.keys(patchInfo).map((patch, index) => {
        patchData.push(patchInfo[patch])
      })
      this.props.patchShippingInfoInfo({tenantId, orderId, data: patchData})
    }

    handleCloseDrawer = () => {
      this.props.closeForm();
    }

    render() {
      const { shippingInfo } = this.state;
      return (
        <FormDrawer open={this.props.showForm}>
          <FormDrawerHeader
            closeClick={this.handleCloseDrawer}>
              <IntlMessages id="containers.Orders.OrderInfo.billingInfo.editBuyerInformation" />
          </FormDrawerHeader>

          <FormDrawerContent>
            <div className="">
              <Typography className="mr-2 mb-3" variant="title">
                <IntlMessages id="containers.Orders.OrderInfo.buyerInfo.shippingInfo" />
              </Typography>
              <TextField
                className="my-3"
                label={<IntlMessages id="containers.Orders.OrderInfo.billingInfo.PhoneNumber" />}
                id="address-line1"
                value={shippingInfo.shippingPhoneNumber}
                onChange={this.handleChange('shippingPhoneNumber')}
                fullWidth
              />
              <TextField
                className="my-3"
                label={<IntlMessages id="containers.Orders.OrderInfo.billingInfo.FirstName" />}
                id="address-line1"
                value={shippingInfo.shippingFirstName}
                onChange={this.handleChange('shippingFirstName')}
                fullWidth
              />
              <TextField
                className="my-3"
                label={<IntlMessages id="containers.Orders.OrderInfo.billingInfo.MiddleName" />}
                id="address-line1"
                value={shippingInfo.shippingMiddleName}
                onChange={this.handleChange('shippingMiddleName')}
                fullWidth
              />
              <TextField
                className="my-3"
                label={<IntlMessages id="containers.Orders.OrderInfo.billingInfo.LastName" />}
                id="address-line1"
                value={shippingInfo.shippingLastName}
                onChange={this.handleChange('shippingLastName')}
                fullWidth
              />
              <TextField
                className="my-3"
                label={<IntlMessages id="components.Venues.VenuesDrawer.addressLine1" />}
                id="address-line1"
                value={shippingInfo.shippingAddressLine1}
                onChange={this.handleChange('shippingAddressLine1')}
                fullWidth
              />
              <TextField
                className="my-3"
                label={<IntlMessages id="components.Venues.VenuesDrawer.addressLine2" />}
                id="address-line2"
                value={shippingInfo.shippingAddressLine2}
                onChange={this.handleChange('shippingAddressLine2')}
                fullWidth
              />
              <TextField
                className="my-3"
                label={<IntlMessages id="components.Venues.VenuesDrawer.cityLocality" />}
                id="city-locality"
                value={shippingInfo.shippingCity}
                onChange={this.handleChange('shippingCity')}
                fullWidth
              />
              <FormControl className="w-100 my-3">
                <CountrySelect
                  onChange={this.handleChange('shippingCountry')}
                  value={shippingInfo.shippingCountry}
                  label={<IntlMessages id="components.Venues.VenuesDrawer.country" />}
                />
                <FormControl className="w-100 my-3">
                  <StateSelect
                    onChange={this.handleChange('shippingStateProvince')}
                    value={shippingInfo.shippingStateProvince}
                    countryCode={shippingInfo.shippingCountry}
                    multiple={false}
                    label={<IntlMessages id="components.Venues.VenuesDrawer.stateProvince" />}
                  />
                </FormControl>
                <TextField className="my-2" label={<IntlMessages id="components.Venues.VenuesDrawer.zipCode" />} id="zip-code"
                  value={shippingInfo.shippingPostalCode}
                  onChange={this.handleChange('shippingPostalCode')}
                  fullWidth
                  inputProps={{ min: 0 }}
                  type="number"
                />
                <TextField className="my-2" label={<IntlMessages id="containers.Orders.OrderInfo.billingInfo.notes" />} id="zip-code"
                  value={shippingInfo.shippingNotes}
                  onChange={this.handleChange('shippingNotes')}
                  fullWidth
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
    patchShippingInfoInfo
  }
)(EditShippingInfo);

