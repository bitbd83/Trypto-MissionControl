import { all, call, put, fork, takeEvery } from 'redux-saga/effects';
import { GET, POST, PATCH, PUT, formatPatchData } from '../../../../util/request';
import config from '../../../../config/config';
import { Notification } from '../../../../util/Notifications';
import {
  fetchSurchargesSuccess,
  fetchSurchargesFailure,
  addSurchargeSuccess,
  addSurchargeFailure,
  patchSurchargeSuccess,
  patchSurchargeFailure,
  putSurchargeSuccess,
  putSurchargeFailure,
} from './actions';
import {
  FETCH_SURCHARGES,
  ADD_SURCHARGE,
  PATCH_SURCHARGE,
  PUT_SURCHARGE,
} from './constants';


const getSurchargeInventories = async ( tenantId, hotelInventoryId, skip, take, archived) =>
  await GET(`tenants/${tenantId}/hotel-inventory/${hotelInventoryId}/surcharges/?skip=${skip}&take=${take}`, {
    baseUrl: `${config.baseUrl}${config.hotelsApiUrl}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json',
    },
  })
  .then(response => {
    const { status } = response;
    return { data: response.data, status};
  })
  .catch(error => {
    return { error };
  });

const postSurcharge = async (tenantId, hotelInventoryId, data) =>
  await POST(`tenants/${tenantId}/hotel-inventory/${hotelInventoryId}/surcharges`, {
    baseUrl: `${config.baseUrl}${config.hotelsApiUrl}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json',
    },
    data
  })
 .then(response => {
    const { status } = response;
    return { data: response.data, status};
  })
  .catch(error => {
    return { error };
  });


const patchSurcharge = async (tenantId, hotelInventoryId, surchargeId, data) =>
  await PATCH(`tenants/${tenantId}/hotel-inventory/${hotelInventoryId}/surcharges/${surchargeId}`, {
    baseUrl: `${config.baseUrl}${config.hotelsApiUrl}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json',
    },
    data: formatPatchData(data)
  })
    .then(response => {
      const { status } = response;
      return { data, status, id: surchargeId};
    })
    .catch(error => {
      return { error };
    });

const putSurcharge = async (tenantId, hotelInventoryId, surchargeId, action) =>
  await PUT(`tenants/${tenantId}/hotel-inventory/${hotelInventoryId}/surcharges/${surchargeId}/${action}`, {
    baseUrl: `${config.baseUrl}${config.hotelsApiUrl}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json',
    }
  })
    .then(response => {
      const { status } = response;
      return {action, status, id: surchargeId};
    })
    .catch(error => {
      return { error };
    });

function* fetchSurchargeRequest({ payload }) {
  const { tenantId, hotelInventoryId, skip, take, archived} = payload;
  try {
    const callData = yield call(getSurchargeInventories, tenantId, hotelInventoryId, skip, take, archived);
    if(callData.error || callData.status >= 400){
      Notification(callData, {error: 'Error occured!', success: ''});
      yield put(fetchSurchargesFailure());
    }else{
      yield put(fetchSurchargesSuccess(callData.data));
    }
  } catch (error) {
    console.error(error);
  }
}


function* addSurchargeRequest({ payload }) {
  const { tenantId, hotelInventoryId, data} = payload;
  try {
    const callData = yield call(postSurcharge, tenantId, hotelInventoryId, data);
    Notification(callData, {error: 'Error occured!', success: 'Surchange created successfully!'});
    if(callData.error || callData.status >= 400){
      yield put(addSurchargeFailure())
    }else{
      yield put(addSurchargeSuccess(callData.data));
    }
  } catch (error) {
    console.error(error);
  }
}

function* patchSurchargeRequest({ payload }) {
  const { tenantId, hotelInventoryId, surchargeId, data} = payload;
  try {
    const callData = yield call(patchSurcharge,tenantId, hotelInventoryId, surchargeId, data);
    Notification(callData, {error: 'Error occured!', success: 'Surchange updated successfully!'});
    if(callData.error || callData.status >= 400){
      yield put(patchSurchargeFailure());
    }else{
      yield put(patchSurchargeSuccess(callData));
    }
  } catch (error) {
    console.error(error);
  }
}

function* putSurchargeRequest({ payload }) {
  const { tenantId, hotelInventoryId, surchargeId, action } = payload;
  try {
    const callData = yield call(putSurcharge, tenantId, hotelInventoryId, surchargeId, action);
    Notification(callData, {error: 'Error occured!', success: 'Surchange ${action} successfully!'});
    if(callData.error || callData.status >= 400){
      yield put(putSurchargeFailure());
    }else{
      yield put(putSurchargeSuccess(callData));
    }
  } catch (error) {
    console.error(error);
  }
}

export function* fetchSurchargesSaga() {
  yield takeEvery(FETCH_SURCHARGES, fetchSurchargeRequest);
}
export function* addSurchargeSaga() {
  yield takeEvery(ADD_SURCHARGE, addSurchargeRequest);
}
export function* patchSurchargeSaga() {
  yield takeEvery(PATCH_SURCHARGE, patchSurchargeRequest);
}
export function* putSurchargeSaga() {
  yield takeEvery(PUT_SURCHARGE, putSurchargeRequest);
}

export default function* rootSaga() {
  yield all([
    fork(fetchSurchargesSaga),
    fork(addSurchargeSaga),
    fork(patchSurchargeSaga),
    fork(putSurchargeSaga),
  ]);
}
