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

const INIT_STATE = {
  photoLoader: false,
  postedPhoto: undefined,
  listPhotos: undefined,
  deletePhoto: false,
  postedMedia: undefined,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case POST_EVENT_PHOTO: {
      return {
        ...state,
        photoLoader: true,
      };
    }

    case POST_EVENT_PHOTO_SUCCESS: {
      return {
        ...state,
        photoLoader: false,
        postedPhoto: action.data,
      };
    }

    case POST_EVENT_PHOTO_FAILURE: {
      return {
        ...state,
        photoLoader: false,
      };
    }

    case POST_EVENT_PHOTO_CLEAR: {
      return {
        ...state,
        photoLoader: false,
        postedPhoto: undefined,
      };
    }

    case LIST_EVENT_PHOTOS: {
      return {
        ...state,
        photoLoader: true,
      };
    }

    case LIST_EVENT_PHOTOS_SUCCESS: {
      return {
        ...state,
        photoLoader: false,
        listPhotos: action.data,
      };
    }

    case LIST_EVENT_PHOTOS_FAILURE: {
      return {
        ...state,
        photoLoader: false,
      };
    }

    case DELETE_EVENT_PHOTO: {
      return {
        ...state,
        photoLoader: true,
        deletePhoto: true,
      };
    }

    case DELETE_EVENT_PHOTO_SUCCESS: {
      return {
        ...state,
        photoLoader: false,
        deletePhoto: false,
      };
    }

    case DELETE_EVENT_PHOTO_FAILURE: {
      return {
        ...state,
        photoLoader: false,
        deletePhoto: false,
      };
    }

    case POST_MEDIA: {
      return {
        ...state,
        photoLoader: true,
      };
    }

    case POST_MEDIA_SUCCESS: {
      return {
        ...state,
        photoLoader: false,
        postedMedia: action.data,
      };
    }

    case POST_MEDIA_FAILURE: {
      return {
        ...state,
        photoLoader: false,
      };
    }

    case POST_MEDIA_CLEAR: {
      return {
        ...state,
        photoLoader: false,
        postedMedia: undefined,
      };
    }

    default:
      return state;
  }
};
