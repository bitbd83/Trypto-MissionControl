import React, { Component } from 'react';
import IntlMessages from 'util/IntlMessages';
import TenantsDate from 'components/Tenants/TenantsDate';
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';

const ITEM_HEIGHT = 48;

class OrderActivityInfo extends Component {
  constructor(){
    super();
    this.state = {
      expand: false,
      anchorEl: null,
    }
  }

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  expandDetail = () => {
    this.setState({expand: !this.state.expand})
  }

  render(){
    const { expand, anchorEl } = this.state;

    return(
      <div>
        <div onClick={this.expandDetail} style={{color:"white", cursor:'pointer'}} className={'form-drawer-section-header d-flex justify-content-between align-items-center ml-0 rounded pl-3'} >
          <Typography  variant="subheading" className="form-drawer-section-header p-0 m-0" gutterBottom>
            <IntlMessages id="containers.orders.orderInfo.order_activity" />
          </Typography>
          <span onClick={this.expandDetail} className="align-self-center mr-2 mt-1" style={{color:"white", cursor:'pointer'}} >
            {!expand ? <ExpandMoreIcon/> : <ExpandLessIcon/>}
          </span>
        </div>
        <Collapse in={expand} className="w-100" timeout="auto" unmountOnExit>
          <Paper className="py-2 mx-4 my-2">
            <div>
              <List>
                <ListItem>
                  <Avatar>
                    <span style={{fontSize:'15px'}}>AM</span>
                  </Avatar>
                  <Typography className="ml-3" variant="">
                    <a href="javascript:void(0)">Anup Marwadi</a> placed on Order for $100 on June 11, 2018 4:40 PM
                  </Typography>
                </ListItem>
                <ListItem>
                  <Avatar>
                    <span style={{fontSize:'15px'}}>JA</span>
                  </Avatar>
                  <Typography className="ml-3" variant="">
                    <a href="javascript:void(0)">John Admin</a> updated Purchaser Info on June 12, 2018 5:30 PM
                  </Typography>
                </ListItem>
              </List>
            </div>

          </Paper>
        </Collapse>
    </div>

    )
  }
}

export default OrderActivityInfo;
