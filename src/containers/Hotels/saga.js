import { all, call, put, fork, takeEvery } from 'redux-saga/effects';
import { GET, POST, PATCH, PUT, formatPatchData } from '../../util/request';
import config from '../../config/config';
import { Notification } from '../../util/Notifications'
import {
  searchHotelsSuccess,
  searchHotelsFailure,
  fetchHotelDetailSuccess,
  fetchHotelDetailFailure,
  fetchHotelInventorySuccess,
  fetchHotelInventoryFailure,
  fetchHotelInventoryListSuccess,
  fetchHotelInventoryListFailure,
  addHotelInventoryDetailSuccess,
  addHotelInventoryDetailFailure,
  fetchAllRoomTypesSuccess,
  fetchAllRoomTypesFailure,
  patchHotelInventoryDetailSuccess,
  patchHotelInventoryDetailFailure,
  putHotelInventoryDetailSuccess,
  putHotelInventoryDetailFailure
} from './actions';
import {
  SEARCH_HOTELS,
  FETCH_HOTEL_DETAIL,
  ADD_HOTEL_INVENTORY_DETAIL,
  FETCH_HOTEL_INVENTORY_LIST,
  FETCH_ADD_ROOMTYPES,
  GET_HOTEL_INVENTORY,
  PATCH_HOTEL_INVENTORY_DETAIL,
  PUT_HOTEL_INVENTORY_DETAIL,
} from './constants';

const searchHotel = async (searchTerm) =>
  await GET(`hotels?searchTerm=${searchTerm}`, {
    baseUrl: `${config.baseUrl}${config.hotelsApiUrl}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json',
    },
  })
  .then(response => {
    const { status } = response;
    return { status, data: response.data};
  })
  .catch((error) =>{
    return { error }
  });

const getHotelDetail = async (id) =>
    await GET(`hotels/${id}`, {
      baseUrl: `${config.baseUrl}${config.hotelsApiUrl}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      const { status } = response;
      return { status, data: response.data};
    })
    .catch((error) =>{
      return { error }
    });

const addHotelInventory = async (tenantId, data) =>
  await POST(`tenants/${tenantId}/hotel-inventory`, {
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


const patchHotelInventory = async (tenantId, data, hotelInventoryId, paymentPatch) =>
  await PATCH(`tenants/${tenantId}/hotel-inventory/${hotelInventoryId}`, {
    baseUrl: `${config.baseUrl}${config.hotelsApiUrl}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json',
    },
    data: [...formatPatchData(data), paymentPatch]
  })
    .then(response => {
      const { status } = response;
      return { data: response.data, status, id: hotelInventoryId };
    })
    .catch(error => {
      return { error };
    });

const putHotelInventory= async (tenantId, hotelInventoryId, action) =>
  await PUT(`tenants/${tenantId}/hotel-inventory/${hotelInventoryId}/${action}`, {
    baseUrl: `${config.baseUrl}${config.hotelsApiUrl}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json',
    }
  })
    .then(response => {
      const { status } = response;
      return {action, id: hotelInventoryId, status, data: response.data};
    })
    .catch((error) =>{
      return { error }
    });

const getHotelInventoryList = async ( tenantId, skip = 0, take = 10, archived = false, inactive = false, searchTerm = '', complete = false) =>
  await GET(`tenants/${tenantId}/hotel-inventory?skip=${skip}&take=${take}${archived ? '&archived=true' : ''}${inactive ? '&inactive=true' : ''}${searchTerm !== '' ? '&searchTerm='+searchTerm : ''}${complete ? '&complete=true' : ''}`, {
    baseUrl: `${config.baseUrl}${config.hotelsApiUrl}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json',
    },
  })
  .then(response => {
    const { status } = response;
    return {status, data: response.data};
  })
  .catch((error) =>{
    return { error }
  });

const getHotelInventory = async ( tenantId, hotelInventoryId) =>
  await GET(`tenants/${tenantId}/hotel-inventory/${hotelInventoryId}`, {
    baseUrl: `${config.baseUrl}${config.hotelsApiUrl}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json',
    },
  })
  .then(response => {
    const { status } = response;
    return {id: hotelInventoryId, status, data: response.data};
  })
  .catch((error) =>{
    return { error }
  });

