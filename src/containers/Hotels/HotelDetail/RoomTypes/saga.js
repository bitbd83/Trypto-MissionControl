import { all, call, put, fork, takeEvery } from 'redux-saga/effects';
import { GET, POST, PATCH, PUT, formatPatchData } from '../../../../util/request';
import config from '../../../../config/config';
import { Notification } from '../../../../util/Notifications';
import {
  fetchRoomTypeInventoriesSuccess,
  fetchRoomTypeInventoriesFailure,
  addRoomTypeSuccess,
  addRoomTypeFailure,
  patchRoomTypeSuccess,
  patchRoomTypeFailure,
  putRoomTypeSuccess,
  putRoomTypeFailure,
  addRoomTypeDailyInventorySuccess,
  addRoomTypeDailyInventoryFailure,
  patchRoomTypeDailyInventorySuccess,
  patchRoomTypeDailyInventoryFailure,
} from './actions';
import {
  FETCH_ROOM_TYPES,
  ADD_ROOM_TYPE,
  PATCH_ROOM_TYPE,
  PUT_ROOM_TYPE,
  ADD_ROOM_TYPE_DAILY_INVENTORY,
  PATCH_ROOM_TYPE_DAILY_INVENTORY,
} from './constants';


const getRoomTypeInventories = async ( tenantId, hotelInventoryId, skip, take, archived) =>
  await GET(`tenants/${tenantId}/hotel-inventory/${hotelInventoryId}/room-type-inventory/?skip=${skip}&take=${take}&archived=${archived}`, {
    baseUrl: `${config.baseUrl}${config.hotelsApiUrl}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json',
    },
  })
  .then(response => {
    const { status } = response;
    return { data: response.data, status };
  })
  .catch(error => {
    return { error };
  });

const postRoomTypeInventory = async (tenantId, hotelInventoryId, data) =>
  await POST(`tenants/${tenantId}/hotel-inventory/${hotelInventoryId}/room-type-inventory`, {
    baseUrl: `${config.baseUrl}${config.hotelsApiUrl}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json',
    },
    data
  })
 .then(response => {
    const { status } = response;
    return { data: response.data, status };
  })
  .catch(error => {
    return { error };
  });


const postRoomTypeInventoryAddtional = async (tenantId, hotelInventoryId, roomTypeInventoryId, data) =>
  await POST(`tenants/${tenantId}/hotel-inventory/${hotelInventoryId}/room-type-inventory/${roomTypeInventoryId}/additional-details`, {
    baseUrl: `${config.baseUrl}${config.hotelsApiUrl}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json',
    },
    data
  })
  .then(response => {
    const { status } = response;
    return { data: response.data, status };
  })
  .catch(error => {
    return { error };
  });

const postRoomTypeInventoryDailyInventory = async (tenantId, hotelInventoryId, roomTypeInventoryId, data) =>
  await POST(`tenants/${tenantId}/hotel-inventory/${hotelInventoryId}/room-type-inventory/${roomTypeInventoryId}/daily-inventory`, {
    baseUrl: `${config.baseUrl}${config.hotelsApiUrl}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json',
    },
    data
  })
  .then(response => {
    const { status } = response;
    return { data: response.data, status };
  })
  .catch(error => {
    return { error };
  });


const patchRoomTypeInventory = async (tenantId, hotelInventoryId, roomTypeInventoryId, data) =>
  await PATCH(`tenants/${tenantId}/hotel-inventory/${hotelInventoryId}/room-type-inventory/${roomTypeInventoryId}`, {
    baseUrl: `${config.baseUrl}${config.hotelsApiUrl}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json',
    },
    data: formatPatchData(data)
  })
  .then(response => {
    const { status } = response;
    return { data, status, id: hotelInventoryId };
  })
  .catch(error => {
    return { error };
  });

const putRoomTypeInventory = async (tenantId, hotelInventoryId, roomTypeInventoryId, action) =>
  await PUT(`tenants/${tenantId}/hotel-inventory/${hotelInventoryId}/room-type-inventory/${roomTypeInventoryId}/${action}`, {
    baseUrl: `${config.baseUrl}${config.hotelsApiUrl}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json',
    }
  })
    .then(response => {
      const { status } = response;
      return { data: response.data, status, action, id: roomTypeInventoryId};
    })
    .catch(error => {
      return { error };
    });

