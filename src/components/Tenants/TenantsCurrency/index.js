import React from 'react';

const TenantsCurrency = ({ ...props }) => {
  return <div>{props.currency.symbol}</div>;
};

export default TenantsCurrency;
