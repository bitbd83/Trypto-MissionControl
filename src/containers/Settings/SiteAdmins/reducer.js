/*
 *
 * PaymentProcessors reducer
 *
 */

import { fromJS } from 'immutable';
import {
  FETCH_SITE_ADMINS,
  FETCH_SITE_ADMINS_SUCCESS,
  FETCH_SITE_ADMINS_FAILURE,
  POST_SITE_ADMIN,
  POST_SITE_ADMIN_SUCCESS,
  POST_SITE_ADMIN_FAILURE,
  PUT_SITE_ADMIN,
  PUT_SITE_ADMIN_SUCCESS,
  PUT_SITE_ADMIN_FAILURE,
  PATCH_SITE_ADMIN,
  PATCH_SITE_ADMIN_SUCCESS,
  PATCH_SITE_ADMIN_FAILURE,
} from './constants';

const INIT_STATE = fromJS({
  isFetching: false,
  postLoader: false,
  actionLoader: false,
  refetchList: false,
  siteAdmins: {
    currentPage: 0,
    totalCount: 0,
    pageSize: 0,
    totalPages: 0,
    items: [],
  },
  newProcessors: {},
});

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_SITE_ADMINS: {
      return state.set('isFetching', true)
            .set('refetchList', false);
    }
    case FETCH_SITE_ADMINS_SUCCESS: {
      return state
        .set('isFetching', false)
        .set('siteAdmins', fromJS(action.data))
        .set('newProcessors', fromJS({}));
    }
    case FETCH_SITE_ADMINS_FAILURE: {
      return state
        .set('isFetching', false)
    }

    case POST_SITE_ADMIN: {
      return state.set('actionLoader', true);
    }
    case POST_SITE_ADMIN_SUCCESS: {
      return state
        .set('actionLoader', false)
        .set('refetchList', true)
        .set('newProcessors', fromJS(action.data));
    }
    case POST_SITE_ADMIN_FAILURE: {
      return state
        .set('actionLoader', false)
    }

    case PUT_SITE_ADMIN: {
      return state.set('actionLoader', true);
    }
    case PUT_SITE_ADMIN_SUCCESS: {
      return state
        .set('actionLoader', false)
        .set('refetchList', true)
    }
    case PUT_SITE_ADMIN_FAILURE: {
      return state
        .set('actionLoader', false)
    }

    case PATCH_SITE_ADMIN: {
      return state.set('actionLoader', true);
    }
    case PATCH_SITE_ADMIN_SUCCESS: {
      return state
        .set('actionLoader', false)
        .set('refetchList', true)
    }
    case PATCH_SITE_ADMIN_FAILURE: {
      return state
        .set('actionLoader', false)
    }

    default:
      return state;
  }
};
