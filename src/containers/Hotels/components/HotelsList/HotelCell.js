import React from 'react';
import { Link } from 'react-router-dom';
import Checkbox from '@material-ui/core/Checkbox'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import {Badge} from 'reactstrap';
import IntlMessages from 'util/IntlMessages';
import TenantsDate from 'components/Tenants/TenantsDate';
import Confirm from '../../../../components/Dialogs/Confirm'
import moment from 'moment';


class HotelCell extends React.Component {

    constructor() {
      super();
      this.state = {
          anchorEl: undefined,
          menuState: false,
          confirm: false,
          action: null,
      }
    }

    onContactOptionSelect = event => {
        this.setState({menuState: true, anchorEl: event.currentTarget});
    };
    handleClose = () => {
        this.setState({menuState: false,  anchorEl: undefined});
    };

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

    render() {
      const {menuState, anchorEl} = this.state;
      const { item, tenantsByDomain } = this.props;


      return (
        <div className="contact-item">
          <div className="col-auto px-1 actions d-none d-xs-flex">
            <IconButton className="size-30">
              <i className="zmdi zmdi-star"/>
            </IconButton>
          </div>
          {(item.hotel.photos === undefined || item.hotel.photos.length === 0 || item.hotel.photos[0].photoUrl === undefined) ?
            <div
              className="size-80 bg-blue text-center text-white mx-1 mx-md-3"
              style={{fontSize: 20}}>
                {item.name.charAt(0).toUpperCase()}
            </div> :
            <img className="size-80 mx-1 mx-md-3" alt={item.name} src={item.hotel.photos[0].photoUrl}/>}

          <div className="col text-truncate">
            <Typography variant="subheading" className="text-truncate" component={Link} to={`/app/hotels/${item.id}`}>
              {item.name}
            </Typography>
            <Typography variant="caption">
              {`${moment(item.inventoryDates.from).utc().format('MMM DD, YYYY')} - ${moment(item.inventoryDates.to).utc().format('MMM DD, YYYY')}`}
            </Typography>
          </div>

          <div className="col-sm-3 px-0 d-none d-md-flex flex-column">
            <Typography variant="subheading">
              <IntlMessages id={"list.heading.lastChanged"} />
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


          <div className="col-auto px-1 actions d-none d-sm-flex">
            <IconButton className="size-30" onClick={this.onContactOptionSelect}>
              <i className="zmdi zmdi-more-vert"/>
            </IconButton>

            <Menu id="long-menu"
              anchorEl={anchorEl}
              open={menuState}
              onClose={this.handleClose}
              MenuListProps={{
                  style: {
                      width: 150,
                  },
              }}>

              {!Boolean(item.isArchived) ? [
                <MenuItem key={'assign_inventoy'} component={Link} to={`/app/hotels/${item.id}`}>
                  <IntlMessages id="content.dropdown.menu.assign_inventoy" />
                </MenuItem>,
                (!Boolean(item.active) ? (
                  <MenuItem key={'activate'} onClick={this.changeStatus('activate', false)}>
                    <IntlMessages id="content.dropdown.menu.activate" />
                  </MenuItem>
                ) : (
                  <MenuItem key={'deactivate'} onClick={this.changeStatus('deactivate', true)}>
                    <IntlMessages id="content.dropdown.menu.deactivate" />
                  </MenuItem>
                )),
                <MenuItem key={'archive'} onClick={this.changeStatus('archive', true)}>
                  <IntlMessages id="content.dropdown.menu.archive" />
                </MenuItem>,
                <MenuItem key={'reports'} disabled>
                  <IntlMessages id="content.dropdown.menu.reports" />
                </MenuItem>
              ] : (
                <MenuItem key={'restore'} onClick={this.changeStatus('restore', false)}>
                  <IntlMessages id="content.dropdown.menu.restore" />
                </MenuItem>
              )}
            </Menu>
          </div>
          <Confirm
            open={this.state.confirm}
            handleClose={this.processStatus}
            type={this.state.action}
          />
        </div>
      )
    }
}

export default HotelCell;
