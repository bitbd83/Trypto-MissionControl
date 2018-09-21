import {
  FETCH_ALL_TAX_RATES,
  FETCH_ALL_TAX_RATES_SUCCESS,
  FETCH_ALL_TAX_RATES_FAILURE,
  POST_TAX_RATE,
  POST_TAX_RATE_SUCCESS,
  POST_TAX_RATE_FAILURE,
  PATCH_TAX_RATE,
  PATCH_TAX_RATE_SUCCESS,
  PATCH_TAX_RATE_FAILURE,
  PUT_TAX_RATE,
  PUT_TAX_RATE_SUCCESS,
  PUT_TAX_RATE_FAILURE,
  GET_TAX_GROUP,
  GET_TAX_GROUP_SUCCESS,
  GET_TAX_GROUP_FAILURE,
  RESET_TAX_RATE,
} from './constants';


export const fetchAllTaxRates = data => {
  return {
    type: FETCH_ALL_TAX_RATES,
    payload: data,
  };
};

export const fetchAllTaxRatesSuccess = data => {
  return {
    type: FETCH_ALL_TAX_RATES_SUCCESS,
    payload: data,
  };
};

export const fetchAllTaxRatesFailure = data => {
  return {
    type: FETCH_ALL_TAX_RATES_FAILURE,
    payload: data,
  };
};

export const getTaxGroup = data => {
  return {
    type: GET_TAX_GROUP,
    payload: data,
  };
};

export const getTaxGroupSuccess = data => {
  return {
    type: GET_TAX_GROUP_SUCCESS,
    payload: data,
  };
};

export const getTaxGroupFailure = data => {
  return {
    type: GET_TAX_GROUP_FAILURE,
    payload: data,
  };
};

export const addTaxRate = data => {
  return {
    type: POST_TAX_RATE,
    payload: data,
  };
};

export const addTaxRateSuccess = data => {
  return {
    type: POST_TAX_RATE_SUCCESS,
    payload: data,
  };
};

export const addTaxRateFailure = () => {
  return {
    type: POST_TAX_RATE_FAILURE
  };
};

export const patchTaxRate = data => {
  return {
    type: PATCH_TAX_RATE,
    payload: data,
  };
};

export const patchTaxRateSuccess = data => {
  return {
    type: PATCH_TAX_RATE_SUCCESS,
    payload: data,
  };
};

export const patchTaxRateFailure = data => {
  return {
    type: PATCH_TAX_RATE_FAILURE,
    payload: data,
  };
};

export const putTaxRate = data => {
  return {
    type: PUT_TAX_RATE,
    payload: data,
  };
};

export const putTaxRateSuccess = data => {
  return {
    type: PUT_TAX_RATE_SUCCESS,
    payload: data,
  };
};

export const putTaxRateFailure = data => {
  return {
    type: PUT_TAX_RATE_FAILURE,
    payload: data,
  };
};

export const resetTaxRate = () => {
  return {
    type: RESET_TAX_RATE
  };
};
