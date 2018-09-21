import React from 'react';
import IntlMessages from 'util/IntlMessages';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { postVenues, patchVenueById, postVenuesClear } from 'containers/Venues/actions';
import CountrySelect from 'components/Geography/CountrySelect';
import StateSelect from 'components/Geography/StateSelect';
import FormDrawer from 'components/FormDrawer';
import FormDrawerHeader from 'components/FormDrawer/FormDrawerHeader';
import FormDrawerContent from 'components/FormDrawer/FormDrawerContent';
import FormDrawerFooter from 'components/FormDrawer/FormDrawerFooter';
import Immutable from 'immutable';
import diff from 'immutablediff';

class VenuesDrawer extends React.Component {
  constructor(props) {
    super();
    this.state = this.getInitialState();
  }

  getInitialState = () => {
    const initialState = {
      gotVenues: {},
      name: '',
      subTitle: '',
      description: '',
      address: '',
      addressLine1: '',
      addressLine2: '',
      cityLocality: '',
      country: '',
      stateProvince: '',
      zipCode: '',
      latitude: '',
      longitude: '',
    };
    return initialState;
  };

  componentWillReceiveProps = nextProps => {
    const { venueById, edit, postedVenue } = this.props;
    if (!nextProps.postLoader) {
      if (edit && edit.param && Object.keys(venueById).length > 0) {
        this.setState({
          gotVenues: venueById,
          name: venueById.name,
          subTitle: venueById.subTitle,
          description: venueById.description,
          address: '',
          addressLine1: venueById.address.addressLine1,
          addressLine2: venueById.address.addressLine2,
          cityLocality: venueById.address.cityLocality,
          country: venueById.address.countryCode,
          stateProvince: venueById.address.stateProvince,
          zipCode: venueById.address.postalCode,
          latitude: venueById.address.geoCoordinates.latitude,
          longitude: venueById.address.geoCoordinates.longitude,
        });
      }
    }

    if (postedVenue !== undefined) {
      let states = this.getInitialState();
      this.setState(states);
      nextProps.hiddenForm();
      nextProps.postVenuesClear();
    }
  };

  addressChange = address => {
    this.setState({ address });
  };

