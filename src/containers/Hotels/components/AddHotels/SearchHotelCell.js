import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';


class SearchHotelCell extends React.Component {

   render() {
      const { item, index } = this.props;

      var stars = []
         for (let i = 0; i < item.starRating; i++) {
            stars.push(i)
         }

      return (
        <Paper key={index} className="col-12 contact-item ripple row no-gutters align-items-center py-2 px-3 py-sm-3 px-sm-6 my-4">
            <div className="col text-truncate d-flex justify-content-between">
              <div className="d-flex w-75 ">
                  <div>
                    {(!item.photos.length) ?
                    <div style={{fontSize: 10}} className="size-60 mr-1">
                        <img className="size-60 mr-1" src="http://via.placeholder.com/100x100"/>
                    </div> :
                    <img className="size-60 mr-1" src={item.photos[0] && item.photos[0].photoUrl}/>}
                  </div>
                  <div className="w-100">
                    <h3 className="font-weight-bold mb-1 col-12 text-truncate" >
                        {item.name}
                    </h3>
                    <Typography className="col-12 text-truncate">
                        {Object.keys(item.address).map((address, index) => {
                          return item.address[address] !== '' ? `${index !== 0 ? ', ' : ''}${item.address[address]}` : null;
                        })}
                    </Typography>
                    <div className="col-12 text-truncate">
                        <span>
                          {stars.length && stars.map(star => {
                              return <i className="zmdi zmdi-star zmdi-hc-fw" />
                          })}
                        </span>
                    </div>
                  </div>
              </div>
              <div className="align-self-center">
                  <Button
                    onClick={this.props.onSelect}
                    style={{minHeight:'25px', minWidth:'40px'}}
                    className="mr-2 p-0"
                    variant="raised"
                    color="primary">
                    <i className="zmdi zmdi-arrow-right"/>
                    {/* <IntlMessages id="pages.hotelsPage.searchHotel.btn.select_this_hotel"/> */}
                  </Button>
              </div>
            </div>
        </Paper>
      );
  }
}

export default SearchHotelCell;

