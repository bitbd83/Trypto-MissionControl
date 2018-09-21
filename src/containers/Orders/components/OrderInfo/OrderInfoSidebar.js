import React from 'react'
import CustomScrollbars from 'util/CustomScrollbars';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import BackIcon from '@material-ui/icons/KeyboardArrowLeft';
import IntlMessages from 'util/IntlMessages';
import { Link } from 'react-router-dom'
import { browserHistory } from 'react-router';


class OrderInfoSidebar extends React.Component {

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
    const { sidebarOptions } = this.props;
    return sidebarOptions.map((filter, index) => {
      return (
        <li key={index}>
          <a
            href="javascript:void(0)"
            className={selected ===  filter.ref ? 'active' : undefined}
            onClick={() => this.onSelect(filter.ref)}
          >
            <i className={`zmdi zmdi-${filter.icon}`}/>
            <span>{filter.title}</span>
          </a>
        </li>
      )
    })
  };

  onSelect = (filter) => {
    this.props.handleScroll(filter)
  }

  render() {
    let { selected } = this.state;
    const { heading, icon, backLink=false, allTxt = false } = this.props;

    return (
      <div className="module-side">
        <div className="module-side-header">
          <div className="module-logo">
            {icon && icon}
            <span>{heading && heading}</span>
          </div>
        </div>

        <div className="module-side-content hotel-sidenav-content">
          <CustomScrollbars
            className="module-side-scroll scrollbar"
            style={{
            height: this.props.width >= 1200
              ? `calc(100vh - ${backLink ? '210px': '150px' })`
              : `calc(100vh - ${backLink ? '190px': '130px' })`
          }}>


            <ul className="module-nav">
              {this.getNavFilters()}

            </ul>
          </CustomScrollbars>

          {backLink && (
            <div className="hotel-side-footer text-center py-2" style={{height: 60}}>
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
      </div>
    )
  }
}

export default OrderInfoSidebar;
