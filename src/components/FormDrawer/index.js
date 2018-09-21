import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import { withStyles } from '@material-ui/core/styles';


class FormDrawer extends React.Component {
  render() {
    const {open, children, classes, width } = this.props;
    return (
      <Drawer
        anchor="right"
        open={open}
        classes={{
          paper: width !== 'large' ? classes.formDrawer : classes.largeWidth,
        }}
      >
        <div className="app-main-content-wrapper">
          <div className="app-main-content">
            {children}
          </div>
        </div>
      </Drawer>
    );
  }
}

const styles = {
  formDrawer: {
    width: window.innerWidth < 700 ? '100%' : '50%',
  },
  largeWidth: {
    width: window.innerWidth < 700 ? '100%' : '65%',
  }
};


export default withStyles(styles)(FormDrawer);
