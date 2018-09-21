import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { fetchOnSaleEvents, switchOnSaleEventStatus } from './actions';
import InlinePagination from 'components/Pagination/InlinePagination'
import EventItem from './EventItem'
import NoEvent from './NoEvent'
import EventLoader from './EventLoader'


class OnSaleEventSection extends React.Component {
  state = {
    rowsPerPage: 12,
    page: 0,
    searchText: ''
   };

  componentWillMount = () => {
    this.getAllEvents();
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.refetchOnSaleEvent){
      this.getAllEvents();
    }
  }

  handleSearchChange = event => {
    this.setState({ searchText: event.target.value, page: 0 },
      () => this.getAllEvents());
  }

  handleChangePage = page => {
    this.setState({ page },
    () => this.getAllEvents());
  }

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value },
      () => this.getAllEvents());
  };

  getAllEvents = () => {
    const { page, rowsPerPage, searchText } = this.state;
    const skip = page * rowsPerPage;
    const take = rowsPerPage;
    this.props.fetchOnSaleEvents({ skip, take, searchText });
  }

  handleStatusChange = (action, eventId) => {
    this.props.switchOnSaleEventStatus({action, eventId});
  }

  listEvents = (items) => {
    return items.map( (item, index) => (
      <EventItem
        item={item}
        index={index}
        key={index}
        tenantsByDomain={this.props.tenantsByDomain}
        changeStatus={this.handleStatusChange}
        type="onSale"
      />
    ))
  }

  render() {
    const { isFetching, events } = this.props;
    const { searchText } = this.state;
    let content = <EventLoader />;
    if(!isFetching && events) {
      if(events.items.length){
        content = this.listEvents(events.items)
      } else {
        if(searchText)
          content = <NoEvent />
        else {
          return <React.Fragment />;
        }
      }
    }

    return (
      <React.Fragment>
        <Grid container justify={'space-between'} alignItems={"center"} spacing={16} className={'my-2'}>
          <Grid item >
            <Typography variant={'title'}>
              On Sale Events
            </Typography>
          </Grid>
          <Grid item >
            <div className="search-bar right-side-icon d-none d-lg-block">
              <div className="form-group">
                <input className="form-control" onChange={this.handleSearchChange} type="search" placeholder="" value={this.state.searchText} />
                <button className="search-icon">
                  <i className="zmdi zmdi-search zmdi-hc-lg"></i>
                </button>
              </div>
            </div>
          </Grid>
        </Grid>

        <Grid container direction={'row'} justify="flex-start" alignItems="stretch" spacing={16} >
          {content}
        </Grid>

        <InlinePagination
          colspan={3}
          totalPages = {events.totalPages}
          count={events.totalCount}
          rowsPerPage={this.state.rowsPerPage}
          page={this.state.page}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
          name="All Events"
        />
      </React.Fragment>
    );
  }
}
const mapStateToProps = ({ tenants, eventsdashboard }) => {
  return {
    isFetching: eventsdashboard.get('onSaleEventsLoader'),
    refetchOnSaleEvent: eventsdashboard.get('refetchOnSaleEvent'),
    events: eventsdashboard.get('onSaleEvents').toJS(),
    tenantsByDomain: tenants.tenantsByDomain,
  };
};
export default connect(
  mapStateToProps,
  {
    fetchOnSaleEvents,
    switchOnSaleEventStatus
  },
)(OnSaleEventSection);

