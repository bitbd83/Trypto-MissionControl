import React from 'react';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';

class CurrencyInput extends React.Component {
  textChange = event => {
    if(event.target.value >= 0){
      this.props.onChange(event.target.value)
    }
  }

  render() {
    const { value, label, symbol='$' } = this.props;
    return (
      <React.Fragment>
        {label && (
          <InputLabel className={'shrink'}>
            {label}
          </InputLabel>
        )}
        <Input
          value={value}
          onChange={this.textChange}
          startAdornment={<InputAdornment position="start">{symbol}</InputAdornment>}
          inputProps={{ min: 0}}
          type="number"
          margin="dense"
        />
      </React.Fragment>
    );
  }
}

export default CurrencyInput;
