import React, { Component } from 'react';
import IntlMessages from 'util/IntlMessages';
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TenantsCurrencyVal from '../../../../../components/Tenants/Currency';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Divider from '@material-ui/core/Divider';

const ITEM_HEIGHT = 48;

class TicketInfoCell extends Component {
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
    const { item, orderData, index } = this.props;
    const billingInfo = (orderData && orderData.billingInfo) ? orderData.billingInfo : {};
    let name = '';
     name = billingInfo.name !== undefined ? billingInfo.name.firstName + ' ' + (billingInfo.name.middleName ? billingInfo.name.middleName : '') + ' '+ (billingInfo.name.lastName ? billingInfo.name.lastName : '' ): '';

    return(
        <div key={index} className="px-4">
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <div className="d-lg-flex w-100">
                <div className="col" >
                  <Typography variant="subheading" className="text-truncate">
                    TEXAWS111
                  </Typography>
                </div>

                <div className="col">
                  <Typography variant="subheading" className="text-truncate">
                    TICKET TYPE NAME
                  </Typography>
                </div>
                <div className="col">
                  <Typography variant="subheading" className="text-truncate">
                    <TenantsCurrencyVal data={this.props.tenantsByDomain} value={item.grandTotal}/>
                  </Typography>
                </div>
              </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <div className="w-100">
                <div className="d-flex justify-content-between w-100 mb-4 mt-2">
                  <div>
                    <Typography variant="body2">
                      Attendee
                    </Typography>
                    <Typography variant="">
                      {name}
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="body2">
                      Applied Discount Code
                    </Typography>
                    <Typography variant="">
                      ANUP100
                    </Typography>
                  </div>
                  <div className="mt-2">
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
                <div className="d-flex justify-content-between">
                  <div className="">
                    {/* <Typography variant="body2" className="mb-2"><IntlMessages id="sidebar.questions" /></Typography>
                    <Typography variant="subheading">What do you want for food?</Typography>
                    <Typography variant="caption" className="mb-1">Sandwices</Typography>
                    <Typography variant="subheading">What city do you live in?</Typography>
                    <Typography variant="caption">San diego</Typography> */}
                  </div>
                  <div className="d-flex">
                    <div className="w-100">
                      <div className="">
                        <div className="d-flex flex-row-reverse">
                          <span className=""><TenantsCurrencyVal data={this.props.tenantsByDomain} value={item.totalFees}/></span>
                          <Typography className="mr-2" variant="body1">
                            <IntlMessages id="containers.Orders.OrderInfo.total_fees" /> :
                          </Typography>
                        </div>
                        <div className="d-flex flex-row-reverse ">
                          <span  className=""><TenantsCurrencyVal data={this.props.tenantsByDomain} value={item.taxableAmount}/></span>
                          <Typography className="mr-2" variant="body1">
                            <IntlMessages id="containers.Orders.OrderInfo.total_taxes" /> :
                          </Typography>
                        </div>
                        <div className="d-flex flex-row-reverse">
                          <span className=""><TenantsCurrencyVal data={this.props.tenantsByDomain} value={item.totalDiscount}/></span>
                          <Typography className="mr-2" variant="body1">
                            <IntlMessages id="containers.Orders.OrderInfo.total_discounts" /> :
                          </Typography>
                        </div>
                        <Divider className="my-1"/>
                        <div className="d-flex flex-row-reverse">
                          <span className="font-weight-bold"><TenantsCurrencyVal data={this.props.tenantsByDomain} value={item.grandTotal}/></span>
                          <Typography className="mr-2" variant="body1">
                            <IntlMessages id="containers.Orders.OrderInfo.ticket_total" /> :
                          </Typography>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
    )
  }
}

export default TicketInfoCell;
