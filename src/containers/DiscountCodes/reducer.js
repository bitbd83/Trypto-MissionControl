import { fromJS, merge } from 'immutable';
import {
  FETCH_ALL_CODES,
  FETCH_ALL_CODES_SUCCESS,
  FETCH_ALL_CODES_FAILURE,
  POST_CODES,
  POST_CODES_SUCCESS,
  POST_CODES_FAILURE,
  PATCH_CODES,
  PATCH_CODES_SUCCESS,
  PATCH_CODES_FAILURE,
  PUT_CODES,
  PUT_CODES_SUCCESS,
  PUT_CODES_FAILURE,
 } from './constants';

const INIT_STATE = fromJS({
  isFetching: false,
  actionLoader: false,
  refetchList: false,
  newCode: {},
  discountCodes: {
    "currentPage": 0,
    "totalCount": 0,
    "pageSize": 0,
    "totalPages": 0,
    "items": []
  },
});

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_ALL_CODES: {
      return state
        .set('isFetching', true);
    }
    case FETCH_ALL_CODES_SUCCESS: {
      return state
        .set('isFetching', false)
        .set('refetchList', false)
        .set('discountCodes', fromJS(action.payload));
    }
    case FETCH_ALL_CODES_FAILURE: {
      return state
        .set('isFetching', false)
        .set('refetchList', false)
    }

    case PUT_CODES: {
      return state
        .set('actionLoader', true)
        .set('refetchList', false);
    }
    case PUT_CODES_SUCCESS: {
      return state
        .set('actionLoader', false)
        .set('refetchList', true)
    }
    case PUT_CODES_FAILURE: {
      return state
        .set('actionLoader', false)
    }

    case POST_CODES: {
      return state
        .set('actionLoader', true)
        .set('refetchList', false);
    }
    case POST_CODES_SUCCESS: {
      let newCode = action.payload ? fromJS(action.payload) : fromJS({})
      return state
        .set('actionLoader', false)
        .set('refetchList', true)
        .set('newCode', newCode)
    }
    case POST_CODES_FAILURE: {
      return state
        .set('actionLoader', false)
    }

    case PATCH_CODES: {
      return state
        .set('actionLoader', true)
        .set('refetchList', false);
    }
    case PATCH_CODES_SUCCESS: {
      return state
        .set('actionLoader', false)
        .set('refetchList', true)
        // .set('newCode', fromJS(action.payload))
    }
    case PATCH_CODES_FAILURE: {
      return state
        .set('actionLoader', false)
    }
    default:
      return state;
  }
};
