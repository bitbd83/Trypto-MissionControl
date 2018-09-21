import { all, call, put, fork, takeEvery } from 'redux-saga/effects';
import { GET, POST, DELETE } from '../../../util/request';
import config from '../../../config/config';
import {
  postEventPhotoSuccess,
  postEventPhotoFailure,
  listEventPhotosSuccess,
  listEventPhotosFailure,
  deleteEventPhotoSuccess,
  deleteEventPhotoFailure,
  postMediaSuccess,
  postMediaFailure,
} from './actions';
import { POST_EVENT_PHOTO, LIST_EVENT_PHOTOS, DELETE_EVENT_PHOTO, POST_MEDIA } from './constants';
import { Notification } from '../../../util/Notifications';

const postEventPhotoCall = async (selectedEventId, data) =>
  await POST(`${localStorage.getItem('tenant_id')}/events/${selectedEventId}/photos`, {
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

const listEventPhotosCall = async (selectedEventId, skip, take) =>
  await GET(`${localStorage.getItem('tenant_id')}/events/${selectedEventId}/photos?skip=${skip}&take=${take}`, {
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

const deletePhotoCall = async (selectedEventId, photoId) =>
  await DELETE(`${localStorage.getItem('tenant_id')}/events/${selectedEventId}/photos/${photoId}`, {
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

const postMediaCall = async data =>
  await POST(`${localStorage.getItem('tenant_id')}/media`, {
    baseUrl: `${config.baseUrl}${config.eventsApiUrl}`,
    headers: {
      'Content-Type': 'multipart/form-data',
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

function* postEventPhotoRequest({ params }) {
  const { selectedEventId, data } = params;
  try {
    const postedPhoto = yield call(postEventPhotoCall, selectedEventId, data);
    Notification(postedPhoto, { error: 'Error occured!', success: 'Event photo added successfully!' });
    if(postedPhoto.error || postedPhoto.status >= 400){
      yield put(postEventPhotoFailure())
    }else{
      yield put(postEventPhotoSuccess(postedPhoto.data));
    }
  } catch (error) {
    console.error(error);
  }
}

function* listEventPhotosRequest({ params }) {
  const { selectedEventId, skip, take } = params;
  try {
    const listedPhoto = yield call(listEventPhotosCall, selectedEventId, skip, take);
    if(listedPhoto.error || listedPhoto.status >= 400){
      yield put(listEventPhotosFailure())
    }else{
      yield put(listEventPhotosSuccess(listedPhoto.data));
    }
  } catch (error) {
    console.error(error);
  }
}

function* deleteEventPhotoRequest({ params }) {
  const { selectedEventId, photoId } = params;
  try {
    const deletePhoto = yield call(deletePhotoCall, selectedEventId, photoId);
    Notification(deletePhoto, { error: 'Error occured!', success: 'Event photo removed successfully!' });
    if(deletePhoto.error || deletePhoto.status >= 400){
      yield put(deleteEventPhotoFailure())
    }else{
      yield put(deleteEventPhotoSuccess(deletePhoto.data));
    }
  } catch (error) {
    console.error(error);
  }
}

function* postMediaRequest({ params }) {
  const { data } = params;
  try {
    const postedMedia = yield call(postMediaCall, data);
    Notification(postedMedia, { error: 'Error occured!', success: 'Media added successfully!' });
    if(postedMedia.error || postedMedia.status >= 400){
      yield put(postMediaFailure())
    }else{
      yield put(postMediaSuccess(postedMedia.data));
    }
  } catch (error) {
    console.error(error);
  }
}

export function* postEventPhoto() {
  yield takeEvery(POST_EVENT_PHOTO, postEventPhotoRequest);
}

export function* listEventPhotos() {
  yield takeEvery(LIST_EVENT_PHOTOS, listEventPhotosRequest);
}

export function* deleteEventPhoto() {
  yield takeEvery(DELETE_EVENT_PHOTO, deleteEventPhotoRequest);
}

export function* postMedia() {
  yield takeEvery(POST_MEDIA, postMediaRequest);
}

export default function* rootSaga() {
  yield all([fork(postEventPhoto), fork(listEventPhotos), fork(deleteEventPhoto), fork(postMedia)]);
}
