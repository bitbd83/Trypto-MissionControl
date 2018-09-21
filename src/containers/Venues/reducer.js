/*
 *
 * Venues reducer
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

const INIT_STATE = {
  loader: false,
  venuesList: {},
  venueById: {},
  edit: false,
  postedVenue: undefined,
  putVenue: undefined,
  postLoader: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case LIST_VENUES: {
      return {
        ...state,
        loader: true,
        putVenue: undefined,
      };
    }
    case LIST_VENUES_SUCCESS: {
      return {
        ...state,
        loader: false,
        venuesList: action.venues,
      };
    }
    case LIST_VENUES_FAILURE: {
      return {
        ...state,
        loader: false,
      };
    }

    case GET_VENUE_BY_ID_SUCCESS: {
      return {
        ...state,
        venueById: action.venueById,
      };
    }
    case GET_VENUE_BY_ID_FAILURE: {
      return {
        ...state
      };
    }
    case GET_VENUE_BY_ID_CLEAR: {
      return {
        ...state,
        venueById: {},
      };
    }
    case ADD_UPDATE_VENUE_STATE_SUCCESS: {
      return {
        ...state,
        edit: action.edit,
      };
    }
    case ADD_UPDATE_VENUE_STATE_FAILURE: {
      return {
        ...state
      };
    }

    case POST_VENUES: {
      return {
        ...state,
        postLoader: true,
      };
    }
    case POST_VENUES_SUCCESS: {
      return {
        ...state,
        postLoader: false,
        postedVenue: action.data,
      };
    }
    case POST_VENUES_FAILURE: {
      return {
        ...state,
        postLoader: false,
      };
    }

    case POST_VENUES_CLEAR: {
      return {
        ...state,
        postLoader: false,
        postedVenue: undefined,
      };
    }

    case PATCH_VENUE_BY_ID: {
      return {
        ...state,
        postLoader: true,
      };
    }
    case PATCH_VENUE_BY_ID_SUCCESS: {
      return {
        ...state,
        postLoader: false,
        postedVenue: action.data,
      };
    }
    case PATCH_VENUE_BY_ID_FAILURE: {
      return {
        ...state,
        postLoader: false,
      };
    }

    case PUT_VENUE_BY_ID_SUCCESS: {
      return {
        ...state,
        putVenue: action.data,
      };
    }

    case PUT_VENUE_BY_ID_FAILURE: {
      return {
        ...state
      };
    }

    default:
      return state;
  }
};
