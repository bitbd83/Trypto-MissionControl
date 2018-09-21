import React from 'react';
import OrderTableCell from './OrderTableCell';
import { connect } from 'react-redux';
import { fetchAllOrders } from '../../Orders/actions';
import IntlMessages from 'util/IntlMessages';
import Loader from '../../../components/Loader';


class RecentOrdersList extends React.Component {
  noData = () => (
    <tr>
      <td colSpan="5" className={'text-center'}>
        <IntlMessages id="dashboard.recentOrders.noOrders" />
      </td>
    </tr>
  );


  listOrders = (order) => {
    return order.map((item, index) => {
      if(index < 5){
        return (<OrderTableCell
          key={index}
          index={index}
          item={item}
          tenantsByDomain={this.props.tenantsByDomain}
        />)
      }
    })
  }


  componentWillMount(){
    this.props.fetchAllOrders({
      tenantId:this.props.tenantsByDomain.id,
      criteria: {skip:0, skipPaging:true, take:6} });
  }

  render() {
    const { isFetching, orders } = this.props;

    let content = (
    <tr>
      <td colSpan="5">
        <Loader />
      </td>
    </tr>);

    if(!isFetching && orders) {
      if(orders.items && orders.items.length){
        content = this.listOrders(orders.items)
      } else {
        content = this.noData()
      }
    }
    return (
      <div className="table-responsive-material">
        <table className="default-table table-unbordered table table-sm table-hover">
          <thead className="th-border-b">
            <tr>
                <th>OrderId</th>
                <th className="text-center">Customer</th>
                <th className="text-center">Amount</th>
                <th className="text-center">Date</th>
                <th className="text-right status-cell">Status</th>
            </tr>
          </thead>
          <tbody>
            {content}
          </tbody>
        </table>
      </div>
    );
  }
}


const mapStateToProps = ({ orders, tenants }) => {
  return {
    isFetching: orders.get('isFetching'),
    orders: orders.get('orders').toJS(),
    tenantsByDomain: tenants.tenantsByDomain,
  };
};
export default connect(
  mapStateToProps,
  {
    fetchAllOrders
  },
)(RecentOrdersList);
