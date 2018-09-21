import React, { Component } from 'react';
import { TimePicker } from 'material-ui-pickers';

export default class TimePickers extends Component {
  render() {
    const { selectedTime, timeChange } = this.props;
    return (
      <div key="basic_time" className="picker">
        <TimePicker fullWidth value={selectedTime} onChange={time => timeChange(time)} />
      </div>
    );
  }
}
