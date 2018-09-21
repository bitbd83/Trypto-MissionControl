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


class HotelInventoryCell extends React.Component {

    constructor() {
      super();
      this.state = {
          anchorEl: undefined,
          menuState: false,
      }
    }

    onContactOptionSelect = event => {
        this.setState({menuState: true, anchorEl: event.currentTarget});
    };
    handleRequestClose = () => {
        this.setState({menuState: false});
    };

    changeStatus = () => event => {
      // alert('asdasd');
    }

    render() {
      const {menuState, anchorEl} = this.state;
      const { item, tenantsByDomain, selectedHotel } = this.props;
      let selected = false;

      selectedHotel.length && selectedHotel.map(hotel => {
        if(hotel === item.id){
          selected = true
        }
      })

      return (
        <div className="contact-item">
          <div className="col-auto px-1 actions d-none d-xs-flex">
            <Checkbox
              checked={selected}
              onChange={ this.props.onSelectHotel}
              value = {item.id}
              color="primary"
            />
          </div>
          {(item.hotel.photos === undefined || item.hotel.photos.length === 0 || item.hotel.photos[0].photoUrl === undefined) ?
            <div
              className="size-80 bg-blue text-center text-white mx-1 mx-md-3"
              style={{fontSize: 20}}>
                {item.name.charAt(0).toUpperCase()}
            </div> :
            <img className="size-80 mx-1 mx-md-3" alt={item.name} src={item.hotel.photos[0].photoUrl}/>}

          <div className="col text-truncate">
            <Typography variant="subheading" className="text-truncate" >
              {item.name}
            </Typography>
            <Typography variant="caption">
              <TenantsDate
                timezone={Object.keys(tenantsByDomain).length > 0 && tenantsByDomain.timeZone}
                time={item.inventoryDates.from}
                timeFormat="MM/DD/YYYY"
              /> - <TenantsDate
                timezone={Object.keys(tenantsByDomain).length > 0 && tenantsByDomain.timeZone}
                time={item.inventoryDates.to}
                timeFormat="MM/DD/YYYY"
              />
            </Typography>
          </div>
        </div>
      )
    }
}

export default HotelInventoryCell;
