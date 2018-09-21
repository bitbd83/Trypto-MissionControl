import React from 'react';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';

class PercentageInput extends React.Component {
  textChange = event => {
    if(event.target.value >= 0 && event.target.value <= 100){
      this.props.onChange(event.target.value)
    }
  }

  render() {
    const { value, label, styleName='' } = this.props;
    return (
      <React.Fragment>
        {label && (
          <InputLabel className={'shrink'}>
            {label}
          </InputLabel>
        )}
        <Input
          value = {value}
          onChange={this.textChange}
          endAdornment={<InputAdornment position="end">%</InputAdornment>}
          inputProps={{ min: 0, max: 100 }}
          type="number"
          margin="dense"
          {...this.props}
        />
      </React.Fragment>
    );
  }
}

export default PercentageInput;
