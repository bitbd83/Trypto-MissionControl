import React from 'react'
import CreatePaidTicket from './index'
import { connect } from 'react-redux';
import { fetchTicketType } from '../actions'
import CircularProgress from '@material-ui/core/CircularProgress';


class EditPaidTicket extends React.Component{

  componentWillMount(){
    const { ticketTypeId, eventId } = this.props.match.params;
    const tenantId  = this.props.tenantsByDomain.id
    if(ticketTypeId){
      this.props.fetchTicketType({ tenantId, eventId, ticketTypeId});
    }
  }

  render(){
    if(this.props.isFetching){
      return <div className="d-flex justify-content-center"><CircularProgress/></div>
    }
    return(
      <CreatePaidTicket history={this.props.history} match={this.props.match} data={this.props.ticketType}/>
    )
  }
}


const mapStateToProps = ({tenants, ticketTypes}) => {
  return {
    isFetching: ticketTypes.get('isFetching'),
    ticketType: ticketTypes.get('ticketType').toJS(),
    tenantsByDomain: tenants.tenantsByDomain,
  };
};

export default connect(mapStateToProps, {
  fetchTicketType
})(EditPaidTicket);

