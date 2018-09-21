import { FETCH_INVENTORY_LIST, FETCH_INVENTORY_LIST_SUCCESS } from './constants';
import { fromJS } from 'immutable';

const initialState = fromJS({
  loader: false,
  isFetching: false,
  actionLoader: false,
  refetchList: false,
  inventoryList: {
    currentPage: 0,
    totalCount: 0,
    pageSize: 0,
    totalPages: 0,
    items: [],
  },
});

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_INVENTORY_LIST: {
      return state.set('isFetching', true);
    }
    case FETCH_INVENTORY_LIST_SUCCESS: {
      return state.set('isFetching', false).set('inventoryList', fromJS(action.payload));
    }

    default:
      return state;
  }
};
