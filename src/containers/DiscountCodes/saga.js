import { all, call, put, fork, takeEvery } from 'redux-saga/effects';
import { GET, POST, PATCH, PUT, formatPatchData } from '../../util/request';
import config from '../../config/config';
import {
  fetchAllCodesSuccess,
  fetchAllCodesFailure,
  putCodeSuccess,
  putCodeFailure,
  postCodeSuccess,
  postCodeFailure,
  patchCodeSuccess,
  patchCodeFailure,
 } from './actions';
import { FETCH_ALL_CODES, PUT_CODES, POST_CODES, PATCH_CODES} from './constants';
import { Notification } from '../../util/Notifications'

const getCodes = async ( tenantId, skip, take, archived, inactive) =>
  await GET(`${tenantId}/discount-coupons?skip=${skip}&take=${take}&archived=${archived}&inactive=${inactive}`, {
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
    return { error };
  });


const postCodeCall = async (tenantId, data) =>
    await POST(`${tenantId}/tiered-discount-coupons`, {
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

const patchCodeCall = async (tenantId, couponId, data) =>
  await PATCH(`${tenantId}/tiered-discount-coupons/${couponId}`, {
    baseUrl: `${config.baseUrl}${config.eventsApiUrl}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json-patch+json',
    },
    data
  })
  .then(response => {
    const { status } = response;
    return { data, status, couponId };
  })
  .catch(error => {
    return { error };
  });

const switchCode = async (tenantId, couponId, action) =>
  await PUT(`${tenantId}/discount-coupons/${couponId}/${action}`, {
    baseUrl: `${config.baseUrl}${config.eventsApiUrl}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json',
    }
  })
  .then(response => {
    const { status } = response;
    return { data: response.data, status };
  })
  .catch(error => {
    return { error };
  });

function* fetchAllCodesRequest({ payload }) {
  const { tenantId, skip, take, archived, inactive } = payload;
  try {
    const getCall = yield call(getCodes, tenantId, skip, take, archived, inactive);
    if(getCall.error || getCall.status >= 400){
      yield put(fetchAllCodesFailure())
    }else{
      yield put(fetchAllCodesSuccess(getCall.data));
    }
  } catch (error) {
    console.error(error);
  }
}

function* postCodeRequest({ payload }) {
  const { tenantId, data } = payload;
  try {
    const postCall = yield call(postCodeCall, tenantId, data);
    Notification(postCall, {error: 'Error occured!', success: `Discount Code Created successfully!`});
    if(postCall.error || postCall.status >= 400){
      yield put(postCodeFailure())
    }else{
      yield put(postCodeSuccess(postCall.data));
    }
  } catch (error) {
    console.error(error);
  }
}

function* patchCodeRequest({ payload }) {
  const { tenantId, couponId, data } = payload;
  try {
    const patchCall = yield call(patchCodeCall, tenantId, couponId, data);
    Notification(patchCall, {error: 'Error occured!', success: `Discount Code Updated successfully!`});
    if(patchCall.error || patchCall.status >= 400){
      yield put(patchCodeFailure())
    }else{
      yield put(patchCodeSuccess(patchCall));
    }
  } catch (error) {
    console.error(error);
  }
}

function* putCodeRequest({ payload }) {
  const { tenantId, couponId, action } = payload;
  try {
    const putCall = yield call(switchCode, tenantId, couponId, action);
    Notification(putCall, {error: 'Error occured!', success: `Discount Code ${action} successfully!`});
    if(putCall.error || putCall.status >= 400){
      yield put(putCodeFailure())
    }else{
      yield put(putCodeSuccess(putCall));
    }
  } catch (error) {
    console.error(error);
  }
}

export function* fetchAllCodes() {
  yield takeEvery(FETCH_ALL_CODES, fetchAllCodesRequest);
}

export function* postCode() {
  yield takeEvery(POST_CODES, postCodeRequest);
}

export function* patchCode() {
  yield takeEvery(PATCH_CODES, patchCodeRequest);
}

export function* putCode() {
  yield takeEvery(PUT_CODES, putCodeRequest);
}

export default function* rootSaga() {
  yield all([
    fork(fetchAllCodes),
    fork(postCode),
    fork(patchCode),
    fork(putCode),
  ]);
}
