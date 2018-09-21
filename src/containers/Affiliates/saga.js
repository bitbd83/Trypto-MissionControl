import { all, call, put, fork, takeEvery } from 'redux-saga/effects';
import { GET, POST, PATCH, PUT } from '../../util/request';
import config from '../../config/config';
import {
  FETCH_ALL_AFFILIATES,
  FETCH_TRACKING_CODES,
  ADD_AFFILIATES,
  ADD_TRACKING_CODES,
  PUT_AFFILIATES,
  PUT_TRACKING_CODES,
  PATCH_AFFILIATE
} from './constants';
import {
  fetchAllAffiliatesSuccess,
  fetchAllAffiliatesFailure,
  fetchTrackingCodesSuccess,
  fetchTrackingCodesFailure,
  addAffiliatesSuccess,
  addAffiliatesFailure,
  addTrackingCodesSuccess,
  addTrackingCodesFailure,
  putAffiliateSuccess,
  putAffiliateFailure,
  putTrackingCodesSuccess,
  putTrackingCodesFailure,
  patchAffiliateSuccess,
  patchAffiliateFailure,
} from './actions'
import { Notification } from '../../util/Notifications'

const getAffiliates = async ( tenantId, skip = 0, take = 10, archived = false, inactive = false) =>
  await GET(`${tenantId}/affiliates?skip=${skip}&take=${take}${archived ? '&archived=true' : ''}${inactive ? '&inactive=true' : ''}`, {
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
    return { error, data: {} };
  });

const getTrackingCodes = async (tenantId,  affiliateId, skip = 0, take = 10, archived = false, inactive = false) =>
  await GET(`${tenantId}/affiliates/${affiliateId}/trackingCodes?skip=${skip}&take=${take}${archived ? '&archived=true' : ''}${inactive ? '&inactive=true' : ''}`, {
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
    return { error, data: {} };
  });

const createAffiliates = async (tenantId, data) =>
  await POST(`${tenantId}/affiliates`, {
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
    return { error, data: {} };
  });

const createTrackingCode = async (tenantId, affiliateId, data) =>
  await POST(`${tenantId}/affiliates/${affiliateId}/trackingCodes`, {
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
    const { data, status } =  error.response;
    return { data: data.errorMessage, error, status };
  });

