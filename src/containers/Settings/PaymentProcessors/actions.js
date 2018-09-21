/*
 *
 * PaymentProcessors actions
 *
 */

import {
  LIST_PAYMENT_PROCESSORS,
  LIST_PAYMENT_PROCESSORS_SUCCESS,
  LIST_PAYMENT_PROCESSORS_FAILURE,
  POST_STRIPE_PROCESSOR,
  POST_STRIPE_PROCESSOR_SUCCESS,
  POST_STRIPE_PROCESSOR_FAILURE,
  PATCH_STRIPE_PROCESSOR,
  PATCH_STRIPE_PROCESSOR_SUCCESS,
  PATCH_STRIPE_PROCESSOR_FAILURE,
  PUT_PAYMENT_PROCESSOR,
  PUT_PAYMENT_PROCESSOR_SUCCESS,
  PUT_PAYMENT_PROCESSOR_FAILURE,
} from './constants';

export const listPaymentProcessors = params => {
  return {
    type: LIST_PAYMENT_PROCESSORS,
    params,
  };
};

export const listPaymentProcessorsSuccess = data => {
  return {
    type: LIST_PAYMENT_PROCESSORS_SUCCESS,
    data,
  };
};

export const listPaymentProcessorsFailure = data => {
  return {
    type: LIST_PAYMENT_PROCESSORS_FAILURE,
    data,
  };
};

export const postStripeProcessor = params => {
  return {
    type: POST_STRIPE_PROCESSOR,
    params,
  };
};

export const postStripeProcessorSuccess = data => {
  return {
    type: POST_STRIPE_PROCESSOR_SUCCESS,
    data,
  };
};

export const postStripeProcessorFailure = data => {
  return {
    type: POST_STRIPE_PROCESSOR_FAILURE,
    data,
  };
};

export const patchStripeProcessor = params => {
  return {
    type: PATCH_STRIPE_PROCESSOR,
    params,
  };
};

export const patchStripeProcessorSuccess = data => {
  return {
    type: PATCH_STRIPE_PROCESSOR_SUCCESS,
    data,
  };
};

export const patchStripeProcessorFailure = data => {
  return {
    type: PATCH_STRIPE_PROCESSOR_FAILURE,
    data,
  };
};

export const putPaymentProcessor = params => {
  return {
    type: PUT_PAYMENT_PROCESSOR,
    params,
  };
};

export const putPaymentProcessorSuccess = data => {
  return {
    type: PUT_PAYMENT_PROCESSOR_SUCCESS,
    data,
  };
};

export const putPaymentProcessorFailure = data => {
  return {
    type: PUT_PAYMENT_PROCESSOR_FAILURE,
    data,
  };
};
