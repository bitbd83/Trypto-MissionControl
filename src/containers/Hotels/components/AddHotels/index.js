import React from 'react';
import FormDrawer from 'components/FormDrawer';
import IntlMessages from 'util/IntlMessages';
import { connect } from 'react-redux';
import FormDrawerHeader from 'components/FormDrawer/FormDrawerHeader';
import { searchHotels, fetchHotelDetail, resetSearchHotels } from  '../../actions'
import SearchHotel from './SearchHotel'
import HotelInventoryDetails from './HotelInventoryDetails'
import CircularProgress from '@material-ui/core/CircularProgress';


class AddHotels extends React.Component {
  constructor(props){
    super();
    this.state = {
      searchTerm: '',
      selectedId: '',
    }
  }

  resetDrawer = event => {
    this.setState({
      selectedId: '',
    },
    () => {
      this.props.closeForm();
      this.props.resetSearchHotels();
    });
  }

  handleChange = (event) => {
    this.setState({searchTerm: event.target.value})
  }

  onSelectHotel = (id) => {
    this.setState({selectedId:id}, (id) => {
      this.props.fetchHotelDetail({id: this.state.selectedId})
    })
  }

  onCancel = () => {
    this.setState({selectedId:''})
    this.props.closeForm()
  }

  showLoader = () => (
    <div className="d-flex justify-content-center align-items-center animated slideInUpTiny animation-duration-3">
      <div className="loader-view">
        <CircularProgress />
      </div>
    </div>
  );

  render() {
    const { selectedId } = this.state;
    const { isSearcing, hotelDetail, edit, editData } = this.props;
    let content = '';
    if(selectedId || edit){
        if(isSearcing){
          content = this.showLoader();
        }else{
          content = <HotelInventoryDetails closeForm={this.props.closeForm} hotelDetail={edit ? editData: hotelDetail} onCancel={this.onCancel} edit={edit}/>
        }
    }else{
      content = <SearchHotel selectedId={selectedId} onSelectHotel = {this.onSelectHotel}/>
    }

    return (
        <FormDrawer open={this.props.showForm}>
            <FormDrawerHeader
                closeClick={this.resetDrawer}>
                {
                  edit ? (
                    <React.Fragment>
                      <IntlMessages id="pages.hotelsPage.searchHotel.label.edit_hotel"/>
                      {editData.name}
                    </React.Fragment>
                  ) : (
                    selectedId.length ? (<IntlMessages id="pages.hotelsPage.searchHotel.label.hotel_inventory_detail_title"/>)
                    :(<IntlMessages id="pages.hotelsPage.searchHotel.label.search_hotel_title"/>)
                  )
                }
            </FormDrawerHeader>
            {content}
        </FormDrawer>
    );
  }
}

const mapStateToProps = ({ settings, hotels, tenants }) => {
  return {
      width: settings.width,
      isSearcing: hotels.get('isSearcing'),
      tenantsByDomain: tenants.tenantsByDomain,
      hotelsList: hotels.get('hotelsList').toJS(),
      hotelDetail: hotels.get('hotelDetail').toJS(),
  };
};

export default connect(mapStateToProps, { searchHotels, resetSearchHotels, fetchHotelDetail })(AddHotels);

