import {
  POST_EVENT_PHOTO,
  POST_EVENT_PHOTO_SUCCESS,
  POST_EVENT_PHOTO_FAILURE,
  POST_EVENT_PHOTO_CLEAR,
  LIST_EVENT_PHOTOS,
  LIST_EVENT_PHOTOS_SUCCESS,
  LIST_EVENT_PHOTOS_FAILURE,
  DELETE_EVENT_PHOTO,
  DELETE_EVENT_PHOTO_SUCCESS,
  DELETE_EVENT_PHOTO_FAILURE,
  POST_MEDIA,
  POST_MEDIA_SUCCESS,
  POST_MEDIA_FAILURE,
  POST_MEDIA_CLEAR,
} from './constants';

export const postEventPhoto = params => {
  return {
    type: POST_EVENT_PHOTO,
    params,
  };
};

export const postEventPhotoSuccess = data => {
  return {
    type: POST_EVENT_PHOTO_SUCCESS,
    data,
  };
};

export const postEventPhotoFailure = data => {
  return {
    type: POST_EVENT_PHOTO_FAILURE,
    data,
  };
};

export const postEventPhotoClear = () => {
  return {
    type: POST_EVENT_PHOTO_CLEAR,
  };
};

export const listEventPhotos = params => {
  return {
    type: LIST_EVENT_PHOTOS,
    params,
  };
};

export const listEventPhotosSuccess = data => {
  return {
    type: LIST_EVENT_PHOTOS_SUCCESS,
    data,
  };
};

export const listEventPhotosFailure = data => {
  return {
    type: LIST_EVENT_PHOTOS_FAILURE,
    data,
  };
};

export const deleteEventPhoto = params => {
  return {
    type: DELETE_EVENT_PHOTO,
    params,
  };
};

export const deleteEventPhotoSuccess = data => {
  return {
    type: DELETE_EVENT_PHOTO_SUCCESS,
    data,
  };
};

export const deleteEventPhotoFailure = data => {
  return {
    type: DELETE_EVENT_PHOTO_FAILURE,
    data,
  };
};

export const postMedia = params => {
  return {
    type: POST_MEDIA,
    params,
  };
};

export const postMediaSuccess = data => {
  return {
    type: POST_MEDIA_SUCCESS,
    data,
  };
};

export const postMediaFailure = data => {
  return {
    type: POST_MEDIA_FAILURE,
    data,
  };
};

export const postMediaClear = () => {
  return {
    type: POST_MEDIA_CLEAR,
  };
};
