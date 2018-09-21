import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Link } from 'react-router-dom';
import { Badge } from 'reactstrap';
import IntlMessages from 'util/IntlMessages';
import TenantsDate from 'components/Tenants/TenantsDate';
import Confirm from 'components/Dialogs/Confirm'

const ITEM_HEIGHT = 48;

class AdminsCell extends React.Component {
  state = {
    anchorEl: null,
    confirm: false,
    action: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  editGroup = event => {
    this.handleClose();
    this.props.editGroup();
  };

  changeStatus = (action, showConfirm = false) => event =>{
    this.handleClose();
    this.setState({action, confirm: showConfirm})
    if(!showConfirm){
      this.handleStatus(true, action);
    }
  }

  handleStatus = (status, action) => {
    if(status){
      this.props.changeStatus(action, this.props.item.subjectId)
    }
  }

  processStatus = (status = false) => event => {
    this.handleClose();
    const { action } = this.state;
    this.setState({ action: null, confirm: false },
      () => this.handleStatus(status, action)
    );
  }

  render() {
    const { anchorEl } = this.state;
    const { index, item, tenantsByDomain } = this.props;

    return (
      <div key={index} className="contact-item py-3">
        <div className="col text-truncate">
         {item.name ? <Typography variant="subheading" className="text-truncate">
            {`${item.name.firstName !== undefined ? item.name.firstName : ''} ${item.name.middleName !== undefined ? item.name.middleName : ''} ${item.name.lastName !== undefined ? item.name.lastName : ''}`}
          </Typography> : ''}
          {item.email ? <Typography variant="caption" className="text-truncate">
            {item.email.email}
          </Typography> : ''}
        </div>
        {/* <div className="col-sm-3 px-0 d-none d-md-flex flex-column">
          <Typography variant="subheading">
            <IntlMessages id="list.heading.lastChanged" />
          </Typography>
          <Typography variant="caption">
            <TenantsDate timezone={Object.keys(tenantsByDomain).length > 0 && tenantsByDomain.timeZone} time={item.dateModifiedUtc} />
          </Typography>
        </div>
        <div className="col-sm-1 px-0 mr-2">
          {item.isArchived ? (
            <Badge color="danger" className={'text-uppercase mb-0 d-block'}>
              <IntlMessages id="content.status.archive" />
            </Badge>
          ) : item.active ? (
            <Badge color="success" className={'text-uppercase mb-0 d-block'}>
              <IntlMessages id="content.status.active" />
            </Badge>
          ) : (
            <Badge color="warning" className={'text-uppercase mb-0 d-block'}>
              <IntlMessages id="content.status.inactive" />
            </Badge>
          )}
        </div> */}
        <div className="col-auto px-1 actions d-none d-sm-flex">
          <IconButton aria-label="More" aria-owns={anchorEl ? 'long-menu' : null} aria-haspopup="true" onClick={this.handleClick}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="long-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={this.handleClose}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
              },
            }}>
               <MenuItem key={'activate'} onClick={this.editGroup}>
                  <IntlMessages id="pages.taxesPage.taxCell.menu.edit" />
                </MenuItem>
            {!Boolean(item.isArchived) ? [

              (!Boolean(item.active) ? (
                <MenuItem key={'activate'} onClick={this.changeStatus('activate', false)}>
                  <IntlMessages id="pages.taxesPage.taxCell.menu.activate" />
                </MenuItem>
              ) : (
                <MenuItem key={'deactivate'} onClick={this.changeStatus('deactivate', true)}>
                  <IntlMessages id="pages.taxesPage.taxCell.menu.deactivate" />
                </MenuItem>
              )),

              <MenuItem key={'archive'} onClick={this.changeStatus('archive', true)}>
                <IntlMessages id="pages.taxesPage.taxCell.menu.archive" />
              </MenuItem>
             ] : (
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

export default AdminsCell;
