import React from 'react'
import CustomScrollbars from 'util/CustomScrollbars';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import IntlMessages from 'util/IntlMessages';
import filters from './filters';
import { Link } from 'react-router-dom'

class HotelSidebar extends React.Component {
  constructor(){
    super();
    this.state = {
      selected: ''
    }
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({selected: nextProps.selected});
  }

  getNavFilters = () => {
    let { selected } = this.state;
    return filters.map((filter, index) => <li key={index}>
      <a
        href="javascript:void(0)"
        className={selected ===  filter.handle ? 'active' : undefined}
        onClick={this.props.onSelect(filter.handle)}
      >
        <i className={`zmdi zmdi-${filter.icon}`}/>
        <span>{filter.title}</span>
      </a>
    </li>)
  };
  render() {
    let { selected } = this.state;

    return (
      <div className="module-side">
        <div className="module-side-header">
          <div className="module-logo">
            <i className="zmdi zmdi-hotel mr-4"/>
            <span><IntlMessages id="pages.hotelsPage.label.title"/></span>
          </div>
        </div>

        <div className="module-side-content">
          <CustomScrollbars
            className="module-side-scroll scrollbar"
            style={{
            height: this.props.width >= 1200
              ? 'calc(100vh - 150px)'
              : 'calc(100vh - 130px)'
          }}>
            <div className="module-add-task">
              <Button
                onClick={this.props.openAddHotelForm}
                className="btn-block mb-2"
                variant="raised"
                size={'small'}
                aria-label="add new"
                color="primary">
                <AddIcon className="mr-3"/>
                <IntlMessages id="pages.hotelsPage.btn.add_hotes"/>
              </Button>
            </div>

            <ul className="module-nav">
              <li>
                <a
                  href="javascript:void(0)"
                  className={selected ===  '' ? 'active': undefined}
                  onClick={this.props.onSelect('')}
                >
                  <i className={`zmdi zmdi-menu`}/>
                  <span>All Hotels</span>
                </a>
              </li>

              <li className="module-nav-label">
                <IntlMessages id="mail.filters"/>
              </li>

              {this.getNavFilters()}
            </ul>
          </CustomScrollbars>
        </div>
      </div>
    )
  }
}

export default HotelSidebar;
