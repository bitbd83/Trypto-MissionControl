import React from 'react';
import Checkbox from '@material-ui/core/Checkbox'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu';import MenuItem from '@material-ui/core/MenuItem';
import AddContact from '../../AddContact/index';

class ContactCell extends React.Component {

    onContactOptionSelect = event => {
        this.setState({menuState: true, anchorEl: event.currentTarget});
    };
    handleRequestClose = () => {
        this.setState({menuState: false});
    };
    onContactClose = () => {
        this.setState({addContactState: false});
    };
    onDeleteContact = (contact) => {
        this.setState({addContactState: false});
        this.props.onDeleteContact(contact);
    };
    onEditContact = () => {
        this.setState({menuState: false, addContactState: true});
    };

    constructor() {
        super();
        this.state = {
            anchorEl: undefined,
            menuState: false,
            addContactState: false,
        }
    }

    render() {
        const { contact } = this.props;
        const {menuState, anchorEl} = this.state;
        const {name, email, phone, designation} = contact;

        const options = [
            'Edit',
            'Delete',
        ];
        return (

            <div className="contact-item">
                <div className="col con-inf-mw-100">
                    <p className="mb-0">
                        <span className="text-truncate contact-name">
                            {name}
                        </span>
                        <span className="d-inline-block toolbar-separator">&nbsp;</span>
                        <span className="text-truncate job-title">
                            {designation}
                        </span>
                    </p>

                    <div className="text-muted">
                        <span className="email d-inline-block mr-2">
                            {email},
                        </span>

                            <span className="phone d-inline-block">
                            {phone}
                        </span>
                    </div>
                </div>


                <div className="col-auto px-1 actions d-none d-sm-flex">
                    <IconButton className="size-30" onClick={this.onContactOptionSelect}>
                        <i className="zmdi zmdi-more-vert"/>
                    </IconButton>

                    <Menu id="long-menu"
                          anchorEl={anchorEl}
                          open={menuState}
                          onClose={this.handleRequestClose}

                          MenuListProps={{
                              style: {
                                  width: 100,
                              },
                          }}>
                        {options.map(option =>
                            <MenuItem key={option} onClick={() => {
                                if (option === 'Edit') {
                                    this.onEditContact()
                                } else {
                                    this.handleRequestClose();
                                    this.onDeleteContact(contact)
                                }
                            }
                            }>
                                {option}
                            </MenuItem>,
                        )}
                    </Menu>
                </div>
            </div>
        )
    }
}

export default ContactCell;