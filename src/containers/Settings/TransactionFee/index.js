import React from 'react';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import IntlMessages from 'util/IntlMessages';
import CustomScrollbars from 'util/CustomScrollbars';
import CardBox from 'components/CardBox/index';
import TransactionCell from './components/TransactionCell';
import TransactionForm from './components/TransactionForm';
import { fetchAllTransactionFee, deleteTransactionFee, addTransactionFee } from './actions';
import { resetNewFee } from '../../Fees/actions';
import { Helmet } from 'react-helmet';
import TransactionSidebar from './components/TransactionSidebar'
import IconButton from '@material-ui/core/IconButton';
import FeesForm from '../../Fees/components/FeesForm'

class TransactionFee extends React.Component {

  state = {
    showForm: false,
    showFeeForm: false,
  }

  componentWillReceiveProps = (nextProps) => {
    if(nextProps.refetchList){
      this.getAllTransactionFee();
    }
  }

  componentWillMount = () => {
    this.getAllTransactionFee();
  }

  getAllTransactionFee = () => {
    this.props.fetchAllTransactionFee();
  }

  openTransactionForm = (status) => event => {
    this.setState({showForm: status});
  }

  deleteTransactionFee = (id) => {
    this.props.deleteTransactionFee({data: {ids:[id]}})
  }

  noTransaction = () => (
    <div className="row p-4">
      <CardBox styleName="col-12 text-center" heading={<IntlMessages id="containers.Settings.TransactionFee.label.no_transaction_title" />} childrenStyle="text-center">
        <div>
          <p><IntlMessages id="containers.Settings.TransactionFee.label.no_transaction_description" /></p>
            <Button
              variant="raised"
              className="jr-btn text-white bg-primary"
              onClick={this.openTransactionForm(true)}>
              <span><IntlMessages id="containers.Settings.TransactionFee.btn.add_transactionfee" /></span>
            </Button>
        </div>
      </CardBox>
    </div>
  );


  openCreateFeeForm = status => event => {
    const { newFees } = this.props
    if(status === false && newFees.id){
      const data ={ids: [ newFees.id]}
      this.props.addTransactionFee({ data });
      this.props.resetNewFee();
    }
    this.setState({
      showCreateFeeForm: status,
    });
  };

  listTransaction = (items) => {
    return items.map( (item, index) => (
      <TransactionCell
        item={item}
        index={index}
        key={index}
        tenantsByDomain = {this.props.tenantsByDomain}
        onDelete = {this.deleteTransactionFee}
      />
    ))
  }

  showLoader = () => (
    <div className="d-flex justify-content-center align-items-center animated slideInUpTiny animation-duration-3 mt-3">
      <div className="loader-view">
        <CircularProgress />
      </div>
    </div>
  );

  render() {
    const { isFetching, transaction } = this.props;
    let content = this.showLoader();
    if(!isFetching && transaction) {
      if(transaction.items && transaction.items.length){
        content = this.listTransaction(transaction.items)
      } else {
        content = this.noTransaction()
      }
    }

    return (
      <div className="app-wrapper">
        <div className="app-module animated slideInUpTiny animation-duration-3">
          <div className="app-module-sidenav d-none d-xl-flex">
            <TransactionSidebar
              width={this.props.width}
              addButtonTxt = {<IntlMessages id="containers.Settings.TransactionFee.btn.add_transactionfee"/>}
              addBtnClick = {this.openTransactionForm(true)}
              icon = {<i className="zmdi zmdi-view-subtitles mr-2"></i>}
              openCreateFeeForm = {this.openCreateFeeForm(true)}
            />
          </div>
          <div className="module-box">
            <div className="module-box-header">
              <IconButton className="drawer-btn d-block d-xl-none" aria-label="Menu">
                <i className="zmdi zmdi-menu"/>
              </IconButton>
            </div>
            <div className="module-box-content">
              <div
                className="mb-1 position-relative"
                style={{
                  height: this.props.width >= 1200
                    ? 'calc(100vh - 155px)'
                    : 'calc(100vh - 135px)'
                }}
              >
              <CustomScrollbars className="module-list-scroll scrollbar">
                <Helmet>
                  <title>Transaction Fee</title>
                  <meta name="description" content="Affiliates Description" />
                </Helmet>


                  {content}
              </CustomScrollbars>
              </div>
                </div>
              </div>
            </div>
            <TransactionForm
              showForm={this.state.showForm}
              closeForm={this.openTransactionForm(false)}
            />
            <FeesForm
              match={this.props.match}
              showForm={this.state.showCreateFeeForm}
              closeForm={this.openCreateFeeForm(false)}
              hideCompound={true}
            />
    </div>
    );
  }
}
const mapStateToProps = ({ tenants, settings, transactionfee, fees }) => {
  return {
    isFetching: transactionfee.get('isFetching'),
    width: settings.width,
    actionLoader: transactionfee.get('actionLoader'),
    refetchList: transactionfee.get('refetchList'),
    transaction: transactionfee.get('transactionFee').toJS(),
    newFees: fees.get('newFees').toJS(),
    tenantsByDomain: tenants.tenantsByDomain,
  };
};
export default connect(
  mapStateToProps,
  {
    fetchAllTransactionFee,
    deleteTransactionFee,
    addTransactionFee,
    resetNewFee,
  }
)(TransactionFee);