  handleSelect = address => {
    this.setState({ address });

    geocodeByAddress(address).then(results => this.autoCompleted(results[0]));

    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => this.setState({ latitude: latLng.lat, longitude: latLng.lng }))
      .catch(error => console.error('Error', error));
  };

  autoCompleted(results) {
    var addresses = results.address_components;
    var street_number = '';
    var route = '';
    var locality = '';
    var area_level = '';
    var postal_code = '';
    for (var i = 0; i < addresses.length; i++) {
      switch (addresses[i].types[0]) {
        case 'street_number':
          street_number = addresses[i].short_name;
          break;
        case 'route':
          route = addresses[i].short_name;
          break;
        case 'country':
          this.setState({ country: addresses[i].short_name });
          break;
        case 'locality':
          this.setState({ cityLocality: addresses[i].long_name });
          locality = addresses[i].short_name;
          break;
        case 'administrative_area_level_1':
          this.setState({ stateProvince: addresses[i].short_name });
          area_level = addresses[i].short_name;
          break;
        case 'postal_code':
          this.setState({ zipCode: addresses[i].long_name });
          postal_code = addresses[i].short_name;
          break;
        default:
          break;
      }
    }
    var addressLine1 = '';
    if (street_number) {
      addressLine1 += street_number + ' ';
    }
    if (route) {
      addressLine1 += route;
    }
    // if (locality) {
    //   addressLine1 += locality + ', ';
    // }
    // addressLine1 += area_level + ' ' + postal_code;
    this.setState({ addressLine1 });
  }

  selectCountry(val) {
    this.setState({ country: val });
  }

  selectRegion(val) {
    this.setState({ stateProvince: val });
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleCloseDrawer = () => {
    let states = this.getInitialState();
    this.setState(states);
    this.props.hiddenForm();
  };

  saveVenues = e => {
    e.preventDefault();

    const { name, subTitle, description, addressLine1, addressLine2, cityLocality, stateProvince, zipCode, country, latitude, longitude, gotVenues } = this.state;
    const { edit, tenantsByDomain } = this.props;
    if (edit && edit.param) {
      var venueData = {
        name: gotVenues.name,
        subTitle: gotVenues.subTitle,
        description: gotVenues.description,
        address: {
          addressLine1: gotVenues.address.addressLine1,
          addressLine2: gotVenues.address.addressLine2,
          addressLine3: '',
          cityLocality: gotVenues.address.cityLocality,
          countryCode: gotVenues.address.country,
          postalCode: gotVenues.address.postalCode,
          stateProvince: gotVenues.address.stateProvince,
          geoCoordinates: {
            latitude: gotVenues.address.geoCoordinates.latitude,
            longitude: gotVenues.address.geoCoordinates.longitude,
          },
        },
      };
      var list = Immutable.Map(venueData);
      var patchData = {
        name: name,
        subTitle: subTitle,
        description: description,
        address: {
          addressLine1: addressLine1,
          addressLine2: addressLine2,
          addressLine3: '',
          cityLocality: cityLocality,
          countryCode: country,
          postalCode: zipCode,
          stateProvince: stateProvince,
          geoCoordinates: {
            latitude: latitude,
            longitude: longitude,
          },
        },
      };

      var ops = Immutable.Map(patchData);
      var data = diff(list, ops);
      this.props.patchVenueById({ tenantId: tenantsByDomain.id, venueId: gotVenues.id, data });
    } else {
      let data = {
        name,
        subTitle,
        description,
        address: {
          addressLine1,
          addressLine2,
          addressLine3: '',
          stateProvince,
          cityLocality,
          postalCode: zipCode,
          countryCode: country,
          geoCoordinates: {
            latitude,
            longitude,
          },
        },
      };
      this.props.postVenues({ tenantId: tenantsByDomain.id, data });
    }
  };

  render() {
    const { showForm, venueById, postLoader } = this.props;
    const { gotVenues, name, subTitle, description, address, addressLine1, addressLine2, cityLocality, country, stateProvince, zipCode, latitude, longitude } = this.state;
    return (
      <FormDrawer anchor="right" open={showForm} onClose={() => this.handleCloseDrawer()}>
        <FormDrawerHeader
          closeClick={() => this.handleCloseDrawer()}>
            {Object.keys(gotVenues).length > 0 ? <IntlMessages id="components.Venues.VenuesDrawer.update" /> : <IntlMessages id="components.Venues.VenuesDrawer.add" />}{' '}
            <IntlMessages id="components.Venues.VenuesDrawer.aVenue" />
        </FormDrawerHeader>

        <FormDrawerContent>

          <TextField
            className="my-2"
            label={<IntlMessages id="components.Venues.VenuesDrawer.name" />}
            id="name"
            value={name}
            onChange={this.handleChange('name')}
            fullWidth
            helperText={<IntlMessages id="components.Venues.VenuesDrawer.thisVenueName" />}
          />
          <TextField
            className="my-2"
            label={<IntlMessages id="components.Venues.VenuesDrawer.subTitle" />}
            id="sub-title"
            value={subTitle}
            onChange={this.handleChange('subTitle')}
            fullWidth
            helperText={<IntlMessages id="components.Venues.VenuesDrawer.thisSubTitle" />}
          />
          <TextField
            className="my-2"
            id="description"
            label={<IntlMessages id="components.Venues.VenuesDrawer.description" />}
            multiline
            rowsMax="4"
            margin="normal"
            value={description}
            onChange={this.handleChange('description')}
            fullWidth
            helperText={<IntlMessages id="components.Venues.VenuesDrawer.thisSubTitle" />}
          />
          <PlacesAutocomplete value={address} onChange={this.addressChange} onSelect={this.handleSelect}>
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <div>
                <TextField
                  className="my-2"
                  label={<IntlMessages id="components.Venues.VenuesDrawer.venueAddress" />}
                  id="venue-address"
                  fullWidth
                  helperText={<IntlMessages id="components.Venues.VenuesDrawer.venueAddressGoogle" />}
                  {...getInputProps()}
                />
                <div className="autocomplete-dropdown-container">
                  {loading && (
                    <div className="loader-view">
                      <CircularProgress />
                    </div>
                  )}
                  {suggestions.map(suggestion => {
                    const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
                    const style = suggestion.active ? { backgroundColor: '#fafafa', cursor: 'pointer' } : { backgroundColor: '#ffffff', cursor: 'pointer' };
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, {
                          className,
                          style,
                        })}>
                        <span>{suggestion.description}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
          <Typography className={'mt-4 form-drawer-section-header'} variant={'subheading'} gutterBottom>
            <IntlMessages id="components.Venues.VenuesDrawer.address" />
          </Typography>
          <div className="app-wrapper">
            <TextField
              className="mt-0"
              label={<IntlMessages id="components.Venues.VenuesDrawer.addressLine1" />}
              id="address-line1"
              value={addressLine1}
              onChange={this.handleChange('addressLine1')}
              fullWidth
            />
            <TextField
              className="my-2"
              label={<IntlMessages id="components.Venues.VenuesDrawer.addressLine2" />}
              id="address-line2"
              value={addressLine2}
              onChange={this.handleChange('addressLine2')}
              fullWidth
            />
            <TextField
              className="my-2"
              label={<IntlMessages id="components.Venues.VenuesDrawer.cityLocality" />}
              id="city-locality"
              value={cityLocality}
              onChange={this.handleChange('cityLocality')}
              fullWidth
            />
            <FormControl className="w-100 my-3">
              <CountrySelect
                onChange={val => this.selectCountry(val)}
                value={country}
                label={<IntlMessages id="components.Venues.VenuesDrawer.country" />}
              />
              {/* <CountryDropdown value={country} valueType="short" onChange={val => this.selectCountry(val)} /> */}
            </FormControl>
            <FormControl className="w-100 my-3">
              <StateSelect
                onChange={val => this.selectRegion(val)}
                value={stateProvince}
                countryCode={country}
                multiple={false}
                label={<IntlMessages id="components.Venues.VenuesDrawer.stateProvince" />}
              />
              {/* <RegionDropdown country={country} countryValueType="short" value={stateProvince} valueType="short" onChange={val => this.selectRegion(val)} /> */}
            </FormControl>
            <TextField className="my-2" label={<IntlMessages id="components.Venues.VenuesDrawer.zipCode" />} id="zip-code" value={zipCode} onChange={this.handleChange('zipCode')} fullWidth />
            <h3 className="my-4">
              <IntlMessages id="components.Venues.VenuesDrawer.geoCoordinates" />
            </h3>
            <div className="d-flex my-2 flex-row">
              <TextField label={<IntlMessages id="components.Venues.VenuesDrawer.latitude" />} id="latitude" type="number" value={latitude} onChange={this.handleChange('latitude')} fullWidth />
              <TextField
                className="ml-2"
                label={<IntlMessages id="components.Venues.VenuesDrawer.longitude" />}
                id="longitude"
                type="number"
                value={longitude}
                onChange={this.handleChange('longitude')}
                fullWidth
              />
            </div>
          </div>
          <span className="my-2">
            <IntlMessages id="components.Venues.VenuesDrawer.drawerDescription" />
          </span>
        </FormDrawerContent>
        <FormDrawerFooter>
          <Button type="submit" onClick={this.saveVenues} className="mr-2" variant="raised" color="primary">
            {postLoader ? <CircularProgress size={20} style={{ color: 'white' }} /> : <IntlMessages id="components.Venues.VenuesDrawer.save" />}
          </Button>
          <Button onClick={() => this.handleCloseDrawer()} color="secondary">
            <IntlMessages id="components.Venues.VenuesDrawer.cancel" />
          </Button>
        </FormDrawerFooter>
      </FormDrawer>
    );
  }
}

const mapStateToProps = ({ tenants, venues }) => {
  const { tenantsByDomain } = tenants;
  const { venueById, edit, postLoader, postedVenue } = venues;
  return { tenantsByDomain, venueById, edit, postLoader, postedVenue };
};

export default connect(
  mapStateToProps,
  { postVenues, patchVenueById, postVenuesClear },
)(VenuesDrawer);
