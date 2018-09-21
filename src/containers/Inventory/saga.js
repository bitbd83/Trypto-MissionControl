import { all, call, put, fork, takeEvery } from 'redux-saga/effects';
import { GET, POST, PATCH, PUT } from '../../util/request';
import config from '../../config/config';
import { fetchInventoryListSucess } from './actions';
import { FETCH_INVENTORY_LIST } from './constants';


const getInventory = async (tenantId, includeSharedOnly) =>
    await GET(`${tenantId}/inventory?includeSharedOnly=${includeSharedOnly}`, {
      baseUrl: `${config.baseUrl}${config.eventsApiUrl}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.data)
      .catch(error => error);

function* fetchInventoryRequest({ payload }) {
    const { tenantId, includeSharedOnly } = payload
    try {
        const inventoryCall = yield call(getInventory, tenantId, includeSharedOnly);
        yield put(fetchInventoryListSucess(inventoryCall));
    } catch (error) {
        console.error(error)
    }
}


export function* fetchInventory() {
    yield takeEvery(FETCH_INVENTORY_LIST, fetchInventoryRequest);
}


export default function* rootSaga() {
    yield all([
      fork(fetchInventory),
    ]);
  }
