import React from 'react';
import { Link } from 'react-router-dom';
import CustomScrollbars from 'util/CustomScrollbars';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import IntlMessages from 'util/IntlMessages';
import { getFeatureOptions } from '../../Events/EventOptions/actions'
import { fetchTicketTypeOptions } from '../actions'
import { eventStatic } from '../../Events/EventOptions'
import { StaticOptions } from '../Options'
import BackIcon from '@material-ui/icons/KeyboardArrowLeft';


class TicketSidebar extends React.Component {
  state = {
    selectedFilter: ''
  }


  componentWillReceiveProps = (nextProps) => {
    this.setState({selectedFilter: nextProps.selectedFilter});
  }

  getNavFilters = () => {
    let { selectedFilter } = this.state;
    return this.props.filterOptions.map((filter, index) => <li key={index}>
      <a
        href="javascript:void(0)"
        className={selectedFilter ===  filter.handle ? 'active' : ''}
        onClick={this.props.onSelect(filter.handle)}
      >
        <i className={`zmdi zmdi-${filter.icon}`}/>
        <span>{filter.title}</span>
      </a>
    </li>)
  };

  render() {
    const { filterOptions, currType, heading, eventId, optionType, backLink="false" } = this.props;
    return (
      <div className="module-side">
       <div className="module-side-header">
          <div className="module-logo">
            <i className="zmdi zmdi-account-box mr-4" />
            <span>{heading && heading}</span>
          </div>
        </div>

        <div className="module-side-content">
          <CustomScrollbars className="module-side-scroll scrollbar"
               style={{
                height: this.props.width >= 1200
                  ? `calc(100vh - ${backLink ? '210px': '150px' })`
                  : `calc(100vh - ${backLink ? '190px': '130px' })`
              }}>
            {optionType === 'event' ? <div className="module-add-task">
              <div style={{ pointerEvents: currType === 'Manage Basics' ? 'none' : '' }} className="text-white btn-block mb-2">
                <Button component={Link} to={`/app/events/${eventId}/ticket-types/create/paid`} className="btn-block pl-1 mb-2" variant="raised" aria-label="add new" color="primary">
                  <AddIcon className="mr-1" />
                  <span><IntlMessages id="pages.events.ticketTypes.sidebar.btn.paidTicket" /></span>
                </Button>
                {/* <Button onClick={this.props.onCopyTicket} className="btn-block pl-1" variant="raised" aria-label="add new" color="primary">
                  <span><IntlMessages id="pages.events.ticketTypes.sidebar.btn.copyTicket" /></span>
                </Button> */}
              </div>
            </div> : ''}

            <div className="module-side-nav">
              <ul className="module-nav">
               <div className="mb-3">
               {filterOptions &&<h4 className="mb-0 ml-2">Filters</h4>}
                  {filterOptions && this.getNavFilters()}
                  </div>
              </ul>
            </div>
          </CustomScrollbars>
        </div>

         {backLink && (
            <div className="hotel-side-footer text-center py-2 border-top" style={{height: 60}}>
              <Button
                size={'small'}
                aria-label="back"
                component={Link}
                to={backLink.url}
              >
                <BackIcon className="mr-3"/>
                {backLink.label}
              </Button>
            </div>
          )}
      </div>
    );
  }
}


const mapStateToProps = ({ eventoptions, tenants, ticketTypes }) => {
  const { optionsLoader } = eventoptions;
  const { tenantsByDomain } = tenants;
  return {
    ticketTypeOptions: ticketTypes.get('ticketTypeOptions').toJS(),
    optionsLoader,
    eventOptions: eventoptions.options,
    tenantsByDomain
  };
};

export default connect(
  mapStateToProps
)(TicketSidebar);

