import React from 'react';
import Button from '@material-ui/core/Button';
import FormDrawer from 'components/FormDrawer';
import TextField from '@material-ui/core/TextField';
import IntlMessages from 'util/IntlMessages';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import { connect } from 'react-redux';
import FormDrawerHeader from 'components/FormDrawer/FormDrawerHeader';
import FormDrawerContent from 'components/FormDrawer/FormDrawerContent';
import FormDrawerFooter from 'components/FormDrawer/FormDrawerFooter';
import { searchHotels } from  '../../actions'
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import SearchHotelCell from './SearchHotelCell'
import HotelInventoryDetails from './HotelInventoryDetails'


class SearchHotel extends React.Component {
    constructor(props){
        super();
        this.state = {
          searchTerm: '',
        }
    }

    handleChange = (event) => {
      this.setState({searchTerm: event.target.value})
    }

    searchHotels = event => {
      event.preventDefault();
      const { searchTerm } = this.state;
      if(searchTerm !== ''){
        this.props.searchHotels({searchTerm: this.state.searchTerm})
      }
    }

    renderSearchHotel = (items) => {
      return items.map((item, index) => (
          <SearchHotelCell
            key={index}
            item={item}
            index={index}
            onSelect = {() => this.props.onSelectHotel(item.thirdPartyId.id)}
          />
        )
      )
    }

  render() {
    const { searchTerm } = this.state;
    const { hotelsList } = this.props;
    let hotels = '';
    if(hotelsList.items && hotelsList.items.length){
      hotels = this.renderSearchHotel(hotelsList.items);
    }
    if(hotelsList.error){
      hotels = (
        <div>
          <Typography variant="subheading">Something went wrong, Please try again.</Typography>
        </div>
      );
    }

    return (
      <FormDrawerContent noFooter={true}>
        <FormHelperText className="mt-0">
          <IntlMessages id="pages.hotelsPage.searchHotel.label.search_hotel_description" />
        </FormHelperText>

        <form className="d-flex align-items-end justify-content-between" onSubmit={this.searchHotels}>
          <div className="w-75 mr-3">
            <FormControl className="w-100 m-0">
              <TextField
                label={<IntlMessages id="pages.hotelsPage.searchHotel.textField.Search Hotels"/>}
                rowsMax="4"
                value={searchTerm}
                onChange={this.handleChange}
                margin="normal"
                fullWidth
              />
            </FormControl>
          </div>
          <div className="mb-2 ">
            <Button

                className="btn-bock"
                size={"small"}
                variant="raised"
                type={'submit'}
                color="primary">
                {this.props.isSearcing ? (
                  <CircularProgress size={20} style={{ color: "white" }}/>
                ):(
                  <IntlMessages id="pages.hotelsPage.searchHotel.btn.search_hotels"/>
                )}
            </Button>
          </div>
        </form>

        {searchTerm && (
          <Typography className="mt-3" variant="subheading">
            {hotelsList.items.length} Hotels Found
          </Typography>
        )}

        {hotels}
      </FormDrawerContent>
    );
  }
}

const mapStateToProps = ({ settings, hotels, tenants }) => {
    return {
        width: settings.width,
        isSearcing: hotels.get('isSearcing'),
        tenantsByDomain: tenants.tenantsByDomain,
        hotelsList: hotels.get('hotelsList').toJS(),
    };
  };

export default connect(mapStateToProps, { searchHotels })(SearchHotel);

