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

class HotelInfoCell extends Component {
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

            <div
              style={{fontSize: 20}}>
                <img className="size-80 mr-1" src="http://via.placeholder.com/100x100"/>
            </div>

            <div className="col d-flex flex-column justify-content-center">
              <Typography variant="subheading" className="text-truncate">
                Hotel Cosmopolitan
              </Typography>
              <Typography variant="caption" className="text-truncate" >
                1232 Las Vegas Awe, Las Vegas, NV 12111, US
              </Typography>
            </div>
            <div className="col d-flex flex-column justify-content-center">
              <Typography variant="body2">
                <TenantsDate
                  timezone={Object.keys(tenantsByDomain).length > 0 && tenantsByDomain.timeZone}
                  time={'2018-08-07T08:51:58.735Z'}
                  timeFormat="MM/DD/YYYY"
                /> - <TenantsDate
                  timezone={Object.keys(tenantsByDomain).length > 0 && tenantsByDomain.timeZone}
                  time={'2018-08-10T08:51:58.735Z'}
                  timeFormat="MM/DD/YYYY"
                />
              </Typography>
            </div>
            <div className="col-lg-3 d-flex flex-column justify-content-center">
              <Typography variant="subheading" className="text-truncate d-flex justify-content-center">
                <TenantsCurrencyVal data={this.props.tenantsByDomain} value={500}/>
              </Typography>
            </div>

            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <div className="w-100">
                <div className="d-flex justify-content-between w-100 mb-4 mt-2 align-items-center">
                  <div>
                    <Typography variant="body2">
                      Room Type 1
                    </Typography>
                    <Typography variant="">
                      Check In:  <TenantsDate
                                    timezone={Object.keys(tenantsByDomain).length > 0 && tenantsByDomain.timeZone}
                                    time={'2018-08-07T08:51:58.735Z'}
                                    timeFormat="MM/DD/YYYY"
                                  />
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="body2">
                      Anup Marwadi
                    </Typography>
                    <Typography variant="">
                      Check Out: <TenantsDate
                                    timezone={Object.keys(tenantsByDomain).length > 0 && tenantsByDomain.timeZone}
                                    time={'2018-08-09T08:51:58.735Z'}
                                    timeFormat="MM/DD/YYYY"
                                  />
                    </Typography>
                  </div>
                  <Typography variant="body2">
                    Adults: 2
                  </Typography>
                  <Typography variant="body2">
                    Children: 1
                  </Typography>
                  <div className="d-flex justify-content-end">
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
                      <MenuItem key={'edit'} onClick={this.props.openEditForm}>
                        <IntlMessages id="content.dropdown.menu.edit" />
                      </MenuItem>
                      <MenuItem key={'print_voucher'} onClick={this.handleClose}>
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
                </div>
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
    )
  }
}

export default HotelInfoCell;
