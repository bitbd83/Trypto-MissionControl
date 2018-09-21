import { all, call, put, fork, takeEvery } from 'redux-saga/effects';
import { GET, POST, DELETE } from '../../../util/request';
import config from '../../../config/config';
import {
  getFeatureOptionsSuccess,
  getFeatureOptionsFailure,
  getEventPaymentProcessorSuccess,
  getEventPaymentProcessorFailure,
  postEventPaymentProcessorSuccess,
  postEventPaymentProcessorFailure,
  postHotelInventorySuccess,
  postHotelInventoryFailure,
  deleteHotelInventorySuccess,
  deleteHotelInventoryFailure,
} from './actions';
import { GET_FEATURE_OPTIONS, GET_EVENT_PAYMENT_PROCESSOR, POST_EVENT_PAYMENT_PROCESSOR, POST_HOTEL_INVENTORY, DELETE_HOTEL_INVENTORY } from './constants';
import { Notification } from '../../../util/Notifications';

const getFeatureOptionsCall = async eventId =>
  await GET(`${localStorage.getItem('tenant_id')}/events/${eventId}/feature-options`, {
    baseUrl: `${config.baseUrl}${config.eventsApiUrl}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  })
  .then(response => {
    const { status } = response;
    return { data: response.data, status };
  })
  .catch(error => {
    return { error };
  });

const getEventPaymentProcessorCall = async eventId =>
  await GET(`${localStorage.getItem('tenant_id')}/events/${eventId}/payment-processors`, {
    baseUrl: `${config.baseUrl}${config.eventsApiUrl}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  })
  .then(response => {
    const { status } = response;
    return { data: response.data, status };
  })
  .catch(error => {
    return { error };
  });

const postEventPaymentProcessorCall = async (eventId, data) =>
  await POST(`${localStorage.getItem('tenant_id')}/events/${eventId}/payment-processors`, {
    baseUrl: `${config.baseUrl}${config.eventsApiUrl}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
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

const postedHotelInventoryCall = async (eventId, data) =>
  await POST(`${localStorage.getItem('tenant_id')}/events/${eventId}/hotel-inventory`, {
    baseUrl: `${config.baseUrl}${config.eventsApiUrl}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
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

const deletedHotelInventoryCall = async (eventId, data) =>
  await DELETE(`${localStorage.getItem('tenant_id')}/events/${eventId}/hotel-inventory`, {
    baseUrl: `${config.baseUrl}${config.eventsApiUrl}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
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

function* getFeatureOptionsRequest({ param }) {
  const { eventId } = param;
  try {
    const gotFeatureOptions = yield call(getFeatureOptionsCall, eventId);
    if(gotFeatureOptions.error || gotFeatureOptions.status >= 400){
      yield put(getFeatureOptionsFailure())
    }else{
      yield put(getFeatureOptionsSuccess(gotFeatureOptions.data));
    }
  } catch (error) {
    console.error(error);
  }
}

function* getEventPaymentProcessorRequest({ param }) {
  const { eventId } = param;
  try {
    const gotEventPaymentProcessor = yield call(getEventPaymentProcessorCall, eventId);
    if(gotEventPaymentProcessor.error || gotEventPaymentProcessor.status >= 400){
      yield put(getEventPaymentProcessorFailure())
    }else{
      yield put(getEventPaymentProcessorSuccess(gotEventPaymentProcessor.data));
    }
  } catch (error) {
    console.error(error);
  }
}

function* postHotelInventoryRequest({ payload }) {
  const { eventId, data } = payload;
  try {
    const postedHotelInventory = yield call(postedHotelInventoryCall, eventId, data);
    Notification(postedHotelInventory, { error: 'Error occured!', success: 'Hotel added successfully!' });
    if(postedHotelInventory.error || postedHotelInventory.status >= 400){
      yield put(postHotelInventoryFailure())
    }else{
      yield put(postHotelInventorySuccess(postedHotelInventory.data));
    }
  } catch (error) {
    console.error(error);
  }
}

function* deleteHotelInventoryRequest({ payload }) {
  const { eventId, data } = payload;
  try {
    const deletedHotelInventory = yield call(deletedHotelInventoryCall, eventId, data);
    Notification(deletedHotelInventory, { error: 'Error occured!', success: 'Hotel removed successfully!' });
    if(deletedHotelInventory.error || deletedHotelInventory.status >= 400){
      yield put(deleteHotelInventoryFailure())
    }else{
      yield put(deleteHotelInventorySuccess(deletedHotelInventory.data));
    }
  } catch (error) {
    console.error(error);
  }
}

function* postEventPaymentProcessorRequest({ param }) {
  const { eventId, data } = param;
  try {
    const postedEventPaymentProcessor = yield call(postEventPaymentProcessorCall, eventId, data);
    Notification(postedEventPaymentProcessor, { error: 'Error occured!', success: 'Payment Processor added successfully!' });
    if(postedEventPaymentProcessor.error || postedEventPaymentProcessor.status >= 400){
      yield put(postEventPaymentProcessorFailure())
    }else{
      yield put(postEventPaymentProcessorSuccess(postedEventPaymentProcessor.data));
    }
  } catch (error) {
    console.error(error);
  }
}

export function* getFeatureOptions() {
  yield takeEvery(GET_FEATURE_OPTIONS, getFeatureOptionsRequest);
}

export function* getEventPaymentProcessor() {
  yield takeEvery(GET_EVENT_PAYMENT_PROCESSOR, getEventPaymentProcessorRequest);
}

export function* postEventPaymentProcessor() {
  yield takeEvery(POST_EVENT_PAYMENT_PROCESSOR, postEventPaymentProcessorRequest);
}

export function* postHotelInventory() {
  yield takeEvery(POST_HOTEL_INVENTORY, postHotelInventoryRequest);
}

export function* deleteHotelInventory() {
  yield takeEvery(DELETE_HOTEL_INVENTORY, deleteHotelInventoryRequest);
}

export default function* rootSaga() {
  yield all([fork(getFeatureOptions), fork(getEventPaymentProcessor), fork(postEventPaymentProcessor), fork(postHotelInventory), fork(deleteHotelInventory)]);
}
