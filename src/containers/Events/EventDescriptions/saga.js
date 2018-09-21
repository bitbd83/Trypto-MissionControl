import { all, call, put, fork, takeEvery } from 'redux-saga/effects';
import { GET, POST, PATCH } from '../../../util/request';
import config from '../../../config/config';
import {
  getMediaSuccess,
  getMediaFailure,
  getEventDescriptionSuccess,
  getEventDescriptionFailure,
  patchEventDescriptionSuccess,
  patchEventDescriptionFailure,
  postEventDescriptionSuccess,
  postEventDescriptionFailure,
} from './actions';
import { GET_MEDIA, GET_EVENT_DESCRIPTION, PATCH_EVENT_DESCRIPTION, POST_EVENT_DESCRIPTION } from './constants';
import { Notification } from '../../../util/Notifications';

const getMediaCall = async (skip, take) =>
  await GET(`${localStorage.getItem('tenant_id')}/media?skip=${skip}&take=${take}`, {
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

const getEventDescriptionCall = async selectedEventId =>
  await GET(`${localStorage.getItem('tenant_id')}/events/${selectedEventId}/descriptions`, {
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

const patchEventDescriptionCall = async (selectedEventId, data) =>
  await PATCH(`${localStorage.getItem('tenant_id')}/events/${selectedEventId}/descriptions`, {
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

const postEventDescriptionCall = async (selectedEventId, data) =>
  await POST(`${localStorage.getItem('tenant_id')}/events/${selectedEventId}/descriptions`, {
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

function* getMediaRequest({ params }) {
  const { skip, take } = params;
  try {
    const gotMedia = yield call(getMediaCall, skip, take);
    if(gotMedia.error || gotMedia.status >= 400){
      yield put(getMediaFailure())
    }else{
      yield put(getMediaSuccess(gotMedia.data));
    }
  } catch (error) {
    console.error(error);
  }
}

function* getEventDescriptionRequest({ params }) {
  const { selectedEventId } = params;
  try {
    const gotEventDescription = yield call(getEventDescriptionCall, selectedEventId);
    if(gotEventDescription.error || gotEventDescription.status >= 400){
      yield put(getEventDescriptionFailure())
    }else{
      yield put(getEventDescriptionSuccess(gotEventDescription.data));
    }
  } catch (error) {
    console.error(error);
  }
}

function* patchEventDescriptionRequest({ params }) {
  const { selectedEventId, data } = params;
  try {
    const patchedEventDescription = yield call(patchEventDescriptionCall, selectedEventId, data);
    Notification(patchedEventDescription, { error: 'Error occured!', success: 'Event description updated successfully!' });
    if(patchedEventDescription.error || patchedEventDescription.status >= 400){
      yield put(patchEventDescriptionFailure())
    }else{
      yield put(patchEventDescriptionSuccess(patchedEventDescription.data));
    }
  } catch (error) {
    console.error(error);
  }
}

function* postEventDescriptionRequest({ params }) {
  const { selectedEventId, data } = params;
  try {
    const postedEventDescription = yield call(postEventDescriptionCall, selectedEventId, data);
    Notification(postedEventDescription, { error: 'Error occured!', success: 'Event description added successfully!' });
    if(postedEventDescription.error || postedEventDescription.status >= 400){
      yield put(postEventDescriptionFailure())
    }else{
      yield put(postEventDescriptionSuccess(postedEventDescription.data));
    }
  } catch (error) {
    console.error(error);
  }
}

export function* getMedia() {
  yield takeEvery(GET_MEDIA, getMediaRequest);
}

export function* getEventDescription() {
  yield takeEvery(GET_EVENT_DESCRIPTION, getEventDescriptionRequest);
}

export function* patchEventDescription() {
  yield takeEvery(PATCH_EVENT_DESCRIPTION, patchEventDescriptionRequest);
}

export function* postEventDescription() {
  yield takeEvery(POST_EVENT_DESCRIPTION, postEventDescriptionRequest);
}

export default function* rootSaga() {
  yield all([fork(getMedia), fork(getEventDescription), fork(patchEventDescription), fork(postEventDescription)]);
}
