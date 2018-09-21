import React from 'react';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from 'react-redux';
import { putQuestionSection } from '../../actions'
import CircularProgress from '@material-ui/core/CircularProgress';


const ITEM_HEIGHT = 48;

class QuestionsSectionList extends React.Component {
  state = { expanded: false, anchorEl: null};

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  editQuestionSection = () => {
    this.handleClose();
    this.props.editQuestion();
  }

  putQuestionSection = (action, sectionId) => {
    this.handleClose();
    this.props.activePutId(sectionId);
    this.props.putQuestionSection({action, sectionId});
  }

  render() {
    const { item, actionLoader, puActionId } = this.props;
    const { anchorEl } = this.state;
    return (
      <div>
        <Card key={item.id} className="d-flex flex-row">
            <div className="d-flex col-12 flex-row align-items-center justify-content-between  px-0">
              <CardContent className="col-5">
                <Typography variant="title">{item.name}</Typography>
                <Typography variant="subheading" color="textSecondary">
                  {item.description}
                </Typography>
              </CardContent>
              <CardContent className="col-4 d-flex justify-content-center">
              {(actionLoader && puActionId === item.id) ? <CircularProgress size={20}/> : (item.isArchived && <Typography className="text-danger" variant="subheading">Archived</Typography>)}
              
              </CardContent>
              <CardContent className="col-3 d-flex justify-content-end">
                <IconButton
                  aria-label="More"
                  aria-owns={anchorEl ? 'action-menu' : null}
                  aria-haspopup="true"
                  onClick={this.handleClick}
                >
                  <MoreVertIcon/>
                </IconButton>
              </CardContent>
            </div>
        <Menu
          id="action-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: 200,
            },
          }}
        >
          <MenuItem onClick={this.editQuestionSection}>Edit</MenuItem>
          {item.isArchived ? <MenuItem onClick={() => this.putQuestionSection('restore', item.id)}>Restore</MenuItem> 
            : 
          <MenuItem onClick={() => this.putQuestionSection('archive', item.id)}>Archive</MenuItem>}
         
        </Menu>

          </Card>
    </div>
    );
  }
}
// export default QuestionsList;

const mapStateToProps = ({ questions }) => {
  return { actionLoader: questions.get('actionLoader') };
};

export default 
  connect(
    mapStateToProps,
    { putQuestionSection },
  )(QuestionsSectionList);

