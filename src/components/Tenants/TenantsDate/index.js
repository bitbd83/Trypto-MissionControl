import React from 'react';
import moment from 'moment-timezone';

class TenantsDate extends React.Component {
  render() {
    const { timezone, time, timeFormat="MMM DD, YYYY hh:mm A" } = this.props;
    var date = '';
    if (timezone && time && timeFormat) {
      date = moment
        .utc(time)
        .utcOffset(timezone.baseUtcOffset)
        .format(timeFormat);
    }

    return <React.Fragment>{date}</React.Fragment>;
  }
}

export default TenantsDate;
