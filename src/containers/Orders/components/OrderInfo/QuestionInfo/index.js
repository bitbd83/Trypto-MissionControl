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
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import Collapse from '@material-ui/core/Collapse';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import EditQuestionForm from './EditQuestionForm'

const ITEM_HEIGHT = 48;

class QuestionInfo extends Component {
  constructor(){
    super();
    this.state = {
      expand: false,
      anchorEl: null,
      showForm: false,
    }
  }

  openForm = (status) => event => {
    this.setState({showForm: status})
  }

  expandDetail = () => {
    this.setState({expand: !this.state.expand})
  }

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  render(){
    const { expand, anchorEl } = this.state;
    return(
      <div>
        <div onClick={this.expandDetail} style={{color:"white", cursor:'pointer'}} className={'rounded form-drawer-section-header d-flex justify-content-between align-items-center ml-0 pl-3'} >
          <Typography variant="subheading" className="form-drawer-section-header p-0 m-0" gutterBottom>
            <IntlMessages id="containers.Orders.OrderInfo.buyer_questions" />
          </Typography>
          <span className="align-self-center mr-2 mt-1" >
            {!expand ? <ExpandMoreIcon/> : <ExpandLessIcon/>}
          </span>
        </div>
        <Collapse in={expand} className="w-100" timeout="auto" unmountOnExit>
          <div className="mx-4">
            <Card className="d-flex justify-content-between w-100 p-4 mt-2 mb-4">
              <div className="mx-3">
                <Typography variant="body2" className="mb-2"><IntlMessages id="sidebar.questions" /></Typography>
                <Typography variant="subheading">What do you want for food?</Typography>
                <Typography variant="caption" className="mb-1">Sandwices</Typography>
                <Typography variant="subheading">What city do you live in?</Typography>
                <Typography variant="caption">San diego</Typography>
              </div>
              <div>
                <Button onClick={this.openForm(true)} variant="outlined" color="primary"><IntlMessages id="content.dropdown.menu.change" /></Button>
                <div className="mt-2 d-flex justify-content-end">
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
                      <MenuItem key={'edit'} onClick={this.openForm(true)}>
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
            </Card>
          </div>
          <EditQuestionForm
            showForm={this.state.showForm}
            closeForm={this.openForm(false)}
          />
        </Collapse>
    </div>
    )
  }
}

export default QuestionInfo;
