import {
    FETCH_INVENTORY_LIST,
    FETCH_INVENTORY_LIST_SUCCESS,
} from './constants';
  
export const fetchInventoryList = data => {
    return {
        type: FETCH_INVENTORY_LIST,
        payload: data,
    };
};

export const fetchInventoryListSucess = data => {
    return {
        type: FETCH_INVENTORY_LIST_SUCCESS,
        payload: data,
    };
};
  