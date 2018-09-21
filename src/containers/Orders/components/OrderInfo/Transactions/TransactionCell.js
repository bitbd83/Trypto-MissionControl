import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import IntlMessages from 'util/IntlMessages';
import TenantsDate from 'components/Tenants/TenantsDate';
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';
import Typography from '@material-ui/core/Typography';
import {Badge} from 'reactstrap';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import TenantsCurrencyVal from '../../../../../components/Tenants/Currency';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Divider from '@material-ui/core/Divider';

const ITEM_HEIGHT = 48;

class TransactionCell extends Component {
  constructor(){
    super();
    this.state={
      anchorEl: null,
    }
  }

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  render(){
    const { anchorEl } = this.state;
    const { tenantsByDomain } = this.props;

    return(
      <div className="px-4">
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <div className="col" >
              <Typography variant="subheading" className="text-truncate">
                TRANSAC 1212
              </Typography>
            </div>

            <div className="col px-0 mr-2">
              <span className={`text-uppercase text-success ml-3`}>PAYMENT</span>
            </div>

            <div className="col">
              <Typography variant="subheading" className="text-truncate">
                <TenantsCurrencyVal data={this.props.tenantsByDomain} value={500}/>
              </Typography>
            </div>

            <div className="col">
              <TenantsDate
                timezone={Object.keys(tenantsByDomain).length > 0 && tenantsByDomain.timeZone}
                time='2018-08-07T08:51:58.735Z'
                // time={item.datePurchasedUtc}
                timeFormat="MMM DD, YYYY HH:mm"
              />
            </div>

        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div className="d-flex justify-content-end w-100">
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
              <MenuItem key={'edit'} onClick={this.handleClose}>
                <IntlMessages id="content.dropdown.menu.edit" />
              </MenuItem>
              <MenuItem key={'voucher'} onClick={this.handleClose}>
                <IntlMessages id="content.dropdown.menu.print_voucher" />
              </MenuItem>
              <MenuItem key={'email_voucher'} onClick={this.handleClose}>
                <IntlMessages id="content.dropdown.menu.email_voucher" />
              </MenuItem>
              <MenuItem key={'cancel'} onClick={this.handleClose}>
                <IntlMessages id="content.dropdown.menu.cancel" />
              </MenuItem>
            </Menu>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
    )
  }
}

export default TransactionCell;
