import {
  POST_EVENTS,
  POST_EVENTS_SUCCESS,
  POST_EVENTS_FAILURE,
  POST_EVENTS_CLEAR,
  GET_EVENT_BY_ID,
  GET_EVENT_BY_ID_SUCCESS,
  GET_EVENT_BY_ID_FAILURE,
  GET_EVENT_BY_ID_CLEAR,
  PATCH_EVENTS,
  PATCH_EVENTS_SUCCESS,
  PATCH_EVENTS_FAILURE,
} from './constants';
import { HIDE_MESSAGE, SHOW_MESSAGE } from 'constants/ActionTypes';

export const postEvents = params => {
  return {
    type: POST_EVENTS,
    params,
  };
};

export const postEventsSuccess = data => {
  return {
    type: POST_EVENTS_SUCCESS,
    data,
  };
};

export const postEventsFailure = data => {
  return {
    type: POST_EVENTS_FAILURE,
    data,
  };
};

export const postEventsClear = () => {
  return {
    type: POST_EVENTS_CLEAR,
  };
};

export const showEventsMessage = message => {
  return {
    type: SHOW_MESSAGE,
    message,
  };
};

export const hideMessage = () => {
  return {
    type: HIDE_MESSAGE,
  };
};

export const getEventById = params => {
  return {
    type: GET_EVENT_BY_ID,
    params,
  };
};

export const getEventByIdSuccess = data => {
  return {
    type: GET_EVENT_BY_ID_SUCCESS,
    data,
  };
};

export const getEventByIdFailure = data => {
  return {
    type: GET_EVENT_BY_ID_FAILURE,
    data,
  };
};

export const getEventByIdClear = () => {
  return {
    type: GET_EVENT_BY_ID_CLEAR,
  };
};

export const patchEvents = params => {
  return {
    type: PATCH_EVENTS,
    params,
  };
};

export const patchEventsSuccess = data => {
  return {
    type: PATCH_EVENTS_SUCCESS,
    data,
  };
};

export const patchEventsFailure = data => {
  return {
    type: PATCH_EVENTS_FAILURE,
    data,
  };
};
