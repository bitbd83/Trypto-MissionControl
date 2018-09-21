import { all, call, put, fork, takeEvery } from 'redux-saga/effects';
import { GET, POST, PATCH, DELETE, PUT } from '../../../util/request';
import config from '../../../config/config';
import { NotificationManager } from 'react-notifications';
import { Notification } from '../../../util/Notifications'
import {
  fetchCrossSellsSuccess,
  fetchUpSellsSuccess,
  deleteCrossSellSuccess,
  deleteUpSellSuccess,
  getAllTicketTypesSuccess,
  addCrossSellesSuccess,
  addUpSellesSuccess
} from './actions';
import {
  FETCH_CROSS_SELLS,
  FETCH_UP_SELLS,
  DELETE_CROSS_SELL,
  DELETE_UP_SELL,
  GET_ALL_TICKET_TYPES,
  ADD_CROSS_SELLS,
  ADD_UP_SELLS
} from './constants';

const getCrossSells = async (tenantId, eventId, ticketTypeId) =>
  await GET(`${tenantId}/events/${eventId}/ticket-types/${ticketTypeId}/cross-sells`, {
    baseUrl: `${config.baseUrl}${config.eventsApiUrl}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.data)
    .catch(error => {
      return { error };
    });

  const getUpSells = async (tenantId, eventId, ticketTypeId) =>
    await GET(`${tenantId}/events/${eventId}/ticket-types/${ticketTypeId}/upsells`, {
      baseUrl: `${config.baseUrl}${config.eventsApiUrl}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.data)
      .catch(error => {
        return { error };
      });

  const deleteCrossSellCall = async (tenantId, eventId, ticketTypeId, data) =>
    await DELETE(`${tenantId}/events/${eventId}/ticket-types/${ticketTypeId}/cross-sells`, {
      baseUrl: `${config.baseUrl}${config.eventsApiUrl}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'application/json',
      },
      data,
    })
    .then(response => {
      const { status } = response;
      return { data: response.data, status };
    })
    .catch(error => {
      return { error };
    });

  const deleteUpSellCall = async (tenantId, eventId, ticketTypeId, data) =>
    await DELETE(`${tenantId}/events/${eventId}/ticket-types/${ticketTypeId}/upsells`, {
      baseUrl: `${config.baseUrl}${config.eventsApiUrl}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'application/json',
      },
      data,
    })
    .then(response => {
      const { status } = response;
      return { data: response.data, status };
    })
    .catch(error => {
      return { error };
    });

  const getAllTickets = async (searchTerm, tenantId, eventId, take) =>
    await GET(`${tenantId}/events/${eventId}/ticket-types?searchTerm=${searchTerm}`, {
      baseUrl: `${config.baseUrl}${config.eventsApiUrl}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.data)
    .catch(error => {
      return { error };
    });

  const addCrossSellsCall = async (tenantId, data, eventId, ticketTypeId) =>
    await POST(`${tenantId}/events/${eventId}/ticket-types/${ticketTypeId}/cross-sells`, {
      baseUrl: `${config.baseUrl}${config.eventsApiUrl}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'application/json',
      },
      data
    })
    .then(response => {
      const { status } = response;
      return { data: response.data, status };
    })
    .catch(error => {
      return { error };
    });

  const addUpSellsCall = async (tenantId, data, eventId, ticketTypeId) =>
    await POST(`${tenantId}/events/${eventId}/ticket-types/${ticketTypeId}/upsells`, {
      baseUrl: `${config.baseUrl}${config.eventsApiUrl}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'application/json',
      },
      data
    })
    .then(response => {
      const { status } = response;
      return { data: response.data, status };
    })
    .catch(error => {
      return { error };
    });

function* fetchCrossSellsRequest({ payload }) {
  const { tenantId, eventId, ticketTypeId } = payload;
  try {
    const getCall = yield call(getCrossSells, tenantId, eventId, ticketTypeId);
    yield put(fetchCrossSellsSuccess(getCall));
  } catch (error) {
    console.error(error);
  }
}

function* fetchUpSellsRequest({ payload }) {
  const { tenantId, eventId, ticketTypeId } = payload;
  try {
    const getCall = yield call(getUpSells, tenantId, eventId, ticketTypeId);
    yield put(fetchUpSellsSuccess(getCall));
  } catch (error) {
    console.error(error);
  }
}

function* deleteCrossSellRequest({ payload }) {
  const { tenantId, eventId, ticketTypeId, data } = payload;
  try {
    const deleteCall = yield call(deleteCrossSellCall, tenantId, eventId, ticketTypeId, data);
    Notification(deleteCall, {error: 'Error occured!', success: 'Cross Sell deleted successfully!'});
    yield put(deleteCrossSellSuccess(deleteCall.data));
  } catch (error) {
    console.error(error);
  }
}

function* deleteUpSellRequest({ payload }) {
  const { tenantId, eventId, ticketTypeId, data } = payload;
  try {
    const deleteCall = yield call(deleteUpSellCall, tenantId, eventId, ticketTypeId, data);
    Notification(deleteCall, {error: 'Error occured!', success: 'Up Sell deleted successfully!'});
    yield put(deleteUpSellSuccess(deleteCall.data));
  } catch (error) {
    console.error(error);
  }
}

function* getAllTicketTypesRequest({ payload }) {
  const { searchTerm = '', tenantId, eventId, take } = payload
  try {
    const getCall = yield call(getAllTickets, searchTerm, tenantId, eventId, take);
    yield put(getAllTicketTypesSuccess(getCall));
  } catch (error) {
    console.error(error);
  }
}

function* addCrossSellesRequest({ payload }) {
  const { data, tenantId, eventId, ticketTypeId } = payload
  try {
    const addCall = yield call(addCrossSellsCall, tenantId, data, eventId, ticketTypeId);
    Notification(addCall, {error: 'Error occured!', success: 'Cross Sells Created successfully!'});
    yield put(addCrossSellesSuccess(addCall.data));
  } catch (error) {
    console.error(error);
  }
}

function* addUpSellesRequest({ payload }) {
  const { data, tenantId, eventId, ticketTypeId } = payload
  try {
    const addCall = yield call(addUpSellsCall, tenantId, data, eventId, ticketTypeId);
    Notification(addCall, {error: 'Error occured!', success: 'Up Sells Created successfully!'});
    yield put(addUpSellesSuccess(addCall.data));
  } catch (error) {
    console.error(error);
  }
}

export function* fetchCrossSells() {
  yield takeEvery(FETCH_CROSS_SELLS, fetchCrossSellsRequest);
}

export function* fetchUpSells() {
  yield takeEvery(FETCH_UP_SELLS, fetchUpSellsRequest);
}

export function* deleteCrossSell() {
  yield takeEvery(DELETE_CROSS_SELL, deleteCrossSellRequest);
}

export function* deleteUpSell() {
  yield takeEvery(DELETE_UP_SELL, deleteUpSellRequest);
}

export function* getAllTicketTypes() {
  yield takeEvery(GET_ALL_TICKET_TYPES, getAllTicketTypesRequest);
}

export function* addCrossSelles() {
  yield takeEvery(ADD_CROSS_SELLS, addCrossSellesRequest);
}

export function* addUpSelles() {
  yield takeEvery(ADD_UP_SELLS, addUpSellesRequest);
}

export default function* rootSaga() {
  yield all([
    fork(fetchCrossSells),
    fork(fetchUpSells),
    fork(deleteCrossSell),
    fork(deleteUpSell),
    fork(getAllTicketTypes),
    fork(addCrossSelles),
    fork(addUpSelles),
  ]);
}
