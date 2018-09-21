import { fromJS } from 'immutable';
import {
  FETCH_ALL_TAX_RATES,
  FETCH_ALL_TAX_RATES_SUCCESS,
  FETCH_ALL_TAX_RATES_FAILURE,
  POST_TAX_RATE,
  POST_TAX_RATE_SUCCESS,
  POST_TAX_RATE_FAILURE,
  PATCH_TAX_RATE,
  PATCH_TAX_RATE_SUCCESS,
  PATCH_TAX_RATE_FAILURE,
  PUT_TAX_RATE,
  PUT_TAX_RATE_SUCCESS,
  PUT_TAX_RATE_FAILURE,
  GET_TAX_GROUP,
  GET_TAX_GROUP_SUCCESS,
  GET_TAX_GROUP_FAILURE,
  RESET_TAX_RATE,
 } from './constants';

const INIT_STATE = fromJS({
  isFetching: false,
  actionLoader: false,
  refetchList: false,
  taxGroup:{},
  newTaxRate:{},
  taxRates: {
    "currentPage": 0,
    "totalCount": 0,
    "pageSize": 0,
    "totalPages": 0,
    "items": []
  },
});

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_ALL_TAX_RATES: {
      return state
        .set('isFetching', true);
    }
    case FETCH_ALL_TAX_RATES_SUCCESS: {
      return state
        .set('isFetching', false)
        .set('refetchList', false)
        .set('newTaxRate', fromJS({}))
        .set('taxRates', fromJS(action.payload));
    }
    case FETCH_ALL_TAX_RATES_FAILURE: {
      return state
        .set('isFetching', false)
        .set('refetchList', false)
    }
    case RESET_TAX_RATE: {
      return state
        .set('refetchList', false)
        .set('newTaxRate', fromJS({}))
    }

    case GET_TAX_GROUP: {
      return state
        .set('isFetching', true);
    }
    case GET_TAX_GROUP_SUCCESS: {
      return state
        .set('isFetching', false)
        .set('taxGroup', fromJS(action.payload));
    }
    case GET_TAX_GROUP_FAILURE: {
      return state
        .set('isFetching', false)
    }

    case POST_TAX_RATE: {
      return state
        .set('actionLoader', true);
    }
    case POST_TAX_RATE_SUCCESS: {
      return state
        .set('actionLoader', false)
        .set('refetchList', true)
        .set('newTaxRate', fromJS(action.payload));
    }
    case POST_TAX_RATE_FAILURE: {
      return state
        .set('actionLoader', false)
    }

    case PATCH_TAX_RATE: {
      return state
        .set('actionLoader', true);
    }
    case PATCH_TAX_RATE_SUCCESS: {
      const data = fromJS({id: action.payload.taxRateId})
      return state
        .set('actionLoader', false)
        .set('refetchList', true)
        .set('newTaxRate', data);
    }
    case PATCH_TAX_RATE_FAILURE: {
      return state
        .set('actionLoader', false)
    }

    case PUT_TAX_RATE: {
      return state
        .set('actionLoader', true);
    }

    case PUT_TAX_RATE_SUCCESS: {
      return state
        .set('actionLoader', false)
        .set('refetchList', true);
    }
    case PUT_TAX_RATE_FAILURE: {
      return state
        .set('actionLoader', false)
    }

    default:
      return state;
  }
};
