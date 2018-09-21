import { fromJS, merge } from 'immutable';
import {
  FETCH_SURCHARGES,
  FETCH_SURCHARGES_SUCCESS,
  FETCH_SURCHARGES_FAILURE,
  ADD_SURCHARGE,
  ADD_SURCHARGE_SUCCESS,
  ADD_SURCHARGE_FAILURE,
  PATCH_SURCHARGE,
  PATCH_SURCHARGE_SUCCESS,
  PATCH_SURCHARGE_FAILURE,
  PUT_SURCHARGE,
  PUT_SURCHARGE_SUCCESS,
  PUT_SURCHARGE_FAILURE,
  RESET_SURCHARGE,
} from './constants';

const INIT_STATE = fromJS({
  isFetching: false,
  actionLoader: false,
  refetchList: false,
  newSurchargeId: null,
  surchargeList: {
    "currentPage": 0,
    "totalCount": 0,
    "pageSize": 0,
    "totalPages": 0,
    "items": []
  }
});

export default (state = INIT_STATE, action) => {
  switch (action.type) {

    case FETCH_SURCHARGES: {
      return state
        .set('isFetching', true);
    }
    case FETCH_SURCHARGES_SUCCESS: {
      return state
        .set('isFetching', false)
        .set('refetchList', false)
        .set('newSurchargeId', null)
        .set('surchargeList',fromJS(action.payload))
    }
    case FETCH_SURCHARGES_FAILURE: {
      return state
        .set('isFetching', false)
        .set('refetchList', false)
        .set('newSurchargeId', null)
    }

    case RESET_SURCHARGE: {
      return state
      .set('refetchList', false)
      .set('newSurchargeId', null)
    }

    case ADD_SURCHARGE: {
      return state
        .set('actionLoader', true);
    }
    case ADD_SURCHARGE_SUCCESS: {
      return state
        .set('actionLoader', false)
        .set('newSurchargeId', fromJS(action.payload.id))
    }
    case ADD_SURCHARGE_FAILURE: {
      return state
        .set('actionLoader', false)
    }

    case PATCH_SURCHARGE: {
      return state
        .set('actionLoader', true);
    }
    case PATCH_SURCHARGE_SUCCESS: {
      return state
        .set('actionLoader', false)
        .set('newSurchargeId', fromJS(action.payload.id))
    }
    case PATCH_SURCHARGE_FAILURE: {
      return state
        .set('actionLoader', false)
    }

    case PUT_SURCHARGE: {
      return state
        .set('actionLoader', true);
    }
    case PUT_SURCHARGE_SUCCESS: {
      return state
        .set('actionLoader', false)
        .set('refetchList', true)
        .set('newSurchargeId', fromJS(action.payload.id))
    }
    case PUT_SURCHARGE_FAILURE: {
      return state
        .set('actionLoader', false)
    }
    default:
      return state;
  }
};
