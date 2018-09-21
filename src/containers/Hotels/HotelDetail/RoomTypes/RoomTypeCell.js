import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import IntlMessages from 'util/IntlMessages';
import TenantsCurrencyVal from "../../../../components/Tenants/Currency"
import moment from "moment";
import { Badge } from 'reactstrap';

class RoomTypeCell extends React.Component {
  state = {
    anchorEl: null,
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  changeStatus = (action) => event =>{
    const { item } = this.props;
    if(action === 'edit'){
      this.props.onEdit(item, false)
    } else if(action === 'edit_daily'){
      this.props.onEdit(item, true)
    } else {
      this.props.onChangeStatus(action, item.id);
    }

    this.handleClose();
  }


  render() {
    const { anchorEl } = this.state;
    const { index, tenantsByDomain, item, hotelInventory } = this.props;

    let avgRooms = 0, avgRate = 0;
    if(item.dailyInventoryList.length> 0){
      avgRooms = item.dailyInventoryList.reduce((prev, curr) => prev + curr.rooms, 0) /item.dailyInventoryList.length ;
      avgRate = item.dailyInventoryList.reduce((prev, curr) => prev + curr.buyRate, 0) /item.dailyInventoryList.length;
    }

    return (
      <div className="contact-item">
        <div className="col text-truncate d-none d-md-flex flex-column justify-content-start align-items-start">
          <Typography variant="subheading" className="text-truncate">
            {item.roomTypeId.name}
          </Typography>
          {!item.isComplete && (
            <Badge color="danger" className={"text-uppercase"}><IntlMessages id="content.status.incomplete" /></Badge>
          )}
        </div>

        <div className="col-sm-3 px-0 d-none d-md-flex flex-column">
          <div className={'d-flex justify-content-start align-items-center'}>
            <Typography variant="body2" className={'mr-1'}>
              <IntlMessages id="containers.Hotels.HotelDetails.roomTypes.label.roomNights" /> :
            </Typography>
            <Typography variant="body1">{item.occupancy.minNights}</Typography>
          </div>
          <div className={'d-flex justify-content-start align-items-center'}>
            <Typography variant="body2" className={'mr-1'}>
              <IntlMessages id="containers.Hotels.HotelDetails.roomTypes.label.totalRooms" /> :
            </Typography>
            <Typography variant="body1">{avgRooms}</Typography>
          </div>
        </div>


        <div className="col-sm-4 px-0 d-none d-md-flex flex-column">
          <div className={'d-flex justify-content-start align-items-center'}>
            <Typography variant="body2" gutterBottom className={'mr-1'}>
              <IntlMessages id="containers.Hotels.HotelDetails.roomTypes.label.avgRate" /> :
            </Typography>

            <Typography variant="body1">
              {item.averageBuyRate ? (
                <React.Fragment>
                  <TenantsCurrencyVal value={item.averageBuyRate} data={tenantsByDomain} code={hotelInventory.currency.code}/> per night
                </React.Fragment>
              ): 'N/A'}
            </Typography>
          </div>
          <div className={'d-flex justify-content-start align-items-center'}>
            <Typography variant="body1">
              {`${moment(item.inventoryDates.from).utc().format('MM/DD/YYYY')} - ${moment(item.inventoryDates.to).utc().format('MM/DD/YYYY')}`}
            </Typography>
          </div>
        </div>

        <div className="col-auto px-1 actions d-none d-sm-flex">
          <IconButton className="size-30" onClick={this.handleClick}>
            <i className="zmdi zmdi-more-vert"/>
          </IconButton>

          <Menu
            id="long-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={this.handleClose}
          >

            {!Boolean(item.isArchived) ? [
              <MenuItem key={'edit'} onClick={this.changeStatus('edit')}>
                <IntlMessages id="content.dropdown.menu.edit" />
              </MenuItem>,

              <MenuItem key={'editDaily'} onClick={this.changeStatus('edit_daily')}>
                <IntlMessages id="containers.Hotels.HotelDetails.RoomType.Menu.editDaily.label" />
              </MenuItem>,

              (!Boolean(item.active) ? (
                <MenuItem key={'activate'} onClick={this.changeStatus('activate')}>
                  <IntlMessages id="content.dropdown.menu.activate" />
                </MenuItem>
              ) : (
                <MenuItem key={'deactivate'} onClick={this.changeStatus('deactivate')}>
                  <IntlMessages id="content.dropdown.menu.deactivate" />
                </MenuItem>
              )),
              <MenuItem key={'archive'} onClick={this.changeStatus('archive')}>
                <IntlMessages id="content.dropdown.menu.archive" />
              </MenuItem>,

              <MenuItem key={'pause_sale'} disabled onClick={this.changeStatus('pause_sale')}>
                <IntlMessages id="content.dropdown.menu.pause_sale" />
              </MenuItem>,

              <MenuItem key={'reports'} disabled onClick={this.changeStatus('reports')}>
                <IntlMessages id="content.dropdown.menu.reports" />
              </MenuItem>,
             ] : (
              <MenuItem key={'restore'} onClick={this.changeStatus('restore')}>
                <IntlMessages id="content.dropdown.menu.restore" />
              </MenuItem>
            )}
          </Menu>
        </div>
      </div>
    );
  }
}

export default RoomTypeCell;
