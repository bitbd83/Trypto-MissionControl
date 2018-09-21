import {
  FETCH_ALL_CURRENCIES,
  FETCH_ALL_CURRENCIES_SUCCESS,
} from 'constants/ActionTypes';

export const fetchAllCurrencies = () => {
  return {
    type: FETCH_ALL_CURRENCIES,
  };
};


export const fetchAllCurrenciesSuccess = (currencies) => {
  return {
    type: FETCH_ALL_CURRENCIES_SUCCESS,
    currencies: currencies
  };
};
