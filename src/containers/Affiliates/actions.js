import {
  FETCH_ALL_AFFILIATES,
  FETCH_ALL_AFFILIATES_SUCCESS,
  FETCH_ALL_AFFILIATES_FAILURE,
  FETCH_TRACKING_CODES,
  FETCH_TRACKING_CODES_SUCCESS,
  FETCH_TRACKING_CODES_FAILURE,
  ADD_AFFILIATES,
  ADD_AFFILIATES_SUCCESS,
  ADD_AFFILIATES_FAILURE,
  ADD_TRACKING_CODES,
  ADD_TRACKING_CODES_SUCCESS,
  ADD_TRACKING_CODES_FAILURE,
  PUT_AFFILIATES,
  PUT_AFFILIATES_SUCCESS,
  PUT_AFFILIATES_FAILURE,
  PUT_TRACKING_CODES,
  PUT_TRACKING_CODES_SUCCESS,
  PUT_TRACKING_CODES_FAILURE,
  PATCH_AFFILIATE,
  PATCH_AFFILIATE_SUCCESS,
  PATCH_AFFILIATE_FAILURE,
} from './constants';


export const fetchAllAffiliates = data => {
  return {
    type: FETCH_ALL_AFFILIATES,
    payload: data,
  };
};

export const fetchAllAffiliatesSuccess = data => {
  return {
    type: FETCH_ALL_AFFILIATES_SUCCESS,
    payload: data,
  };
};

export const fetchAllAffiliatesFailure = data => {
  return {
    type: FETCH_ALL_AFFILIATES_FAILURE,
    payload: data,
  };
};

export const fetchTrackingCodes = data => {
  return {
    type: FETCH_TRACKING_CODES,
    payload: data,
  };
};

export const fetchTrackingCodesSuccess = data => {
  return {
    type: FETCH_TRACKING_CODES_SUCCESS,
    payload: data,
  };
};

export const fetchTrackingCodesFailure = data => {
  return {
    type: FETCH_TRACKING_CODES_FAILURE,
    payload: data,
  };
};

export const addAffiliates = data => {
  return {
    type: ADD_AFFILIATES,
    payload: data,
  };
};

export const addAffiliatesSuccess = data => {
  return {
    type: ADD_AFFILIATES_SUCCESS,
    payload: data,
  };
};

export const addAffiliatesFailure = data => {
  return {
    type: ADD_AFFILIATES_FAILURE,
    payload: data,
  };
};

export const addTrackingCodes = data => {
  return {
    type: ADD_TRACKING_CODES,
    payload: data,
  };
};

export const addTrackingCodesSuccess = data => {
  return {
    type: ADD_TRACKING_CODES_SUCCESS,
    payload: data,
  };
};

export const addTrackingCodesFailure = data => {
  return {
    type: ADD_TRACKING_CODES_FAILURE,
    payload: data,
  };
};

export const putAffiliate = data => {
  return {
    type: PUT_AFFILIATES,
    payload: data,
  };
};

export const putAffiliateSuccess = data => {
  return {
    type: PUT_AFFILIATES_SUCCESS,
    payload: data,
  };
};

export const putAffiliateFailure = data => {
  return {
    type: PUT_AFFILIATES_FAILURE,
    payload: data,
  };
};

export const putTrackingCodes = data => {
  return {
    type: PUT_TRACKING_CODES,
    payload: data,
  };
};

export const putTrackingCodesSuccess = data => {
  return {
    type: PUT_TRACKING_CODES_SUCCESS,
    payload: data,
  };
};

export const putTrackingCodesFailure = data => {
  return {
    type: PUT_TRACKING_CODES_FAILURE,
    payload: data,
  };
};

export const patchAffiliate = data => {
  return {
    type: PATCH_AFFILIATE,
    payload: data,
  };
};

export const patchAffiliateSuccess = data => {
  return {
    type: PATCH_AFFILIATE_SUCCESS,
    payload: data,
  };
};

export const patchAffiliateFailure = data => {
  return {
    type: PATCH_AFFILIATE_FAILURE,
    payload: data,
  };
};
