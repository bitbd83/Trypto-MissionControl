import { all, call, put, fork, takeEvery } from 'redux-saga/effects';
import { GET, POST, PATCH, PUT, formatPatchData } from '../../../util/request';
import config from '../../../config/config';
import {
  fetchAllTaxRatesSuccess,
  fetchAllTaxRatesFailure,
  addTaxRateSuccess,
  addTaxRateFailure,
  patchTaxRateSuccess,
  patchTaxRateFailure,
  putTaxRateSuccess,
  putTaxRateFailure,
  getTaxGroupSuccess,
  getTaxGroupFailure,
 } from './actions';
import {
  FETCH_ALL_TAX_RATES,
  POST_TAX_RATE,
  PATCH_TAX_RATE,
  PUT_TAX_RATE,
  GET_TAX_GROUP,
} from './constants';
import { Notification } from '../../../util/Notifications'


const getTaxGroupPromise = async ( taxGroupId) =>
  await GET(`${localStorage.getItem('tenant_id')}/tax-groups/${taxGroupId}`, {
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

const getTaxRates = async ( taxGroupId, skip, take, archived, inactive) =>
  await GET(`${localStorage.getItem('tenant_id')}/tax-groups/${taxGroupId}/tax-rates?skip=${skip}&take=${take}${archived ? "&archived=true": ''}${inactive ? "&inactive=true": ''}`, {
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

const postTaxRate = async (taxGroupId, data) =>
    await POST(`${localStorage.getItem('tenant_id')}/tax-groups/${taxGroupId}/tax-rates`, {
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

const patchTaxRate = async (taxGroupId, taxRateId, data) =>
  await PATCH(`${localStorage.getItem('tenant_id')}/tax-groups/${taxGroupId}/tax-rates/${taxRateId}`, {
    baseUrl: `${config.baseUrl}${config.eventsApiUrl}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json-patch+json',
    },
    data
  })
    .then(response => {
      const { status } = response;
      return { data, status, taxRateId };
    })
    .catch(error => {
      return { error };
    });


const putTaxRate = async (taxGroupId, action, taxRateId) =>
  await PUT(`${localStorage.getItem('tenant_id')}/tax-groups/${taxGroupId}/tax-rates/${taxRateId}/${action}`, {
    baseUrl: `${config.baseUrl}${config.eventsApiUrl}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json',
    }
  })
    .then(response => {
      const { status } = response;
      return { data: {}, status, action, taxRateId };
    })
    .catch(error => {
      return { error };
    });

function* fetchTaxRatesRequest({ payload }) {
  const { taxGroupId, skip, take, archived, inactive } = payload;
  try {
    const taxRatesCall = yield call(getTaxRates, taxGroupId, skip, take, archived, inactive);
    if(taxRatesCall.error || taxRatesCall.status >= 400){
      yield put(fetchAllTaxRatesFailure());
    }else{
      yield put(fetchAllTaxRatesSuccess(taxRatesCall.data));
    }
  } catch (error) {
    console.error(error);
  }
}

function* getTaxGroupRequest({ payload }) {
  const { taxGroupId } = payload;
  try {
    const getTaxGroup = yield call(getTaxGroupPromise, taxGroupId);
    if(getTaxGroup.error || getTaxGroup.status >= 400){
      yield put(getTaxGroupFailure());
    }else{
      yield put(getTaxGroupSuccess(getTaxGroup.data));
    }
  } catch (error) {
    console.error(error);
  }
}

function* addTaxRateRequest({ payload }) {
  const { taxGroupId, data } = payload;
  try {
    const addTaxRatess = yield call(postTaxRate, taxGroupId, data);
    Notification(addTaxRatess, {error: 'Error occured!', success: 'Tax Rate created successfully!'});
    if(addTaxRatess.error || addTaxRatess.status >= 400){
      yield put(addTaxRateFailure());
    }else{
      yield put(addTaxRateSuccess(addTaxRatess.data));
    }
  } catch (error) {
    console.error(error);
  }
}

function* patchTaxRateRequest({ payload }) {
  const { taxGroupId, taxRateId, patchData } = payload;
  console.log('patchtaxrate', payload)
  try {
    const patchCall = yield call(patchTaxRate, taxGroupId, taxRateId, patchData);
    Notification(patchCall, {error: 'Error occured!', success: 'Tax Rate updated successfully!'});
    if(patchCall.error || patchCall.status >= 400){
      yield put(patchTaxRateFailure());
    }else{
      yield put(patchTaxRateSuccess(patchCall));
    }
  } catch (error) {
    console.error(error);
  }
}

function* putTaxRateRequest({ payload }) {
  const { taxGroupId, taxRateId, action } = payload;
  try {
    const putCall = yield call(putTaxRate, taxGroupId, action, taxRateId);
    Notification(putCall, {error: 'Error occured!', success: `Tax Rate ${action} successfully!`});
    if(putCall.error || putCall.status >= 400){
      yield put(putTaxRateFailure());
    }else{
      yield put(putTaxRateSuccess(putCall));
    }
  } catch (error) {
    console.error(error);
  }
}

export function* getTaxGroup() {
  yield takeEvery(GET_TAX_GROUP, getTaxGroupRequest);
}

export function* fetchAllTaxRates() {
  yield takeEvery(FETCH_ALL_TAX_RATES, fetchTaxRatesRequest);
}

export function* addNewTaxRate() {
  yield takeEvery(POST_TAX_RATE, addTaxRateRequest);
}

export function* updateTaxRate() {
  yield takeEvery(PATCH_TAX_RATE, patchTaxRateRequest);
}

export function* switchTaxRate() {
  yield takeEvery(PUT_TAX_RATE, putTaxRateRequest);
}

export default function* rootSaga() {
  yield all([
    fork(fetchAllTaxRates),
    fork(addNewTaxRate),
    fork(updateTaxRate),
    fork(switchTaxRate),
    fork(getTaxGroup),
  ]);
}
