import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import TenantsDate from 'components/Tenants/TenantsDate';
import {Badge} from 'reactstrap';
import OrderMenu from './OrderMenu';
import TenantsCurrencyVal from '../../../components/Tenants/Currency';

class OrderTableCell extends React.Component {

  processStatus = (status) => {
    let color = '';
    switch(status.key){
      case 0:
        color = 'warning';
        break;
      case 1:
        color = 'info';
        break;
      case 2:
        color = 'success';
        break;
      case 3:
        color = 'danger';
        break;
      default:
        color = 'info';
        break;
    }
    return <Badge color={color} className={`text-uppercase`} style={{fontSize:'10px'}}>{status.value}</Badge>;
  }

  render() {
    const {item, index, tenantsByDomain} = this.props;

    const amountCss = item.orderSummary.grandTotal == '-' ? "text-danger" : "text-success";

    return (
      <tr
          tabIndex={-1}
          key={index}
      >
        <td className="align-items-start"><a href="#">{item.orderCode}</a></td>
        <td className="align-items-center text-center">
          {item.shippingInfo ? `${item.shippingInfo.name.firstName} ${item.shippingInfo.name.lastName}` : ''}
        </td>
        <td className={`text-nowrap align-items-center text-center ${amountCss}`}>
          <TenantsCurrencyVal data={tenantsByDomain} value={item.orderSummary.grandTotal}/>
        </td>
        <td className="text-center">
          <TenantsDate
            timezone={Object.keys(tenantsByDomain).length > 0 && tenantsByDomain.timeZone}
            time={item.dateCreatedUtc}
            timeFormat="MMM DD, YYYY"
          />
        </td>
        <td className="text-right">
            {this.processStatus(item.status)}
        </td>
      </tr>
    );
  }
}

export default OrderTableCell;
