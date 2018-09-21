import { fromJS, merge } from 'immutable';
import {
  FETCH_ALL_TRANSACTION_FEE,
  FETCH_ALL_TRANSACTION_FEE_SUCCESS,
  FETCH_ALL_TRANSACTION_FEE_FAILURE,
  ADD_TRANSACTION_FEE,
  ADD_TRANSACTION_FEE_SUCCESS,
  ADD_TRANSACTION_FEE_FAILURE,
  DELETE_TRANSACTION_FEE,
  DELETE_TRANSACTION_FEE_SUCCESS,
  DELETE_TRANSACTION_FEE_FAILURE,
 } from './constants';

const INIT_STATE = fromJS({
  isFetching: false,
  actionLoader: false,
  refetchList: false,
  newTransactionFee: {},
  transactionFee: {
    "currentPage": 0,
    "totalCount": 0,
    "pageSize": 0,
    "totalPages": 0,
    "items": []
  }
});

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_ALL_TRANSACTION_FEE: {
      return state
        .set('isFetching', true)
        .set('refetchList', false)
        .set('newTransactionFee', fromJS({}));
    }
    case FETCH_ALL_TRANSACTION_FEE_SUCCESS: {
      return state
        .set('isFetching', false)
        .set('transactionFee', fromJS(action.payload));
    }
    case FETCH_ALL_TRANSACTION_FEE_FAILURE: {
      return state
        .set('isFetching', false)
    }

    case ADD_TRANSACTION_FEE: {
      return state
        .set('actionLoader', true)
        .set('refetchList', false)
        .set('newTransactionFee', fromJS({}));
    }
    case ADD_TRANSACTION_FEE_SUCCESS: {
      return state
        .set('actionLoader', false)
        .set('refetchList', true)
        .set('newTransactionFee', fromJS(action.payload));
    }
    case ADD_TRANSACTION_FEE_FAILURE: {
      return state
        .set('actionLoader', false)
    }

    case DELETE_TRANSACTION_FEE: {
      return state
        .set('actionLoader', true)
        .set('refetchList', false)
    }
    case DELETE_TRANSACTION_FEE_SUCCESS: {
      return state
        .set('actionLoader', false)
        .set('refetchList', true)
    }
    case DELETE_TRANSACTION_FEE_FAILURE: {
      return state
        .set('actionLoader', false)
    }
    default:
      return state;
  }
};
