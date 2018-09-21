import React from 'react'
import CustomScrollbars from 'util/CustomScrollbars';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/CloseRounded';
import IntlMessages from 'util/IntlMessages';
import filters from './filters.json';

class OrderFilter extends React.Component {
  constructor(){
    super();
    this.state = {
      selected: []
    }
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({selected: nextProps.selected});
  }

  getNavFilters = () => {
    let { selected } = this.state;
    return filters.map((filter, index) => <li key={index} className={'d-flex flex-row align-items-center'}>
      <a
        href="javascript:void(0)"
        className={`${selected.includes(filter.id) ? 'active' : undefined} w-100 pr-0`}
        onClick={this.props.onSelect(filter.id)}
      >
        <i className={`zmdi zmdi-${filter.icon}`}/>
        <IntlMessages id={filter.title} />
      </a>
      {selected.includes(filter.id) && (
        <CloseIcon color={'error'} className={'ml-auto'} onClick={this.props.onRemove(filter.id)}/>
      )}


    </li>)
  };
  render() {
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
            <div className="module-add-task">
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
            </div>

            <ul className="module-nav">
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

export default OrderFilter;
