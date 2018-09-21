import React from 'react'
import { Link } from 'react-router-dom';
import CustomScrollbars from 'util/CustomScrollbars';
import BackIcon from '@material-ui/icons/KeyboardArrowLeft';
import AddIcon from '@material-ui/icons/Add';
import StarSharp from '@material-ui/icons/StarSharp';
import StarBorderSharp from '@material-ui/icons/StarBorderSharp';
import IntlMessages from 'util/IntlMessages';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TenantsDate from 'components/Tenants/TenantsDate';
import _ from "lodash";
import moment from 'moment';
import AddHotels from '../AddHotels';



class HotelData extends React.Component {

  constructor() {
    super();
    this.state = {
      showForm: false
    }
  }

  rating = star => {
    return (
      <Grid className='hotel-rating' container justify={'flex-start'}>
        {_.times(5, (i) => {
          if(star > i)
            return (<Grid item key={i}><StarSharp style={{ fontSize: 20 }}/></Grid>);
          else
            return (<Grid item key={i}><StarBorderSharp style={{ fontSize: 20 }}/></Grid>);
        })}
      </Grid>
    );
  }
  render() {
    const { tenantsByDomain, item } = this.props;

    let hotelImg = '';
    if(item.hotel === undefined
      || item.hotel.photos === undefined
      || item.hotel.photos.length === 0
      || item.hotel.photos[0].photoUrl === undefined) {

      hotelImg = 'http://via.placeholder.com/400x200';
    } else {
      hotelImg = item.hotel.photos[0].photoUrl;
    }

    return (
      <div className="hotel-side">
        <div className="hotel-sidenav-content d-flex align-items-start flex-column">
          <img className="hotel-avatar" src={hotelImg}/>
          <CustomScrollbars
            className="module-side-scroll scrollbar"
            style={{
              height: this.props.width >= 1200
                ? 'calc(100vh - 325px)'
                : 'calc(100vh - 305px)'
            }}
          >
            <Grid className={'hotel-info mb-2'} container direction={'column'} justify={'flex-start'} spacing={16}>
              <Grid item>
                <Typography variant={'title'} gutterBottom>
                  {item.name}
                </Typography>

                {this.rating(item.hotel.starRating)}

                <Typography gutterBottom>
                  {item.hotel.address.addressLine1}<br />
                  {!item.hotel.address.addressLine2 ? '': (
                    <Typography gutterBottom>{item.hotel.address.addressLine2}</Typography>
                  )}
                  {!item.hotel.address.addressLine3 ? '': (
                    <Typography gutterBottom>{item.hotel.address.addressLine3}</Typography>
                  )}

                  {!item.hotel.address.cityLocality ? '': item.hotel.address.cityLocality}
                  {!item.hotel.address.postalCode ? '': ', '+ item.hotel.address.postalCode}
                  {!item.hotel.address.countryCode ? '': ', '+ item.hotel.address.countryCode}
                </Typography>
              </Grid>
              <Grid item>
                <Typography gutterBottom variant={'subheading'}>
                  <IntlMessages id={"containers.Hotels.HotelDetails.Data.label.inventoryDates"} />
                </Typography>
                <Typography gutterBottom>
                  {`${moment(item.inventoryDates.from).utc().format('MMM DD, YYYY')} - ${moment(item.inventoryDates.to).utc().format('MMM DD, YYYY')}`}
                </Typography>
              </Grid>
              <Grid item>
                <Typography gutterBottom variant={'subheading'}>
                  <IntlMessages id={"containers.Hotels.HotelDetails.Data.label.minNights"} />
                </Typography>
                <Typography gutterBottom>
                  {item.minNights}
                </Typography>
              </Grid>

              <Grid item className={'text-center'}>
                <Button
                  variant={"raised"}
                  size={'small'}
                  aria-label="Edit hotel"
                  color={'primary'}
                  onClick={() => this.setState({showForm: true})}
                >
                  <span><IntlMessages id="containers.Hotels.HotelDetails.Sidebar.editBtn"/></span>
                </Button>
              </Grid>
            </Grid>
          </CustomScrollbars>


          <div className="hotel-side-footer text-center py-2">
            <Button
              size={'small'}
              aria-label="back"
              component={Link}
              to={`/app/hotels`}
            >
              <BackIcon className="mr-3"/>
              <span><IntlMessages id="containers.Hotels.HotelDetails.backBtn"/></span>
            </Button>
          </div>
        </div>

        <AddHotels
          showForm={this.state.showForm}
          closeForm={() => this.setState({showForm: false})}
          edit={true}
          editData={item}
        />
      </div>
    )
  }
}

export default HotelData;
