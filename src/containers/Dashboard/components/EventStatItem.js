import React from 'react';
import TenantsCurrencyVal from 'components/Tenants/Currency';
import { Typography } from '@material-ui/core';

class EventStatItem extends React.Component {

  render() {
    const {id, data, tenantsByDomain } = this.props;
    return (
      <tr
        tabIndex={-1}
        key={id}
        className="mb-4"
      >
        <td className="align-items-center">
          <Typography gutterBottom>{data.eventName}</Typography>
        </td>
        <td className="user-profile text-success text-center">
          <h4 className="mt-1"><TenantsCurrencyVal data={tenantsByDomain} value={data.earnings}/></h4>
        </td>
      </tr>
    );
  }
}

export default EventStatItem;
