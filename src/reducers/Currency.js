import { fromJS } from 'immutable';

import {
  FETCH_ALL_CURRENCIES,
  FETCH_ALL_CURRENCIES_SUCCESS,
} from 'constants/ActionTypes';

const INIT_STATE = fromJS({
  loadCurrency: false,
  currencies: [],
});

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_ALL_CURRENCIES_SUCCESS: {
      return state
      .set('loadCurrency', false)
      .set('currencies', fromJS(action.currencies.items).map(currency => {
        return {
          value: currency.get('id'),
          label: `${currency.get('name')} (${currency.get('symbol')})`,
          data: currency.toJS()
        }
      }));
    }

    case FETCH_ALL_CURRENCIES: {
      return state
      .set('loadCurrency', true);
    }

    default:
      return state;
  }
};
