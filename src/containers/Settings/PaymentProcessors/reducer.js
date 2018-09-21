/*
 *
 * PaymentProcessors reducer
 *
 */

import { fromJS } from 'immutable';
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

const INIT_STATE = fromJS({
  isFetching: false,
  postLoader: false,
  refetchList: false,
  paymentProcessors: {
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
    case LIST_PAYMENT_PROCESSORS: {
      return state.set('isFetching', true)
            .set('refetchList', false);
    }
    case LIST_PAYMENT_PROCESSORS_SUCCESS: {
      return state
        .set('isFetching', false)
        .set('paymentProcessors', fromJS(action.data))
        .set('newProcessors', fromJS({}));
    }
    case LIST_PAYMENT_PROCESSORS_FAILURE: {
      return state
        .set('isFetching', false)
    }

    case POST_STRIPE_PROCESSOR: {
      return state.set('postLoader', true).set('isFetching', false);
    }
    case POST_STRIPE_PROCESSOR_SUCCESS: {
      return state
        .set('postLoader', false)
        .set('isFetching', true)
        .set('newProcessors', fromJS(action.data));
    }
    case POST_STRIPE_PROCESSOR_FAILURE: {
      return state
        .set('postLoader', false)
    }

    case PATCH_STRIPE_PROCESSOR: {
      return state.set('postLoader', true).set('isFetching', false);
    }
    case PATCH_STRIPE_PROCESSOR_SUCCESS: {
      return state
        .set('postLoader', false)
        .set('isFetching', true)
        .set('newProcessors', fromJS(action.data));
    }
    case PATCH_STRIPE_PROCESSOR_FAILURE: {
      return state
        .set('postLoader', false)
    }

    case PUT_PAYMENT_PROCESSOR: {
      return state.set('postLoader', true).set('refetchList', false);
    }
    case PUT_PAYMENT_PROCESSOR_SUCCESS: {
      return state.set('postLoader', false).set('refetchList', true);
    }
    case PUT_PAYMENT_PROCESSOR_FAILURE: {
      return state.set('postLoader', false);
    }

    default:
      return state;
  }
};
