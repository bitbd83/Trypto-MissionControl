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

const INIT_STATE = {
  optionsLoader: true,
  options: {},
  paymentProcessor: undefined,
  paymentLoader: false,
  postedPayment: undefined,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_FEATURE_OPTIONS_SUCCESS: {
      return {
        ...state,
        optionsLoader: false,
        options: action.options,
        postedPayment: undefined,
      };
    }
    case GET_FEATURE_OPTIONS_FAILURE: {
      return {
        ...state,
        optionsLoader: false,
        postedPayment: undefined,
      };
    }

    case GET_EVENT_PAYMENT_PROCESSOR_SUCCESS: {
      return {
        ...state,
        paymentProcessor: action.paymentProcessor,
      };
    }

    case GET_EVENT_PAYMENT_PROCESSOR_FAILURE: {
      return {
        ...state,
      };
    }

    case POST_EVENT_PAYMENT_PROCESSOR: {
      return {
        ...state,
        paymentLoader: true,
      };
    }

    case POST_EVENT_PAYMENT_PROCESSOR_SUCCESS: {
      return {
        ...state,
        paymentLoader: false,
        postedPayment: action.postedPayment,
      };
    }
    case POST_EVENT_PAYMENT_PROCESSOR_FAILURE: {
      return {
        ...state,
        paymentLoader: false,
      };
    }

    case POST_HOTEL_INVENTORY: {
      return {
        ...state,
        actionLoader: true,
      };
    }

    case POST_HOTEL_INVENTORY_SUCCESS: {
      return {
        ...state,
        actionLoader: false,
      };
    }
    case POST_HOTEL_INVENTORY_FAILURE: {
      return {
        ...state,
        actionLoader: false,
      };
    }
    case DELETE_HOTEL_INVENTORY: {
      return {
        ...state,
        actionLoader: true,
      };
    }

    case DELETE_HOTEL_INVENTORY_SUCCESS: {
      return {
        ...state,
        actionLoader: false,
      };
    }
    case DELETE_HOTEL_INVENTORY_FAILURE: {
      return {
        ...state,
        actionLoader: false,
      };
    }

    default:
      return state;
  }
};
