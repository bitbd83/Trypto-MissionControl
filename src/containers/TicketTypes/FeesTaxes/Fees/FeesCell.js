import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import { connect } from 'react-redux';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IntlMessages from 'util/IntlMessages';
import TenantsDate from 'components/Tenants/TenantsDate';
import DeleteIcon from '@material-ui/icons/Delete';
import {Badge} from 'reactstrap';
import Confirm from '../../../../components/Dialogs/Confirm'
import { deleteFees } from '../../actions'

class FeesCell extends React.Component {
  state = {
    anchorEl: null,
    confirm: false,
    action: null,
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  onDeleteFee = (action, showConfirm = false) => event =>{
    this.handleClose();
    this.setState({action, confirm: showConfirm})
  }

  handleDelete = (status, action) => {
    const { ticketTypeId, eventId } = this.props.match.params;
    const tenantId  = this.props.tenantsByDomain.id
    if(status){
      this.props.deleteFees({ data: { ids: [this.props.item.id] }, tenantId, eventId, ticketTypeId });
    }
  }

  processStatus = (status = false) => event => {
    this.handleClose();
    const { action } = this.state;
    this.setState({ action: null, confirm: false },
      () => this.handleDelete(status, action)
    );
  }

  render() {
    const { anchorEl } = this.state;
    const { index, tenantsByDomain, item } = this.props;

    return (
      <div key={index} className="contact-item">
        <div className="col text-truncate">
          <Typography variant="subheading">
            {item.name}
          </Typography>
          <Typography variant="caption">
            {item.feeCriteria.strategy.factor === 'Percentage'
              ? item.feeCriteria.strategy.amount + '% with' + ' $' + item.feeCriteria.minAmount + ' min ' + '$' + item.feeCriteria.maxAmount + ' max'
            : '$' + item.feeCriteria.strategy.amount + ' Flat Rate'}
          </Typography>
        </div>

        <div className="col-sm-1 px-0 mr-5">
          {item.active ? (
            <Badge color="success" className={"text-uppercase mb-0 d-block"}><IntlMessages id="content.status.active" /></Badge>
          ) : (
            <Badge color="warning" className={"text-uppercase mb-0 d-block"}><IntlMessages id="content.status.inactive" /></Badge>
          )}
        </div>

      <div className="col-sm-3 px-0 d-none d-md-flex flex-column">
        <Typography variant="subheading">
          <IntlMessages id="components.Venues.VenuesListItem.createdOn" />
        </Typography>
        <Typography variant="caption">
            <TenantsDate
              timezone={Object.keys(tenantsByDomain).length > 0 && tenantsByDomain.timeZone}
              time={item.dateCreatedUtc}
            />
        </Typography>
      </div>
        <div className="col-auto actions">
          <IconButton className="size-30" onClick={this.onDeleteFee('delete', true)}>
            <DeleteIcon />
          </IconButton>
        </div>
        <Confirm
          open={this.state.confirm}
          handleClose={this.processStatus}
          type={this.state.action}
        />
      </div>
    );
  }
}

export default connect(
  null,
  {
    deleteFees
  },
)(FeesCell);
