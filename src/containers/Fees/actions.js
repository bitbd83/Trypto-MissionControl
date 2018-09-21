import {
  FETCH_ALL_FEES,
  FETCH_ALL_FEES_SUCCESS,
  POST_FEES,
  POST_FEES_SUCCESS,
  POST_FEES_FAIL,
  PATCH_FEES,
  PATCH_FEES_SUCCESS,
  PATCH_FEES_FAIL,
  PUT_FEES,
  PUT_FEES_SUCCESS,
  PUT_FEES_FAIL,
  RESET_NEW_FEE,
  FETCH_ALL_FEES_FAIL
} from './constants';

export const fetchAllFees = data => {
  return {
    type: FETCH_ALL_FEES,
    payload: data,
  };
};

export const fetchAllFeesSuccess = data => {
  return {
    type: FETCH_ALL_FEES_SUCCESS,
    payload: data,
  };
};

export const fetchAllFeessFail = data => {
  return {
    type: FETCH_ALL_FEES_FAIL,
    payload: data,
  };
};


export const resetNewFee = () => {
  return {
    type: RESET_NEW_FEE,
  };
};




export const addFees = data => {
  return {
    type: POST_FEES,
    payload: data,
  };
};

export const addFeesSuccess = data => {
  return {
    type: POST_FEES_SUCCESS,
    payload: data,
  };
};

export const addFeesFail = data => {
  return {
    type: POST_FEES_FAIL,
    payload: data,
  };
};

export const patchFees = data => {
  return {
    type: PATCH_FEES,
    payload: data,
  };
};

export const patchFeesSuccess = data => {
  return {
    type: PATCH_FEES_SUCCESS,
    payload: data,
  };
};

export const patchFeesFail = data => {
  return {
    type: PATCH_FEES_FAIL,
    payload: data,
  };
};

export const putFees = data => {
  return {
    type: PUT_FEES,
    payload: data,
  };
};

export const putFeesSuccess = data => {
  return {
    type: PUT_FEES_SUCCESS,
    payload: data,
  };
};

export const putFeesFail = data => {
  return {
    type: PUT_FEES_FAIL,
    payload: data,
  };
};
