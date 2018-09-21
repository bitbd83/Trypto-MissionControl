import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import IntlMessages from 'util/IntlMessages';
import TenantsDate from 'components/Tenants/TenantsDate';
import TenantsCurrencyVal from '../../../../components/Tenants/Currency'
import {Badge} from 'reactstrap';

class SurchargeCell extends React.Component {
  constructor() {
    super();
    this.state = {
        anchorEl: undefined,
        menuState: false,
    }
  }

  onContactOptionSelect = event => {
      this.setState({menuState: true, anchorEl: event.currentTarget});
  };
  handleRequestClose = () => {
      this.setState({menuState: false});
  };

  changeStatus = (action) => event => {
    const {item} = this.props;
    if(action === 'edit'){
      this.props.onEdit(item)
    } else{
      this.props.onChangeStatus(action, item.id);
    }
    this.handleRequestClose();
  }

  structureFee = (fee) => {
    if(!fee && fee !== 0) {
      return false;
    }
    const { item, tenantsByDomain, hotelInventory } = this.props;
    if(item.strategy.factor === 'Flat'){
      return (
        <TenantsCurrencyVal data={tenantsByDomain} value={fee} key={fee} code={hotelInventory.currency.code}/>
      )
    } else {
      return fee + "%";
    }
  }

  render() {
    const {menuState, anchorEl} = this.state;
    const { item, tenantsByDomain } = this.props;


    return (
      <div className="contact-item">
        <div className="col text-truncate">
          <Typography variant="subheading" className="text-truncate">
            {item.name}
          </Typography>
        </div>

        <div className="col-sm-3 px-0 d-none d-md-flex flex-column">
          <Typography variant="body2">
            {this.structureFee(item.strategy.amount)}
          </Typography>
        </div>

        <div className="col-sm-3 px-0 d-none d-md-flex flex-column">
          <Typography variant="subheading">
            <IntlMessages id={"list.heading.lastChanged"} />
          </Typography>
          <Typography variant="caption">
            <TenantsDate
              timezone={Object.keys(tenantsByDomain).length > 0 && tenantsByDomain.timeZone}
              time={item.dateModifiedUtc}
            />
          </Typography>
        </div>

        <div className="col-sm-1 px-0">
          {item.isArchived ? (
            <Badge color="danger" className={"text-uppercase mb-0 d-block"}><IntlMessages id="content.status.archive" /></Badge>
          ) : (
            item.active ? (
              <Badge color="success" className={"text-uppercase mb-0 d-block"}><IntlMessages id="content.status.active" /></Badge>
            ) : (
              <Badge color="warning" className={"text-uppercase mb-0 d-block"}><IntlMessages id="content.status.inactive" /></Badge>
            )
          )}
        </div>


        <div className="col-auto px-1 actions d-none d-sm-flex">
          <IconButton className="size-30" onClick={this.onContactOptionSelect}>
            <i className="zmdi zmdi-more-vert"/>
          </IconButton>

          <Menu id="long-menu"
            anchorEl={anchorEl}
            open={menuState}
            onClose={this.handleRequestClose}
            MenuListProps={{
                style: {
                    width: 150,
                },
            }}>

            {!Boolean(item.isArchived) ? [
              <MenuItem key={'edit'} onClick={this.changeStatus('edit')}>
                <IntlMessages id="content.dropdown.menu.edit" />
              </MenuItem>,

              (!Boolean(item.active) ? (
                <MenuItem key={'activate'} onClick={this.changeStatus('activate')}>
                  <IntlMessages id="content.dropdown.menu.activate" />
                </MenuItem>
              ) : (
                <MenuItem key={'deactivate'} onClick={this.changeStatus('deactivate')}>
                  <IntlMessages id="content.dropdown.menu.deactivate" />
                </MenuItem>
              )),

              <MenuItem key={'archive'} onClick={this.changeStatus('archive')}>
                <IntlMessages id="content.dropdown.menu.archive" />
              </MenuItem>
             ] : (
              <MenuItem key={'restore'} onClick={this.changeStatus('restore')}>
                <IntlMessages id="content.dropdown.menu.restore" />
              </MenuItem>
            )}
          </Menu>
        </div>
      </div>
    )
  }
}

export default SurchargeCell;
