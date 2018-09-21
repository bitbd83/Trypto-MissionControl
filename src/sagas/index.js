import { all } from 'redux-saga/effects';
import authSagas from './Auth';
import tenantsSagas from './Tenants';
import venuesSagas from '../containers/Venues/saga';
import eventsdashboardSagas from '../containers/Events/EventsDashboard/saga';
import createaneventSagas from '../containers/Events/CreateAnEvent/saga';
import eventoptionsSagas from '../containers/Events/EventOptions/saga';
import eventdescriptionsSagas from '../containers/Events/EventDescriptions/saga';
import eventmultimediaSagas from '../containers/Events/EventMultimedia/saga';
import eventreportsSagas from '../containers/Events/Reports/saga';
import questionsSagas from '../containers/Questions/QuestionsDashboard/saga';
import questionsSectionSagas from '../containers/QuestionsSections/QuestionsSectionDashboard/saga';
import geographySagas from './Geography';
import currencies from './Currency';
import feeSaga from '../containers/Fees/saga';
import taxRates from '../containers/Taxes/TaxRate/saga';
import taxGroup from '../containers/Taxes/TaxGroup/saga';
import ticketTypes from '../containers/TicketTypes/saga';
import inventory from '../containers/Inventory/saga';
import paymentprocessorsSagas from '../containers/Settings/PaymentProcessors/saga';
import hotels from '../containers/Hotels/saga';
import tenantsettingsSagas from '../containers/Settings/TenantSettings/saga';
import hotelRoomTypes from '../containers/Hotels/HotelDetail/RoomTypes/saga';
import hotelSurcharges from '../containers/Hotels/HotelDetail/Surcharges/saga';
import affiliates from '../containers/Affiliates/saga';
import orders from '../containers/Orders/saga';
import discountCodes from '../containers/DiscountCodes/saga';
import transactionFee from '../containers/Settings/TransactionFee/saga';
import eventQuestions from '../containers/Events/EventQuestions/saga';
import ticketQuestions from '../containers/TicketTypes/TicketQuestions/saga';
import sells from '../containers/TicketTypes/Sells/saga';
import dashboard from '../containers/Dashboard/saga';
import siteAdmins from '../containers/Settings/SiteAdmins/saga';



export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    tenantsSagas(),
    venuesSagas(),
    eventsdashboardSagas(),
    createaneventSagas(),
    eventoptionsSagas(),
    eventdescriptionsSagas(),
    eventmultimediaSagas(),
    eventreportsSagas(),
    questionsSagas(),
    questionsSectionSagas(),
    taxRates(),
    taxGroup(),
    geographySagas(),
    feeSaga(),
    ticketTypes(),
    inventory(),
    paymentprocessorsSagas(),
    hotels(),
    currencies(),
    tenantsettingsSagas(),
    hotelRoomTypes(),
    hotelSurcharges(),
    affiliates(),
    orders(),
    discountCodes(),
    transactionFee(),
    eventQuestions(),
    ticketQuestions(),
    sells(),
    dashboard(),
    siteAdmins(),
  ]);
}
