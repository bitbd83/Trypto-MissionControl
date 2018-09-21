/*
 *
 * Venues actions
 *
 */

import {
  LIST_VENUES,
  LIST_VENUES_SUCCESS,
  LIST_VENUES_FAILURE,
  GET_VENUE_BY_ID,
  GET_VENUE_BY_ID_SUCCESS,
  GET_VENUE_BY_ID_FAILURE,
  GET_VENUE_BY_ID_CLEAR,
  ADD_UPDATE_VENUE_STATE,
  ADD_UPDATE_VENUE_STATE_SUCCESS,
  ADD_UPDATE_VENUE_STATE_FAILURE,
  POST_VENUES,
  POST_VENUES_SUCCESS,
  POST_VENUES_FAILURE,
  POST_VENUES_CLEAR,
  PATCH_VENUE_BY_ID,
  PATCH_VENUE_BY_ID_SUCCESS,
  PATCH_VENUE_BY_ID_FAILURE,
  PUT_VENUE_BY_ID,
  PUT_VENUE_BY_ID_SUCCESS,
  PUT_VENUE_BY_ID_FAILURE,
} from './constants';

export const listVenues = params => {
  return {
    type: LIST_VENUES,
    params,
  };
};

export const listVenuesSuccess = venues => {
  return {
    type: LIST_VENUES_SUCCESS,
    venues,
  };
};

export const listVenuesFailure = errorCode => {
  return {
    type: LIST_VENUES_FAILURE,
    errorCode,
  };
};

export const getVenueById = params => {
  return {
    type: GET_VENUE_BY_ID,
    params,
  };
};

export const getVenueByIdSuccess = venueById => {
  return {
    type: GET_VENUE_BY_ID_SUCCESS,
    venueById,
  };
};

export const getVenueByIdFailure = venueById => {
  return {
    type: GET_VENUE_BY_ID_FAILURE,
    venueById,
  };
};

export const getVenueByIdClear = () => {
  return {
    type: GET_VENUE_BY_ID_CLEAR,
  };
};

export const addUpdateVenueState = param => {
  return {
    type: ADD_UPDATE_VENUE_STATE,
    param,
  };
};

export const addUpdateVenueStateSuccess = edit => {
  return {
    type: ADD_UPDATE_VENUE_STATE_SUCCESS,
    edit,
  };
};

export const addUpdateVenueStateFailure = edit => {
  return {
    type: ADD_UPDATE_VENUE_STATE_FAILURE,
    edit,
  };
};

export const postVenues = params => {
  return {
    type: POST_VENUES,
    params,
  };
};

export const postVenuesSuccess = data => {
  return {
    type: POST_VENUES_SUCCESS,
    data,
  };
};

export const postVenuesFailure = data => {
  return {
    type: POST_VENUES_FAILURE,
    data,
  };
};

export const postVenuesClear = () => {
  return {
    type: POST_VENUES_CLEAR,
  };
};

export const patchVenueById = params => {
  return {
    type: PATCH_VENUE_BY_ID,
    params,
  };
};

export const patchVenueByIdSuccess = data => {
  return {
    type: PATCH_VENUE_BY_ID_SUCCESS,
    data,
  };
};

export const patchVenueByIdFailure = data => {
  return {
    type: PATCH_VENUE_BY_ID_FAILURE,
    data,
  };
};

export const putVenueById = params => {
  return {
    type: PUT_VENUE_BY_ID,
    params,
  };
};

export const putVenueByIdSuccess = data => {
  return {
    type: PUT_VENUE_BY_ID_SUCCESS,
    data,
  };
};

export const putVenueByIdFailure = data => {
  return {
    type: PUT_VENUE_BY_ID_FAILURE,
    data,
  };
};
