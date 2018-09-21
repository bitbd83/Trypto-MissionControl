import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import IntlMessages from 'utils/IntlMessages';


class ModuleSidebar extends React.Component {
  render() {
    const {open, children, classes } = this.props;
    return (
      <div className="module-side">
          <div className="module-side-header">
              <div className="module-logo">
                  <i className="zmdi zmdi-bed mr-4"/>
                  <span><IntlMessages id="pages.hotelsInventory.label.title"/></span>
              </div>
          </div>

          <div className="module-side-content">
              <CustomScrollbars className="module-side-scroll scrollbar"
                              style={{height: this.props.width >= 1200 ? 'calc(100vh - 150px)' : 'calc(100vh - 130px)'}}>
                  <div className="module-add-task">
                      adasd
                  </div>
              </CustomScrollbars>
          </div>
      </div>
    );
  }
}

export default ModuleSidebar;
