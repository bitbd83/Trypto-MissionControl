import { all, call, put, fork, takeEvery } from 'redux-saga/effects';
import { GET, POST, PATCH } from '../../../util/request';
import config from '../../../config/config';
import {
  postEventsSuccess,
  postEventsFailure,
  showEventsMessage,
  getEventByIdSuccess,
  getEventByIdFailure,
  patchEventsSuccess,
  patchEventsFailure,
} from './actions';
import { POST_EVENTS, GET_EVENT_BY_ID, PATCH_EVENTS } from './constants';
import { Notification } from '../../../util/Notifications';

const postEventsCall = async (tenantId, data) =>
  await POST(`${tenantId}/events`, {
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

const getEventByIdCall = async (tenantId, selectedEventId) =>
  await GET(`${tenantId}/events/${selectedEventId}`, {
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

const patchEventsCall = async (selectedEventId, data) =>
  await PATCH(`${localStorage.getItem('tenant_id')}/events/${selectedEventId}`, {
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

function* postEventsRequest({ params }) {
  const { tenantId, data } = params;
  try {
    const postedEvents = yield call(postEventsCall, tenantId, data);
    Notification(postedEvents, { error: 'Error occured!', success: 'Event added successfully!' });
    if(postedEvents.error || postedEvents.status >= 400){
      yield put(postEventsFailure())
    }else{
      yield put(postEventsSuccess(postedEvents.data));
    }
  } catch (error) {
    console.error(error);
  }
}

function* getEventByIdRequest({ params }) {
  const { tenantId, selectedEventId } = params;
  try {
    const gotEventById = yield call(getEventByIdCall, tenantId, selectedEventId);
    if(gotEventById.error || gotEventById.status >= 400){
      yield put(getEventByIdFailure())
    }else{
      yield put(getEventByIdSuccess(gotEventById.data));
    }
  } catch (error) {
    console.error(error);
  }
}

function* patchEventsRequest({ params }) {
  const { selectedEventId, data } = params;
  try {
    const patchedEvents = yield call(patchEventsCall, selectedEventId, data);
    Notification(patchedEvents, { error: 'Error occured!', success: 'Event updated successfully!' });
    if(patchedEvents.error || patchedEvents.status >= 400){
      yield put(patchEventsFailure())
    }else{
      yield put(patchEventsSuccess(patchedEvents.data));
    }
  } catch (error) {
    console.error(error);
  }
}

export function* postEvents() {
  yield takeEvery(POST_EVENTS, postEventsRequest);
}

export function* getEventById() {
  yield takeEvery(GET_EVENT_BY_ID, getEventByIdRequest);
}

export function* patchEvents() {
  yield takeEvery(PATCH_EVENTS, patchEventsRequest);
}

export default function* rootSaga() {
  yield all([fork(postEvents), fork(getEventById), fork(patchEvents)]);
}
