import React from 'react';

class ModuleSidebarContent extends React.Component {
  render() {
    const { children, styleName} = this.props;
    return (
      <div className={`app-wrapper ${styleName}`}>
        {children}
      </div>
    );
  }
}

export default ModuleSidebarContent;
