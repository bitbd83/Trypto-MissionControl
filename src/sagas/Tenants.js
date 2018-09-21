import { all, call, put, fork, takeEvery } from 'redux-saga/effects';
import { GET } from '../util/request';
import config from '../config/config';
import { getTenantsByDomainSuccess } from 'actions/Tenants';
import { GET_TENANTS_BY_DOMAIN } from 'constants/ActionTypes';

const getTenants = async () =>
  await GET(`?variant=domain`, {
    baseUrl: window.location.port ? `${config.baseUrl}${config.eventsApiUrl}${window.location.hostname}:${window.location.port}` : `${config.baseUrl}${config.eventsApiUrl}${window.location.hostname}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  })
    .then(response => response.data)
    .catch(error => error);

function* getTenantsByDomainRequest() {
  try {
    const fetchedTenants = yield call(getTenants);
    localStorage.setItem('tenant_id', fetchedTenants.id);
    yield put(getTenantsByDomainSuccess(fetchedTenants));
  } catch (error) {
    console.error(error);
  }
}

export function* fetchAllTenants() {
  yield takeEvery(GET_TENANTS_BY_DOMAIN, getTenantsByDomainRequest);
}

export default function* rootSaga() {
  yield all([fork(fetchAllTenants)]);
}
