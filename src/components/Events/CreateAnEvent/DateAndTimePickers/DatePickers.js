import React, { Component } from 'react';
import { DatePicker } from 'material-ui-pickers';

export default class DatePickers extends Component {
  render() {
    const { selectedDate, dateChange } = this.props;

    return (
      <div key="basic_day" className="picker">
        <DatePicker
          fullWidth
          value={selectedDate}
          onChange={date => dateChange(date)}
          format="MMM DD, YYYY"
          animateYearScrolling={false}
          leftArrowIcon={<i className="zmdi zmdi-arrow-back" />}
          rightArrowIcon={<i className="zmdi zmdi-arrow-forward" />}
        />
      </div>
    );
  }
}
