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

export const fetchCrossSells = data => {
  return {
    type: FETCH_CROSS_SELLS,
    payload: data,
  };
};

export const fetchCrossSellsSuccess = data => {
  return {
    type: FETCH_CROSS_SELLS_SUCCESS,
    payload: data,
  };
};

export const fetchUpSells = data => {
  return {
    type: FETCH_UP_SELLS,
    payload: data,
  };
};

export const fetchUpSellsSuccess = data => {
  return {
    type: FETCH_UP_SELLS_SUCCESS,
    payload: data,
  };
};

export const deleteCrossSell = data => {
  return {
    type: DELETE_CROSS_SELL,
    payload: data,
  };
};

export const deleteCrossSellSuccess = data => {
  return {
    type: DELETE_CROSS_SELL_SUCCESS,
    payload: data,
  };
};

export const deleteUpSell = data => {
  return {
    type: DELETE_UP_SELL,
    payload: data,
  };
};

export const deleteUpSellSuccess = data => {
  return {
    type: DELETE_UP_SELL_SUCCESS,
    payload: data,
  };
};

export const getAllTicketTypes = data => {
  return {
    type: GET_ALL_TICKET_TYPES,
    payload: data,
  };
};

export const getAllTicketTypesSuccess = data => {
  return {
    type: GET_ALL_TICKET_TYPES_SUCCESS,
    payload: data,
  };
};

export const addCrossSelles = data => {
  return {
    type: ADD_CROSS_SELLS,
    payload: data,
  };
};

export const addCrossSellesSuccess = data => {
  return {
    type: ADD_CROSS_SELLS_SUCCESS,
    payload: data,
  };
};

export const addUpSelles = data => {
  return {
    type: ADD_UP_SELLS,
    payload: data,
  };
};

export const addUpSellesSuccess = data => {
  return {
    type: ADD_UP_SELLS_SUCCESS,
    payload: data,
  };
};
