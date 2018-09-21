import {
  FETCH_CROSS_SELLS,
  FETCH_CROSS_SELLS_SUCCESS,
  FETCH_UP_SELLS,
  FETCH_UP_SELLS_SUCCESS,
  DELETE_CROSS_SELL,
  DELETE_CROSS_SELL_SUCCESS,
  DELETE_UP_SELL,
  DELETE_UP_SELL_SUCCESS,
  GET_ALL_TICKET_TYPES,
  GET_ALL_TICKET_TYPES_SUCCESS,
  ADD_CROSS_SELLS,
  ADD_CROSS_SELLS_SUCCESS,
  ADD_UP_SELLS,
  ADD_UP_SELLS_SUCCESS,
} from './constants';
import { fromJS } from 'immutable';

const initialState = fromJS({
  actionLoader: false,
  isFetchingCross: false,
  isFetchingUp: false,
  isFetchingTickets:false,
  refetchCross: false,
  refetchUp: false,
  crossSells: {},
  upSells: {},
  allTickets: {
    "currentPage": 1,
    "totalCount": 10,
    "pageSize": 10,
    "totalPages": 1,
    "items": []
  }
});

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CROSS_SELLS: {
      return state
        .set('isFetchingCross', true)
        .set('refetchCross', false)
    }
    case FETCH_CROSS_SELLS_SUCCESS: {
      return state
        .set('isFetchingCross', false)
        .set('crossSells', fromJS(action.payload));
    }
    case FETCH_UP_SELLS: {
      return state
        .set('isFetchingUp', true)
        .set('refetchUp', false)
    }
    case FETCH_UP_SELLS_SUCCESS: {
      return state
        .set('isFetchingUp', false)
        .set('upSells', fromJS(action.payload));
    }
    case DELETE_CROSS_SELL: {
      return state
        .set('actionLoader', true)
        .set('refetchCross', false)
    }
    case DELETE_CROSS_SELL_SUCCESS: {
      return state
        .set('actionLoader', false)
        .set('refetchCross', true)
    }
    case DELETE_UP_SELL: {
      return state
        .set('actionLoader', true)
        .set('refetchUp', false)
    }
    case DELETE_UP_SELL_SUCCESS: {
      return state
        .set('actionLoader', false)
        .set('refetchUp', true)
    }
    case GET_ALL_TICKET_TYPES: {
      return state
        .set('isFetchingTickets', true)
    }
    case GET_ALL_TICKET_TYPES_SUCCESS: {
      return state
        .set('isFetchingTickets', false)
        .set('allTickets', fromJS(action.payload));
    }
    case ADD_CROSS_SELLS: {
      return state
        .set('actionLoader', true)
    }
    case ADD_CROSS_SELLS_SUCCESS: {
      return state
        .set('actionLoader', false)
        .set('refetchCross', true)
    }
    case ADD_UP_SELLS: {
      return state
        .set('actionLoader', true)
    }
    case ADD_UP_SELLS_SUCCESS: {
      return state
        .set('actionLoader', false)
        .set('refetchUp', true)
    }
    default:
      return state;
  }
};
