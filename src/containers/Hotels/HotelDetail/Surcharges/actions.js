import {
  FETCH_SURCHARGES,
  FETCH_SURCHARGES_SUCCESS,
  FETCH_SURCHARGES_FAILURE,
  ADD_SURCHARGE,
  ADD_SURCHARGE_SUCCESS,
  ADD_SURCHARGE_FAILURE,
  PATCH_SURCHARGE,
  PATCH_SURCHARGE_SUCCESS,
  PATCH_SURCHARGE_FAILURE,
  PUT_SURCHARGE,
  PUT_SURCHARGE_SUCCESS,
  PUT_SURCHARGE_FAILURE,
  RESET_SURCHARGE,
} from './constants';


export const fetchSurcharges = data => {
  return {
    type: FETCH_SURCHARGES,
    payload: data,
  };
};

export const fetchSurchargesSuccess = data => {
  return {
    type: FETCH_SURCHARGES_SUCCESS,
    payload: data,
  };
};

export const fetchSurchargesFailure = data => {
  return {
    type: FETCH_SURCHARGES_FAILURE,
    payload: data,
  };
};


export const resetSurcharge = () => {
  return {
    type: RESET_SURCHARGE
  };
};

export const addSurcharge = data => {
  return {
    type: ADD_SURCHARGE,
    payload: data,
  };
};

export const addSurchargeSuccess = data => {
  return {
    type: ADD_SURCHARGE_SUCCESS,
    payload: data,
  };
};

export const addSurchargeFailure = data => {
  return {
    type: ADD_SURCHARGE_FAILURE,
    payload: data,
  };
};

export const patchSurcharge = data => {
  return {
    type: PATCH_SURCHARGE,
    payload: data,
  };
};

export const patchSurchargeSuccess = data => {
  return {
    type: PATCH_SURCHARGE_SUCCESS,
    payload: data,
  };
};

export const patchSurchargeFailure = data => {
  return {
    type: PATCH_SURCHARGE_FAILURE,
    payload: data,
  };
};


export const putSurcharge = data => {
  return {
    type: PUT_SURCHARGE,
    payload: data,
  };
};

export const putSurchargeSuccess = data => {
  return {
    type: PUT_SURCHARGE_SUCCESS,
    payload: data,
  };
};

export const putSurchargeFailure = data => {
  return {
    type: PUT_SURCHARGE_FAILURE,
    payload: data,
  };
};
