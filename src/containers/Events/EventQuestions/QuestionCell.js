import React from 'react';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import {Badge} from 'reactstrap';
import IntlMessages from 'util/IntlMessages';
import TenantsDate from 'components/Tenants/TenantsDate';
import {SortableElement, SortableHandle} from 'react-sortable-hoc';
import Confirm from '../../../components/Dialogs/Confirm'


const DragHandle = SortableHandle(() =>
    <i className="zmdi zmdi-menu draggable-icon" style={{fontSize: 20}}/>);

class QuestionCell extends React.Component {

  state = {
    anchorEl: null,
    confirm: false,
    action: null,
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  changeMandatory = (mandatory) => event => {
    this.handleClose();
    this.props.changeMandatory(this.props.item.id, mandatory)
  }

  changeStatus = (action, showConfirm = false) => event =>{
    this.handleClose();
    this.setState({action, confirm: showConfirm})
    if(!showConfirm){
      this.handleStatus(true, action);
    }
  }

  handleStatus = (status, action) => {
    if(status){
      this.props.changeStatus(this.props.item.id, action)
    }
  }

  processStatus = (status = false) => event => {
    this.handleClose();
    const { action } = this.state;
    this.setState({ action: null, confirm: false },
      () => this.handleStatus(status, action)
    );
  }

  render() {
    const { anchorEl} = this.state;
    const { item, tenantsByDomain, enableReorder, itemIndex } = this.props;

    const question = item.field;

    return (
      <Grid item className="contact-item bg-white">
        {enableReorder && <DragHandle />}
        <div className="col">
          <Typography variant="subheading" className="text-truncate" >
            {`${!enableReorder ? itemIndex+1+ "." : ''} ${question.fieldName}`}
          </Typography>
        </div>
        <div className="col-auto mr-2">
          {item.assignment.mandatory ?
            <Badge color="success" className={"text-uppercase mb-0 d-block"}><IntlMessages id="content.status.mandatory" /></Badge>
            : <Badge color="success" className={"text-uppercase mb-0 d-block"}><IntlMessages id="content.status.optional" /></Badge>
          }
        </div>
        <div className="col-sm-2 px-0 d-none d-md-flex flex-column">
          <Typography variant="subheading">
            <IntlMessages id="list.heading.lastChanged" />
          </Typography>
          <Typography variant="caption">
            <TenantsDate
              timezone={Object.keys(tenantsByDomain).length > 0 && tenantsByDomain.timeZone}
              time={question.dateModifiedUtc}
            />
          </Typography>
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
            >
            <MenuItem key={'delete'} onClick={this.changeStatus('delete', true)}>
              <IntlMessages id="content.dropdown.menu.delete" />
            </MenuItem>
            {item.assignment.mandatory ? (
              <MenuItem key={'optional'} onClick={this.changeMandatory(false)}>
                <IntlMessages id="content.dropdown.menu.asOptional" />
              </MenuItem>
            ) : (
              <MenuItem key={'mandatory'} onClick={this.changeMandatory(true)}>
                <IntlMessages id="content.dropdown.menu.asMandatory" />
              </MenuItem>
            )
          }

            {!Boolean(item.active) ? (
              <MenuItem key={'activate'} onClick={this.changeStatus('activate', false)}>
                <IntlMessages id="content.dropdown.menu.activate" />
              </MenuItem>
            ) : (
              <MenuItem key={'deactivate'} onClick={this.changeStatus('deactivate', true)}>
                <IntlMessages id="content.dropdown.menu.deactivate" />
              </MenuItem>
            )}
          </Menu>
        </div>
        <Confirm
          open={this.state.confirm}
          handleClose={this.processStatus}
          type={this.state.action}
        />
      </Grid>
    )
  }
}

export default SortableElement(QuestionCell);
