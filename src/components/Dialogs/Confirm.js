import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import IntlMessages from 'util/IntlMessages';

// function Transition(props) {
//   return <Slide direction="up" {...props} />;
// }

class Confirm extends React.Component {
  render() {
    const { open, handleClose, type} = this.props;
    return (
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose(false)}
        onBackdropClick={() => false}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          <IntlMessages id="components.dialog.confirm.heading"/>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          {type && (
            <IntlMessages id={`components.dialog.confirm.description.${type}`} />
          ) }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button  onClick={handleClose(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleClose(true)} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default Confirm;
