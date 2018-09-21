import { all, call, put, fork, takeEvery } from 'redux-saga/effects';
import { GET, POST, PATCH, PUT, formatPatchData } from '../../../util/request';
import config from '../../../config/config';
import {
  fetchTicketSalesReportSuccess,
  fetchTicketSalesReportFailure,
  fetchHotelReportSuccess,
  fetchHotelReportFailure,
  fetchAffiliateReportSuccess,
  fetchAffiliateReportFailure,
  fetchDiscountCodeReportSuccess,
  fetchDiscountCodeReportFailure,
  fetchTicketSalesGraphSuccess,
  fetchTicketSalesGraphFailure,
  fetchHotelSalesGraphSuccess,
  fetchHotelSalesGraphFailure,
} from './actions';
import {
  FETCH_TICKET_SALES_REPORT,
  FETCH_HOTELS_REPORT,
  FETCH_AFFILIATE_REPORT,
  FETCH_DISCOUNT_CODE_REPORT,
  FETCH_TICKET_SALES_GRAPH,
} from './constants';
import { Notification } from '../../../util/Notifications'

const getTicketReport = async ( tenantId, eventId, fromDate, toDate) =>
  await GET(`${tenantId}/events/${eventId}/reports/ticket-sales-summary?fromDate=${fromDate}&toDate=${toDate}`, {
    baseUrl: `${config.baseUrl}${config.eventsApiUrl}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json',
    },
  })
  .then(response => {
    const { status } = response;
    return { data: response.data, status };
  })
  .catch(error => {
    const { data } =  error.response;
    return { data: data.errorMessage, error };
  });

const getHotelReport = async ( tenantId, eventId, fromDate, toDate) =>
  await GET(`${tenantId}/events/${eventId}/reports/hotels-summary?fromDate=${fromDate}&toDate=${toDate}`, {
    baseUrl: `${config.baseUrl}${config.eventsApiUrl}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json',
    },
  })
  .then(response => {
    const { status } = response;
    return { data: response.data, status };
  })
  .catch(error => {
    const { data } =  error.response;
    return { data: data.errorMessage, error };
  });

const getAffiliateReport = async ( tenantId, eventId, fromDate, toDate) =>
  await GET(`${tenantId}/events/${eventId}/reports/affiliates-summary?fromDate=${fromDate}&toDate=${toDate}`, {
    baseUrl: `${config.baseUrl}${config.eventsApiUrl}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json',
    },
  })
  .then(response => {
    const { status } = response;
    return { data: response.data, status };
  })
  .catch(error => {
    const { data } =  error.response;
    return { data: data.errorMessage, error };
  });

const getDiscountCodeReport = async ( tenantId, eventId, fromDate, toDate) =>
  await GET(`${tenantId}/events/${eventId}/reports/discount-codes-summary?fromDate=${fromDate}&toDate=${toDate}`, {
    baseUrl: `${config.baseUrl}${config.eventsApiUrl}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json',
    },
  })
  .then(response => {
    const { status } = response;
    return { data: response.data, status };
  })
  .catch(error => {
    const { data } =  error.response;
    return { data: data.errorMessage, error };
  });

const getTicketGraphCall = async ( tenantId, eventId, fromDate, toDate) =>
  await GET(`${tenantId}/events/${eventId}/reports/ticket-sales-graph?fromDate=${fromDate}&toDate=${toDate}`, {
    baseUrl: `${config.baseUrl}${config.eventsApiUrl}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json',
    },
  })
  .then(response => {
    const { status } = response;
    return { data: response.data, status };
  })
  .catch(error => {
    const { data } =  error.response;
    return { data: data.errorMessage, error };
  });

const getHotelGraphCall = async ( tenantId, eventId, fromDate, toDate) =>
  await GET(`${tenantId}/events/${eventId}/reports/hotel-sales-graph?fromDate=${fromDate}&toDate=${toDate}`, {
    baseUrl: `${config.baseUrl}${config.eventsApiUrl}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json',
    },
  })
  .then(response => {
    const { status } = response;
    return { data: response.data, status };
  })
  .catch(error => {
    const { data } =  error.response;
    return { data: data.errorMessage, error };
  });

