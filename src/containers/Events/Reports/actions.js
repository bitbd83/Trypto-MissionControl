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


export const fetchTicketSalesReport = data => {
  return {
    type: FETCH_TICKET_SALES_REPORT,
    payload: data,
  };
};

export const fetchTicketSalesReportSuccess = data => {
  return {
    type: FETCH_TICKET_SALES_REPORT_SUCCESS,
    payload: data,
  };
};

export const fetchTicketSalesReportFailure = data => {
  return {
    type: FETCH_TICKET_SALES_REPORT_FAILURE,
    payload: data,
  };
};

export const fetchHotelReport = data => {
  return {
    type: FETCH_HOTELS_REPORT,
    payload: data,
  };
};

export const fetchHotelReportSuccess = data => {
  return {
    type: FETCH_HOTELS_REPORT_SUCCESS,
    payload: data,
  };
};

export const fetchHotelReportFailure = data => {
  return {
    type: FETCH_HOTELS_REPORT_FAILURE,
    payload: data,
  };
};

export const fetchAffiliateReport = data => {
  return {
    type: FETCH_AFFILIATE_REPORT,
    payload: data,
  };
};

export const fetchAffiliateReportSuccess = data => {
  return {
    type: FETCH_AFFILIATE_REPORT_SUCCESS,
    payload: data,
  };
};

export const fetchAffiliateReportFailure = data => {
  return {
    type: FETCH_AFFILIATE_REPORT_FAILURE,
    payload: data,
  };
};

export const fetchDiscountCodeReport = data => {
  return {
    type: FETCH_DISCOUNT_CODE_REPORT,
    payload: data,
  };
};

export const fetchDiscountCodeReportSuccess = data => {
  return {
    type: FETCH_DISCOUNT_CODE_REPORT_SUCCESS,
    payload: data,
  };
};

export const fetchDiscountCodeReportFailure = data => {
  return {
    type: FETCH_DISCOUNT_CODE_REPORT_FAILURE,
    payload: data,
  };
};

export const fetchTicketSalesGraph = data => {
  return {
    type: FETCH_TICKET_SALES_GRAPH,
    payload: data,
  };
};

export const fetchTicketSalesGraphSuccess = data => {
  return {
    type: FETCH_TICKET_SALES_GRAPH_SUCCESS,
    payload: data,
  };
};

export const fetchTicketSalesGraphFailure = data => {
  return {
    type: FETCH_TICKET_SALES_GRAPH_FAILURE,
    payload: data,
  };
};

export const fetchHotelSalesGraph = data => {
  return {
    type: FETCH_HOTEL_SALES_GRAPH,
    payload: data,
  };
};

export const fetchHotelSalesGraphSuccess = data => {
  return {
    type: FETCH_HOTEL_SALES_GRAPH_SUCCESS,
    payload: data,
  };
};

export const fetchHotelSalesGraphFailure = data => {
  return {
    type: FETCH_HOTEL_SALES_GRAPH_FAILURE,
    payload: data,
  };
};
