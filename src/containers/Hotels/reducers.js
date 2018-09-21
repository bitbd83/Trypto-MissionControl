import { fromJS, merge } from 'immutable';
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

const INIT_STATE = fromJS({
  isFetching: false,
  isFetchingRoomType: false,
  isSearcing: false,
  actionLoader: false,
  refetchList: false,
  hotelDetail: {},
  newHotelInventoryId: null,
  roomTypes: {},
  amenities: {},
  hotelsList: {
    "currentPage": 0,
    "totalCount": 0,
    "pageSize": 0,
    "totalPages": 0,
    "items": []
  },
  inventoryList: {
    "currentPage": 0,
    "totalCount": 0,
    "pageSize": 0,
    "totalPages": 0,
    "items": []
  },
  hotelInventory: {},
});

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case SEARCH_HOTELS: {
      return state
        .set('isSearcing', true);
    }
    case SEARCH_HOTELS_SUCCESS: {
      return state
        .set('isSearcing', false)
        .set('newHotelInventoryId', null)
        .set('hotelsList', fromJS(action.payload));
    }
    case SEARCH_HOTELS_FAILURE: {
      return state
        .set('isSearcing', false)
        .set('newHotelInventoryId', null)
        .set('hotelsList', fromJS({
          'error': false,
          "currentPage": 0,
          "totalCount": 0,
          "pageSize": 0,
          "totalPages": 0,
          "items": []
        }));
    }
    case RESET_SEARCH_HOTELS: {
      return state
        .set('newHotelInventoryId', null)
        .set('hotelsList', fromJS({
          "currentPage": 0,
          "totalCount": 0,
          "pageSize": 0,
          "totalPages": 0,
          "items": []
        }));
    }

    case FETCH_HOTEL_DETAIL: {
      return state
        .set('isFetching', true);
    }
    case FETCH_HOTEL_DETAIL_SUCCESS: {
      return state
        .set('isFetching', false)
        .set('refetchList', false)
        .set('hotelDetail',fromJS(action.payload))
    }
    case FETCH_HOTEL_DETAIL_FAILURE: {
      return state
        .set('isFetching', false)
        .set('refetchList', false)
    }
    case ADD_HOTEL_INVENTORY_DETAIL: {
      return state
        .set('actionLoader', true);
    }
    case ADD_HOTEL_INVENTORY_DETAIL_SUCCESS: {
      return state
        .set('actionLoader', false)
        .set('refetchList', true)
        .set('newHotelInventoryId', fromJS(action.payload.id))
    }
    case ADD_HOTEL_INVENTORY_DETAIL_FAILURE: {
      return state
        .set('actionLoader', false)
    }

    case FETCH_HOTEL_INVENTORY_LIST: {
      return state
        .set('isFetching', true)
    }
    case FETCH_HOTEL_INVENTORY_LIST_SUCCESS: {
      return state
        .set('isFetching', false)
        .set('refetchList', false)
        .set('inventoryList',fromJS(action.payload))
        .set('hotelInventory',fromJS({}))
    }
    case FETCH_HOTEL_INVENTORY_LIST_FAILURE: {
      return state
        .set('isFetching', false)
        .set('refetchList', false)
    }

    case GET_HOTEL_INVENTORY: {
      return state
        .set('isFetching', true)
    }
    case GET_HOTEL_INVENTORY_SUCCESS: {
      return state
        .set('isFetching', false)
        .set('newHotelInventoryId', null)
        .set('hotelInventory',fromJS(action.payload))
    }
    case GET_HOTEL_INVENTORY_FAILURE: {
      return state
        .set('isFetching', false)
    }

    case FETCH_ADD_ROOMTYPES: {
      return state
        .set('isFetchingRoomType', true)
        .set('newHotelInventoryId', null);
    }
    case FETCH_ADD_ROOMTYPES_SUCCESS: {
      const amenities = action.payload.facilities !== undefined ? fromJS(action.payload.facilities) : fromJS({});
      return state
        .set('isFetchingRoomType', false)
        .set('roomTypes', fromJS(action.payload.roomTypes))
        .set('amenities', amenities)
    }
    case FETCH_ADD_ROOMTYPES_FAILURE: {
     return state
        .set('isFetchingRoomType', false)
    }

    case PATCH_HOTEL_INVENTORY_DETAIL: {
      return state
        .set('actionLoader', true);
    }
    case PATCH_HOTEL_INVENTORY_DETAIL_SUCCESS: {
      return state
        .set('actionLoader', false)
        .set('newHotelInventoryId', fromJS(action.payload.id))
    }
    case PATCH_HOTEL_INVENTORY_DETAIL_FAILURE: {
      return state
        .set('actionLoader', false)
    }

    case PUT_HOTEL_INVENTORY_DETAIL: {
      return state
        .set('actionLoader', true);
    }
    case PUT_HOTEL_INVENTORY_DETAIL_SUCCESS: {
      return state
        .set('actionLoader', false)
        .set('refetchList', true);
    }
    case PUT_HOTEL_INVENTORY_DETAIL_FAILURE: {
      return state
        .set('actionLoader', false)
    }
    default:
      return state;
  }
};
