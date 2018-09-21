import { all, call, put, fork, takeEvery } from 'redux-saga/effects';
import { GET, POST, PATCH, PUT } from '../../util/request';
import config from '../../config/config';
import {
  listVenuesSuccess,
  listVenuesFailure,
  getVenueByIdSuccess,
  getVenueByIdFailure,
  addUpdateVenueStateSuccess,
  addUpdateVenueStateFailure,
  postVenuesSuccess,
  postVenuesFailure,
  patchVenueByIdSuccess,
  patchVenueByIdFailure,
  putVenueByIdSuccess,
  putVenueByIdFailure,
} from './actions';
import { showEventsMessage } from 'containers/Events/CreateAnEvent/actions';
import { LIST_VENUES, GET_VENUE_BY_ID, ADD_UPDATE_VENUE_STATE, POST_VENUES, PATCH_VENUE_BY_ID, PUT_VENUE_BY_ID } from './constants';
import { Notification } from 'util/Notifications';

const getVenues = async (tenantId, skipPaging, skip, take, archived) =>
  await GET(`${tenantId}/venues?skipPaging=${skipPaging}&skip=${skip}&take=${take}&archived=${archived}`, {
    baseUrl: `${config.baseUrl}${config.eventsApiUrl}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  })
  .then(response => {
    const { status } = response;
    return { data: response.data, status };
  })
  .catch(error => {
    return { error };
  })

const getVenueById = async (tenantId, venueId) =>
  await GET(`${tenantId}/venues/${venueId}`, {
    baseUrl: `${config.baseUrl}${config.eventsApiUrl}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  })
  .then(response => {
    const { status } = response;
    return { data: response.data, status };
  })
  .catch(error => {
    return { error };
  })

const postNewVenues = async (tenantId, data) =>
  await POST(`${tenantId}/venues`, {
    baseUrl: `${config.baseUrl}${config.eventsApiUrl}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
    data,
  })
    .then(response => {
      const { status } = response;
      return { data: response.data, status };
    })
    .catch(error => {
      return { error };
    });

const getPatchVenue = async (tenantId, venueId, data) =>
  await PATCH(`${tenantId}/venues/${venueId}`, {
    baseUrl: `${config.baseUrl}${config.eventsApiUrl}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
    data,
  })
    .then(response => {
      const { status } = response;
      return { data: response.data, status };
    })
    .catch(error => {
      return { error };
    });

const putVenueByIdCall = async (venueId, action) =>
  await PUT(`${localStorage.getItem('tenant_id')}/venues/${venueId}/${action}`, {
    baseUrl: `${config.baseUrl}${config.eventsApiUrl}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  })
  .then(response => {
    const { status } = response;
    return { data: response.data, status };
  })
  .catch(error => {
    return { error };
  });

function* getVenuesRequest({ params }) {
  const { tenantId, skipPaging, skip, take, archived } = params;
  try {
    const fetchedVenues = yield call(getVenues, tenantId, skipPaging, skip, take, archived);
    if(fetchedVenues.error || fetchedVenues.status >= 400){
      yield put(listVenuesFailure())
    }else{
      yield put(listVenuesSuccess(fetchedVenues.data));
    }
  } catch (error) {
    console.error(error);
  }
}

function* getVenueByIdRequest({ params }) {
  const { tenantId, venueId } = params;
  try {
    const venueById = yield call(getVenueById, tenantId, venueId);
    if(venueById.error || venueById.status >= 400){
      yield put(getVenueByIdFailure())
    }else{
      yield put(getVenueByIdSuccess(venueById.data));
    }
  } catch (error) {
    console.error(error);
  }
}

function* addUpdateVenueStateRequest(param) {
  try {
    yield put(addUpdateVenueStateSuccess(param));
  } catch (error) {
    console.error(error);
  }
}

function* postVenuesRequest({ params }) {
  const { tenantId, data } = params;
  try {
    const newVenues = yield call(postNewVenues, tenantId, data);
    Notification(newVenues, { error: newVenues.error ? newVenues.error.response.data.errorMessage : 'Error occured!', success: 'Venue added successfully!' });
    if(newVenues.error || newVenues.status >= 400){
      yield put(postVenuesFailure())
    }else{
      yield put(postVenuesSuccess(newVenues.data));
    }
  } catch (error) {
    console.error(error);
  }
}

function* patchVenueByIdRequest({ params }) {
  const { tenantId, venueId, data } = params;
  try {
    const patchVenue = yield call(getPatchVenue, tenantId, venueId, data);
    Notification(patchVenue, { error: patchVenue.error ? patchVenue.error.response.data.errorMessage : 'Error occured!', success: 'Venue updated successfully!' });
    if(patchVenue.error || patchVenue.status >= 400){
      yield put(patchVenueByIdFailure())
    }else{
      yield put(patchVenueByIdSuccess(patchVenue.data));
    }
  } catch (error) {
    console.error(error);
  }
}

function* putVenueByIdRequest({ params }) {
  const { venueId, action } = params;
  try {
    const putVenue = yield call(putVenueByIdCall, venueId, action);
    Notification(putVenue, {error: 'Error occured!', success: `Vanue ${action} successfully!`});
    if(putVenue.error || putVenue.status >= 400){
      yield put(putVenueByIdFailure())
    }else{
      yield put(putVenueByIdSuccess(putVenue.data));
    }
  } catch (error) {
    console.error(error);
  }
}

export function* fetchAllVenues() {
  yield takeEvery(LIST_VENUES, getVenuesRequest);
}

export function* fetchGetVenueById() {
  yield takeEvery(GET_VENUE_BY_ID, getVenueByIdRequest);
}

export function* addUpdateVenueState() {
  yield takeEvery(ADD_UPDATE_VENUE_STATE, addUpdateVenueStateRequest);
}

export function* postVenues() {
  yield takeEvery(POST_VENUES, postVenuesRequest);
}

export function* patchVenueById() {
  yield takeEvery(PATCH_VENUE_BY_ID, patchVenueByIdRequest);
}

export function* putVenueById() {
  yield takeEvery(PUT_VENUE_BY_ID, putVenueByIdRequest);
}

export default function* rootSaga() {
  yield all([fork(fetchAllVenues), fork(fetchGetVenueById), fork(addUpdateVenueState), fork(postVenues), fork(patchVenueById), fork(putVenueById)]);
}
