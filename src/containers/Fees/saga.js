import { all, call, put, fork, takeEvery } from 'redux-saga/effects';
import { GET, POST, PATCH, PUT, formatPatchData } from '../../util/request';
import config from '../../config/config';
import { fetchAllFeesSuccess, fetchAllFeessFail, addFeesSuccess, addFeesFail, patchFeesSuccess, patchFeesFail, putFeesSuccess, putFeesFail } from './actions';
import { FETCH_ALL_FEES, POST_FEES, PATCH_FEES, PUT_FEES } from './constants';
import { Notification } from '../../util/Notifications'

const getFees = async ( skip, take, archived = false, inactive = false, searchTerm = '') =>
  await GET(`${localStorage.getItem('tenant_id')}/fees?skip=${skip}&take=${take}${archived ? '&archived=true' : ''}${inactive ? '&inactive=true' : ''}${searchTerm !== '' ? '&searchTerm='+searchTerm : ''}`, {
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


const postFees = async (data) =>
    await POST(`${localStorage.getItem('tenant_id')}/fees`, {
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

const patchFees = async (feeId, data) =>
  await PATCH(`${localStorage.getItem('tenant_id')}/fees/${feeId}`, {
    baseUrl: `${config.baseUrl}${config.eventsApiUrl}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json-patch+json',
    },
    data: formatPatchData(data)
  })
  .then(response => {
    const { status } = response;
    return { data: response.data, status };
  })
  .catch(error => {
    return { error };
  });


const putFees = async (action, feeId) =>
  await PUT(`${localStorage.getItem('tenant_id')}/fees/${feeId}/${action}`, {
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

function* fetchFeesRequest({ payload }) {
  const { skip, take, archived, inactive, searchText } = payload;
  try {
    const getCall = yield call(getFees, skip, take, archived, inactive, searchText);
    if(getCall.error || getCall.status >= 400){
       yield put(fetchAllFeessFail(getCall))
    }else{
      yield put(fetchAllFeesSuccess(getCall.data));
    }
  } catch (error) {
    console.error(error);
  }
}

function* addFeesRequest({ payload }) {
  const { data } = payload;
  try {
    const addFeess = yield call(postFees, data);
    Notification(addFeess, {error: 'Error occured!', success: 'Fees created successfully!'});
    if(addFeess.error || addFeess.status >= 400){
      yield put(addFeesFail(addFeess))
   }else{
    yield put(addFeesSuccess(addFeess.data));
   }
  } catch (error) {
    console.error(error);
  }
}

function* patchFeesRequest({ payload }) {
  const { feeId, data } = payload;
  try {
    const patchCall = yield call(patchFees, feeId, data);
    Notification(patchCall, {error: 'Error occured!', success: 'Fees updated successfully!'});
    if(patchCall.error || patchCall.status >= 400){
      yield put(patchFeesFail(patchCall))
   }else{
    yield put(patchFeesSuccess(patchCall.data));
   }
  } catch (error) {
    console.error(error);
  }
}

function* putFeesRequest({ payload }) {
  const { feeId, action } = payload;
  try {
    const putCall = yield call(putFees, action, feeId);
    Notification(putCall, {error: 'Error occured!', success: `Fees ${action} successfully!`});
    if(putCall.error || putCall.status >= 400){
      yield put(putFeesFail(putCall))
   }else{
    yield put(putFeesSuccess(putCall.data));
   }
  } catch (error) {
    console.error(error);
  }
}

export function* fetchAllFees() {
  yield takeEvery(FETCH_ALL_FEES, fetchFeesRequest);
}

export function* addNewFees() {
  yield takeEvery(POST_FEES, addFeesRequest);
}

export function* updateFees() {
  yield takeEvery(PATCH_FEES, patchFeesRequest);
}

export function* switchFees() {
  yield takeEvery(PUT_FEES, putFeesRequest);
}

export default function* rootSaga() {
  yield all([
    fork(fetchAllFees),
    fork(addNewFees),
    fork(updateFees),
    fork(switchFees),
  ]);
}
