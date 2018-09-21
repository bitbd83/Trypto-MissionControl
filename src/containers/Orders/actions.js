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


export const fetchAllOrders = data => {
  return {
    type: FETCH_ALL_ORDERS,
    payload: data,
  };
};

export const fetchAllOrdersSuccess = data => {
  return {
    type: FETCH_ALL_ORDERS_SUCCESS,
    payload: data,
  };
};
export const fetchAllOrdersFailure = () => {
  return {
    type: FETCH_ALL_ORDERS_FAILURE
  };
};

export const fetchOneOrder = data => {
  return {
    type: FETCH_ONE_ORDER,
    payload: data,
  };
};

export const fetchOneOrderSuccess = data => {
  return {
    type: FETCH_ONE_ORDER_SUCCESS,
    payload: data,
  };
};

export const fetchOneOrderFailure = data => {
  return {
    type: FETCH_ONE_ORDER_FAILURE,
    payload: data,
  };
};

export const patchBillingInfo = data => {
  return {
    type: PATCH_BILLING_INFO,
    payload: data,
  };
};

export const patchBillingInfoSuccess = data => {
  return {
    type: PATCH_BILLING_INFO_SUCCESS,
    payload: data,
  };
};

export const patchBillingInfoFailure = data => {
  return {
    type: PATCH_BILLING_INFO_FAILURE,
    payload: data,
  };
};

export const patchShippingInfoInfo = data => {
  return {
    type: PATCH_SHIPPING_INFO,
    payload: data,
  };
};

export const patchShippingInfoInfoSuccess = data => {
  return {
    type: PATCH_SHIPPING_INFO_SUCCESS,
    payload: data,
  };
};

export const patchShippingInfoInfoFailure = data => {
  return {
    type: PATCH_SHIPPING_INFO_FAILURE,
    payload: data,
  };
};
