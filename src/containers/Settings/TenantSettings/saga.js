import { all, call, put, fork, takeEvery } from 'redux-saga/effects';
import { GET, POST, PATCH, DELETE } from '../../../util/request';
import config from '../../../config/config';
import {
  patchTenantSuccess,
  patchTenantFailure,
  postTenantSuccess,
  postTenantFailure,
  deleteTenantLogoSuccess,
  deleteTenantLogoFailure,
  postTenantLogoSuccess,
  postTenantLogoFailure,
  getTenantSettingsSuccess,
  getTenantSettingsFailure,
  postPolicySettingsSuccess,
  postPolicySettingsFailure
} from './actions';
import { PATCH_TENANT, POST_TENANT, DELETE_TENANT_LOGO, POST_TENANT_LOGO, GET_TENANT_SETTINGS, POST_POLICY_SETTINGS } from './constants';
import { Notification } from 'util/Notifications';

const patchTenantCall = async data =>
  await PATCH(`${localStorage.getItem('tenant_id')}`, {
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

const postTenantCall = async data =>
  await POST('', {
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

const deleteTenantLogoCall = async () =>
  await DELETE(`${localStorage.getItem('tenant_id')}/logo`, {
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

const postTenantLogoCall = async data =>
  await POST(`${localStorage.getItem('tenant_id')}/logo`, {
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

const getTenantSettingsCall = async () =>
  await GET(`${localStorage.getItem('tenant_id')}/settings`, {
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

const postPolicySettingsCall = async data =>
  await POST(`${localStorage.getItem('tenant_id')}/policy-settings`, {
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

function* patchTenantRequest({ params }) {
  const { data } = params;
  try {
    const patchedTenant = yield call(patchTenantCall, data);
    Notification(patchedTenant, { error: 'Error occured!', success: 'Tenant settings updated successfully!' });
    if(patchedTenant.error || patchedTenant.status >= 400){
      yield put(patchTenantFailure());
    }else{
      yield put(patchTenantSuccess(patchedTenant.data));
    }
  } catch (error) {
    console.error(error);
  }
}

function* postTenantRequest({ params }) {
  const { data } = params;
  try {
    const postedTenant = yield call(postTenantCall, data);
    Notification(postedTenant, { error: 'Error occured!', success: 'Tenant settings added successfully!' });
    if(postedTenant.error || postedTenant.status >= 400){
      yield put(postTenantFailure());
    }else{
      yield put(postTenantSuccess(postedTenant.date));
    }
  } catch (error) {
    console.error(error);
  }
}

function* deleteTenantLogoRequest() {
  try {
    const deletedLogo = yield call(deleteTenantLogoCall);
    Notification(deletedLogo, { error: 'Error occured!', success: 'Tenant logo removed successfully!' });
    if(deletedLogo.error || deletedLogo.status >= 400){
      yield put(deleteTenantLogoFailure());
    }else{
      yield put(deleteTenantLogoSuccess(deletedLogo.data));
    }
  } catch (error) {
    console.error(error);
  }
}

function* postTenantLogoRequest({ params }) {
  const { data } = params;
  try {
    const postedTenantLogo = yield call(postTenantLogoCall, data);
    Notification(postedTenantLogo, { error: 'Error occured!', success: 'Tenant logo added successfully!' });
    if(postedTenantLogo.error || postedTenantLogo.status >= 400){
      yield put(postTenantLogoFailure());
    }else{
      yield put(postTenantLogoSuccess(postedTenantLogo.data));
    }
  } catch (error) {
    console.error(error);
  }
}

function* getTenantSettingsRequest() {
  try {
    const gotTenantSettings = yield call(getTenantSettingsCall);
    if(gotTenantSettings.error || gotTenantSettings.status >= 400){
      yield put(getTenantSettingsFailure());
    }else{
      yield put(getTenantSettingsSuccess(gotTenantSettings.data));
    }
  } catch (error) {
    console.error(error);
  }
}

function* postPolicySettingsRequest({ params }) {
  const { data } = params;
  try {
    const postedPolicies = yield call(postPolicySettingsCall, data);
    Notification(postedPolicies, { error: 'Error occured!', success: 'Policy settings added successfully!' });
    if(postedPolicies.error || postedPolicies.status >= 400){
      yield put(postPolicySettingsFailure());
    }else{
      yield put(postPolicySettingsSuccess(postedPolicies.data));
    }
  } catch (error) {
    console.error(error);
  }
}

export function* patchTenant() {
  yield takeEvery(PATCH_TENANT, patchTenantRequest);
}

export function* postTenant() {
  yield takeEvery(POST_TENANT, postTenantRequest);
}

export function* deleteTenantLogo() {
  yield takeEvery(DELETE_TENANT_LOGO, deleteTenantLogoRequest);
}

export function* postTenantLogo() {
  yield takeEvery(POST_TENANT_LOGO, postTenantLogoRequest);
}

export function* getTenantSettings() {
  yield takeEvery(GET_TENANT_SETTINGS, getTenantSettingsRequest);
}

export function* postPolicySettings() {
  yield takeEvery(POST_POLICY_SETTINGS, postPolicySettingsRequest);
}

export default function* rootSaga() {
  yield all([fork(patchTenant), fork(postTenant), fork(deleteTenantLogo), fork(postTenantLogo), fork(getTenantSettings), fork(postPolicySettings)]);
}
