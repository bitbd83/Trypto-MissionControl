import React, {Component} from 'react';
import {connect} from 'react-redux';
import IntlMessages from 'util/IntlMessages';
import Button from '@material-ui/core/Button';
import CardBox from 'components/CardBox';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import SurchargeForm from './SurchargeForm'
import Loader from 'components/Loader';
import SurchargeCell from './SurchargeCell';
import InlinePagination from 'components/Pagination/InlinePagination'
import {
  fetchSurcharges,
  putSurcharge
} from './actions';



class Surcharges extends Component {
  constructor(props) {
    super();
    this.state = {
      rowsPerPage: 5,
      page: 0,
      edit: false,
      editData: {},
      archived: false,
      showForm: false,
    }
  }

  handleChangePage = page => {
    this.setState({ page },
    () => this.getAllSurcharges());
  }

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value },
      () => this.getAllSurcharges());
  };

  componentWillReceiveProps = (nextProps) => {
    if(nextProps.refetchList || nextProps.newSurchargeId){
      this.getAllSurcharges();
    }
  }

  componentWillMount(){
    this.getAllSurcharges();
  }

  getAllSurcharges = (reset = false) => {
    const { page, rowsPerPage, archived } = this.state;
    const { tenantsByDomain, hotelInventory } = this.props
    let skip = page * rowsPerPage;
    let take = rowsPerPage;
    if(reset){
      skip = 0;
      take = rowsPerPage;
    }
    this.props.fetchSurcharges({
      tenantId: tenantsByDomain.id,
      hotelInventoryId: hotelInventory.id,
      skip,
      take,
      archived
    });
  };

  openSurchargeForm = status => event => {
    this.setState({ showForm: status, edit: false, editData: {} });
  };
  openEditSurchargeForm = editData => {
    this.setState({ showForm: true, edit: true, editData });
  };

  changeStatus = (action, surchargeId) => {
    const { tenantsByDomain, hotelInventory } = this.props
    this.props.putSurcharge({
      action,
      surchargeId,
      tenantId: tenantsByDomain.id,
      hotelInventoryId: hotelInventory.id
    });
  };


  noSurcharges = () => (
    <div className="row">
      <CardBox styleName="col-12 text-center" heading={<IntlMessages id="containers.Hotels.HotelDetails.noTaxes.heading" />} childrenStyle="text-center">
        <div>
          <p>{<IntlMessages id="containers.Hotels.HotelDetails.noTaxes.description" />}</p>
          <Button variant="raised" className="jr-btn text-white bg-primary" onClick={this.openSurchargeForm(true)}>
            <span>
              <IntlMessages id="containers.Hotels.HotelDetails.noTaxes.btnText" />
            </span>
          </Button>
        </div>
      </CardBox>
    </div>
  );

  chargeList = (chargesData) => {
    const { tenantsByDomain, hotelInventory } = this.props
    return chargesData.map((item, index) => {
      return (
        <SurchargeCell
          key={index}
          item={item}
          onChangeStatus={this.changeStatus}
          tenantsByDomain={tenantsByDomain}
          hotelInventory={hotelInventory}
          onEdit={this.openEditSurchargeForm}
        />
      );
    })
  }


  render() {
    const { isFetching, surchargeList, hotelInventory, tenantsByDomain } = this.props;
    let content = '';
    if(isFetching){
      content = <Loader />;
    }
    else{
      if(surchargeList.items.length > 0){
        content = (
          <React.Fragment>
            <Paper elevation={1}>
              {this.chargeList(surchargeList.items)}
            </Paper>
            <InlinePagination
              colspan={3}
              totalPages = {surchargeList.totalPages}
              count={surchargeList.totalCount}
              rowsPerPage={this.state.rowsPerPage}
              page={this.state.page}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
              name={<IntlMessages id="containers.Hotels.HotelDetails.taxes.heading" />}
            />
          </React.Fragment>
        );
      } else{
        content = this.noSurcharges();
      }
    }


    return (
      <React.Fragment>
        <div className="d-flex justify-content-between align-items-center w-100">
          <Typography variant={'title'}>
            <IntlMessages id="containers.Hotels.HotelDetails.taxes.heading" />
          </Typography>
          {surchargeList.items.length > 0 &&  (
            <div>
              <Button variant="raised" className="jr-btn text-white bg-primary mr-4" onClick={this.openSurchargeForm(true)}>
                <span>
                  <IntlMessages id="containers.Hotels.HotelDetails.noTaxes.btnText" />
                </span>
              </Button>
            </div>
          )}
        </div>
        <div className={'app-wrapper'}>
          {content}
          <SurchargeForm
            showForm={this.state.showForm}
            closeForm={this.openSurchargeForm(false)}
            hotelInventory={hotelInventory}
            tenantsByDomain={tenantsByDomain}
            edit={this.state.edit}
            editData={this.state.editData}
          />
        </div>
      </React.Fragment>
    )
  }
}
const mapStateToProps = ({ tenants, hotelSurcharges }) => {
  return {
    tenantsByDomain: tenants.tenantsByDomain,
    isFetching: hotelSurcharges.get("isFetching"),
    refetchList: hotelSurcharges.get("refetchList"),
    newSurchargeId: hotelSurcharges.get("newSurchargeId"),
    surchargeList: hotelSurcharges.get("surchargeList").toJS()
  };
}

export default connect(mapStateToProps, {
  fetchSurcharges,
  putSurcharge
})(Surcharges);
