import React, {Component} from 'react';
import EventStatItem from './EventStatItem';
import Loader from '../../../components/Loader';
import { connect } from 'react-redux';
import { getTopEvent } from '../actions';
import IntlMessages from 'util/IntlMessages';

let counter = 0;

function createData(title, earnings) {
    counter += 1;
    return {id: counter, title, earnings};
}

class TopEventsList extends Component {
  componentWillMount(){
    this.props.getTopEvent({ tenantId:this.props.tenantsByDomain.id, take: 5 });
  }

  listEvents = data => {
    return data.map(d => <EventStatItem key={d.id} data={d} tenantsByDomain={this.props.tenantsByDomain}/>);
  }

  noData = () => (
    <tr>
      <td colSpan="2" className={'text-center'}>
        <IntlMessages id="dashboard.topEvents.noEvents" />
      </td>
    </tr>
  );

  render() {
    const { isFetching, topEvents } = this.props;

    let content = (
      <tr>
        <td colSpan="2">
          <Loader />
        </td>
      </tr>);

    if(!isFetching && topEvents) {
      if(topEvents.items && topEvents.items.length){
        content = this.listEvents(topEvents.items)
      } else {
        content = this.noData()
      }
    }
    return (
      <div className="table-responsive-material">
        <table className="default-table table-unbordered table table-sm table-hover">
          <thead className="th-border-b">
            <tr>
              <th><IntlMessages id="dashboard.topEvents.table.heading.event" /></th>
              <th className={'text-center'}><IntlMessages id="dashboard.topEvents.table.heading.earning" /></th>
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

const mapStateToProps = ({ dashboard, tenants }) => {
  return {
    isFetching: dashboard.get('isFetching'),
    topEvents: dashboard.get('topEvents').toJS(),
    tenantsByDomain: tenants.tenantsByDomain,
  };
};
export default connect(
  mapStateToProps,
  {
    getTopEvent
  },
)(TopEventsList);
