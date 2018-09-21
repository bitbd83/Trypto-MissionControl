import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import IntlMessages from 'util/IntlMessages';
import TenantsDate from 'components/Tenants/TenantsDate';
import DeleteIcon from '@material-ui/icons/Delete';
import {Badge} from 'reactstrap';
import Confirm from '../../../../components/Dialogs/Confirm'
import { deleteTaxGroup } from '../../actions'

class TaxGroupCell extends React.Component {
  constructor(){
    super();
    this.state={
      confirm: false,
      action: null,
    }
  }

  onDeleteTaxGroup = (action, showConfirm = false) => event =>{
    this.setState({action, confirm: showConfirm})
  }

  handleDelete = (status, action) => {
    const { ticketTypeId, eventId } = this.props.match.params;
    const tenantId  = this.props.tenantsByDomain.id
    if(status){
      this.props.deleteTaxGroup({ data: { ids: [this.props.item.id] },tenantId, eventId, ticketTypeId });
    }
  }

  processStatus = (status = false) => event => {
    const { action } = this.state;
    this.setState({ action: null, confirm: false },
      () => this.handleDelete(status, action)
    );
  }


  render() {
    const { tenantsByDomain, item, index } = this.props;

    return (
      <div key={index} className="contact-item">
        <div className="col text-truncate">
          <Typography variant="subheading">
            {item.name}
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
          <IconButton className="size-30" onClick={this.onDeleteTaxGroup('delete', true)}>
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
    deleteTaxGroup
  },
)(TaxGroupCell);
