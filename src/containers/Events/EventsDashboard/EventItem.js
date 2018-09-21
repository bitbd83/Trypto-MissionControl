import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Badge } from 'reactstrap'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import IntlMessages from 'util/IntlMessages';
import _ from "lodash";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import StarIcon from '@material-ui/icons/StarRounded';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { connect } from 'react-redux';
import Confirm from '../../../components/Dialogs/Confirm'

const ITEM_HEIGHT = 48;

const styles = theme => ({
  card: {
    maxWidth: 400,
  },
  media: {
    height: 180,
  },
  star: {
    color: "#FFFF00",
    position: 'absolute',
    top: 5,
    left: 5
  }
});

class EventItem extends React.Component {
  state={
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
    const { item, classes, type } = this.props;
    const { anchorEl } = this.state;
    let path = this.context.router.route.match.path;

    let imageSrc = "http://via.placeholder.com/300x200";
    if(_.has(item, 'heroImage')){
      imageSrc = item.heroImage;
    }

    return (
      <Grid xs={12} sm={4} md={3} lg={3} xl={2}  item key={item.id}>
        <Paper className={`card d-flex flex-column h-100 ${classes.card}`}>
          {item.isFeatured && <StarIcon className={classes.star} />}
          <img className={`card-img-top  ${classes.media}`} src={imageSrc} alt="Card image cap" />
          <div className="d-flex justify-content-between pl-3 pb-0">
            {type === 'onSale' ? <Typography variant="subheading" className={'my-1 pt-2'} component={Link} to={`${path}/${item.id}/reports`}>
              {item.title}
            </Typography> :
            <Typography variant="subheading" className={'my-1 pt-2'} component={Link} to={`${path}/${item.id}/options`}>
              {item.title}
            </Typography> }

              <IconButton
                aria-label="More"
                aria-owns={anchorEl ? 'long-menu' : null}
                aria-haspopup="true"
                onClick={this.handleClick}
              >
                <i className="zmdi zmdi-more-vert"/>
              </IconButton>

          </div>
          <div className="card-footer bg-transparent p-1 pl-3 border-0 mt-auto d-flex align-items-center">
          {item.onSale && (<Badge color="success" className={"text-uppercase"}>On Sale</Badge>)}
            {item.isArchived && (
              <Badge color="danger" className={"text-uppercase"}><IntlMessages id="content.status.archive" /></Badge>
            )}
            <Button variant="raised" component={Link} to={`${path}/${item.id}/options`} className="jr-btn bg-white text-black ml-auto">
              <i className="zmdi zmdi-arrow-right-top" />
            </Button>
          </div>
        </Paper>
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
          {type === 'past' ? <MenuItem key={'reports'} component={Link} to={`${path}/${item.id}/reports`}>
            <IntlMessages id="content.dropdown.menu.reports"/>
            </MenuItem> : ''}
          {type === 'onSale' ? <MenuItem key={'manage'} component={Link} to={`${path}/${item.id}/options`}>
            <IntlMessages id="content.dropdown.menu.manage"/>
            </MenuItem> : ''}
          {!item.onSale ? (
            <MenuItem key={'onSale'} onClick={this.changeStatus('on-sale', false)}>
              <IntlMessages id="content.dropdown.menu.onSale"/>
            </MenuItem>
            ):(
              <MenuItem key={'offSale'} onClick={this.changeStatus('off-sale', true)}>
                <IntlMessages id="content.dropdown.menu.offSale"/>
              </MenuItem>
          )}
          {item.hidden ? (
            <MenuItem key={'show'} onClick={this.changeStatus('show', false)}>
              <IntlMessages id="content.dropdown.menu.publish"/>
            </MenuItem>
            ):(
            <MenuItem key={'hide'} onClick={this.changeStatus('hide', true)}>
              <IntlMessages id="content.dropdown.menu.unpublish"/>
            </MenuItem>
          )}
          {item.isFeatured ? (
            <MenuItem key={'unfeature'} onClick={this.changeStatus('not-featured', true)}>
              <IntlMessages id="content.dropdown.menu.removeFeatured"/>
            </MenuItem>
            ):(
            <MenuItem key={'feature'} onClick={this.changeStatus('featured', false)}>
              <IntlMessages id="content.dropdown.menu.featureEvent"/>
            </MenuItem>
          )}
        </Menu>
        <Confirm
          open={this.state.confirm}
          handleClose={this.processStatus}
          type={this.state.action}
        />
      </Grid>
    );
  }
}

EventItem.contextTypes = {
  router: PropTypes.object.isRequired
};

EventItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EventItem);
