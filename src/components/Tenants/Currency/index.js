import React from 'react';

const TenantsCurrencyVal = ({ data, showNA = false, value = 0, code=false }) => {
  if(Object.keys(data).length === 0) {
    return '';
  }
  let curCode = code ? code : data.currency.code;

  let currenyObj = new Intl.NumberFormat(data.locale, { style: 'currency', currency: curCode });

  if(value){
    return currenyObj.format(value);
  }
  return <React.Fragment>{showNA ? 'N/A' : data.currency.symbol + 0}</React.Fragment>;
};

export default TenantsCurrencyVal;
