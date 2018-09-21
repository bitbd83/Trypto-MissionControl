import {
  GET_MEDIA,
  GET_MEDIA_SUCCESS,
  GET_MEDIA_FAILURE,
  GET_SELECTED_MEDIA,
  GET_SELECTED_MEDIA_CLEAR,
  GET_EVENT_DESCRIPTION,
  GET_EVENT_DESCRIPTION_SUCCESS,
  GET_EVENT_DESCRIPTION_FAILURE,
  PATCH_EVENT_DESCRIPTION,
  PATCH_EVENT_DESCRIPTION_SUCCESS,
  PATCH_EVENT_DESCRIPTION_FAILURE,
  POST_EVENT_DESCRIPTION,
  POST_EVENT_DESCRIPTION_SUCCESS,
  POST_EVENT_DESCRIPTION_FAILURE,
} from './constants';

export const getMedia = params => {
  return {
    type: GET_MEDIA,
    params,
  };
};

export const getMediaSuccess = media => {
  return {
    type: GET_MEDIA_SUCCESS,
    media,
  };
};

export const getMediaFailure = media => {
  return {
    type: GET_MEDIA_FAILURE,
    media,
  };
};

export const getSelectedMedia = imgData => {
  return {
    type: GET_SELECTED_MEDIA,
    imgData,
  };
};

export const getSelectedMediaClear = () => {
  return {
    type: GET_SELECTED_MEDIA_CLEAR,
  };
};

export const getEventDescription = params => {
  return {
    type: GET_EVENT_DESCRIPTION,
    params,
  };
};

export const getEventDescriptionSuccess = data => {
  return {
    type: GET_EVENT_DESCRIPTION_SUCCESS,
    data,
  };
};

export const getEventDescriptionFailure = data => {
  return {
    type: GET_EVENT_DESCRIPTION_FAILURE,
    data,
  };
};

export const patchEventDescription = params => {
  return {
    type: PATCH_EVENT_DESCRIPTION,
    params,
  };
};

export const patchEventDescriptionSuccess = data => {
  return {
    type: PATCH_EVENT_DESCRIPTION_SUCCESS,
    data,
  };
};

export const patchEventDescriptionFailure = data => {
  return {
    type: PATCH_EVENT_DESCRIPTION_FAILURE,
    data,
  };
};

export const postEventDescription = params => {
  return {
    type: POST_EVENT_DESCRIPTION,
    params,
  };
};

export const postEventDescriptionSuccess = data => {
  return {
    type: POST_EVENT_DESCRIPTION_SUCCESS,
    data,
  };
};

export const postEventDescriptionFailure = data => {
  return {
    type: POST_EVENT_DESCRIPTION_FAILURE,
    data,
  };
};
