import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Badge} from 'reactstrap';
import IntlMessages from 'util/IntlMessages';
import Typography from '@material-ui/core/Typography';
import TenantsDate from 'components/Tenants/TenantsDate';
import TenantsCurrencyVal from '../../../../components/Tenants/Currency';
import DeleteIcon from '@material-ui/icons/Delete';

class TransactionCell extends React.Component {

  showLoader = () => (
    <div className="d-flex justify-content-center align-items-center animated slideInUpTiny animation-duration-3">
      <div className="loader-view">
        <CircularProgress size={24} />
      </div>
    </div>
  );

  structureFee = (fee, usefactor = false) => {
    if(!fee && fee !== 0) {
      return false;
    }
    if(!usefactor & fee === 0) {
      return 0;
    }

    const { item, tenantsByDomain } = this.props;
    if(item.feeCriteria.strategy.factor === 'Flat' || !usefactor){
      return (
        <TenantsCurrencyVal data={tenantsByDomain} value={fee} key={fee}/>
      )
    } else {
      return fee + "%";
    }
  }

  render() {
    const { index, item, tenantsByDomain } = this.props;

    let minFee = this.structureFee(item.feeCriteria.minAmount);
    let maxFee = this.structureFee(item.feeCriteria.maxAmount);
    let rate = this.structureFee(item.feeCriteria.strategy.amount, true);
    let ratedata= [];
    if(minFee){
      ratedata.push('Min: ', minFee);
    }
    if(maxFee){
      if(minFee)
        ratedata.push(' | ');

      ratedata.push('Max: ', maxFee);
    }

    if(ratedata.length){
      ratedata = ['( ',...ratedata ,' )'];
    }

    return (
          <div key={item.id} className="contact-item py-3">
            <div className="col text-truncate">
              <Typography variant="subheading" className="text-truncate">
                {item.name}
              </Typography>
            </div>

            <div className="col-sm-3 px-0 d-none d-md-flex flex-column">
              <Typography variant="subheading">
                <IntlMessages id="pages.feesPage.feesForm.feeCriteria_label" />
              </Typography>
              <Typography variant="caption">
                {rate} {ratedata}
              </Typography>
            </div>

            <div className="col-sm-3 px-0 d-none d-md-flex flex-column">
              <Typography variant="subheading">
                <IntlMessages id="list.heading.lastChanged" />
              </Typography>
              <Typography variant="caption">
                <TenantsDate
                  timezone={Object.keys(tenantsByDomain).length > 0 && tenantsByDomain.timeZone}
                  time={item.dateModifiedUtc}
                />
              </Typography>
            </div>

            <div className="col-auto px-1 actions d-none d-sm-flex">
              <IconButton className="size-30" onClick={() => this.props.onDelete(item.id)}>
                <DeleteIcon />
              </IconButton>
            </div>
          </div>
          );
        }
      }

export default TransactionCell;
