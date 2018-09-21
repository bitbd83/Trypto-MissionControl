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

export const fetchAllTransactionFee = data => {
  return {
    type: FETCH_ALL_TRANSACTION_FEE,
    payload: data,
  };
};

export const fetchAllTransactionFeeSuccess = data => {
  return {
    type: FETCH_ALL_TRANSACTION_FEE_SUCCESS,
    payload: data,
  };
};

export const fetchAllTransactionFeeFailure = data => {
  return {
    type: FETCH_ALL_TRANSACTION_FEE_FAILURE,
    payload: data,
  };
};

export const addTransactionFee = data => {
  return {
    type: ADD_TRANSACTION_FEE,
    payload: data,
  };
};

export const addTransactionFeeSuccess = data => {
  return {
    type: ADD_TRANSACTION_FEE_SUCCESS,
    payload: data,
  };
};

export const addTransactionFeeFailure = data => {
  return {
    type: ADD_TRANSACTION_FEE_FAILURE,
    payload: data,
  };
};

export const deleteTransactionFee = data => {
  return {
    type: DELETE_TRANSACTION_FEE,
    payload: data,
  };
};

export const deleteTransactionFeeSuccess = data => {
  return {
    type: DELETE_TRANSACTION_FEE_SUCCESS,
    payload: data,
  };
};

export const deleteTransactionFeeFailure = data => {
  return {
    type: DELETE_TRANSACTION_FEE_FAILURE,
    payload: data,
  };
};
