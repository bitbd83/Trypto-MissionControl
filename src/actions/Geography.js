import {
  GET_TIMEZONES,
  GET_TIMEZONES_SUCCESS,
  GET_CURRENCIES,
  GET_CURRENCIES_SUCCESS,
  GET_CURRENCY_BY_ID,
  GET_CURRENCY_BY_ID_SUCCESS,
  GET_CURRENCY_BY_ID_CLEAR,
  GET_LOCALES,
  GET_LOCALES_SUCCESS,
  FETCH_ALL_COUNTRIES,
  FETCH_ALL_COUNTRIES_SUCCESS,
  FETCH_ALL_STATES_BY_COUNTRY,
  FETCH_ALL_STATES_BY_COUNTRY_SUCCESS,
  RESET_STATE_ON_COUNTRY_NULL,
} from 'constants/ActionTypes';

export const getTimezones = () => {
  return {
    type: GET_TIMEZONES,
  };
};

export const getTimezonesSuccess = timezones => {
  return {
    type: GET_TIMEZONES_SUCCESS,
    timezones,
  };
};

export const getLocales = () => {
  return {
    type: GET_LOCALES,
  };
};

export const getLocalesSuccess = locales => {
  return {
    type: GET_LOCALES_SUCCESS,
    locales,
  };
};

export const getCurrencies = () => {
  return {
    type: GET_CURRENCIES,
  };
};

export const getCurrenciesSuccess = currencies => {
  return {
    type: GET_CURRENCIES_SUCCESS,
    currencies,
  };
};

export const getCurrencyById = params => {
  return {
    type: GET_CURRENCY_BY_ID,
    params,
  };
};

export const getCurrencyByIdSuccess = data => {
  return {
    type: GET_CURRENCY_BY_ID_SUCCESS,
    data,
  };
};

export const getCurrencyByIdClear = () => {
  return {
    type: GET_CURRENCY_BY_ID_CLEAR,
  };
};

export const fetchAllCountries = () => {
  return {
    type: FETCH_ALL_COUNTRIES,
  };
};

export const fetchAllCountriesSuccess = countries => {
  return {
    type: FETCH_ALL_COUNTRIES_SUCCESS,
    countries: countries,
  };
};

export const fetchStatesByCountry = countryCode => {
  return {
    type: FETCH_ALL_STATES_BY_COUNTRY,
    countryCode: countryCode,
  };
};

export const fetchStatesByCountrySuccess = states => {
  return {
    type: FETCH_ALL_STATES_BY_COUNTRY_SUCCESS,
    states: states,
  };
};

export const resetStatesOnCountryNull = () => {
  return {
    type: RESET_STATE_ON_COUNTRY_NULL
  };
};
