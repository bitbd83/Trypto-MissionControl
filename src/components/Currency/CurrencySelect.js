import React from 'react';
import { connect } from 'react-redux';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Select from 'react-select';
import { fetchAllCurrencies } from '../../actions/Currency';
import IntlMessages from 'util/IntlMessages';
import _ from "lodash";

class CurrencySelect extends React.Component {

  componentWillMount = () => {
    if(this.props.currencies.length == 0)
    this.props.fetchAllCurrencies();
  }

  handleChange = currency => {
    let data = _.find(this.props.currencies, ['value', currency]).data;
    this.props.onChange(data)
  }

  render() {
    let options = this.props.currencies || []
    return (
      <FormControl component="fieldset" className="w-100 mb-2">
        <FormLabel className={'shrink'}><IntlMessages id="component.currency.currencySelect.placeHolder" /></FormLabel>
        <Select
          placeholder={<IntlMessages id="component.currency.currencySelect.placeHolder" />}
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
const mapStateToProps = ({ currency }) => {
  return {
    loader: currency.get('loadCurrency'),
    currencies: currency.get('currencies').toJS(),
  };
};
export default connect(
  mapStateToProps,
  {
    fetchAllCurrencies
  },
)(CurrencySelect);

