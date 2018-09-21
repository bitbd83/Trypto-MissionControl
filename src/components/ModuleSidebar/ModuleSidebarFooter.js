import React from 'react';
import Paper from '@material-ui/core/Paper';


class ModuleSidebarFooter extends React.Component {
  render() {
    const { children, styleName} = this.props;
    return (
      <Paper
        elevation={0}
        className={`position-absolute fixed-bottom border-top d-flex px-4 py-3 flex-row align-items-center d-block ${styleName}`}>
          {children}
      </Paper>
    );
  }
}

export default ModuleSidebarFooter;
