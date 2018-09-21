import React, { Component } from 'react';
import IntlMessages from 'util/IntlMessages';
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
// import { IconButton } from '../../../../../../node_modules/@material-ui/core';
import Collapse from '@material-ui/core/Collapse';
import TicketInfoCell from './TicketInfoCell'
import EditTicketForm from './EditTicketForm'

class LineItemsInfo extends Component {
  constructor(){
    super();
    this.state = {
      expand: false,
      showForm: false,
    }
  }

  expandDetail = () => {
    this.setState({expand: !this.state.expand})
  }

  openForm = (status) => event => {
    this.setState({showForm: status})
  }


  ticketList = (lineItems) => {
   return  lineItems.map((item, index)=>{
      return <TicketInfoCell
      tenantsByDomain={this.props.tenantsByDomain}
      openEditForm = {this.openForm(true)}
      index={index}
      item={item}
      orderData = { this.props.orderData}
    />
    })
  }

  render(){
    const { expand } = this.state;
    const { orderData } = this.props;
    const { lineItems } = orderData;
    let content = "";
    if(lineItems){
      content = this.ticketList(lineItems);
    }
    return(
      <div>
        <div onClick={this.expandDetail} style={{color:"white", cursor:'pointer'}} className={'form-drawer-section-header d-flex justify-content-between align-items-center ml-0 rounded pl-3'} >
          <Typography  variant="subheading" className="form-drawer-section-header p-0 m-0" gutterBottom>
            <IntlMessages id="containers.Orders.OrderInfo.ticketTypes" />
          </Typography>
          <span className="align-self-center mr-2 mt-1">
            {!expand ? <ExpandMoreIcon/> : <ExpandLessIcon/>}
          </span>
        </div>
        <Collapse in={expand} className="w-100" timeout="auto" unmountOnExit>
          <div className="py-2 mb-3">
            {content}
          </div>

          <EditTicketForm
            showForm={this.state.showForm}
            closeForm={this.openForm(false)}
            tenantsByDomain={this.props.tenantsByDomain}
          />
        </Collapse>
    </div>

    )
  }
}

export default LineItemsInfo;
