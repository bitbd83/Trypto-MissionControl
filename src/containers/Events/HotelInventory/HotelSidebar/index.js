import React from 'react';
import { Link } from 'react-router-dom';
import CustomScrollbars from 'util/CustomScrollbars';
import IntlMessages from 'util/IntlMessages';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { connect } from 'react-redux';
import BackIcon from '@material-ui/icons/KeyboardArrowLeft';


class HotelInventorySidebar extends React.Component {
  render() {
    const { heading, backLink } = this.props;
    return (
      <div className="module-side">
       <div className="module-side-header">
          <div className="module-logo">
            <i className="zmdi zmdi-account-box mr-4" />
            <span>{heading && heading}</span>
          </div>
        </div>


        <div className="module-side-content">
          <CustomScrollbars className="module-side-scroll scrollbar"
               style={{
                height: this.props.width >= 1200
                  ? `calc(100vh - ${backLink ? '210px': '150px' })`
                  : `calc(100vh - ${backLink ? '190px': '130px' })`
              }}>


            <div className="module-add-task">
              <Button
                component={Link}
                to={'/app/hotels'}
                className="btn-block mb-2"
                variant="raised"
                size={'small'}
                aria-label="add new"
                color="primary">
                <AddIcon className="mr-3"/>
                <IntlMessages id="pages.hotelsPage.btn.add_hotes"/>
              </Button>
            </div>

          </CustomScrollbars>
        </div>
        {backLink && (
            <div className="hotel-side-footer text-center py-2 border-top" style={{height: 60}}>
              <Button
                size={'small'}
                aria-label="back"
                component={Link}
                to={backLink.url}
              >
                <BackIcon className="mr-3"/>
                {backLink.label}
              </Button>
            </div>
          )}
      </div>
    );
  }
}

export default HotelInventorySidebar;

