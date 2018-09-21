import { fromJS, merge } from 'immutable';
import {
  FETCH_ROOM_TYPES,
  FETCH_ROOM_TYPES_SUCCESS,
  FETCH_ROOM_TYPES_FAILURE,
  ADD_ROOM_TYPE,
  ADD_ROOM_TYPE_SUCCESS,
  ADD_ROOM_TYPE_FAILURE,
  PATCH_ROOM_TYPE,
  PATCH_ROOM_TYPE_SUCCESS,
  PATCH_ROOM_TYPE_FAILURE,
  PUT_ROOM_TYPE,
  PUT_ROOM_TYPE_SUCCESS,
  PUT_ROOM_TYPE_FAILURE,
  RESET_ROOM_TYPE,
  ADD_ROOM_TYPE_DAILY_INVENTORY,
  ADD_ROOM_TYPE_DAILY_INVENTORY_SUCCESS,
  ADD_ROOM_TYPE_DAILY_INVENTORY_FAILURE,
  PATCH_ROOM_TYPE_DAILY_INVENTORY,
  PATCH_ROOM_TYPE_DAILY_INVENTORY_SUCCESS,
  PATCH_ROOM_TYPE_DAILY_INVENTORY_FAILURE,
} from './constants';

const INIT_STATE = fromJS({
  isFetching: false,
  actionLoader: false,
  refetchList: false,
  newRoomTypeId: null,
  roomTypeData:{},
  roomTypeList: {
    "currentPage": 0,
    "totalCount": 0,
    "pageSize": 0,
    "totalPages": 0,
    "items": []
  }
});

export default (state = INIT_STATE, action) => {
  switch (action.type) {

    case FETCH_ROOM_TYPES: {
      return state
        .set('isFetching', true);
    }
    case FETCH_ROOM_TYPES_SUCCESS: {
      return state
        .set('isFetching', false)
        .set('refetchList', false)
        .set('roomTypeList',fromJS(action.payload))
    }
    case FETCH_ROOM_TYPES_FAILURE: {
      return state
        .set('isFetching', false)
        .set('refetchList', false)
    }

    case RESET_ROOM_TYPE: {
      return state
      .set('refetchList', true)
      .set('newRoomTypeId', null)
    }

    case ADD_ROOM_TYPE: {
      return state
        .set('actionLoader', true);
    }
    case ADD_ROOM_TYPE_SUCCESS: {
      return state
        .set('actionLoader', false)
        .set('refetchList', true)
        .set('newRoomTypeId', action.payload.id)
    }
    case ADD_ROOM_TYPE_FAILURE: {
      return state
        .set('actionLoader', false)
    }

    case PATCH_ROOM_TYPE: {
      return state
        .set('actionLoader', true);
    }
    case PATCH_ROOM_TYPE_SUCCESS: {
      return state
        .set('actionLoader', false)
        .set('refetchList', true)
        .set('newRoomTypeId', action.payload.id)
    }
    case PATCH_ROOM_TYPE_FAILURE: {
      return state
        .set('actionLoader', false)
    }

    case PUT_ROOM_TYPE: {
      return state
        .set('actionLoader', true);
    }
    case PUT_ROOM_TYPE_SUCCESS: {
      return state
        .set('actionLoader', false)
        .set('refetchList', true);
    }
    case PUT_ROOM_TYPE_FAILURE: {
      return state
        .set('actionLoader', false)
    }

    case ADD_ROOM_TYPE_DAILY_INVENTORY: {
      return state
        .set('actionLoader', true);
    }
    case ADD_ROOM_TYPE_DAILY_INVENTORY_SUCCESS: {
      return state
        .set('actionLoader', false)
        .set('refetchList', true)
        .set('newRoomTypeId', fromJS(action.payload.id))
    }
    case ADD_ROOM_TYPE_DAILY_INVENTORY_FAILURE: {
      return state
        .set('actionLoader', false)
    }

    case PATCH_ROOM_TYPE_DAILY_INVENTORY: {
      return state
        .set('actionLoader', true);
    }
    case PATCH_ROOM_TYPE_DAILY_INVENTORY_SUCCESS: {
      return state
        .set('actionLoader', false)
        .set('refetchList', true);
    }
    case PATCH_ROOM_TYPE_DAILY_INVENTORY_FAILURE: {
      return state
        .set('actionLoader', false)
    }
    default:
      return state;
  }
};