const getAllRoomTypes = async (tenantId, hotelInventoryId) =>
  await GET(`tenants/${tenantId}/hotel-inventory/${hotelInventoryId}/type-data`, {
    baseUrl: `${config.baseUrl}${config.hotelsApiUrl}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json',
    },
  })
  .then(response => {
    const { status } = response;
    return {id: hotelInventoryId, status, data: response.data};
  })
  .catch((error) =>{
    return { error }
  });



function* fetchHotelInventoryListRequest({ payload }) {
  const { tenantId, skip, take, archived, inactive, searchText, complete = false} = payload;
  try {
    const data = yield call(getHotelInventoryList, tenantId, skip, take, archived, inactive, searchText, complete);
    if(data.error || data.status >= 400){
      yield put(fetchHotelInventoryListFailure())
    }else{
      yield put(fetchHotelInventoryListSuccess(data.data));
    }
  } catch (error) {
    console.error(error);
  }
}

function* fetchHotelInventoryRequest({ hotelInventoryId, tenantId }) {
  try {
    const data = yield call(getHotelInventory, tenantId, hotelInventoryId);
    if(data.error || data.status >= 400){
      yield put(fetchHotelInventoryFailure())
    }else{
      yield put(fetchHotelInventorySuccess(data.data));
    }
  } catch (error) {
    console.error(error);
  }
}

function* searchHotelsRequest({ payload }) {
  const { searchTerm } = payload;
  try {
    const searchCall = yield call(searchHotel, searchTerm);
    if(searchCall.error || searchCall.status >= 400){
      yield put(searchHotelsFailure())
    }else{
      yield put(searchHotelsSuccess(searchCall.data));
    }
  } catch (error) {
    console.error(error);
  }
}

function* fetchHotelDetailRequest({ payload }) {
  const { id } = payload;
  try {
    const fetchCall = yield call(getHotelDetail, id);
    if(fetchCall.error || fetchCall.status >= 400){
      yield put(fetchHotelDetailFailure())
    }else{
      yield put(fetchHotelDetailSuccess(fetchCall.data));
    }
  } catch (error) {
    console.error(error);
  }
}

function* addHotelInventoryDetailRequest({ payload }) {
  const { data, tenantId } = payload
  try {
    const addCall = yield call(addHotelInventory, tenantId, data);
    Notification(addCall, {error: 'Error occured!', success: 'Hotel Inventory created successfully!'});

    if(addCall.error || addCall.status >= 400){
      yield put(addHotelInventoryDetailFailure(addCall))
    }else{
      yield put(addHotelInventoryDetailSuccess(addCall.data));
    }
  } catch (error) {
    console.error(error);
  }
}


function* patchHotelInventoryDetailRequest({ payload }) {
  const { data, hotelInventoryId, tenantId, paymentPatch } = payload
  try {
    const addCall = yield call(patchHotelInventory, tenantId, data, hotelInventoryId, paymentPatch);
    Notification(addCall, {error: 'Error occured!', success: 'Hotel Inventory updated successfully!'});
    if(addCall.error || addCall.status >= 400){
      yield put(patchHotelInventoryDetailFailure())
    }else{
      yield put(patchHotelInventoryDetailSuccess(addCall));
    }
  } catch (error) {
    console.error(error);
  }
}

function* putHotelInventoryRequest({ payload }) {
  const { tenantId, hotelInventoryId, action } = payload;
  try {
    const callData = yield call(putHotelInventory, tenantId, hotelInventoryId, action);
    Notification(callData, {error: 'Error occured!', success: `Hotel Inventory ${action} successfully!`});
    if(callData.error || callData.status >= 400){
      yield put(putHotelInventoryDetailFailure())
    }else{
      yield put(putHotelInventoryDetailSuccess(callData));
    }
  } catch (error) {
    console.error(error);
  }
}

function* fetchAllRoomTypesRequest({ payload }) {
  const { hotelInventoryId, tenantId } = payload
  try {
    const getCall = yield call(getAllRoomTypes, tenantId, hotelInventoryId);
    if(getCall.error || getCall.status >= 400){
      yield put(fetchAllRoomTypesFailure())
    }else{
      yield put(fetchAllRoomTypesSuccess(getCall.data));
    }
  } catch (error) {
    console.error(error);
  }
}

export function* searchHotels() {
  yield takeEvery(SEARCH_HOTELS, searchHotelsRequest);
}

export function* fetchHotelDetail() {
  yield takeEvery(FETCH_HOTEL_DETAIL, fetchHotelDetailRequest);
}

export function* addHotelInventoryDetail() {
  yield takeEvery(ADD_HOTEL_INVENTORY_DETAIL, addHotelInventoryDetailRequest);
}

export function* patchHotelInventoryDetail() {
  yield takeEvery(PATCH_HOTEL_INVENTORY_DETAIL, patchHotelInventoryDetailRequest);
}

export function* putHotelInventoryDetail() {
  yield takeEvery(PUT_HOTEL_INVENTORY_DETAIL, putHotelInventoryRequest);
}

export function* fetchHotelInventoryList() {
  yield takeEvery(FETCH_HOTEL_INVENTORY_LIST, fetchHotelInventoryListRequest);
}

export function* fetchHotelInventory() {
  yield takeEvery(GET_HOTEL_INVENTORY, fetchHotelInventoryRequest);
}

export function* fetchAllRoomTypes() {
  yield takeEvery(FETCH_ADD_ROOMTYPES, fetchAllRoomTypesRequest);
}

export default function* rootSaga() {
  yield all([
    fork(searchHotels),
    fork(fetchHotelDetail),
    fork(addHotelInventoryDetail),
    fork(fetchHotelInventoryList),
    fork(fetchHotelInventory),
    fork(fetchAllRoomTypes),
    fork(patchHotelInventoryDetail),
    fork(putHotelInventoryDetail),
  ]);
}
