import { fromJS, merge } from 'immutable';
import {
  FETCH_ALL_FEES,
  FETCH_ALL_FEES_SUCCESS,
  FETCH_ALL_FEES_FAIL,
  POST_FEES,
  POST_FEES_SUCCESS,
  POST_FEES_FAIL,
  PATCH_FEES,
  PATCH_FEES_SUCCESS,
  PATCH_FEES_FAIL,
  PUT_FEES,
  PUT_FEES_SUCCESS,
  PUT_FEES_FAIL,
  RESET_NEW_FEE,
 } from './constants';

const INIT_STATE = fromJS({
  isFetching: false,
  actionLoader: false,
  refetchList: false,
  newFees: {},
  fees: {
    "currentPage": 0,
    "totalCount": 0,
    "pageSize": 0,
    "totalPages": 0,
    "items": []
  },
});

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_ALL_FEES: {
      return state
        .set('isFetching', true);
    }
    case FETCH_ALL_FEES_SUCCESS: {
      return state
        .set('isFetching', false)
        .set('refetchList', false)
        .set('fees', fromJS(action.payload));
    }
    case FETCH_ALL_FEES_FAIL: {
      return state
        .set('isFetching', false)
        .set('refetchList', false)
    }

    case POST_FEES: {
      return state
        .set('actionLoader', true);
    }
    case POST_FEES_SUCCESS: {
      const newFees = action.payload ? fromJS(action.payload) : fromJS({})
      return state
        .set('actionLoader', false)
        .set('newFees', newFees)
        .set('refetchList', true);
    }
    case POST_FEES_FAIL: {
      return state
        .set('actionLoader', false)
    }

    case RESET_NEW_FEE: {
      return state
        .set('newFees',  fromJS({}));
    }

    case PATCH_FEES: {
      return state
        .set('actionLoader', true);
    }
    case PATCH_FEES_SUCCESS: {
      return state
        .set('actionLoader', false)
        .set('refetchList', true);
    }
    case PATCH_FEES_FAIL: {
      return state
        .set('actionLoader', false)
    }

    case PUT_FEES: {
      return state
        .set('actionLoader', true);
    }
    case PUT_FEES_SUCCESS: {
      return state
        .set('actionLoader', false)
        .set('refetchList', true);
    }
    case PUT_FEES_FAIL: {
      return state
        .set('actionLoader', false)
    }

    default:
      return state;
  }
};
