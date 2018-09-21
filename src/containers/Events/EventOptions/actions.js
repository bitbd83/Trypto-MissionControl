import {
  GET_FEATURE_OPTIONS,
  GET_FEATURE_OPTIONS_SUCCESS,
  GET_FEATURE_OPTIONS_FAILURE,
  GET_EVENT_PAYMENT_PROCESSOR,
  GET_EVENT_PAYMENT_PROCESSOR_SUCCESS,
  GET_EVENT_PAYMENT_PROCESSOR_FAILURE,
  POST_EVENT_PAYMENT_PROCESSOR,
  POST_EVENT_PAYMENT_PROCESSOR_SUCCESS,
  POST_EVENT_PAYMENT_PROCESSOR_FAILURE,
  POST_HOTEL_INVENTORY,
  POST_HOTEL_INVENTORY_SUCCESS,
  POST_HOTEL_INVENTORY_FAILURE,
  DELETE_HOTEL_INVENTORY,
  DELETE_HOTEL_INVENTORY_SUCCESS,
  DELETE_HOTEL_INVENTORY_FAILURE,
} from './constants';

export const getFeatureOptions = param => {
  return {
    type: GET_FEATURE_OPTIONS,
    param,
  };
};

export const getFeatureOptionsSuccess = options => {
  return {
    type: GET_FEATURE_OPTIONS_SUCCESS,
    options,
  };
};

export const getFeatureOptionsFailure = options => {
  return {
    type: GET_FEATURE_OPTIONS_FAILURE,
    options,
  };
};

export const getEventPaymentProcessor = param => {
  return {
    type: GET_EVENT_PAYMENT_PROCESSOR,
    param,
  };
};

export const getEventPaymentProcessorSuccess = paymentProcessor => {
  return {
    type: GET_EVENT_PAYMENT_PROCESSOR_SUCCESS,
    paymentProcessor,
  };
};

export const getEventPaymentProcessorFailure = paymentProcessor => {
  return {
    type: GET_EVENT_PAYMENT_PROCESSOR_FAILURE,
    paymentProcessor,
  };
};

export const postEventPaymentProcessor = param => {
  return {
    type: POST_EVENT_PAYMENT_PROCESSOR,
    param,
  };
};

export const postEventPaymentProcessorSuccess = postedPayment => {
  return {
    type: POST_EVENT_PAYMENT_PROCESSOR_SUCCESS,
    postedPayment,
  };
};

export const postEventPaymentProcessorFailure = postedPayment => {
  return {
    type: POST_EVENT_PAYMENT_PROCESSOR_FAILURE,
    postedPayment,
  };
};

export const postHotelInventory = data => {
  return {
    type: POST_HOTEL_INVENTORY,
    payload: data,
  };
};

export const postHotelInventorySuccess = data => {
  return {
    type: POST_HOTEL_INVENTORY_SUCCESS,
    payload: data,
  };
};

export const postHotelInventoryFailure = data => {
  return {
    type: POST_HOTEL_INVENTORY_FAILURE,
    payload: data,
  };
};

export const deleteHotelInventory = data => {
  return {
    type: DELETE_HOTEL_INVENTORY,
    payload: data,
  };
};

export const deleteHotelInventorySuccess = data => {
  return {
    type: DELETE_HOTEL_INVENTORY_SUCCESS,
    payload: data,
  };
};

export const deleteHotelInventoryFailure = data => {
  return {
    type: DELETE_HOTEL_INVENTORY_FAILURE,
    payload: data,
  };
};
