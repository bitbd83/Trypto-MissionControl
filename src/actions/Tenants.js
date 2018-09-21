import {
  GET_TENANTS_BY_DOMAIN,
  GET_TENANTS_BY_DOMAIN_SUCCESS
} from 'constants/ActionTypes';

export const getTenantsByDomain = () => {
  return {
    type: GET_TENANTS_BY_DOMAIN,
  };
};


export const getTenantsByDomainSuccess = tenants => {
  return {
    type: GET_TENANTS_BY_DOMAIN_SUCCESS,
    tenants
  };
};