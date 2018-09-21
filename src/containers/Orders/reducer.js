import { fromJS } from 'immutable';
import {
  FETCH_ALL_ORDERS,
  FETCH_ALL_ORDERS_SUCCESS,
  FETCH_ALL_ORDERS_FAILURE,
  FETCH_ONE_ORDER,
  FETCH_ONE_ORDER_SUCCESS,
  FETCH_ONE_ORDER_FAILURE,
  PATCH_BILLING_INFO,
  PATCH_BILLING_INFO_SUCCESS,
  PATCH_BILLING_INFO_FAILURE,
  PATCH_SHIPPING_INFO,
  PATCH_SHIPPING_INFO_SUCCESS,
  PATCH_SHIPPING_INFO_FAILURE,
 } from './constants';

const INIT_STATE = fromJS({
  actionLoader: false,
  isFetching: false,
  orders: {
    "currentPage": 0,
    "totalCount": 0,
    "pageSize": 0,
    "totalPages": 0,
    "items": []
  },
  orderInfo: {},
  refetchOrderInfo: false,
});

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_ALL_ORDERS: {
      return state
        .set('isFetching', true);
    }
    case FETCH_ALL_ORDERS_SUCCESS: {
      const orders = action.payload ? action.payload.orders : {};
      return state
        .set('isFetching', false)
        .set('orders', fromJS(orders));
    }
    case FETCH_ALL_ORDERS_FAILURE: {
      return state
        .set('isFetching', false)
        .set('orders', fromJS({
          "currentPage": 0,
          "totalCount": 0,
          "pageSize": 0,
          "totalPages": 0,
          "items": []
        }));
    }

    case FETCH_ONE_ORDER: {
      return state
        .set('isFetching', true)
        .set('refetchOrderInfo', false);
    }
    case FETCH_ONE_ORDER_SUCCESS: {
      const orderInfo = action.payload ? action.payload : {};
      return state
        .set('isFetching', false)
        .set('orderInfo', fromJS(orderInfo));
    }
    case FETCH_ONE_ORDER_FAILURE: {
      return state
        .set('isFetching', false)
        .set('orderInfo', fromJS({error: true}));
    }

    case PATCH_BILLING_INFO: {
      return state
        .set('actionLoader', true);
    }
    case PATCH_BILLING_INFO_SUCCESS: {
      return state
        .set('actionLoader', false)
        .set('refetchOrderInfo', true)
    }
    case PATCH_BILLING_INFO_FAILURE: {
      return state
        .set('actionLoader', false)
    }

    case PATCH_SHIPPING_INFO: {
      return state
        .set('actionLoader', true);
    }
    case PATCH_SHIPPING_INFO_SUCCESS: {
      return state
        .set('actionLoader', false)
        .set('refetchOrderInfo', true)
    }
    case PATCH_SHIPPING_INFO_FAILURE: {
      return state
        .set('actionLoader', false)
    }
    default:
      return state;
  }
};
