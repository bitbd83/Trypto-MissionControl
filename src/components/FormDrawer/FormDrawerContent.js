import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CustomScrollbars from 'util/CustomScrollbars';

class FormDrawerContent extends React.Component {
  render() {
    const { children, styleName, noFooter = false} = this.props;
    let usedHeight = noFooter ? 70 : 140;

    return (
      <CustomScrollbars
        className="module-side-scroll scrollbar"
        style={{
          height: this.props.width >= 1200
          ? `calc(100vh - ${usedHeight}px)`
          : `calc(100vh - ${usedHeight}px)`
        }}>

        <div className={`app-wrapper ${styleName}`}>
          {children}
        </div>
      </CustomScrollbars>
    );
  }
}


const styles = {
  formDrawer: {
    width: '50%',
  },
  largeWidth: {
    width: '65%',
  }
};


export default withStyles(styles)(FormDrawerContent);
