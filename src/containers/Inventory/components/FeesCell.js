import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import CircularProgress from '@material-ui/core/CircularProgress';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {Badge} from 'reactstrap';
import { Link } from 'react-router-dom'
import Paper from '@material-ui/core/Paper';
import IntlMessages from 'util/IntlMessages';
import Typography from '@material-ui/core/Typography';
import TenantsDate from 'components/Tenants/TenantsDate';
import TenantsCurrencyVal from '../../../components/Tenants/Currency';

const ITEM_HEIGHT = 48;

class FeeCell extends React.Component {
  state = {
    anchorEl: null,
  }

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

  changeStatus = (action) => event =>{
    this.handleClose();
    this.props.changeStatus(action, this.props.item.id); 
  }


  showLoader = () => (
    <div className="d-flex justify-content-center align-items-center animated slideInUpTiny animation-duration-3">
      <div className="loader-view">
        <CircularProgress size={24} />
      </div>
    </div>
  );

  structureFee = (fee) => {
    if(!fee) {
      return false
    }
    const { item, tenantsByDomain } = this.props;
    if(item.feeCriteria.strategy.factor === 'Flat'){
      return (
        <TenantsCurrencyVal data={tenantsByDomain} value={fee}/>
      )
    } else {
      return fee + "%";
    }
  }

  render() {
    const { anchorEl } = this.state;
    const { index, item, tenantsByDomain } = this.props;

    let minFee = this.structureFee(item.feeCriteria.minAmount);
    let maxFee = this.structureFee(item.feeCriteria.maxAmount);

    return (
      <Paper key={index} className="col-12 contact-item ripple row no-gutters justify-content-between align-items-center py-2 px-3 py-sm-3 px-sm-6 my-4">
        <div className="col-4 text-truncate">
          <Typography variant="title">
            {item.name}
          </Typography>
          <Typography variant="subheading">
          {minFee && 'Min: '}{minFee &&  minFee}
          {maxFee && ' | Max: '} {maxFee && maxFee}
          </Typography>
        </div>

        <div className="col-sm-3 px-0  d-md-flex flex-column">
          <Typography className="mb-1" variant="body2">
            <IntlMessages id="components.Venues.VenuesListItem.createdOn" />
          </Typography>
          <Typography variant="subheading">
            <TenantsDate
              timezone={Object.keys(tenantsByDomain).length > 0 && tenantsByDomain.timeZone}
              time={item.dateCreatedUtc}
              timeFormat="MMM DD, YYYY hh:mma"
            />
          </Typography>
        </div>

        <div className="col-sm-1 text-truncate px-1">
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
              <MenuItem key={'edit'} onClick={this.editGroup}>
                <IntlMessages id="pages.feesPage.feesCell.edit" />
              </MenuItem>
              {!Boolean(item.active) ? (
                <MenuItem key={'activate'} onClick={this.changeStatus('activate')}>
                  <IntlMessages id="pages.feesPage.feesCell.activate" />
                </MenuItem>
              ) : (
                <MenuItem key={'deactivate'} onClick={this.changeStatus('deactivate')}>
                  <IntlMessages id="pages.feesPage.feesCell.deactivate" />
                </MenuItem>
              )}
              
              {!Boolean(item.isArchived) ? (
                <MenuItem key={'archive'} onClick={this.changeStatus('archive')}>
                  <IntlMessages id="pages.feesPage.feesCell.archive" />
                </MenuItem>
              ) : (
                <MenuItem key={'restore'} onClick={this.changeStatus('restore')}>
                  <IntlMessages id="pages.feesPage.feesCell.restore" />
                </MenuItem>
              )}
            </Menu>
        </div>
      </Paper>
    );
  }
}

export default FeeCell;