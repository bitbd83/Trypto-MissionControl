import React from 'react';
import TextField from '@material-ui/core/TextField';
import IntlMessages from 'util/IntlMessages';

class TenantsCurrencyInput extends React.Component {
  render() {
    const { value, onChange } = this.props;
    return (
      <TextField
        id="currency"
        label={<IntlMessages id="components.Tenants.TenantsCurrencyInput.currencySymbol" />}
        value={value ? value : ''}
        type="number"
        onChange={event => onChange(event)}
        margin="normal"
      />
    );
  }
}

export default TenantsCurrencyInput;
