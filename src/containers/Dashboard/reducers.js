/*
 *
 * Dashboard reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  TOP_EVENT_LIST_FAILURE,
  TOP_EVENT_LIST_SUCCESS,
  TOP_EVENT_LIST
} from './constants';

export const initialState = fromJS({
  loadingEvents: false,
  topEvents: {
    currentPage: 0,
    totalCount: 0,
    pageSize: 0,
    totalPages: 0,
    items: []
  }
});

function dashboardReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;

    case TOP_EVENT_LIST: {
      return state
        .set('isFetching', true);
    }
    case TOP_EVENT_LIST_SUCCESS: {
      return state
        .set('isFetching', false)
        .set('topEvents', fromJS(action.payload));
    }
    case TOP_EVENT_LIST_FAILURE: {
      return state
        .set('isFetching', false)
        .set('topEvents', fromJS({
          currentPage: 0,
          totalCount: 0,
          pageSize: 0,
          totalPages: 0,
          items: []
        }));
    }
    default:
      return state;
  }
}

export default dashboardReducer;
