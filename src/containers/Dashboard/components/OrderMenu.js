import React from 'react';
import Menu from '@material-ui/core/Menu';import MenuItem from '@material-ui/core/MenuItem';
import IntlMessages from 'util/IntlMessages';

class OrderMenu extends React.Component {

    render() {

        const options = [
            <IntlMessages id="popup.details"/>,
        ];
        const {menuState, anchorEl, handleRequestClose} = this.props;
        return (
            <Menu id="long-menu"
                  anchorEl={anchorEl}
                  open={menuState}
                  onClose={handleRequestClose}

                  MenuListProps={{
                      style: {
                          width: 150,
                          paddingTop: 0,
                          paddingBottom: 0
                      },
                  }}>
                {options.map(option =>
                    <MenuItem key={option} onClick={handleRequestClose}>
                        {option}
                    </MenuItem>,
                )}
            </Menu>
        );
    }

}

export default OrderMenu;