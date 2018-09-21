import React, {Component} from 'react';
import {connect} from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import IntlMessages from 'util/IntlMessages';
import Typography from '@material-ui/core/Typography';
import RoomTypes from './RoomTypes';
import Surcharges from './Surcharges';
import HotelData from "../components/Sidebar/HotelData"
import CustomScrollbars from 'util/CustomScrollbars';
import Loader from 'components/Loader';
import { fetchHotelInventory } from '../actions';
import Divider from '@material-ui/core/Divider';


class LandingPage extends Component {

  componentWillMount = () => {
    const { hotelInventoryId } = this.props.match.params;
    const { id } = this.props.tenantsByDomain
    this.props.fetchHotelInventory(id, hotelInventoryId);
  }

  openEditHotelForm = (status) => event => {
    this.setState({showForm: status});
  }

  render() {
    const { hotelData, tenantsByDomain, width, isFetching } = this.props;

    if(isFetching || hotelData.id === undefined){
      return <Loader />
    }

    return (
      <div className="app-wrapper">
        <div className="app-module hotel-module animated slideInUpTiny animation-duration-3">
          <div className="hotel-sidenav  d-xl-flex">
            <HotelData
              item={hotelData}
              tenantsByDomain={tenantsByDomain}
              width={width}
            />
          </div>
          <div className="module-box">
            <CustomScrollbars
              className="module-list-scroll scrollbar"
              style={{
                height: width >= 1200
                  ? 'calc(100vh - 70px)'
                  : 'calc(100vh - 50px)'
              }}
            >
              <div className="module-box-header">
                <Typography variant={'headline'}>
                  <IntlMessages id="pages.hotelsPage.label.title"/>
                </Typography>
              </div>

              <div className="hotel-main-content">
                <RoomTypes
                  hotelInventory={hotelData}
                  tenantsByDomain={tenantsByDomain}
                />
                <Divider className={'mb-4 w-100'} style={{height: '1px'}}/>
                <Surcharges
                  hotelInventory={hotelData}
                  tenantsByDomain={tenantsByDomain}
                />
              </div>
            </CustomScrollbars>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = ({settings, tenants, hotels}) => {
  return {
    width: settings.width,
    tenantsByDomain: tenants.tenantsByDomain,
    isFetching: hotels.get('isFetching'),
    hotelData: hotels.get('hotelInventory').toJS(),
  };
}

export default connect(mapStateToProps,{
  fetchHotelInventory
})(LandingPage);