function* fetchTicketSalesReportRequest({ payload }) {
  const { tenantId, eventId, fromDate, toDate } = payload;
  try {
    const getCall = yield call(getTicketReport, tenantId, eventId, fromDate, toDate);
    if(getCall.error || getCall.status >= 400){
      yield put(fetchTicketSalesReportFailure());
    }else{
      yield put(fetchTicketSalesReportSuccess(getCall.data));
    }
  } catch (error) {
    console.error(error);
  }
}

function* fetchHotelReportRequest({ payload }) {
  const { tenantId, eventId, fromDate, toDate } = payload;
  try {
    const getCall = yield call(getHotelReport, tenantId, eventId, fromDate, toDate);
    if(getCall.error || getCall.status >= 400){
      yield put(fetchHotelReportFailure());
    }else{
      yield put(fetchHotelReportSuccess(getCall.data));
    }
  } catch (error) {
    console.error(error);
  }
}

function* fetchAffiliateReportRequest({ payload }) {
  const { tenantId, eventId, fromDate, toDate } = payload;
  try {
    const getCall = yield call(getAffiliateReport, tenantId, eventId, fromDate, toDate);
    if(getCall.error || getCall.status >= 400){
      yield put(fetchAffiliateReportFailure());
    }else{
      yield put(fetchAffiliateReportSuccess(getCall.data));
    }
  } catch (error) {
    console.error(error);
  }
}

function* fetchDiscountCodeReportRequest({ payload }) {
  const { tenantId, eventId, fromDate, toDate } = payload;
  try {
    const getCall = yield call(getDiscountCodeReport, tenantId, eventId, fromDate, toDate);
    if(getCall.error || getCall.status >= 400){
      yield put(fetchDiscountCodeReportFailure());
    }else{
      yield put(fetchDiscountCodeReportSuccess(getCall.data));
    }
  } catch (error) {
    console.error(error);
  }
}

function* fetchTicketSalesGraphRequest({ payload }) {
  const { tenantId, eventId, fromDate, toDate } = payload;
  try {
    const getCall = yield call(getTicketGraphCall, tenantId, eventId, fromDate, toDate);
    if(getCall.error || getCall.status >= 400){
      yield put(fetchTicketSalesGraphFailure());
    }else{
      yield put(fetchTicketSalesGraphSuccess(getCall.data));
    }
  } catch (error) {
    console.error(error);
  }
}

function* fetchHotelSalesGraphRequest({ payload }) {
  const { tenantId, eventId, fromDate, toDate } = payload;
  try {
    const getCall = yield call(getHotelGraphCall, tenantId, eventId, fromDate, toDate);
    if(getCall.error || getCall.status >= 400){
      yield put(fetchHotelSalesGraphFailure());
    }else{
      yield put(fetchHotelSalesGraphSuccess(getCall.data));
    }
  } catch (error) {
    console.error(error);
  }
}

export function* fetchTicketSalesReport() {
  yield takeEvery(FETCH_TICKET_SALES_REPORT, fetchTicketSalesReportRequest);
}

export function* fetchHotelReport() {
  yield takeEvery(FETCH_HOTELS_REPORT, fetchHotelReportRequest);
}

export function* fetchAffiliateReport() {
  yield takeEvery(FETCH_AFFILIATE_REPORT, fetchAffiliateReportRequest);
}

export function* fetchDiscountCodeReport() {
  yield takeEvery(FETCH_DISCOUNT_CODE_REPORT, fetchDiscountCodeReportRequest);
}

export function* fetchTicketSalesGraph() {
  yield takeEvery(FETCH_TICKET_SALES_GRAPH, fetchTicketSalesGraphRequest);
}

export function* fetchHotelSalesGraph() {
  yield takeEvery(FETCH_TICKET_SALES_GRAPH, fetchHotelSalesGraphRequest);
}

export default function* rootSaga() {
  yield all([
    fork(fetchTicketSalesReport),
    fork(fetchHotelReport),
    fork(fetchAffiliateReport),
    fork(fetchDiscountCodeReport),
    fork(fetchTicketSalesGraph),
    fork(fetchHotelSalesGraph),
  ]);
}
