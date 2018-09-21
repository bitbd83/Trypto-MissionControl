import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Collapse from '@material-ui/core/Collapse';
import Chip from '@material-ui/core/Chip';
import CircularProgress from '@material-ui/core/CircularProgress';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Badge} from 'reactstrap';
import IntlMessages from 'util/IntlMessages';
import TenantsDate from 'components/Tenants/TenantsDate';
import { withStyles } from '@material-ui/core/styles';
import Confirm from '../../../../components/Dialogs/Confirm'

const ITEM_HEIGHT = 48;

const styles = theme => ({
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
});


class TaxRateCell extends React.Component {
  state = {
    anchorEl: null,
    expanded: false,
    confirm: false,
    action: null,
  }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
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
  }

  changeStatus = (action, showConfirm = false) => event =>{
    this.handleClose();
    this.setState({action, confirm: showConfirm})
    if(!showConfirm){
      this.handleStatus(true, action);
    }
  }

  handleStatus = (status, action) => {
    if(status){
      this.props.changeStatus(action, this.props.item.id)
    }
  }

  processStatus = (status = false) => event => {
    this.handleClose();
    const { action } = this.state;
    this.setState({ action: null, confirm: false },
      () => this.handleStatus(status, action)
    );
  }

  showLoader = () => (
    <div className="d-flex justify-content-center align-items-center animated slideInUpTiny animation-duration-3">
      <div className="loader-view">
        <CircularProgress size={24} />
      </div>
    </div>
  );

  render() {
    const { anchorEl } = this.state;
    const { index, item, tenantsByDomain, classnames } = this.props;

    return (
      <div key={index} className="contact-item py-3">
        <div className="d-flex w-100 align-items-center">
          <div className="col-sm-1 text-truncate">
            <IconButton
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="Show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </div>
          <div className="col text-truncate">
            <Typography variant="subheading" className="text-truncate">
              {item.name}
            </Typography>
            <Typography variant="caption">
              {item.displayName}
            </Typography>
          </div>

          <div className="">
            <Typography
              variant="body2"
              className="">
              <span className="font-weight-bold">{item.countryCode}</span>
            </Typography>

          </div>

          <div className="col d-flex flex-column align-items-center">
            <Typography variant="subheading">
              <IntlMessages id="list.heading.rate" />
            </Typography>
            <Typography variant="caption">
              {item.rate.value}%
            </Typography>
          </div>


          <div className="px-0 d-none d-md-flex flex-column mr-5">
            <Typography variant="subheading">
              <IntlMessages id="list.heading.lastChanged" />
            </Typography>
            <Typography variant="caption">
            <TenantsDate
              timezone={Object.keys(tenantsByDomain).length > 0 && tenantsByDomain.timeZone}
              time={item.dateModifiedUtc}
            />
            </Typography>
          </div>

          <div className="col-sm-1 px-0">
            {item.isArchived ? (
              <Badge color="danger" className={"text-uppercase mb-0 d-block"}><IntlMessages id="content.status.archive" /></Badge>
            ) : (
              item.active ? (
                <Badge color="success" className={"text-uppercase mb-0 d-block"}><IntlMessages id="content.status.active" /></Badge>
              ) : (
                <Badge color="warning" className={"text-uppercase mb-0 d-block"}><IntlMessages id="content.status.inactive" /></Badge>
              )
            )}
          </div>

          <div className="col-auto actions">
            <IconButton
              aria-label="More"
              aria-owns={anchorEl ? 'long-menu' : null}
              aria-haspopup="true"
              onClick={this.handleClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
                id="long-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleClose}
                PaperProps={{
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5
                  },
                }}
              >
                {!Boolean(item.isArchived) ? [
                  <MenuItem key={'edit'} onClick={this.editGroup}>
                    <IntlMessages id="pages.taxesRatePage.taxRateCell.menu.edit" />
                  </MenuItem>,
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
                    <IntlMessages id="pages.taxesRatePage.taxRateCell.menu.archive" />
                  </MenuItem>,
                ] : (
                  <MenuItem key={'restore'} onClick={this.changeStatus('restore', false)}>
                    <IntlMessages id="pages.taxesRatePage.taxRateCell.menu.restore" />
                  </MenuItem>
                )}
              </Menu>
            </div>
          </div>
          <div className="row no-gutters align-items-center w-100">
            <Collapse in={this.state.expanded} className="w-100" timeout="auto" unmountOnExit>
              <div className="mt-1 ml-3 w-100">
                {item.stateProvinceDetails && item.stateProvinceDetails.split(',')[0] !== "" ? <div className="col d-flex align-items-center justify-content-start w-100 my-1">
                  <div variant="col text-center col-1">
                    <Typography variant="subheading" className="mr-3">
                      States
                    </Typography>
                  </div>
                  <div variant="">
                    {item.stateProvinceDetails.split(',').map((key, index) => (
                      <Chip label={key} key={index} className="m-1" />
                    ))}
                  </div>
                </div> : ''}

                {item.postalCodeDetails && item.postalCodeDetails.split(',')[0] !== "" ? <div className="col d-flex align-items-center justify-content-start my-">
                  <div variant="col text-center">
                    <Typography variant="subheading" className="mr-3 w-25">
                      Zip
                    </Typography>
                  </div>
                  <div variant="col">
                    {item.postalCodeDetails.split(',').map((key, index) => (
                      <Chip label={key} key={index} className="m-1" />
                    ))}
                  </div>
                </div> : ''}

                {item.cityDetails && item.cityDetails.split(',')[0] !== "" ? <div className="col col-12 d-flex align-items-center justify-content-start my-1">
                  <div variant="col text-center">
                    <Typography variant="subheading" className="mr-3 w-25">
                      Cities
                    </Typography>
                  </div>
                  <div variant="col">
                    {item.cityDetails.split(',').map((key, index) => (
                      <Chip label={key} key={index} className="m-1" />
                    ))}
                  </div>
                </div> : ''}
              </div>
            </Collapse>
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

TaxRateCell.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TaxRateCell);
