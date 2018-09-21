import { all, call, put, fork, takeEvery } from 'redux-saga/effects';
import { GET, POST, PATCH, PUT } from '../../../util/request';
import config from '../../../config/config';
import {
  fetchSiteAdminsSuccess,
  fetchSiteAdminsFailure,
  postSiteAdminSuccess,
  postSiteAdminFailure,
  putSiteAdminSuccess,
  putSiteAdminFailure,
  patchSiteAdminSuccess,
  patchSiteAdminFailure,
} from './actions';
import { FETCH_SITE_ADMINS, POST_SITE_ADMIN, PUT_SITE_ADMIN, PATCH_SITE_ADMIN  } from './constants';
import { Notification } from 'util/Notifications';

const getSiteAdmins = async (organizationId, skipPaging, skip, take, inactive=false, archived = false) =>
  await GET(`organizations/${organizationId}/org-admins?skipPaging=${skipPaging}&skip=${skip}&take=${take}${archived ? '&includeArchived=true' : ''}${inactive ? '&includeInactive=true' : ''}`, {
    baseUrl: `${config.baseUrl}${config.catalogApiUrl}`,
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

const postSiteAminCall = async (organizationId, data) =>
  await POST(`organizations/${organizationId}/org-admins`, {
    baseUrl: `${config.baseUrl}${config.catalogApiUrl}`,
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

const putSiteAminCall = async (organizationId, userId, action) =>
  await PUT(`organizations/${organizationId}/org-admins/${userId}/${action}`, {
    baseUrl: `${config.baseUrl}${config.catalogApiUrl}`,
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

const patchSiteAminCall = async (organizationId, userId, data) =>
  await PATCH(`organizations/${organizationId}/org-admins/${userId}`, {
    baseUrl: `${config.baseUrl}${config.catalogApiUrl}`,
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

function* fetchSiteAdminsRequest({ params }) {
  const { organizationId, skipPaging, skip, take, inactive, archived } = params;
  try {
    const getCall = yield call(getSiteAdmins, organizationId, skipPaging, skip, take, inactive, archived);
    if(getCall.error || getCall.status >= 400){
      yield put(fetchSiteAdminsFailure())
    }else{
      yield put(fetchSiteAdminsSuccess(getCall.data));
    }
  } catch (error) {
    console.error(error);
  }
}

function* postSiteAdminrRequest({ params }) {
  const { organizationId, data } = params;
  try {
    const postCall = yield call(postSiteAminCall, organizationId, data);
    Notification(postCall, { error: 'Error occured!', success: 'Site Admin added successfully!' });
    if(postCall.error || postCall.status >= 400){
      yield put(postSiteAdminFailure())
    }else{
      yield put(postSiteAdminSuccess(postCall.data));
    }
  } catch (error) {
    console.error(error);
  }
}

function* putSiteAdminRequest({ params }) {
  const { organizationId, userId, action } = params;
  try {
    const putCall = yield call(putSiteAminCall, organizationId, userId, action);
    Notification(putCall, { error: 'Error occured!', success: `Site Admin ${action} successfully!` });
    if(putCall.error || putCall.status >= 400){
      yield put(putSiteAdminFailure())
    }else{
      yield put(putSiteAdminSuccess(putCall.data));
    }
  } catch (error) {
    console.error(error);
  }
}

function* patchSiteAdminRequest({ params }) {
  const { organizationId, userId, data } = params;
  try {
    const patchCall = yield call(patchSiteAminCall, organizationId, userId, data);
    Notification(patchCall, { error: 'Error occured!', success: `Site Admin Updated successfully!` });
    if(patchCall.error || patchCall.status >= 400){
      yield put(patchSiteAdminFailure())
    }else{
      yield put(patchSiteAdminSuccess(patchCall.data));
    }
  } catch (error) {
    console.error(error);
  }
}


export function* fetchSiteAdmins() {
  yield takeEvery(FETCH_SITE_ADMINS, fetchSiteAdminsRequest);
}

export function* postSiteAdmin() {
  yield takeEvery(POST_SITE_ADMIN, postSiteAdminrRequest);
}

export function* putSiteAdmin() {
  yield takeEvery(PUT_SITE_ADMIN, putSiteAdminRequest);
}

export function* patchSiteAdmin() {
  yield takeEvery(PATCH_SITE_ADMIN, patchSiteAdminRequest);
}


export default function* rootSaga() {
  yield all([
    fork(fetchSiteAdmins),
    fork(postSiteAdmin),
    fork(putSiteAdmin),
    fork(patchSiteAdmin),
  ]);
}
