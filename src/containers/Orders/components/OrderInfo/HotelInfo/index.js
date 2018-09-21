import React, { Component } from 'react';
import IntlMessages from 'util/IntlMessages';
import TenantsDate from 'components/Tenants/TenantsDate';
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import Collapse from '@material-ui/core/Collapse';
import HotelInfoCell from './HotelInfoCell'
import EditHotelForm from './EditHotelForm'

class HotelInfo extends Component {
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


  ticketList = () => {
    return <HotelInfoCell
              tenantsByDomain={this.props.tenantsByDomain}
              openEditForm = {this.openForm(true)}
            />
  }

  render(){
    const { expand } = this.state;
    const { HotelData } = this.props;
    let content = "";
    // if(ticketData){
      content = this.ticketList();
    // }
    return(
      <div>
        <div onClick={this.expandDetail} style={{color:"white", cursor:'pointer'}} className={'form-drawer-section-header d-flex justify-content-between align-items-center ml-0  rounded pl-3'} >
          <Typography  variant="subheading" className="form-drawer-section-header p-0 m-0" gutterBottom>
            <IntlMessages id="sidebar.hotels" />
          </Typography>
          <span className="align-self-center mr-2 mt-1">
            {!expand ? <ExpandMoreIcon/> : <ExpandLessIcon/>}
          </span>
        </div>
        <Collapse in={expand} className="w-100" timeout="auto" unmountOnExit>
          <div className="py-2 mb-3">
            {content}
          </div>
          <EditHotelForm
            showForm={this.state.showForm}
            closeForm={this.openForm(false)}
            tenantsByDomain={this.props.tenantsByDomain}
          />
        </Collapse>
    </div>

    )
  }
}

export default HotelInfo;
