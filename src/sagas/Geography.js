import { all, call, put, fork, takeEvery } from 'redux-saga/effects';
import { GET, POST, PATCH, PUT, formatPatchData } from '../util/request';
import config from '../config/config';
import { getTimezonesSuccess, getLocalesSuccess, getCurrenciesSuccess, getCurrencyByIdSuccess, fetchAllCountriesSuccess, fetchStatesByCountrySuccess } from 'actions/Geography';
import { GET_TIMEZONES, GET_LOCALES, GET_CURRENCIES, GET_CURRENCY_BY_ID, FETCH_ALL_COUNTRIES, FETCH_ALL_STATES_BY_COUNTRY } from 'constants/ActionTypes';

const getTimezonesCall = async () =>
  await GET(`timezones`, {
    baseUrl: `${config.baseUrl}${config.catalogApiUrl}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  })
    .then(response => response.data)
    .catch(error => error);

const getLocalesCall = async () =>
  await GET(`locales`, {
    baseUrl: `${config.baseUrl}${config.catalogApiUrl}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  })
    .then(response => response.data)
    .catch(error => error);

const getCurrenciesCall = async () =>
  await GET(`currencies`, {
    baseUrl: `${config.baseUrl}${config.catalogApiUrl}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  })
    .then(response => response.data)
    .catch(error => error);

const getCurrencyByIdCall = async code =>
  await GET(`currencies/${code}`, {
    baseUrl: `${config.baseUrl}${config.catalogApiUrl}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  })
    .then(response => response.data)
    .catch(error => error);

const getCountries = async () =>
  await GET(`countries`, {
    baseUrl: `${config.baseUrl}${config.catalogApiUrl}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.data)
    .catch(error => error);

const getStatesByCountry = async countryCode =>
  await GET(`countries/${countryCode.toUpperCase()}/state-provinces`, {
    baseUrl: `${config.baseUrl}${config.catalogApiUrl}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.data)
    .catch(error => error);

function* getTimezonesRequest() {
  try {
    const gotTimezones = yield call(getTimezonesCall);
    yield put(getTimezonesSuccess(gotTimezones));
  } catch (error) {
    console.error(error);
  }
}

function* getLocalesRequest() {
  try {
    const gotLocales = yield call(getLocalesCall);
    yield put(getLocalesSuccess(gotLocales));
  } catch (error) {
    console.error(error);
  }
}

function* getCurrenciesRequest() {
  try {
    const gotCurrencies = yield call(getCurrenciesCall);
    yield put(getCurrenciesSuccess(gotCurrencies));
  } catch (error) {
    console.error(error);
  }
}

function* getCurrencyByIdRequest({ params }) {
  const { code } = params;
  try {
    const gotCurrencyById = yield call(getCurrencyByIdCall, code);
    yield put(getCurrencyByIdSuccess(gotCurrencyById));
  } catch (error) {
    console.error(error);
  }
}

function* fetchAllCountriesRequest() {
  try {
    const countryCall = yield call(getCountries);
    yield put(fetchAllCountriesSuccess(countryCall));
  } catch (error) {
    console.error(error);
  }
}

function* fetchStatesByCountryRequest({ countryCode }) {
  try {
    const statesCall = yield call(getStatesByCountry, countryCode);
    yield put(fetchStatesByCountrySuccess(statesCall));
  } catch (error) {
    console.error(error);
  }
}

export function* getTimezones() {
  yield takeEvery(GET_TIMEZONES, getTimezonesRequest);
}

export function* getLocales() {
  yield takeEvery(GET_LOCALES, getLocalesRequest);
}

export function* getCurrencies() {
  yield takeEvery(GET_CURRENCIES, getCurrenciesRequest);
}

export function* getCurrencyById() {
  yield takeEvery(GET_CURRENCY_BY_ID, getCurrencyByIdRequest);
}

export function* fetchAllCountries() {
  yield takeEvery(FETCH_ALL_COUNTRIES, fetchAllCountriesRequest);
}

export function* fetchStatesByCountry() {
  yield takeEvery(FETCH_ALL_STATES_BY_COUNTRY, fetchStatesByCountryRequest);
}

export default function* rootSaga() {
  yield all([fork(getTimezones), fork(getLocales), fork(getCurrencies), fork(getCurrencyById), fork(fetchAllCountries), fork(fetchStatesByCountry)]);
}
