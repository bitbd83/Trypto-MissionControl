import React from 'react';
import { DateRangePicker } from "react-dates";
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';
import moment from 'moment';


class DateRangeSelect extends React.Component{
  state = {

  }
  render(){
    var width = window.innerWidth;
    const { range } = this.props;
    return(
      <div>
        <DateRangePicker
            startDate={range.from} // momentPropTypes.momentObj or null,
            startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
            endDate={range.to} // momentPropTypes.momentObj or null,
            endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
            onDatesChange ={({ startDate, endDate }) => this.props.onDatesChange(startDate, endDate)}
            focusedInput={this.state.focusedInput}
            onFocusChange={focusedInput => this.setState({ focusedInput })}
            daySize={40}
            isOutsideRange={(day) => day.isAfter(moment())}
            showClearDate
            numberOfMonths={width < 700 ? 1 : 2}
            minimumNights={0}
            onClose={this.props.onClosePicker}
          />
      </div>
    )
  }
}

export default DateRangeSelect;