function* fetchRoomTypesInventoryRequest({ payload }) {
  const { tenantId, hotelInventoryId, skip, take, archived} = payload;
  try {
    const callData = yield call(getRoomTypeInventories, tenantId, hotelInventoryId, skip, take, archived);
    if(callData.error || callData.status >= 400){
      Notification(callData, {error: 'Error occured!', success: ''});
      yield put(fetchRoomTypeInventoriesFailure())
    }else{
      yield put(fetchRoomTypeInventoriesSuccess(callData.data));
    }
  } catch (error) {
    console.error(error);
  }
}

function* addRoomTypesRequest({ payload }) {
  const { tenantId, hotelInventoryId, data} = payload;
  try {
    const callData = yield call(postRoomTypeInventory, tenantId, hotelInventoryId, data.basic);
    if(callData.error || callData.status >= 400){
      Notification(callData, {error: 'Error occured!', success: ''});
      yield put(addRoomTypeFailure())
    }else{
      let roomTypeInventoryId = callData.data ? callData.data.id : '';
      const callDatanew = yield call(postRoomTypeInventoryAddtional, tenantId, hotelInventoryId, roomTypeInventoryId, data.additional);
      Notification(callDatanew, {error: 'Error occured!', success: 'Room Type Inventory created successfully!'});
      if(callDatanew.error || callDatanew.status >= 400){
        yield put(addRoomTypeFailure())
      }else{
        yield put(addRoomTypeSuccess({...callData.data, ...callDatanew.data}));
      }
    }


  } catch (error) {
    console.error(error);
  }
}

function* addRoomTypesDailyInventoryRequest({ payload }) {
  const { tenantId, hotelInventoryId, roomTypeInventoryId,data} = payload;
  try {
    const callData = yield call(postRoomTypeInventoryDailyInventory, tenantId, hotelInventoryId, roomTypeInventoryId, data);
    Notification(callData, {error: 'Error occured!', success: 'Room Type Daily Inventory updated successfully!'});
    if(callData.error || callData.status >= 400){
      yield put(addRoomTypeDailyInventoryFailure)
    }else{
      yield put(addRoomTypeDailyInventorySuccess(callData.data));
    }
  } catch (error) {
    console.error(error);
  }
}

function* patchRoomTypesInventoryRequest({ payload }) {
  const { tenantId, hotelInventoryId, roomTypeInventoryId, data} = payload;
  try {
    const callData = yield call(patchRoomTypeInventory,tenantId, hotelInventoryId, roomTypeInventoryId, data);
    Notification(callData, {error: 'Error occured!', success: 'Room Type Inventory updated successfully!'});
    if(callData.error || callData.status >= 400){
      yield put(patchRoomTypeFailure())
    }else{
      yield put(patchRoomTypeSuccess(callData));
    }
  } catch (error) {
    console.error(error);
  }
}

function* putRoomTypesInventoryRequest({ payload }) {
  const { tenantId, hotelInventoryId, roomTypeInventoryId, action } = payload;
  try {
    const callData = yield call(putRoomTypeInventory, tenantId, hotelInventoryId, roomTypeInventoryId, action);
    Notification(callData, {error: 'Error occured!', success: 'Room Type Inventory ${action} successfully!'});
    if(callData.error || callData.status >= 400){
      yield put(putRoomTypeFailure())
    }else{
      yield put(putRoomTypeSuccess(callData));
    }
  } catch (error) {
    console.error(error);
  }
}


export function* fetchRooms() {
  yield takeEvery(FETCH_ROOM_TYPES, fetchRoomTypesInventoryRequest);
}
export function* addRoom() {
  yield takeEvery(ADD_ROOM_TYPE, addRoomTypesRequest);
}
export function* addRoomDailyInventory() {
  yield takeEvery(ADD_ROOM_TYPE_DAILY_INVENTORY, addRoomTypesDailyInventoryRequest);
}

export function* patchRoom() {
  yield takeEvery(PATCH_ROOM_TYPE, patchRoomTypesInventoryRequest);
}
export function* putRooms() {
  yield takeEvery(PUT_ROOM_TYPE, putRoomTypesInventoryRequest);
}

export default function* rootSaga() {
  yield all([
    fork(fetchRooms),
    fork(addRoom),
    fork(patchRoom),
    fork(putRooms),
    fork(addRoomDailyInventory),
  ]);
}
