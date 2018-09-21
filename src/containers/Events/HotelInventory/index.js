import React, {Component} from 'react';
import {connect} from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getEventById } from 'containers/Events/CreateAnEvent/actions';
import HotelInventoryList from './HotelInventoryList'

class HotelInventory extends Component {

  showLoader = () => (
    <div className="d-flex justify-content-center mt-4">
      <CircularProgress/>
    </div>
  )

  componentWillMount = () => {
    const { eventId } = this.props.match.params;
    const tenantId = this.props.tenantsByDomain.id;
    this.props.getEventById({tenantId, selectedEventId: eventId})
  };

  render() {
    const {isFetching, eventById } = this.props;
    let content = this.showLoader();

    if (isFetching) {
      return <div className="d-flex justify-content-center mt-4">
        <CircularProgress/>
      </div>
    }

    return (
      <div className="app-wrapper">
        <HotelInventoryList { ...this.props} />
      </div>
    )
  }
}
const mapStateToProps = ({createanevent, tenants }) => {
  return {
    eventById: createanevent.eventById,
    isFetching: createanevent.isFetching,
    tenantsByDomain: tenants.tenantsByDomain,
  };
}

export default connect(mapStateToProps,{
  getEventById
})(HotelInventory);
