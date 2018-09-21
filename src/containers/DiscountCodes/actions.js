import {
  FETCH_ALL_CODES,
  FETCH_ALL_CODES_SUCCESS,
  FETCH_ALL_CODES_FAILURE,
  POST_CODES,
  POST_CODES_SUCCESS,
  POST_CODES_FAILURE,
  PATCH_CODES,
  PATCH_CODES_SUCCESS,
  PATCH_CODES_FAILURE,
  PUT_CODES,
  PUT_CODES_SUCCESS,
  PUT_CODES_FAILURE,
} from './constants';


export const fetchAllCodes = data => {
  return {
    type: FETCH_ALL_CODES,
    payload: data,
  };
};

export const fetchAllCodesSuccess = data => {
  return {
    type: FETCH_ALL_CODES_SUCCESS,
    payload: data,
  };
};

export const fetchAllCodesFailure = data => {
  return {
    type: FETCH_ALL_CODES_FAILURE,
    payload: data,
  };
};

export const putCode = data => {
  return {
    type: PUT_CODES,
    payload: data,
  };
};

export const putCodeSuccess = data => {
  return {
    type: PUT_CODES_SUCCESS,
    payload: data,
  };
};

export const putCodeFailure = data => {
  return {
    type: PUT_CODES_FAILURE,
    payload: data,
  };
};

export const postCode = data => {
  return {
    type: POST_CODES,
    payload: data,
  };
};

export const postCodeSuccess = data => {
  return {
    type: POST_CODES_SUCCESS,
    payload: data,
  };
};

export const postCodeFailure = data => {
  return {
    type: POST_CODES_FAILURE,
    payload: data,
  };
};

export const patchCode = data => {
  return {
    type: PATCH_CODES,
    payload: data,
  };
};

export const patchCodeSuccess = data => {
  return {
    type: PATCH_CODES_SUCCESS,
    payload: data,
  };
};

export const patchCodeFailure = data => {
  return {
    type: PATCH_CODES_FAILURE,
    payload: data,
  };
};

