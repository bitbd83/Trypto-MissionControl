import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as oidcReducer } from 'redux-oidc';
import Settings from './Settings';
import Auth from './Auth';
import TaxGroup from '../containers/Taxes/TaxGroup/reducer';
import TaxRate from '../containers/Taxes/TaxRate/reducer';
import Fees from '../containers/Fees/reducer';
import Tenants from './Tenants';
import Venues from '../containers/Venues/reducer';
import EventsDashboard from '../containers/Events/EventsDashboard/reducer';
import CreateAnEvent from '../containers/Events/CreateAnEvent/reducer';
import EventOptions from '../containers/Events/EventOptions/reducer';
import EventDescriptions from '../containers/Events/EventDescriptions/reducer';
import EventMultimedia from '../containers/Events/EventMultimedia/reducer';
import EventReports from '../containers/Events/Reports/reducer';
import Questions from '../containers/Questions/QuestionsDashboard/reducers';
import QuestionSection from '../containers/QuestionsSections/QuestionsSectionDashboard/reducers';
import Geography from './Geography';
import TicketTypes from '../containers/TicketTypes/reducers';
import Inventory from '../containers/Inventory/reducers';
import PaymentProcessors from '../containers/Settings/PaymentProcessors/reducer';
import Hotels from '../containers/Hotels/reducers';
import Currencies from './Currency';
import TenantSettings from '../containers/Settings/TenantSettings/reducer';
import HotelRoomTypes from '../containers/Hotels/HotelDetail/RoomTypes/reducers';
import HotelSurcharges from '../containers/Hotels/HotelDetail/Surcharges/reducers';
import Affiliates from '../containers/Affiliates/reducer';
import Orders from '../containers/Orders/reducer';
import DiscountCodes from '../containers/DiscountCodes/reducer';
import TransactionFee from '../containers/Settings/TransactionFee/reducer';
import eventQuestions from '../containers/Events/EventQuestions/reducer';
import ticketQuestions from '../containers/TicketTypes/TicketQuestions/reducer';
import sells from '../containers/TicketTypes/Sells/reducers';
import dashboard from '../containers/Dashboard/reducers';
import siteadmins from '../containers/Settings/SiteAdmins/reducer';


const reducers = combineReducers({
  routing: routerReducer,
  oidc: oidcReducer,
  settings: Settings,
  auth: Auth,
  taxes: TaxGroup,
  taxRate: TaxRate,
  fees: Fees,
  tenants: Tenants,
  venues: Venues,
  eventsdashboard: EventsDashboard,
  createanevent: CreateAnEvent,
  eventoptions: EventOptions,
  eventdescriptions: EventDescriptions,
  eventmultimedia: EventMultimedia,
  eventreports: EventReports,
  questions: Questions,
  questionsSection: QuestionSection,
  geography: Geography,
  ticketTypes: TicketTypes,
  inventory: Inventory,
  paymentprocessors: PaymentProcessors,
  hotels: Hotels,
  currency: Currencies,
  tenantsettings: TenantSettings,
  hotelRoomTypes: HotelRoomTypes,
  hotelSurcharges: HotelSurcharges,
  affiliates: Affiliates,
  orders: Orders,
  discountCodes: DiscountCodes,
  transactionfee: TransactionFee,
  eventQuestions: eventQuestions,
  ticketQuestions: ticketQuestions,
  sells: sells,
  dashboard: dashboard,
  siteadmins: siteadmins,
});

export default reducers;
