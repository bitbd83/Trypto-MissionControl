/*
 *
 * TenantSettings reducer
 *
 */

import { fromJS } from 'immutable';
import {
  PATCH_TENANT,
  PATCH_TENANT_SUCCESS,
  PATCH_TENANT_FAILURE,
  PATCH_TENANT_CLEAR,
  POST_TENANT,
  POST_TENANT_SUCCESS,
  POST_TENANT_FAILURE,
  DELETE_TENANT_LOGO,
  DELETE_TENANT_LOGO_SUCCESS,
  DELETE_TENANT_LOGO_FAILURE,
  POST_TENANT_LOGO,
  POST_TENANT_LOGO_SUCCESS,
  POST_TENANT_LOGO_FAILURE,
  GET_TENANT_SETTINGS,
  GET_TENANT_SETTINGS_SUCCESS,
  GET_TENANT_SETTINGS_FAILURE,
  POST_POLICY_SETTINGS,
  POST_POLICY_SETTINGS_SUCCESS,
  POST_POLICY_SETTINGS_FAILURE,
} from './constants';

const INIT_STATE = fromJS({
  tenantLoader: false,
  tenantData: undefined,
  tenantSettings: {},
  policyData: undefined,
});

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case PATCH_TENANT: {
      return state.set('tenantLoader', true);
    }
    case PATCH_TENANT_SUCCESS: {
      return state.set('tenantLoader', false).set('tenantData', action.data);
    }
    case PATCH_TENANT_FAILURE: {
      return state.set('tenantLoader', false);
    }

    case PATCH_TENANT_CLEAR: {
      return state.set('tenantLoader', false).set('tenantData', undefined);
    }
    case POST_TENANT: {
      return state.set('tenantLoader', true);
    }
    case POST_TENANT_SUCCESS: {
      return state.set('tenantLoader', false).set('tenantData', action.data);
    }
    case POST_TENANT_FAILURE: {
      return state.set('tenantLoader', false);
    }

    case DELETE_TENANT_LOGO_SUCCESS: {
      return state.set('tenantData', action.data);
    }

    case POST_TENANT_LOGO_SUCCESS: {
      return state.set('tenantData', action.data);
    }

    case GET_TENANT_SETTINGS_SUCCESS: {
      return state
        .set('tenantLoader', false)
        .set('tenantSettings', fromJS(action.data))
        .set('policyData', undefined);
    }
    case GET_TENANT_SETTINGS_FAILURE: {
      return state
        .set('tenantLoader', false)
        .set('policyData', undefined);
    }

    case POST_POLICY_SETTINGS: {
      return state.set('tenantLoader', true);
    }
    case POST_POLICY_SETTINGS_SUCCESS: {
      return state.set('tenantLoader', false).set('policyData', action.data);
    }
    case POST_POLICY_SETTINGS_FAILURE: {
      return state.set('tenantLoader', false);
    }

    default:
      return state;
  }
};
