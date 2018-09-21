import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Typography from '@material-ui/core/Typography';
import IntlMessages from 'util/IntlMessages';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from 'react-redux';
import { putQuestion } from '../../actions'
import TenantsDate from 'components/Tenants/TenantsDate';
import { Badge } from 'reactstrap'
import Confirm from '../../../../../components/Dialogs/Confirm'


const ITEM_HEIGHT = 48;

class QuestionsList extends React.Component {
  state = {
      expanded: false,
      anchorEl: null,
      confirm: false,
      action: null,
    };

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  editQuestion = () => {
    this.handleClose();
    this.props.editQuestion();
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


  render() {
    const { item, actionLoader, puActionId, index, tenantsByDomain } = this.props;
    const { anchorEl } = this.state;
    return (
    <div className="contact-item py-3">
      <div className="col text-truncate">
        <Typography variant="subheading" className="text-truncate">
          {item.fieldTitle}
        </Typography>
        <Typography variant="caption">
          {item.description}
        </Typography>
      </div>


      <div className="col d-flex justify-content-center">
        {item.fieldType === 'Select' ? item.selectField && item.selectField.allowMultipleSelections ?
            <Badge color="success" className={"text-uppercase mb-0 d-block"}><IntlMessages id="content.status.multiChoice" /></Badge>
            : <Badge color="success" className={"text-uppercase mb-0 d-block"}><IntlMessages id="content.status.singleChoice" /></Badge>
          : <Badge color="success" className={"text-uppercase mb-0 d-block"}>{item.fieldType}</Badge>}

      </div>

      <div className="px-0 d-none d-md-flex flex-column mr-4">
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
        {item.isArchived && (
            <Badge color="danger" className={"text-uppercase mb-0 d-block"}><IntlMessages id="content.status.archive" /></Badge>
          )
        }
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
          {item.isArchived ?
             (
              <MenuItem onClick={this.changeStatus('restore', false)}>
                  <IntlMessages id="pages.feesPage.feesCell.restore" />
                </MenuItem>
              ) : [
                <MenuItem  onClick={this.editQuestion}>
                  <IntlMessages id="pages.feesPage.feesCell.edit" />
                </MenuItem>,
                <MenuItem onClick={this.changeStatus('archive', true)}>
                  <IntlMessages id="pages.feesPage.feesCell.archive" />
                </MenuItem>
              ]
          }
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

const mapStateToProps = ({ questions, tenants }) => {
  return { actionLoader: questions.get('actionLoader'),
            tenantsByDomain: tenants.tenantsByDomain, };
};

export default
  connect(
    mapStateToProps,
    {  putQuestion },
  )(QuestionsList);
