import React from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


class FormDrawerHeader extends React.Component {
  render() {
    const {closeClick, children, styleName} = this.props;
    return (
      <div className="sticky-top">
        <Paper elevation={1} square={true} className={`d-flex p-3 justify-content-between align-items-center ${styleName}`}>
        <Typography variant="headline">{children}</Typography>
        <Button onClick={closeClick} className="jr-btn">
          <i className="zmdi zmdi-close zmdi-hc-lg" />
        </Button>
        </Paper>
      </div>

    );
  }
}

export default FormDrawerHeader;
