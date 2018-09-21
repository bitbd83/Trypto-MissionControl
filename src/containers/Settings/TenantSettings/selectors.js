import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the tenantSettings state domain
 */

const selectTenantSettingsDomain = state =>
  state.get('tenantSettings', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by TenantSettings
 */

const makeSelectTenantSettings = () =>
  createSelector(selectTenantSettingsDomain, substate => substate.toJS());

export default makeSelectTenantSettings;
export { selectTenantSettingsDomain };
