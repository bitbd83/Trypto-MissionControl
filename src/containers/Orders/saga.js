import { all, call, put, fork, takeEvery } from 'redux-saga/effects';
import { POST, GET, PATCH } from '../../util/request';
import config from '../../config/config';
import {
  fetchAllOrdersSuccess,
  fetchAllOrdersFailure,
  fetchOneOrderSuccess,
  fetchOneOrderFailure,
  patchBillingInfoSuccess,
  patchBillingInfoFailure,
  patchShippingInfoInfoSuccess,
  patchShippingInfoInfoFailure,

} from './actions';
import {
  FETCH_ALL_ORDERS,
  FETCH_ONE_ORDER,
  PATCH_BILLING_INFO,
  PATCH_SHIPPING_INFO
} from './constants';
import { Notification } from '../../util/Notifications'

const getOrders = async ( tenantId, criteria) =>
  await POST(`${tenantId}/orders/filter-orders`, {
    baseUrl: `${config.baseUrl}${config.eventsApiUrl}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json-patch+json',
    },
    data: criteria
  })
    .then(response => {
      return {status: response.status, data: response.data, error: false}
    })
    .catch(error => {
      return {
        error: true, status: error.response.status, data: error.response.data
      }
    });

  const getOneOrderCall = async ( tenantId, orderId) =>
    await GET(`${tenantId}/orders/${orderId}`, {
      baseUrl: `${config.baseUrl}${config.eventsApiUrl}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'application/json-patch+json',
      },
    })
      .then(response => {
        return {status: response.status, data: response.data, error: false}
      })
      .catch(error => {
        return {
          error: true, status: error.response.status, data: error.response.data
        }
      });

  const patchBillingInfoCall = async (tenantId, orderId, data) =>
    await PATCH(`${tenantId}/orders/${orderId}/billing-info`, {
      baseUrl: `${config.baseUrl}${config.eventsApiUrl}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'application/json-patch+json',
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

  const patchShippingInfoCall = async (tenantId, orderId, data) =>
    await PATCH(`${tenantId}/orders/${orderId}/shipping-info`, {
      baseUrl: `${config.baseUrl}${config.eventsApiUrl}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'application/json-patch+json',
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

function* fetchOrdersRequest({ payload }) {
  const { tenantId, criteria } = payload;
  try {
    const list = yield call(getOrders, tenantId, criteria);
    if(list.error || list.status > 400){
      Notification(list, {error: 'Error occured!', success: ''});
      yield put(fetchAllOrdersFailure());
    } else{
      yield put(fetchAllOrdersSuccess(list.data));
    }
  } catch (error) {
    console.error(error);
  }
}

function* fetchOneOrderRequest({ payload }) {
  const { tenantId, orderId } = payload;
  try {
    const list = yield call(getOneOrderCall, tenantId, orderId);
    if(list.error || list.status > 400){
      Notification(list, {error: 'Error occured!', success: ''});
      yield put(fetchOneOrderFailure());
    }else{
      yield put(fetchOneOrderSuccess(list.data));
    }
  } catch (error) {
    console.error(error);
  }
}

function* patchBillingInfoRequest({ payload }) {
  const { tenantId, orderId, data } = payload;
  try {
    const patchCall = yield call(patchBillingInfoCall, tenantId, orderId, data);
    Notification(patchCall, {error: 'Error occured!', success: 'Billing Info updated successfully!'});
    if(patchCall.error || patchCall.status > 400){
      yield put(patchBillingInfoFailure());
    }else{
      yield put(patchBillingInfoSuccess(patchCall.data));
    }
  } catch (error) {
    console.error(error);
  }
}

function* patchShippingInfoInfoRequest({ payload }) {
  const { tenantId, orderId, data } = payload;
  try {
    const patchCall = yield call(patchShippingInfoCall, tenantId, orderId, data);
    Notification(patchCall, {error: 'Error occured!', success: 'Shipping Info updated successfully!'});
    if(patchCall.error || patchCall.status > 400){
      yield put(patchShippingInfoInfoFailure());
    }else{
      yield put(patchShippingInfoInfoSuccess(patchCall.data));
    }
  } catch (error) {
    console.error(error);
  }
}

export function* fetchAllOrders() {
  yield takeEvery(FETCH_ALL_ORDERS, fetchOrdersRequest);
}

export function* fetchOneOrder() {
  yield takeEvery(FETCH_ONE_ORDER, fetchOneOrderRequest);
}

export function* patchBillingInfo() {
  yield takeEvery(PATCH_BILLING_INFO, patchBillingInfoRequest);
}

export function* patchShippingInfoInfo() {
  yield takeEvery(PATCH_SHIPPING_INFO, patchShippingInfoInfoRequest);
}

export default function* rootSaga() {
  yield all([
    fork(fetchAllOrders),
    fork(fetchOneOrder),
    fork(patchBillingInfo),
    fork(patchShippingInfoInfo),
  ]);
}
