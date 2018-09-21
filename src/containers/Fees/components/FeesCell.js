import React from 'react';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import CircularProgress from '@material-ui/core/CircularProgress';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {Badge} from 'reactstrap';
import { Link } from 'react-router-dom'
import Paper from '@material-ui/core/Paper';
import IntlMessages from 'util/IntlMessages';
import Typography from '@material-ui/core/Typography';
import TenantsDate from 'components/Tenants/TenantsDate';
import TenantsCurrencyVal from '../../../components/Tenants/Currency';
import Confirm from '../../../components/Dialogs/Confirm'

const ITEM_HEIGHT = 48;

class FeeCell extends React.Component {
  state = {
    anchorEl: null,
    confirm: false,
    action: null,
    showAction: false,
    height: 0,
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  editGroup = event => {
    this.handleClose();
    this.props.editGroup();
  }


  changeStatus = (action, showConfirm = false) => event =>{
    this.handleClose();
    this.setState({action, confirm: showConfirm, showAction: true})
    if(!showConfirm){
      this.handleStatus(true, action);
    }
  }

  handleStatus = (status, action) => {
    if(status){
      this.props.changeStatus(action, this.props.item.id)
    }
  }

  processStatus = (status = false) => event => {
    this.handleClose();
    const { action } = this.state;
    this.setState({ action: null, confirm: false },
      () => this.handleStatus(status, action)
    );
  }

  showLoader = () => (
    <div className="d-flex justify-content-center align-items-center animated slideInUpTiny animation-duration-3">
      <div className="loader-view">
        <CircularProgress size={24} />
      </div>
    </div>
  );

  structureFee = (fee, usefactor = false) => {
    if(!fee && fee !== 0) {
      return false;
    }
    if(!usefactor & fee === 0) {
      return 0;
    }

    const { item, tenantsByDomain } = this.props;
    if(item.feeCriteria.strategy.factor === 'Flat' || !usefactor){
      return (
        <TenantsCurrencyVal data={tenantsByDomain} value={fee} key={fee}/>
      )
    } else {
      return fee + "%";
    }
  }

  componentDidMount() {
    const height = this.CellDiv.clientHeight;
    this.setState({ height });
  }

  componentWillReceiveProps(nextProps){
    if(this.state.showAction && !nextProps.actionLoader){
      this.setState({showAction:false})
    }
  }

  render() {
    const { anchorEl } = this.state;
    const { index, item, tenantsByDomain } = this.props;

    let minFee = this.structureFee(item.feeCriteria.minAmount);
    let maxFee = this.structureFee(item.feeCriteria.maxAmount);
    let rate = this.structureFee(item.feeCriteria.strategy.amount, true);
    let ratedata= [];
    if(minFee){
      ratedata.push('Min: ', minFee);
    }
    if(maxFee){
      if(minFee)
        ratedata.push(' | ');

      ratedata.push('Max: ', maxFee);
    }

    if(ratedata.length){
      ratedata = ['( ',...ratedata ,' )'];
    }

    return (
          <div ref={ (Cell) => this.CellDiv = Cell} key={item.id} className="contact-item py-3">
            {this.props.actionLoader && this.state.showAction ? <span style={{...dimmer, ...{height: this.state.height}}} className="d-flex align-items-center justify-content-center">
              <CircularProgress size={20}/>
            </span> : ''}
            <div className="col text-truncate">
              <Typography variant="subheading" className="text-truncate">
                {item.name}
              </Typography>
            </div>

            <div className="col-sm-3 px-0 d-none d-md-flex flex-column">
              <Typography variant="subheading">
                <IntlMessages id="pages.feesPage.feesForm.feeCriteria_label" />
              </Typography>
              <Typography variant="caption">
                {rate} {ratedata}
              </Typography>
            </div>

            <div className="col-sm-3 px-0 d-none d-md-flex flex-column">
              <Typography variant="subheading">
                <IntlMessages id="list.heading.lastChanged" />
              </Typography>
              <Typography variant="caption">
                <TenantsDate
                  timezone={Object.keys(tenantsByDomain).length > 0 && tenantsByDomain.timeZone}
                  time={item.dateModifiedUtc}
                />
              </Typography>
            </div>

            <div className="col-sm-1 px-0 mr-2">
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
              <IconButton
                aria-label="More"
                aria-owns={anchorEl ? 'long-menu' : null}
                aria-haspopup="true"
                onClick={this.handleClick}
              >
                <MoreVertIcon />
              </IconButton>
                <Menu
                  id="long-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={this.handleClose}
                  PaperProps={{
                    style: {
                      maxHeight: ITEM_HEIGHT * 4.5
                    },
                  }}
                >

                {!Boolean(item.isArchived) ? [

                  <MenuItem key={'edit'} onClick={this.editGroup}>
                    <IntlMessages id="pages.feesPage.feesCell.edit" />
                  </MenuItem>,
                  (!Boolean(item.active) ? (
                      <MenuItem key={'activate'} onClick={this.changeStatus('activate', false)}>
                        <IntlMessages id="pages.feesPage.feesCell.activate" />
                      </MenuItem>
                    ) : (
                      <MenuItem key={'deactivate'} onClick={this.changeStatus('deactivate', true)}>
                        <IntlMessages id="pages.feesPage.feesCell.deactivate" />
                      </MenuItem>
                    )
                  ),
                  <MenuItem key={'archive'} onClick={this.changeStatus('archive', true)}>
                    <IntlMessages id="pages.feesPage.feesCell.archive" />
                  </MenuItem>,
                ] : (
                  <MenuItem key={'restore'} onClick={this.changeStatus('restore', false)}>
                    <IntlMessages id="pages.feesPage.feesCell.restore" />
                  </MenuItem>
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

    const dimmer = {
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      width: '100%',
      // height: '80px',
      position: 'absolute',
      zIndex: 1,
    }


const mapStateToProps = ({ fees }) => {
  return {
    actionLoader: fees.get('actionLoader'),
  };
};
export default connect(
  mapStateToProps
)(FeeCell);
