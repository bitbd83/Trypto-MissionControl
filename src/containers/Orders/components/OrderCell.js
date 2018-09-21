import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import CircularProgress from '@material-ui/core/CircularProgress';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Link } from 'react-router-dom'
import Paper from '@material-ui/core/Paper';
import IntlMessages from 'util/IntlMessages';
import Typography from '@material-ui/core/Typography';
import TenantsDate from 'components/Tenants/TenantsDate';
import TenantsCurrencyVal from '../../../components/Tenants/Currency';
import {Badge} from 'reactstrap';
import Confirm from '../../../components/Dialogs/Confirm'

const ITEM_HEIGHT = 48;

class OrderCell extends React.Component {
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

  getProcessStatus = (status) => {
    let classes = '';
    switch(status.key){
      case 0:
        classes = 'warning';
        break;
      case 1:
        classes = 'info';
        break;
      case 2:
        classes = 'success';
        break;
      case 3:
        classes = 'danger';
        break;
      default:
        classes = 'info';
        break;
    }
    return <Badge color={classes} className={`text-uppercase`}>{status.value}</Badge>;
  }

  render() {
    const { anchorEl } = this.state;
    const { item, tenantsByDomain } = this.props;

    return (
      <div key={item.id} className="contact-item py-3">
        <div className="col-auto px-1 actions d-none d-xs-flex">
          <IconButton className="size-30">
            <i className="zmdi zmdi-star-outline"/>
          </IconButton>
        </div>
        <div className="col" style={{cursor:'pointer'}} >
          <Typography variant="subheading" className="text-truncate" onClick={this.props.openOrderDetail}>
            {item.orderCode}
          </Typography>
        </div>

        <div className="col">
          <Typography variant="subheading" className="text-truncate">
            {item.shippingInfo ? `${item.shippingInfo.name.firstName} ${item.shippingInfo.name.lastName}` : ''}
          </Typography>
        </div>

        <div className="col">
          <Typography variant="subheading" className="text-truncate">
            <TenantsCurrencyVal data={tenantsByDomain} value={item.orderSummary.grandTotal}/>
          </Typography>
        </div>

        <div className="col px-0 mr-2">
          {this.getProcessStatus(item.status)}
        </div>

        <div className="col px-0 d-none d-md-flex flex-column">
          <Typography>
            <TenantsDate
              timezone={Object.keys(tenantsByDomain).length > 0 && tenantsByDomain.timeZone}
              time={item.datePurchasedUtc}
              timeFormat="MMM DD, YYYY"
            />
          </Typography>
        </div>


        <div className="col-auto px-1 actions d-none d-sm-flex">
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
            <MenuItem key={'edit'}>
              <IntlMessages id="pages.feesPage.feesCell.edit" />
            </MenuItem>
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

export default OrderCell;
