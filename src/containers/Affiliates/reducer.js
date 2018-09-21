import { fromJS, merge } from 'immutable';
import {
  FETCH_ALL_AFFILIATES,
  FETCH_ALL_AFFILIATES_SUCCESS,
  FETCH_ALL_AFFILIATES_FAILURE,
  FETCH_TRACKING_CODES,
  FETCH_TRACKING_CODES_SUCCESS,
  FETCH_TRACKING_CODES_FAILURE,
  ADD_AFFILIATES,
  ADD_AFFILIATES_SUCCESS,
  ADD_AFFILIATES_FAILURE,
  ADD_TRACKING_CODES,
  ADD_TRACKING_CODES_SUCCESS,
  ADD_TRACKING_CODES_FAILURE,
  PUT_AFFILIATES,
  PUT_AFFILIATES_SUCCESS,
  PUT_AFFILIATES_FAILURE,
  PUT_TRACKING_CODES,
  PUT_TRACKING_CODES_SUCCESS,
  PUT_TRACKING_CODES_FAILURE,
  PATCH_AFFILIATE,
  PATCH_AFFILIATE_SUCCESS,
  PATCH_AFFILIATE_FAILURE,
 } from './constants';

const INIT_STATE = fromJS({
  isFetching: false,
  isCodeFetching: false,
  actionLoader: false,
  refetchAffiliates: false,
  refetchTrackingCode: false,
  codeSaveFail: false,
  newAffiliate: {},
  newTrackingCode: {codeAlready:{status: '', error:''}},
  affiliate: {
    "currentPage": 0,
    "totalCount": 0,
    "pageSize": 0,
    "totalPages": 0,
    "items": []
  },
  trackingCodes: {
    "currentPage": 0,
    "totalCount": 0,
    "pageSize": 0,
    "totalPages": 0,
    "items": []
  },
});

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_ALL_AFFILIATES: {
      return state
        .set('isFetching', true)
        .set('newAffiliate', fromJS({}))
        .set('refetchAffiliates', false);
    }
    case FETCH_ALL_AFFILIATES_SUCCESS: {
      return state
        .set('isFetching', false)
        .set('affiliate', fromJS(action.payload));
    }
    case FETCH_ALL_AFFILIATES_FAILURE: {
      return state
        .set('isFetching', false)
    }

    case FETCH_TRACKING_CODES: {
      return state
        .set('isCodeFetching', true);
    }
    case FETCH_TRACKING_CODES_SUCCESS: {
      return state
        .set('isCodeFetching', false)
        .set('refetchTrackingCode', false)
        .set('trackingCodes', fromJS(action.payload));
    }
    case FETCH_TRACKING_CODES_FAILURE: {
      return state
        .set('isCodeFetching', false)
        .set('refetchTrackingCode', false)
    }

    case ADD_AFFILIATES: {
      return state
        .set('actionLoader', true)
        .set('newAffiliate', fromJS({}));
    }
    case ADD_AFFILIATES_SUCCESS: {
      const newAffiliate = action.payload ? fromJS(action.payload) : fromJS({})
      return state
        .set('actionLoader', false)
        .set('refetchAffiliates', true)
        .set('newAffiliate', newAffiliate)
        .set('codeSaveFail', action.payload.codeSaveFail)
    }
    case ADD_AFFILIATES_FAILURE: {
      return state
        .set('actionLoader', false)
    }
    case ADD_TRACKING_CODES: {
      return state
        .set('actionLoader', true)
        .set('newTrackingCode', fromJS({codeAlready:{status: '', error:''}}));
    }
    case ADD_TRACKING_CODES_SUCCESS: {
      const newTrackingCode = action.payload ? fromJS(action.payload) : fromJS({codeAlready:{status: '', error:''}})
      return state
        .set('actionLoader', false)
        .set('refetchTrackingCode', true)
        .set('newTrackingCode', newTrackingCode)
    }
    case ADD_TRACKING_CODES_FAILURE: {
      return state
        .set('actionLoader', false)
    }

    case PUT_AFFILIATES: {
      return state
        .set('actionLoader', true)
    }
    case PUT_AFFILIATES_SUCCESS: {
      return state
        .set('actionLoader', false)
        .set('refetchAffiliates', true)
    }
    case PUT_AFFILIATES_FAILURE: {
      return state
        .set('actionLoader', false)
    }

    case PUT_TRACKING_CODES: {
      return state
        .set('actionLoader', true)
    }
    case PUT_TRACKING_CODES_SUCCESS: {
      return state
        .set('actionLoader', false)
        .set('refetchTrackingCode', true)
    }
    case PUT_TRACKING_CODES_FAILURE: {
      return state
        .set('actionLoader', false)
    }

    case PATCH_AFFILIATE: {
      return state
        .set('actionLoader', true)
    }
    case PATCH_AFFILIATE_SUCCESS: {
      return state
        .set('actionLoader', false)
        .set('refetchAffiliates', true)
    }
    case PATCH_AFFILIATE_FAILURE: {
      return state
        .set('actionLoader', false)
    }
    default:
      return state;
  }
};
