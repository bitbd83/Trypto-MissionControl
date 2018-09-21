import React from 'react'
import CustomScrollbars from 'util/CustomScrollbars';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import IntlMessages from 'util/IntlMessages';

class TransactionSidebar extends React.Component {
  render() {
    const { icon, backLink=false } = this.props;

    return (
      <div className="module-side">
        <div className="module-side-header">
          <div className="module-logo">
            {icon && icon}
            <span><IntlMessages id="sidebar.settings.transactionfee" /></span>
          </div>
        </div>

        <div className="module-side-content hotel-sidenav-content">
          <CustomScrollbars
            className="module-side-scroll scrollbar"
            style={{
            height: this.props.width >= 1200
              ? `calc(100vh - ${backLink ? '210px': '150px' })`
              : `calc(100vh - ${backLink ? '190px': '130px' })`
          }}>
            <div className="module-add-task">
              <Button
                onClick={this.props.addBtnClick}
                className="btn-block mb-2"
                variant="raised"
                size={'small'}
                aria-label="add new"
                color="primary">
                <AddIcon className="mr-3"/>
                  <IntlMessages id="pages.ticketTypesPage.feesAndTaxes.btn.add_existing_fee" />
              </Button>
              <Button
                onClick={this.props.openCreateFeeForm}
                className="btn-block mb-2"
                variant="raised"
                size={'small'}
                aria-label="add new"
                color="primary">
                <AddIcon className="mr-3"/>
                  <IntlMessages id="pages.ticketTypesPage.feesAndTaxes.btn.add_new_fee" />
              </Button>
            </div>
          </CustomScrollbars>
        </div>
      </div>
    )
  }
}

export default TransactionSidebar;
