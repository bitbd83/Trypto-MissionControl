import { all, call, put, fork, takeEvery, takeLatest } from 'redux-saga/effects';
import { GET, POST, PATCH, PUT, formatPatchData } from '../../../util/request';
import config from '../../../config/config';
import {
  fetchAllTaxGroupSuccess,
  fetchAllTaxGroupFailure,
  addTaxGroupSuccess,
  addTaxGroupFailure,
  patchTaxGroupSuccess,
  patchTaxGroupFailure,
  putTaxGroupSuccess,
  putTaxGroupFailure,
 } from './actions';
import { FETCH_ALL_TAX_GROUP, POST_TAX_GROUP, PATCH_TAX_GROUP, PUT_TAX_GROUP } from './constants';
import { Notification } from '../../../util/Notifications'

const getTaxGroups = async ( skip, take, archived, inactive, searchTerm = '') =>
  await GET(`${localStorage.getItem('tenant_id')}/tax-groups?skip=${skip}&take=${take}${archived ? '&archived='+archived: ''}${inactive ? '&inactive='+inactive: ''}${searchTerm ? '&searchTerm='+searchTerm: ''}`, {
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


const postTaxGroup = async (data) =>
    await POST(`${localStorage.getItem('tenant_id')}/tax-groups`, {
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

const patchTaxGroup = async (taxGroupId, data) =>
  await PATCH(`${localStorage.getItem('tenant_id')}/tax-groups/${taxGroupId}`, {
    baseUrl: `${config.baseUrl}${config.eventsApiUrl}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json-patch+json',
    },
    data: formatPatchData(data)
  })
  .then(response => {
    const { status } = response;
    return { data, status, taxGroupId };
  })
  .catch(error => {
    return { error };
  });

const putTaxGroup = async (action, taxGroupId) =>
  await PUT(`${localStorage.getItem('tenant_id')}/tax-groups/${taxGroupId}/${action}`, {
    baseUrl: `${config.baseUrl}${config.eventsApiUrl}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json',
    }
  })
  .then(response => {
    const { status } = response;
    return { status, action, taxGroupId, data: {id: taxGroupId}, error: false };
  })
  .catch(error => {
    return { error };
  });

function* fetchTaxGroupRequest({ payload }) {
  const { skip, take, archived, inactive, searchText } = payload;
  try {
    const taxGroupCall = yield call(getTaxGroups, skip, take, archived, inactive, searchText);
    if(taxGroupCall.error || taxGroupCall.status >= 400){
      yield put(fetchAllTaxGroupFailure());
    }else{
      yield put(fetchAllTaxGroupSuccess(taxGroupCall.data));
    }
  } catch (error) {
    console.error(error);
  }
}

function* addTaxGroupRequest({ payload }) {
  const { data } = payload;
  try {
    const addTaxGroups = yield call(postTaxGroup, data);
    Notification(addTaxGroups, {error: 'Error occured!', success: 'Tax Group created successfully!'});
    if(addTaxGroups.error || addTaxGroups.status >= 400){
      yield put(addTaxGroupFailure());
    }else{
      yield put(addTaxGroupSuccess(addTaxGroups.data));
    }
  } catch (error) {
    console.error(error);
  }
}

function* patchTaxGroupRequest({ payload }) {
  const { taxGroupId, data } = payload;
  try {
    const patchCall = yield call(patchTaxGroup, taxGroupId, data);
    Notification(patchCall, {error: 'Error occured!', success: 'Tax Group updated successfully!'});
    if(patchCall.error || patchCall.status >= 400){
      yield put(patchTaxGroupFailure());
    }else{
      yield put(patchTaxGroupSuccess(patchCall));
    }
  } catch (error) {
    console.error(error);
  }
}

function* putTaxGroupRequest({ payload }) {
  const { taxGroupId, action } = payload;
  try {
    const putCall = yield call(putTaxGroup, action, taxGroupId);
    Notification(putCall, {error: 'Error occured!', success: `Tax Group ${action} successfully!`});
    if(putCall.error || putCall.status >= 400){
      yield put(putTaxGroupFailure());
    }else{
      yield put(putTaxGroupSuccess(putCall));
    }
  } catch (error) {
    console.error(error);
  }
}

export function* fetchAllTaxGroup() {
  yield takeLatest(FETCH_ALL_TAX_GROUP, fetchTaxGroupRequest);
}

export function* addNewTaxGroup() {
  yield takeEvery(POST_TAX_GROUP, addTaxGroupRequest);
}

export function* updateTaxGroup() {
  yield takeEvery(PATCH_TAX_GROUP, patchTaxGroupRequest);
}

export function* switchTaxGroup() {
  yield takeEvery(PUT_TAX_GROUP, putTaxGroupRequest);
}

export default function* rootSaga() {
  yield all([
    fork(fetchAllTaxGroup),
    fork(addNewTaxGroup),
    fork(updateTaxGroup),
    fork(switchTaxGroup),
  ]);
}
