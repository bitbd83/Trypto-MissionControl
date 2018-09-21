/*
 *
 * TenantSettings actions
 *
 */

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

export const patchTenant = params => {
  return {
    type: PATCH_TENANT,
    params,
  };
};

export const patchTenantSuccess = data => {
  return {
    type: PATCH_TENANT_SUCCESS,
    data,
  };
};

export const patchTenantFailure = data => {
  return {
    type: PATCH_TENANT_FAILURE,
    data,
  };
};

export const patchTenantClear = () => {
  return {
    type: PATCH_TENANT_CLEAR,
  };
};

export const postTenant = params => {
  return {
    type: POST_TENANT,
    params,
  };
};

export const postTenantSuccess = data => {
  return {
    type: POST_TENANT_SUCCESS,
    data,
  };
};

export const postTenantFailure = data => {
  return {
    type: POST_TENANT_FAILURE,
    data,
  };
};

export const deleteTenantLogo = () => {
  return {
    type: DELETE_TENANT_LOGO,
  };
};

export const deleteTenantLogoSuccess = data => {
  return {
    type: DELETE_TENANT_LOGO_SUCCESS,
    data,
  };
};

export const deleteTenantLogoFailure = data => {
  return {
    type: DELETE_TENANT_LOGO_FAILURE,
    data,
  };
};

export const postTenantLogo = params => {
  return {
    type: POST_TENANT_LOGO,
    params,
  };
};

export const postTenantLogoSuccess = data => {
  return {
    type: POST_TENANT_LOGO_SUCCESS,
    data,
  };
};

export const postTenantLogoFailure = data => {
  return {
    type: POST_TENANT_LOGO_FAILURE,
    data,
  };
};

export const getTenantSettings = () => {
  return {
    type: GET_TENANT_SETTINGS,
  };
};

export const getTenantSettingsSuccess = data => {
  return {
    type: GET_TENANT_SETTINGS_SUCCESS,
    data,
  };
};

export const getTenantSettingsFailure = data => {
  return {
    type: GET_TENANT_SETTINGS_FAILURE,
    data,
  };
};

export const postPolicySettings = params => {
  return {
    type: POST_POLICY_SETTINGS,
    params,
  };
};

export const postPolicySettingsSuccess = data => {
  return {
    type: POST_POLICY_SETTINGS_SUCCESS,
    data,
  };
};

export const postPolicySettingsFailure = data => {
  return {
    type: POST_POLICY_SETTINGS_FAILURE,
    data,
  };
};
