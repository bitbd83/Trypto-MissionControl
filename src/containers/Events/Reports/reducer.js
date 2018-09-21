import { fromJS, merge } from 'immutable';
import {
  FETCH_TICKET_SALES_REPORT,
  FETCH_TICKET_SALES_REPORT_SUCCESS,
  FETCH_TICKET_SALES_REPORT_FAILURE,
  FETCH_HOTELS_REPORT,
  FETCH_HOTELS_REPORT_SUCCESS,
  FETCH_HOTELS_REPORT_FAILURE,
  FETCH_AFFILIATE_REPORT,
  FETCH_AFFILIATE_REPORT_SUCCESS,
  FETCH_AFFILIATE_REPORT_FAILURE,
  FETCH_DISCOUNT_CODE_REPORT,
  FETCH_DISCOUNT_CODE_REPORT_SUCCESS,
  FETCH_DISCOUNT_CODE_REPORT_FAILURE,
  FETCH_TICKET_SALES_GRAPH,
  FETCH_TICKET_SALES_GRAPH_SUCCESS,
  FETCH_TICKET_SALES_GRAPH_FAILURE,
  FETCH_HOTEL_SALES_GRAPH,
  FETCH_HOTEL_SALES_GRAPH_SUCCESS,
  FETCH_HOTEL_SALES_GRAPH_FAILURE,
 } from './constants';

const INIT_STATE = fromJS({
  isFetchingTicket: false,
  isFetchingHotel: false,
  isFetchingAffiliate: false,
  isFetchingDiscountCode: false,
  isFetchingTicketGraph: false,
  isFetchingHotelGraph: false,
  actionLoader: false,
  refetchAffiliateList: false,
 ticketReport:[],
 hotelReport:[],
 affiliateReport:[],
 discountCodeReport:[],
 ticketGraph: {},
 hotelGraph: {},
});

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_TICKET_SALES_REPORT: {
      return state
        .set('isFetchingTicket', true);
    }
    case FETCH_TICKET_SALES_REPORT_SUCCESS: {
      return state
        .set('isFetchingTicket', false)
        .set('refetchTicketList', false)
        .set('ticketReport', fromJS(action.payload));
    }
    case FETCH_TICKET_SALES_REPORT_FAILURE: {
      return state
        .set('isFetchingTicket', false)
        .set('refetchTicketList', false)
    }

    case FETCH_HOTELS_REPORT: {
      return state
        .set('isFetchingHotel', true);
    }
    case FETCH_HOTELS_REPORT_SUCCESS: {
      return state
        .set('isFetchingHotel', false)
        .set('refetchHotelList', false)
        .set('hotelReport', fromJS(action.payload));
    }
    case FETCH_HOTELS_REPORT_FAILURE: {
      return state
        .set('isFetchingHotel', false)
        .set('refetchHotelList', false)
    }

    case FETCH_AFFILIATE_REPORT: {
      return state
        .set('isFetchingAffiliate', true);
    }
    case FETCH_AFFILIATE_REPORT_SUCCESS: {
      return state
        .set('isFetchingAffiliate', false)
        .set('refetchAffiliateList', false)
        .set('affiliateReport', fromJS(action.payload));
    }
    case FETCH_AFFILIATE_REPORT_FAILURE: {
      return state
        .set('isFetchingAffiliate', false)
        .set('refetchAffiliateList', false)
    }

    case FETCH_DISCOUNT_CODE_REPORT: {
      return state
        .set('isFetchingDiscountCode', true);
    }
    case FETCH_DISCOUNT_CODE_REPORT_SUCCESS: {
      return state
        .set('isFetchingDiscountCode', false)
        .set('discountCodeReport', fromJS(action.payload));
    }
    case FETCH_DISCOUNT_CODE_REPORT_FAILURE: {
      return state
        .set('isFetchingDiscountCode', false)
    }

    case FETCH_TICKET_SALES_GRAPH: {
      return state
        .set('isFetchingTicketGraph', true);
    }
    case FETCH_TICKET_SALES_GRAPH_SUCCESS: {
      return state
        .set('isFetchingTicketGraph', false)
        .set('ticketGraph', fromJS(action.payload));
    }
    case FETCH_TICKET_SALES_GRAPH_FAILURE: {
      return state
        .set('isFetchingTicketGraph', false)
    }

    case FETCH_HOTEL_SALES_GRAPH: {
      return state
        .set('isFetchingHotelGraph', true);
    }
    case FETCH_HOTEL_SALES_GRAPH_SUCCESS: {
      return state
        .set('isFetchingHotelGraph', false)
        .set('hotelGraph', fromJS(action.payload));
    }
    case FETCH_HOTEL_SALES_GRAPH_FAILURE: {
      return state
        .set('isFetchingHotelGraph', false)
    }

    default:
      return state;
  }
};
