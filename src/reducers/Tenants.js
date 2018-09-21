import { GET_TENANTS_BY_DOMAIN, GET_TENANTS_BY_DOMAIN_SUCCESS } from 'constants/ActionTypes';

const INIT_STATE = {
  loadingTenants: false,
  tenantsByDomain: {},
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_TENANTS_BY_DOMAIN: {
      return {
        ...state,
        loadingTenants: true,
      };
    }
    case GET_TENANTS_BY_DOMAIN_SUCCESS: {
      return {
        ...state,
        loadingTenants: false,
        tenantsByDomain: action.tenants,
      };
    }

    default:
      return state;
  }
};
