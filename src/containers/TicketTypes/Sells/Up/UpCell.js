import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import IntlMessages from 'util/IntlMessages';
import TenantsDate from 'components/Tenants/TenantsDate';
import DeleteIcon from '@material-ui/icons/Delete';
import {Badge} from 'reactstrap';
import { deleteUpSell } from '../actions'
import Confirm from '../../../../components/Dialogs/Confirm'

class UpCell extends React.Component {
  state = {
    confirm: false,
    action: null,
  }

  onDeleteUp = (action, showConfirm = false) => event =>{
    this.setState({action, confirm: showConfirm})
  }

  handleDelete = (status, action) => {
    const { ticketTypeId, eventId } = this.props.match.params;
    const tenantId  = this.props.tenantsByDomain.id
    if(status){
      this.props.deleteUpSell({ data: { ids: [this.props.item.id] }, tenantId, eventId, ticketTypeId });
    }
  }

  processStatus = (status = false) => event => {
    const { action } = this.state;
    this.setState({ action: null, confirm: false },
      () => this.handleDelete(status, action)
    );
  }

  render() {
    const { item } = this.props;

    return (
      <div className="contact-item">
        <div className="col text-truncate">
          <Typography variant="subheading">
            {item.name}
          </Typography>
        </div>

        <div className="col-sm-1 px-0 mr-5">
          {item.isArchived ? (
            <Badge color="danger" className={"text-uppercase mb-0 d-block"}><IntlMessages id="content.status.archive" /></Badge>
          ) : (
            !item.active ? (
              <Badge color="success" className={"text-uppercase mb-0 d-block"}><IntlMessages id="content.status.active" /></Badge>
            ) : (
              <Badge color="warning" className={"text-uppercase mb-0 d-block"}><IntlMessages id="content.status.inactive" /></Badge>
            )
          )}
        </div>

        <div className="col-auto actions">
          <IconButton className="size-30" onClick={this.onDeleteUp('delete', true)}>
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
    deleteUpSell
  },
)(UpCell);

