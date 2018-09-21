/*
 *
 * PaymentProcessors actions
 *
 */

import {
  FETCH_SITE_ADMINS,
  FETCH_SITE_ADMINS_SUCCESS,
  FETCH_SITE_ADMINS_FAILURE,
  POST_SITE_ADMIN,
  POST_SITE_ADMIN_SUCCESS,
  POST_SITE_ADMIN_FAILURE,
  PUT_SITE_ADMIN,
  PUT_SITE_ADMIN_SUCCESS,
  PUT_SITE_ADMIN_FAILURE,
  PATCH_SITE_ADMIN,
  PATCH_SITE_ADMIN_SUCCESS,
  PATCH_SITE_ADMIN_FAILURE,
} from './constants';

export const fetchSiteAdmins = params => {
  return {
    type: FETCH_SITE_ADMINS,
    params,
  };
};

export const fetchSiteAdminsSuccess = data => {
  return {
    type: FETCH_SITE_ADMINS_SUCCESS,
    data,
  };
};

export const fetchSiteAdminsFailure = data => {
  return {
    type: FETCH_SITE_ADMINS_FAILURE,
    data,
  };
};

export const postSiteAdmin = params => {
  return {
    type: POST_SITE_ADMIN,
    params,
  };
};

export const postSiteAdminSuccess = data => {
  return {
    type: POST_SITE_ADMIN_SUCCESS,
    data,
  };
};

export const postSiteAdminFailure = data => {
  return {
    type: POST_SITE_ADMIN_FAILURE,
    data,
  };
};

export const putSiteAdmin = params => {
  return {
    type: PUT_SITE_ADMIN,
    params,
  };
};

export const putSiteAdminSuccess = data => {
  return {
    type: PUT_SITE_ADMIN_SUCCESS,
    data,
  };
};

export const putSiteAdminFailure = data => {
  return {
    type: PUT_SITE_ADMIN_FAILURE,
    data,
  };
};

export const patchSiteAdmin = params => {
  return {
    type: PATCH_SITE_ADMIN,
    params,
  };
};

export const patchSiteAdminSuccess = data => {
  return {
    type: PATCH_SITE_ADMIN_SUCCESS,
    data,
  };
};

export const patchSiteAdminFailure = data => {
  return {
    type: PATCH_SITE_ADMIN_FAILURE,
    data,
  };
};
