import {
  SEARCH_HOTELS,
  SEARCH_HOTELS_SUCCESS,
  SEARCH_HOTELS_FAILURE,
  FETCH_HOTEL_DETAIL,
  FETCH_HOTEL_DETAIL_SUCCESS,
  FETCH_HOTEL_DETAIL_FAILURE,
  ADD_HOTEL_INVENTORY_DETAIL,
  ADD_HOTEL_INVENTORY_DETAIL_SUCCESS,
  ADD_HOTEL_INVENTORY_DETAIL_FAILURE,
  FETCH_HOTEL_INVENTORY_LIST,
  FETCH_HOTEL_INVENTORY_LIST_SUCCESS,
  FETCH_HOTEL_INVENTORY_LIST_FAILURE,
  FETCH_ADD_ROOMTYPES,
  FETCH_ADD_ROOMTYPES_SUCCESS,
  FETCH_ADD_ROOMTYPES_FAILURE,
  GET_HOTEL_INVENTORY,
  GET_HOTEL_INVENTORY_SUCCESS,
  GET_HOTEL_INVENTORY_FAILURE,
  RESET_SEARCH_HOTELS,
  PATCH_HOTEL_INVENTORY_DETAIL,
  PATCH_HOTEL_INVENTORY_DETAIL_SUCCESS,
  PATCH_HOTEL_INVENTORY_DETAIL_FAILURE,
  PUT_HOTEL_INVENTORY_DETAIL,
  PUT_HOTEL_INVENTORY_DETAIL_SUCCESS,
  PUT_HOTEL_INVENTORY_DETAIL_FAILURE,
} from './constants';


export const searchHotels = data => {
  return {
    type: SEARCH_HOTELS,
    payload: data,
  };
};

export const searchHotelsSuccess = data => {
  return {
    type: SEARCH_HOTELS_SUCCESS,
    payload: data,
  };
};

export const searchHotelsFailure = data => {
  return {
    type: SEARCH_HOTELS_FAILURE,
    payload: data,
  };
};

export const resetSearchHotels = () => {
  return {
    type: RESET_SEARCH_HOTELS
  };
};

export const fetchHotelDetail = data => {
  return {
    type: FETCH_HOTEL_DETAIL,
    payload: data,
  };
};

export const fetchHotelDetailSuccess = data => {
  return {
    type: FETCH_HOTEL_DETAIL_SUCCESS,
    payload: data,
  };
};

export const fetchHotelDetailFailure = data => {
  return {
    type: FETCH_HOTEL_DETAIL_FAILURE,
    payload: data,
  };
};


export const addHotelInventoryDetail = data => {
  return {
    type: ADD_HOTEL_INVENTORY_DETAIL,
    payload: data,
  };
};

export const addHotelInventoryDetailSuccess = data => {
  return {
    type: ADD_HOTEL_INVENTORY_DETAIL_SUCCESS,
    payload: data,
  };
};

export const addHotelInventoryDetailFailure = data => {
  return {
    type: ADD_HOTEL_INVENTORY_DETAIL_FAILURE,
    payload: data,
  };
};


export const fetchHotelInventoryList = data => {
  return {
    type: FETCH_HOTEL_INVENTORY_LIST,
    payload: data,
  };
};

export const fetchHotelInventoryListSuccess = data => {
  return {
    type: FETCH_HOTEL_INVENTORY_LIST_SUCCESS,
    payload: data,
  };
};

export const fetchHotelInventoryListFailure = data => {
  return {
    type: FETCH_HOTEL_INVENTORY_LIST_FAILURE,
    payload: data,
  };
};

export const fetchAllRoomTypes = data => {
  return {
    type: FETCH_ADD_ROOMTYPES,
    payload: data,
  };
};

export const fetchAllRoomTypesSuccess = data => {
  return {
    type: FETCH_ADD_ROOMTYPES_SUCCESS,
    payload: data,
  };
};

export const fetchAllRoomTypesFailure = data => {
  return {
    type: FETCH_ADD_ROOMTYPES_FAILURE,
    payload: data,
  };
};

export const fetchHotelInventory = (tenantId, hotelInventoryId) => {
  return {
    type: GET_HOTEL_INVENTORY,
    hotelInventoryId,
    tenantId
  };
};

export const fetchHotelInventorySuccess = data => {
  return {
    type: GET_HOTEL_INVENTORY_SUCCESS,
    payload: data,
  };
};

export const fetchHotelInventoryFailure = data => {
  return {
    type: GET_HOTEL_INVENTORY_FAILURE,
    payload: data,
  };
};

export const patchHotelInventoryDetail = data => {
  return {
    type: PATCH_HOTEL_INVENTORY_DETAIL,
    payload: data,
  };
};

export const patchHotelInventoryDetailSuccess = data => {
  return {
    type: PATCH_HOTEL_INVENTORY_DETAIL_SUCCESS,
    payload: data,
  };
};

export const patchHotelInventoryDetailFailure = data => {
  return {
    type: PATCH_HOTEL_INVENTORY_DETAIL_FAILURE,
    payload: data,
  };
};



export const putHotelInventoryDetail = data => {
  return {
    type: PUT_HOTEL_INVENTORY_DETAIL,
    payload: data,
  };
};

export const putHotelInventoryDetailSuccess = data => {
  return {
    type: PUT_HOTEL_INVENTORY_DETAIL_SUCCESS,
    payload: data,
  };
};

export const putHotelInventoryDetailFailure = data => {
  return {
    type: PUT_HOTEL_INVENTORY_DETAIL_FAILURE,
    payload: data,
  };
};
