import React from 'react';
import IntlMessages from 'util/IntlMessages';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Paper from '@material-ui/core/Paper';
import { Badge } from 'reactstrap';
import { getVenueById, addUpdateVenueState } from 'containers/Venues/actions';
import TenantsDate from 'components/Tenants/TenantsDate/index';
import Confirm from '../../Dialogs/Confirm'

const ITEM_HEIGHT = 48;

class VenuesListItem extends React.Component {
  onOptionMenuSelect = event => {
    var tenantId = this.props.tenantsByDomain.id;
    var venueId = this.props.venuesItems.id;
    this.props.getVenueById({ tenantId, venueId });
    this.props.addUpdateVenueState(true);
    setTimeout(() => {
      this.setState({ menuState: true });
    }, 300);
    this.setState({ anchorEl: event.currentTarget, venueId: this.props.venuesItems.id });
  };
  handleRequestClose = index => {
    this.setState({ menuState: false });
    if (index === 0) {
      this.props.showForm();
    } else {
      this.props.addUpdateVenueState(false);
    }
  };

  constructor() {
    super();
    this.state = {
      anchorEl: undefined,
      menuState: false,
      venueId: '',
      confirm: false,
      action: null,
    };
  }

  changeStatus = (action, showConfirm = false) => event =>{
    this.handleRequestClose();
    this.setState({action, confirm: showConfirm})
    if(!showConfirm){
      this.handleStatus(true, action);
    }
  }

  handleStatus = (status, action) => {
    if(status){
      this.props.changeStatus(action, this.props.venuesItems.id)
    }
  }

  processStatus = (status = false) => event => {
    this.handleRequestClose();
    const { action } = this.state;
    this.setState({ action: null, confirm: false },
      () => this.handleStatus(status, action)
    );
  }

  render() {
    const { tenantsByDomain, venuesItems, archived, styleName, edit } = this.props;
    const { menuState, anchorEl } = this.state;
    const options = [<IntlMessages id="components.Venues.VenuesListItem.edit" />];
    return (
      <div className="contact-item py-3">
        <div className="description col text-truncate font-weight-bold">
          <Typography variant="subheading" className="text-truncate">
            {venuesItems.name}
          </Typography>
          <Typography variant="caption">
            {venuesItems.address.addressLine1 && `${venuesItems.address.addressLine1},`} {venuesItems.address.addressLine2 && `${venuesItems.address.addressLine2},`}{' '}
            {venuesItems.address.addressLine3 && `${venuesItems.address.addressLine3},`} {venuesItems.address.cityLocality && `${venuesItems.address.cityLocality},`}{' '}
            {venuesItems.address.stateProvince && `${venuesItems.address.stateProvince},`} {venuesItems.address.postalCode && venuesItems.address.postalCode}
          </Typography>
        </div>
        <div className="col-sm-3 px-0 d-none d-md-flex flex-column">
          <Typography variant="subheading">
            <IntlMessages id="list.heading.lastChanged" />
          </Typography>
          <Typography variant="caption">
            <TenantsDate timezone={Object.keys(tenantsByDomain).length > 0 && tenantsByDomain.timeZone} time={venuesItems.dateModifiedUtc} timeFormat="MMM DD, YYYY hh:mma" />
          </Typography>
        </div>
        <div className="col-sm-1 px-0 mr-2">
          {venuesItems.isArchived ? (
            <Badge color="danger" className={'text-uppercase mb-0 d-block'}>
              <IntlMessages id="content.status.archive" />
            </Badge>
          ) : (
            <Badge color="success" className={'text-uppercase mb-0 d-block'}>
              <IntlMessages id="content.status.active" />
            </Badge>
          )}
        </div>
        <div className="col-auto px-1 actions d-none d-sm-flex">
          <IconButton aria-label="More" aria-owns={anchorEl ? 'long-menu' : null} aria-haspopup="true" onClick={this.onOptionMenuSelect.bind(this)}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="long-menu"
            anchorEl={anchorEl}
            open={menuState}
            onClose={this.handleRequestClose}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
              },
            }}>

            {!Boolean(venuesItems.isArchived) ? (
              [
                <MenuItem key={'edit'} onClick={() => this.handleRequestClose(0)}>
                  <IntlMessages id="pages.taxesPage.taxCell.menu.edit" />
                </MenuItem>,
                <MenuItem key={'archive'} onClick={this.changeStatus('archive', true)}>
                  <IntlMessages id="pages.taxesPage.taxCell.menu.archive" />
                </MenuItem>
                ]
            ) : (
              <MenuItem key={'restore'} onClick={this.changeStatus('restore', false)}>
                <IntlMessages id="pages.taxesPage.taxCell.menu.restore" />
              </MenuItem>
            )}
          </Menu>
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

const mapStateToProps = ({ tenants, venues }) => {
  const { tenantsByDomain } = tenants;
  const { edit } = venues;
  return { tenantsByDomain, edit };
};

export default connect(
  mapStateToProps,
  { getVenueById, addUpdateVenueState },
)(VenuesListItem);
