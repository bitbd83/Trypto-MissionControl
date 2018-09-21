import { all, call, put, fork, takeEvery } from 'redux-saga/effects';
import { GET } from '../../util/request';
import config from '../../config/config';
import {
  getTopEventSuccess,
  getTopEventFailure,
 } from './actions';
import { TOP_EVENT_LIST } from './constants';
import { Notification } from '../../util/Notifications'

const getEvents = async ( tenantId, take) =>
  await GET(`${tenantId}/top-selling-events?take=${take}`, {
    baseUrl: `${config.baseUrl}${config.eventsApiUrl}`,
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

function* fetchTopEventsRequest({ payload }) {
  const { tenantId, take} = payload;
  try {
    const getCall = yield call(getEvents, tenantId, take);
    if(getCall.error || getCall.status >= 400){
      Notification(getCall, {error: 'Error occured!', success: 'Events Loaded'});
      yield put(getTopEventFailure())
    }else{
      yield put(getTopEventSuccess(getCall.data));
    }
  } catch (error) {
    console.error(error);
  }
}

export function* topEventListSaga() {
  yield takeEvery(TOP_EVENT_LIST, fetchTopEventsRequest);
}

export default function* rootSaga() {
  yield all([
    fork(topEventListSaga),
  ]);
}
