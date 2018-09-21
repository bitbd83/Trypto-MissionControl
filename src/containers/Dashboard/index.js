import React from 'react';
import { Helmet } from 'react-helmet';
import RecentOrdersList from './components/RecentOrdersList';
import TopEventsList from './components/TopEventsList';
import Metrics from './components/Metrics';
import IntlMessages from 'util/IntlMessages';


class Dashboard extends React.Component {
  render() {
    return (
      <div className="app-wrapper">
        <Helmet>
          <title>Dashboard</title>
          <meta name="description" content="This is your Dashboard page" />
        </Helmet>
        <Metrics />
        <div className="row">
          <div className="col-lg-7">
            <div className="jr-card">
              <div className="mr-auto">
                <h3 className="d-inline-block mb-0">
                  <span>Recent Orders</span>
                </h3>
              </div>
              <RecentOrdersList />
            </div>
          </div>
          <div className="col-lg-5">
            <div className="jr-card">
              <div className="mr-auto">
                <h3 className="d-inline-block mb-0">
                  <span><IntlMessages id="dashboard.topEvents.title" /></span>
                </h3>
              </div>
              <TopEventsList />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
