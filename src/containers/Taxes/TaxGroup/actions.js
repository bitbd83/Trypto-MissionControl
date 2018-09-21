import {
  FETCH_ALL_TAX_GROUP,
  FETCH_ALL_TAX_GROUP_SUCCESS,
  FETCH_ALL_TAX_GROUP_FAILURE,
  POST_TAX_GROUP,
  POST_TAX_GROUP_SUCCESS,
  POST_TAX_GROUP_FAILURE,
  PATCH_TAX_GROUP,
  PATCH_TAX_GROUP_SUCCESS,
  PATCH_TAX_GROUP_FAILURE,
  PUT_TAX_GROUP,
  PUT_TAX_GROUP_SUCCESS,
  PUT_TAX_GROUP_FAILURE,
  RESET_TAX_GROUP,
} from './constants';


export const fetchAllTaxGroup = data => {
  return {
    type: FETCH_ALL_TAX_GROUP,
    payload: data,
  };
};

export const fetchAllTaxGroupSuccess = data => {
  return {
    type: FETCH_ALL_TAX_GROUP_SUCCESS,
    payload: data,
  };
};

export const fetchAllTaxGroupFailure = data => {
  return {
    type: FETCH_ALL_TAX_GROUP_FAILURE,
    payload: data,
  };
};


export const addTaxGroup = data => {
  return {
    type: POST_TAX_GROUP,
    payload: data,
  };
};

export const addTaxGroupSuccess = data => {
  return {
    type: POST_TAX_GROUP_SUCCESS,
    payload: data,
  };
};

export const addTaxGroupFailure = data => {
  return {
    type: POST_TAX_GROUP_FAILURE,
    payload: data,
  };
};

export const patchTaxGroup = data => {
  return {
    type: PATCH_TAX_GROUP,
    payload: data,
  };
};

export const patchTaxGroupSuccess = data => {
  return {
    type: PATCH_TAX_GROUP_SUCCESS,
    payload: data,
  };
};

export const patchTaxGroupFailure = data => {
  return {
    type: PATCH_TAX_GROUP_FAILURE,
    payload: data,
  };
};

export const putTaxGroup = data => {
  return {
    type: PUT_TAX_GROUP,
    payload: data,
  };
};

export const putTaxGroupSuccess = data => {
  return {
    type: PUT_TAX_GROUP_SUCCESS,
    payload: data,
  };
};

export const putTaxGroupFailure = data => {
  return {
    type: PUT_TAX_GROUP_FAILURE,
    payload: data,
  };
};
export const resetTaxGroup = () => {
  return {
    type: RESET_TAX_GROUP
  };
};
