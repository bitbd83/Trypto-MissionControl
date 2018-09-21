import { fromJS } from 'immutable';

import {
  GET_TIMEZONES_SUCCESS,
  GET_CURRENCIES_SUCCESS,
  GET_LOCALES_SUCCESS,
  GET_CURRENCY_BY_ID_SUCCESS,
  GET_CURRENCY_BY_ID_CLEAR,
  FETCH_ALL_COUNTRIES,
  FETCH_ALL_COUNTRIES_SUCCESS,
  FETCH_ALL_STATES_BY_COUNTRY,
  FETCH_ALL_STATES_BY_COUNTRY_SUCCESS,
  RESET_STATE_ON_COUNTRY_NULL,
} from 'constants/ActionTypes';

const INIT_STATE = fromJS({
  loadCountry: false,
  loadState: false,
  countries: [],
  countryCode: '',
  states: [],
  timezones: [],
  currencies: [],
  locales: [],
  currencyById: undefined,
});

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_TIMEZONES_SUCCESS: {
      return state.set('timezones', fromJS(action.timezones.items));
    }
    case GET_LOCALES_SUCCESS: {
      return state.set('locales', fromJS(action.locales.items));
    }
    case GET_CURRENCIES_SUCCESS: {
      return state.set('currencies', fromJS(action.currencies.items));
    }

    case GET_CURRENCY_BY_ID_SUCCESS: {
      return state.set('currencyById', fromJS(action.currencyById));
    }

    case GET_CURRENCY_BY_ID_CLEAR: {
      return state.set('currencyById', undefined);
    }

    case FETCH_ALL_COUNTRIES_SUCCESS: {
      return state.set('loadCountry', false).set(
        'countries',
        fromJS(action.countries.items).map(country => {
          return {
            value: country.get('id'),
            label: country.get('name'),
          };
        }),
      );
    }

    case FETCH_ALL_COUNTRIES: {
      return state.set('loadCountry', true);
    }

    case FETCH_ALL_STATES_BY_COUNTRY: {
      return state.set('loadState', true).set('countryCode', action.countryCode);
    }

    case FETCH_ALL_STATES_BY_COUNTRY_SUCCESS: {
      return state.set('loadState', false).set(
        'states',
        fromJS(action.states.items).map(state => {
          return {
            value: state.get('code'),
            label: state.get('shortName'),
            data: state,
          };
        }),
      );
    }

    case RESET_STATE_ON_COUNTRY_NULL: {
      return state
        .set('loadState', false)
        .set('states', fromJS([]));
    }

    default:
      return state;
  }
};