const switchAffiliate = async (tenantId, affiliateId, action) =>
  await PUT(`${tenantId}/affiliates/${affiliateId}/${action}`, {
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

const switchTrackingCode = async (tenantId, affiliateId, codeId, action) =>
  await PUT(`${tenantId}/affiliates/${affiliateId}/trackingCodes/${codeId}/${action}`, {
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

const updateAffiliate = async (tenantId, affiliateId, data) =>
  await PATCH(`${tenantId}/affiliates/${affiliateId}`, {
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

function* fetchAllAffiliatesRequest({ payload }) {
  const { tenantId, skip, take, archived, inactive } = payload;
  try {
    const getCall = yield call(getAffiliates, tenantId, skip, take, archived, inactive);
    if(getCall.error || getCall.status >= 400){
       yield put(fetchAllAffiliatesFailure())
    }else{
      yield put(fetchAllAffiliatesSuccess(getCall.data));
    }
  } catch (error) {
    console.error(error);
  }
}

function* fetchTrackingCodesRequest({ payload }) {
  const { tenantId, affiliateId, skip, take, archived, inactive } = payload;
  try {
    const getCall = yield call(getTrackingCodes, tenantId, affiliateId, skip, take, archived, inactive);
    if(getCall.error || getCall.status >= 400){
      yield put(fetchTrackingCodesFailure())
   }else{
    yield put(fetchTrackingCodesSuccess(getCall.data));
   }
  } catch (error) {
    console.error(error);
  }
}

function* addAffiliatesRequest({ payload }) {
  const {tenantId, data} = payload;
  try {
    const postCall = yield call(createAffiliates, tenantId, data.affiliate);
    let affiliateId = '';
    if(postCall.error || postCall.status >= 400){
      yield put(addAffiliatesFailure())
      Notification(postCall, {error: 'Error occured!', success: ``});
    }else{
      // yield put(addAffiliatesSuccess({...postCall.data}));
      affiliateId = postCall.data.id;
    }

    const postCallNew = yield call(createTrackingCode, tenantId, affiliateId, data.trackingCode);

    let codeSaveFail = false;
    if(postCallNew.error || postCallNew.status >= 400){
      codeSaveFail = true
      Notification(postCall, {error: 'Error occured!', success: ``});
      yield put(addAffiliatesFailure())
    }else{
      codeSaveFail = false
      Notification(postCallNew, {error: 'Error occured!', success: `Affiliate Created successfully!`});
      yield put(addAffiliatesSuccess({...postCall.data, ...postCallNew.data, codeSaveFail}));
    }

  } catch (error) {
    console.error(error);
  }
}

function* addTrackingCodesRequest({ payload }) {
  const { tenantId, affiliateId, data } = payload;
  try {
    const postCall = yield call(createTrackingCode, tenantId, affiliateId, data);
    Notification(postCall, {error: 'Error occured!', success: `Tracking Code Created successfully!`});
    let codeAlready = {status: false, error: ''}
    if(postCall.error || postCall.status >= 400){
      yield put(addTrackingCodesFailure())
    }else{
      codeAlready.status = postCall.status;
      codeAlready.error = postCall.data
      yield put(addTrackingCodesSuccess({codeAlready, ...postCall.data}));
    }
  } catch (error) {
    console.error(error);
  }
}

function* putAffiliateRequest({ payload }) {
  const { tenantId, affiliateId, action } = payload;
  try {
    const putCall = yield call(switchAffiliate, tenantId, affiliateId, action);
    Notification(putCall, {error: 'Error occured!', success: `Affiliate ${action} successfully!`});
    if(putCall.error || putCall.status >= 400){
      yield put(putAffiliateFailure())
    }else{
      yield put(putAffiliateSuccess(putCall.data));
    }
  } catch (error) {
    console.error(error);
  }
}

function* putTrackingCodesRequest({ payload }) {
  const { tenantId, affiliateId, codeId, action } = payload;
  try {
    const putCall = yield call(switchTrackingCode, tenantId, affiliateId, codeId, action);
      Notification(putCall, {error: 'Error occured!', success: `Tracking Code ${action} successfully!`});
    if(putCall.error || putCall.status >= 400){
      yield put(putTrackingCodesFailure())
    }else{
      yield put(putTrackingCodesSuccess(putCall.data));
    }
  } catch (error) {
    console.error(error);
  }
}

function* patchAffiliateRequest({ payload }) {
  const { tenantId, affiliateId, data } = payload;
  try {
    const patchCall = yield call(updateAffiliate, tenantId, affiliateId, data);
    Notification(patchCall, {error: 'Error occured!', success: `Affiliate Updated successfully!`});
    if(patchCall.error || patchCall.status >= 400){
      yield put(patchAffiliateFailure())
    }else{
      yield put(patchAffiliateSuccess(patchCall.data));
    }
  } catch (error) {
    console.error(error);
  }
}

export function* fetchAllAffiliates() {
  yield takeEvery(FETCH_ALL_AFFILIATES, fetchAllAffiliatesRequest);
}

export function* fetchTrackingCodes() {
  yield takeEvery(FETCH_TRACKING_CODES, fetchTrackingCodesRequest);
}

export function* addAffiliates() {
  yield takeEvery(ADD_AFFILIATES, addAffiliatesRequest);
}

export function* addTrackingCodes() {
  yield takeEvery(ADD_TRACKING_CODES, addTrackingCodesRequest);
}

export function* putAffiliate() {
  yield takeEvery(PUT_AFFILIATES, putAffiliateRequest);
}

export function* putTrackingCodes() {
  yield takeEvery(PUT_TRACKING_CODES, putTrackingCodesRequest);
}

export function* patchAffiliate() {
  yield takeEvery(PATCH_AFFILIATE, patchAffiliateRequest);
}

export default function* rootSaga() {
  yield all([
    fork(fetchAllAffiliates),
    fork(fetchTrackingCodes),
    fork(addAffiliates),
    fork(addTrackingCodes),
    fork(putAffiliate),
    fork(putTrackingCodes),
    fork(patchAffiliate),
  ]);
}
