import { all, call, put, fork, takeEvery } from 'redux-saga/effects';
import { GET, POST, PATCH, PUT, formatPatchData } from '../util/request';
import config from '../config/config';
import {
  fetchAllCurrenciesSuccess
} from 'actions/Currency';
import {
  FETCH_ALL_CURRENCIES
} from 'constants/ActionTypes';

const getStatesByCountry = async () =>
  await GET(`currencies`, {
    baseUrl: `${config.baseUrl}${config.catalogApiUrl}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.data)
    .catch(error => error);


function* fetchAllCurrenciesRequest({ payload }) {
  try {
    const currencyCall = yield call(getStatesByCountry);
    yield put(fetchAllCurrenciesSuccess(currencyCall));
  } catch (error) {
    console.error(error);
  }
}


export function* fetchAllCurrencies() {
  yield takeEvery(FETCH_ALL_CURRENCIES, fetchAllCurrenciesRequest);
}


export default function* rootSaga() {
  yield all([
    fork(fetchAllCurrencies),
  ]);
}
