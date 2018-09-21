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

const INIT_STATE = {
  isFetching: false,
  eventsLoader: false,
  alertMessage: '',
  showMessage: false,
  postedData: {},
  eventById: undefined,
  patchedEvent: undefined,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case POST_EVENTS: {
      return {
        ...state,
        eventsLoader: true,
      };
    }
    case POST_EVENTS_SUCCESS: {
      return {
        ...state,
        eventsLoader: false,
        postedData: action.data,
      };
    }
    case POST_EVENTS_FAILURE: {
      return {
        ...state,
        eventsLoader: false,
      };
    }

    case POST_EVENTS_CLEAR: {
      return {
        ...state,
        eventsLoader: false,
        postedData: {},
        patchedEvent: undefined,
      };
    }

    case GET_EVENT_BY_ID: {
      return {
        ...state,
        isFetching: true,
      };
    }

    case GET_EVENT_BY_ID_SUCCESS: {
      return {
        ...state,
        eventById: action.data,
        isFetching: false,
      };
    }
    case GET_EVENT_BY_ID_FAILURE: {
      return {
        ...state,
        isFetching: false,
      };
    }

    case GET_EVENT_BY_ID_CLEAR: {
      return {
        ...state,
        eventById: undefined,
      };
    }

    case PATCH_EVENTS: {
      return {
        ...state,
        eventsLoader: true,
      };
    }

    case PATCH_EVENTS_SUCCESS: {
      return {
        ...state,
        patchedEvent: action.data,
        eventsLoader: false,
      };
    }

    case PATCH_EVENTS_FAILURE: {
      return {
        ...state,
        eventsLoader: false,
      };
    }

    case SHOW_MESSAGE: {
      return {
        ...state,
        alertMessage: action.message,
        showMessage: true,
        eventsLoader: false,
      };
    }
    case HIDE_MESSAGE: {
      return {
        ...state,
        alertMessage: '',
        showMessage: false,
        eventsLoader: false,
      };
    }

    default:
      return state;
  }
};
