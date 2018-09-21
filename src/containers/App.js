import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Header from 'components/Header/index';
import Sidebar from 'containers/SideNav/index';
import Tour from '../components/Tour/index';
import { ABOVE_THE_HEADER, BELOW_THE_HEADER, COLLAPSED_DRAWER, FIXED_DRAWER, HORIZONTAL_NAVIGATION } from 'constants/ActionTypes';
import { isIOS, isMobile } from 'react-device-detect';
import asyncComponent from '../util/asyncComponent';
import TopNav from 'components/TopNav';

class App extends React.Component {
  render() {
    const { match, drawerType, navigationStyle, horizontalNavPosition } = this.props;
    const drawerStyle = drawerType.includes(FIXED_DRAWER) ? 'fixed-drawer' : drawerType.includes(COLLAPSED_DRAWER) ? 'collapsible-drawer' : 'mini-drawer';

    //set default height and overflow for iOS mobile Safari 10+ support.
    if (isIOS && isMobile) {
      document.body.classList.add('ios-mobile-view-height');
    } else if (document.body.classList.contains('ios-mobile-view-height')) {
      document.body.classList.remove('ios-mobile-view-height');
    }

    console.log(navigationStyle, horizontalNavPosition);
    return (
      <Paper elevation={0} className={`app-container ${drawerStyle}`}>
        {/* <Tour /> */}

        <Sidebar />
        <div className="app-main-container">
          <div className={`app-header ${navigationStyle === HORIZONTAL_NAVIGATION ? 'app-header-horizontal' : ''}`}>
            {navigationStyle === HORIZONTAL_NAVIGATION && horizontalNavPosition === ABOVE_THE_HEADER && <TopNav styleName="app-top-header" />}
            <Header />
            {navigationStyle === HORIZONTAL_NAVIGATION && horizontalNavPosition === BELOW_THE_HEADER && <TopNav />}
          </div>

          <main className="app-main-content-wrapper">
            <div className="app-main-content">
              <Switch>
                <Route path={`${match.url}/dashboard`} component={asyncComponent(() => import('./Dashboard'))} />
                <Route path={`${match.url}/events/:eventId/ticket-types`} component={asyncComponent(() => import('./TicketTypes'))} />
                <Route path={`${match.url}/events`} component={asyncComponent(() => import('./Events'))} />
                <Route path={`${match.url}/discounts`} component={asyncComponent(() => import('./DiscountCodes'))} />
                <Route path={`${match.url}/venues`} component={asyncComponent(() => import('./Venues'))} />
                <Route path={`${match.url}/hotels`} component={asyncComponent(() => import('./Hotels'))} />
                <Route path={`${match.url}/taxes/tax-rates/:id`} component={asyncComponent(() => import('./Taxes/TaxRate'))} />
                <Route path={`${match.url}/taxes`} component={asyncComponent(() => import('./Taxes'))} />
                <Route path={`${match.url}/fees`} component={asyncComponent(() => import('./Fees'))} />
                <Route path={`${match.url}/questions`} component={asyncComponent(() => import('./Questions/QuestionsDashboard/QuestionDashboardPage'))} />
                <Route path={`${match.url}/settings`} component={asyncComponent(() => import('./Settings'))} />
                <Route path={`${match.url}/affiliates/:affiliateId`} component={asyncComponent(() => import('./Affiliates/components/TrackingCodes'))} />
                <Route path={`${match.url}/affiliates`} component={asyncComponent(() => import('./Affiliates'))} />
                <Route path={`${match.url}/orders/:orderId`} component={asyncComponent(() => import('./Orders/components/OrderInfo'))} />
                <Route path={`${match.url}/orders`} component={asyncComponent(() => import('./Orders'))} />
                <Route component={asyncComponent(() => import('components/Error404'))} />
              </Switch>
            </div>
          </main>
        </div>
      </Paper>
    );
  }
}

const mapStateToProps = ({ settings }) => {
  const { drawerType, navigationStyle, horizontalNavPosition } = settings;
  return { drawerType, navigationStyle, horizontalNavPosition };
};
export default withRouter(connect(mapStateToProps)(App));
