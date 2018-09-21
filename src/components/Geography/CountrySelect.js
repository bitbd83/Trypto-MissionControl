import React from 'react';
import { connect } from 'react-redux';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Select from 'react-select';
import { fetchAllCountries } from '../../actions/Geography';
import IntlMessages from 'util/IntlMessages';

class CountrySelect extends React.Component {

  componentWillMount = () => {
    if(this.props.countries.length == 0)
    this.props.fetchAllCountries();
  }

  handleChange = country => {
    this.props.onChange(country)
  }

  render() {
    let {label=(<IntlMessages id="component.geography.countrySelect.placeHolder" />)} = this.props;
    let options = this.props.countries || []
    return (
      <FormControl component="fieldset" className="w-100 mb-2">
        {label && (
          <FormLabel className={'shrink'}>
            {label}
          </FormLabel>
        )}
        <Select
          placeholder={<IntlMessages id="component.geography.countrySelect.placeHolder" />}
          isLoading={this.props.loader}
          value={this.props.value}
          onChange={this.handleChange}
          options={options}
          simpleValue={true}
        />
      </FormControl>
    );
  }
}
const mapStateToProps = ({ geography }) => {
  return {
    loader: geography.get('loadCountry'),
    countries: geography.get('countries').toJS(),
  };
};
export default connect(
  mapStateToProps,
  {
    fetchAllCountries
  },
)(CountrySelect);

