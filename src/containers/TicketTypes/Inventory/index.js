import React from 'react';
import { connect } from 'react-redux';
import { fetchInventory, fetchTicketType } from '../actions';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddInventory from './AddInventory'

class Inventory extends React.Component {
  componentDidMount() {
    const { ticketTypeId, eventId } = this.props.match.params;
    const tenantId  = this.props.tenantsByDomain.id
    this.getInventory();
    this.props.fetchTicketType({ eventId, tenantId, ticketTypeId});
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.refetchInventory){
      this.getInventory();
    }
  }

  getInventory = () => {
    const { ticketTypeId, eventId } = this.props.match.params;
    const tenantId  = this.props.tenantsByDomain.id
    this.props.fetchInventory({ eventId, tenantId, ticketTypeId });
  }

  render() {
    if (this.props.isFetchingInventory) {
      return (
        <div className="d-flex justify-content-center">
          <CircularProgress />
        </div>
      );
    }

    return (
      <div>
        <AddInventory {...this.props} />
      </div>
    );
  }
}

const mapStateToProps = ({ settings, ticketTypes, tenants }) => {
  return {
    inventory: ticketTypes.get('inventory').toJS(),
    tenantsByDomain: tenants.tenantsByDomain,
    isFetchingInventory: ticketTypes.get('isFetchingInventory'),
    refetchInventory: ticketTypes.get('refetchInventory'),
    newInventoryId: ticketTypes.get('newInventoryId'),
  };
};

export default connect(
  mapStateToProps,
  { fetchInventory, fetchTicketType },
)(Inventory);
