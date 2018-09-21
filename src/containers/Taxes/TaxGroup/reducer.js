import { fromJS, merge } from 'immutable';
import {
  FETCH_ALL_TAX_GROUP,
  FETCH_ALL_TAX_GROUP_SUCCESS,
  FETCH_ALL_TAX_GROUP_FAILURE,
  POST_TAX_GROUP,
  POST_TAX_GROUP_SUCCESS,
  POST_TAX_GROUP_FAILURE,
  PATCH_TAX_GROUP,
  PATCH_TAX_GROUP_SUCCESS,
  PATCH_TAX_GROUP_FAILURE,
  PUT_TAX_GROUP,
  PUT_TAX_GROUP_SUCCESS,
  PUT_TAX_GROUP_FAILURE,
  RESET_TAX_GROUP,
 } from './constants';

const INIT_STATE = fromJS({
  isFetching: false,
  actionSuccess: false,
  actionLoader: false,
  refetchList: false,
  newGroup: {},
  taxGroups: {
    "currentPage": 0,
    "totalCount": 0,
    "pageSize": 0,
    "totalPages": 0,
    "items": []
  },
});

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_ALL_TAX_GROUP: {
      return state
        .set('isFetching', true);
    }
    case FETCH_ALL_TAX_GROUP_SUCCESS: {
      return state
        .set('isFetching', false)
        .set('taxGroups', fromJS(action.payload))
        .set('refetchList', false)
        .set('actionSuccess', false);
    }
    case FETCH_ALL_TAX_GROUP_FAILURE: {
      return state
        .set('isFetching', false)
        .set('refetchList', false)
        .set('actionSuccess', false);
    }
    case RESET_TAX_GROUP: {
      return state
        .set('refetchList', true)
        .set('newGroup', fromJS({}));
    }

    case POST_TAX_GROUP: {
      return state
        .set('actionLoader', true);
    }
    case POST_TAX_GROUP_SUCCESS: {
      return state
        .set('actionLoader', false)
        .set('actionSuccess', true)
        .set('newGroup', fromJS(action.payload));
    }
    case POST_TAX_GROUP_FAILURE: {
      return state
        .set('actionLoader', false)
    }

    case PATCH_TAX_GROUP: {
      return state
        .set('actionLoader', true);
    }
    case PATCH_TAX_GROUP_SUCCESS: {
      return state
        .set('actionLoader', false)
        .set('actionSuccess', true);
    }
    case PATCH_TAX_GROUP_FAILURE: {
      return state
        .set('actionLoader', false)
    }

    case PUT_TAX_GROUP: {
      return state
        .set('actionLoader', true);
    }
    case PUT_TAX_GROUP_SUCCESS: {
      return state
        .set('actionLoader', false)
        .set('refetchList', true);
    }
    case PUT_TAX_GROUP_FAILURE: {
      return state
        .set('actionLoader', false)
    }

    default:
      return state;
  }
};
