import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import TenantsCurrencyVal from '../../../../../components/Tenants/Currency';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import TenantsDate from 'components/Tenants/TenantsDate';
import {Badge} from 'reactstrap';
import IntlMessages from 'util/IntlMessages';
import { switchTicketSale } from '../../../actions'
import Confirm from '../../../../../components/Dialogs/Confirm'

class TicketCell extends React.Component {
  constructor() {
    super();
    this.state = {
      anchorEl: undefined,
      menuState: false,
      confirm: false,
      action: null,
    };
  }

  onContactOptionSelect = event => {
    this.setState({ menuState: true, anchorEl: event.currentTarget });
  };

  handleRequestClose = () => {
    this.setState({ menuState: false, anchorEl: undefined, });
  };

  changeStatus = (action, showConfirm = false) => event =>{
    this.handleRequestClose();
    this.setState({action, confirm: showConfirm})
    if(!showConfirm){
      this.handleStatus(true, action);
    }
  }

  handleStatus = (status, action) => {
    if(status){
      this.props.changeStatus(action, this.props.item.id)
    }
  }

  cloneTicket = (id) => {
    this.handleRequestClose();
    this.props.cloneTicket(id)
  }

  processStatus = (status = false) => event => {
    this.handleRequestClose();
    const { action } = this.state;
    this.setState({ action: null, confirm: false },
      () => this.handleStatus(status, action)
    );
  }

  render() {
    const { item, tenantsByDomain, index } = this.props;
    const { menuState, anchorEl } = this.state;
    const { name, price, subTitle } = item;

    return (
          <div key={index} className="contact-item py-3">
            <div className="col text-truncate">
              <Typography variant="subheading" className="text-truncate" component={Link} to={`${this.props.path}/${item.id}/options`}>
                {item.name}
              </Typography>
              <Typography variant="caption">
                {subTitle}
              </Typography>
            </div>

            <div className="col-sm-1 px-0 mr-4">
              <Typography variant="subheading">
                <IntlMessages id={"list.heading.price"} />
              </Typography>
              <Typography variant="caption">
                <TenantsCurrencyVal data={tenantsByDomain} value={price} />
              </Typography>
            </div>

             <div className="col-sm-1 px-0 mr-5">
              {item.hidden ?
                <Badge color="success" className={"text-uppercase mb-0 d-block"}><IntlMessages id="content.status.hidden" /></Badge>
              : ''
              }
            </div>

            <div className="col-sm-1 px-0 mr-5">
              {item.onSale ?
                <Badge color="success" className={"text-uppercase mb-0 d-block"}><IntlMessages id="content.status.onSale" /></Badge>
              : <Badge color="danger" className={"text-uppercase mb-0 d-block"}><IntlMessages id="content.status.draft" /></Badge>
              }
            </div>
            <div className="mr-5">
              <Typography variant="subheading">
                <IntlMessages id={"list.heading.lastChanged"} />
              </Typography>
              <Typography variant="caption">
                <TenantsDate
                  timezone={Object.keys(tenantsByDomain).length > 0 && tenantsByDomain.timeZone}
                  time={'Jul 24, 2018 01:04 PM'}
                  timeFormat="MMM DD, YYYY hh:mm A"
                />
              </Typography>
            </div>

            <div className="col-sm-1 px-0 mr-2">
              {item.isArchived ? (
                <Badge color="danger" className={"text-uppercase mb-0 d-block"}><IntlMessages id="content.status.archive" /></Badge>
              ) : ''}
            </div>

          <div className="col-auto px-1 actions d-none d-sm-flex">
            <IconButton className="size-30" onClick={this.onContactOptionSelect}>
              <i className="zmdi zmdi-more-vert" />
            </IconButton>

            <Menu
              id="long-menu"
              anchorEl={anchorEl}
              open={menuState}
              onClose={this.handleRequestClose}
              MenuListProps={{
                style: {
                  width: 100,
                },
              }}>

              {!Boolean(item.isArchived) ? [
                  <MenuItem key={'options'} component={Link} to={`${this.props.path}/${item.id}/options`}>
                    <IntlMessages id="content.dropdown.menu.configure" />
                  </MenuItem>,
                  <MenuItem component={Link} to={`${this.props.path}/${item.id}/edit`} key={'edit'}>
                    <IntlMessages id="content.dropdown.menu.edit" />
                  </MenuItem>,
                  <MenuItem key={'archive'} onClick={this.changeStatus('archive', true)}>
                    <IntlMessages id="content.dropdown.menu.archive" />
                  </MenuItem>,
                  (!item.onSale ? (
                    <MenuItem key={'onSale'} onClick={this.changeStatus('on-sale', false)}>
                      <IntlMessages id="content.dropdown.menu.onSale" />
                    </MenuItem>
                  ) : (
                    <MenuItem key={'onSale'} onClick={this.changeStatus('off-sale', true)}>
                      <IntlMessages id="content.dropdown.menu.offSale" />
                    </MenuItem>
                  )
                ),
                (item.hidden ? (
                    <MenuItem key={'offSale'} onClick={this.changeStatus('show', false)}>
                      <IntlMessages id="content.dropdown.menu.publish" />
                    </MenuItem>
                  ) : (
                    <MenuItem key={'offSale'} onClick={this.changeStatus('hide', true)}>
                      <IntlMessages id="content.dropdown.menu.unpublish" />
                    </MenuItem>
                  )
                ),
                <MenuItem key={'clone'} onClick={() => this.cloneTicket(item.id)}>
                  <IntlMessages id="content.dropdown.menu.clone" />
                </MenuItem>
               ] : (
                <MenuItem key={'restore'} onClick={this.changeStatus('restore', false)}>
                  <IntlMessages id="content.dropdown.menu.restore" />
                </MenuItem>
              )}
             )}
            </Menu>
          </div>
          <Confirm
            open={this.state.confirm}
            handleClose={this.processStatus}
            type={this.state.action}
          />
        </div>
    );
  }
}

const mapStateToProps = ({ tenants }) => {
  return {
    tenantsByDomain: tenants.tenantsByDomain,
  };
};

export default connect(mapStateToProps, { switchTicketSale })(TicketCell);
