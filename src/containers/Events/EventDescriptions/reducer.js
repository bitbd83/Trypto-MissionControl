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

const INIT_STATE = {
  mediaLoader: true,
  media: {},
  mediaData: undefined,
  eventDescription: undefined,
  postedDesc: undefined,
  descLoader: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_MEDIA: {
      return {
        ...state,
        mediaLoader: true,
      };
    }
    case GET_MEDIA_SUCCESS: {
      return {
        ...state,
        mediaLoader: false,
        media: action.media,
      };
    }
    case GET_MEDIA_FAILURE: {
      return {
        ...state,
        mediaLoader: false,
      };
    }

    case GET_SELECTED_MEDIA: {
      return {
        ...state,
        mediaData: action.imgData,
      };
    }

    case GET_SELECTED_MEDIA_CLEAR: {
      return {
        ...state,
        mediaData: undefined,
      };
    }

    case GET_EVENT_DESCRIPTION_SUCCESS: {
      return {
        ...state,
        eventDescription: action.data,
        postedDesc: undefined,
      };
    }

    case GET_EVENT_DESCRIPTION_FAILURE: {
      return {
        ...state,
        postedDesc: undefined,
      };
    }

    case PATCH_EVENT_DESCRIPTION: {
      return {
        ...state,
        descLoader: true,
      };
    }

    case PATCH_EVENT_DESCRIPTION_SUCCESS: {
      return {
        ...state,
        postedDesc: action.data,
        descLoader: false,
      };
    }

    case PATCH_EVENT_DESCRIPTION_FAILURE: {
      return {
        ...state,
        descLoader: false,
      };
    }

    case POST_EVENT_DESCRIPTION: {
      return {
        ...state,
        descLoader: true,
      };
    }

    case POST_EVENT_DESCRIPTION_SUCCESS: {
      return {
        ...state,
        postedDesc: action.data,
        descLoader: false,
      };
    }

    case POST_EVENT_DESCRIPTION_FAILURE: {
      return {
        ...state,
        descLoader: false,
      };
    }

    default:
      return state;
  }
};
