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


export const fetchRoomTypeInventories = data => {
  return {
    type: FETCH_ROOM_TYPES,
    payload: data,
  };
};

export const fetchRoomTypeInventoriesSuccess = data => {
  return {
    type: FETCH_ROOM_TYPES_SUCCESS,
    payload: data,
  };
};

export const fetchRoomTypeInventoriesFailure = data => {
  return {
    type: FETCH_ROOM_TYPES_FAILURE,
    payload: data,
  };
};


export const resetRoomType = () => {
  return {
    type: RESET_ROOM_TYPE
  };
};

export const addRoomType = data => {
  return {
    type: ADD_ROOM_TYPE,
    payload: data,
  };
};

export const addRoomTypeSuccess = data => {
  return {
    type: ADD_ROOM_TYPE_SUCCESS,
    payload: data,
  };
};

export const addRoomTypeFailure = data => {
  return {
    type: ADD_ROOM_TYPE_FAILURE,
    payload: data,
  };
};

export const patchRoomType = data => {
  return {
    type: PATCH_ROOM_TYPE,
    payload: data,
  };
};

export const patchRoomTypeSuccess = data => {
  return {
    type: PATCH_ROOM_TYPE_SUCCESS,
    payload: data,
  };
};

export const patchRoomTypeFailure = data => {
  return {
    type: PATCH_ROOM_TYPE_FAILURE,
    payload: data,
  };
};


export const putRoomType = data => {
  return {
    type: PUT_ROOM_TYPE,
    payload: data,
  };
};

export const putRoomTypeSuccess = data => {
  return {
    type: PUT_ROOM_TYPE_SUCCESS,
    payload: data,
  };
};

export const putRoomTypeFailure = data => {
  return {
    type: PUT_ROOM_TYPE_FAILURE,
    payload: data,
  };
};



export const addRoomTypeDailyInventory = data => {
  return {
    type: ADD_ROOM_TYPE_DAILY_INVENTORY,
    payload: data,
  };
};

export const addRoomTypeDailyInventorySuccess = data => {
  return {
    type: ADD_ROOM_TYPE_DAILY_INVENTORY_SUCCESS,
    payload: data,
  };
};

export const addRoomTypeDailyInventoryFailure = data => {
  return {
    type: ADD_ROOM_TYPE_DAILY_INVENTORY_FAILURE,
    payload: data,
  };
};

export const patchRoomTypeDailyInventory = data => {
  return {
    type: PATCH_ROOM_TYPE_DAILY_INVENTORY,
    payload: data,
  };
};

export const patchRoomTypeDailyInventorySuccess = data => {
  return {
    type: PATCH_ROOM_TYPE_DAILY_INVENTORY_SUCCESS,
    payload: data,
  };
};

export const patchRoomTypeDailyInventoryFailure = data => {
  return {
    type: PATCH_ROOM_TYPE_DAILY_INVENTORY_FAILURE,
    payload: data,
  };
};
