/**
 *
 * Dashboard
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import TaxGroup from './TaxGroup';

/* eslint-disable react/prefer-stateless-function */
class Taxes extends React.Component {
  constructor() {
    super();
  }

  render() {
    const { tenantsByDomain } = this.props;
    return (
      <div className="app-wrapper">
        <Helmet>
          <title>Taxes</title>
          <meta name="description" content="Taxes Description" />
        </Helmet>

        <TaxGroup {...this.props} />

      </div>
    );
  }
}

const mapStateToProps = ({ tenants }) => {
  const { tenantsByDomain } = tenants;
  return { tenantsByDomain };
};

export default connect(mapStateToProps)(Taxes);
