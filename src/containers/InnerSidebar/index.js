import React from 'react';
import PropTypes from 'prop-types';
import CustomScrollbars from 'util/CustomScrollbars';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import BackIcon from '@material-ui/icons/KeyboardArrowLeft';
import IntlMessages from 'util/IntlMessages';
import filters from './filters';
import { Link } from 'react-router-dom'
import queryString from 'query-string'
import _ from 'lodash';

class InnerSidebar extends React.Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  constructor(props, context){
    super(props, context)

    const {route: {location: { search }}} = context.router;

    let selected = Object.keys(queryString.parse(search));
    if(props.selected){
      if(Array.isArray(props.selected)){
        selected = []
        props.selected.map(n => {
          selected.push(filters[_.findKey(filters, ['handle', n])].id);
        });
      } else {
        selected = [_.findKey(filters, ['handle', props.selected]).id];
      }
    }

    this.state = {
      selected
    }
  }

  componentWillReceiveProps = (nextProps) => {
    let selected = [];
    if(nextProps.selected){
      if(Array.isArray(nextProps.selected)){
        selected = []
        nextProps.selected.map(n => {
          selected.push(filters[_.findKey(filters, ['handle', n])].id);
        });
      } else {
        selected = [filters[_.findKey(filters, ['handle', nextProps.selected])].id]
      }
    }
    this.setState({selected});
  }


  getNavFilters = () => {
    let { selected } = this.state;
    const { useFilters = ['archived', 'deactivated']} = this.props;
    let availFilters = Object.keys(filters).map(key => useFilters.includes(key) && filters[key]);
    return availFilters.map((filter, index) => {
      return (
        <li key={index}>
          <a
            href="javascript:void(0)"
            className={selected.includes(filter.id) ? 'active' : undefined}
            // onClick={() => this.onSelect(filter.route)}
            onClick={this.props.onSelect(filter.handle)}
          >
            <i className={`zmdi zmdi-${filter.icon}`}/>
            <span>{filter.title}</span>
          </a>
        </li>
      )
    })
  };

  onSelect = (filterRoute) => {
    let searchTerm = queryString.parse(filterRoute);
    //const {route: {location: { search }}} = this.context.router;
    // searchTerm = {
    //   ...queryString.parse(search),
    //   ...queryString.parse(filterRoute),
    // };

    this.context.router.history.push(`?${queryString.stringify(searchTerm)}`);
  }

  render() {
    let { selected } = this.state;
    const { heading, icon, backLink=false, allTxt = false, addButtons=[] } = this.props;

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
            <div className="module-add-task">
              { addButtons.length > 0 ? (
                addButtons.map(btnProps => (
                  <Button
                    className="btn-block mb-2"
                    variant="raised"
                    size={'small'}
                    aria-label="add new"
                    color="primary"
                    {...btnProps}
                    >
                    <AddIcon className="mr-3"/>
                    {btnProps.label}
                  </Button>
                ))
              ) : (
                <Button
                  onClick={this.props.addBtnClick}
                  className="btn-block mb-2"
                  variant="raised"
                  size={'small'}
                  aria-label="add new"
                  color="primary">
                  <AddIcon className="mr-3"/>
                  {this.props.addButtonTxt}
                </Button>
              )}
            </div>

            <ul className="module-nav">
              {allTxt && (
                <li>
                  <a
                    href="javascript:void(0)"
                    className={selected.length === 0 ? 'active': undefined}
                    //onClick={this.onSelect}
                    onClick={this.props.onSelect('')}
                  >
                    <i className={`zmdi zmdi-menu`}/>
                    <span>{allTxt}</span>
                  </a>
                </li>
              )}


              <li className="module-nav-label">
                <IntlMessages id="mail.filters"/>
              </li>

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

export default InnerSidebar;
