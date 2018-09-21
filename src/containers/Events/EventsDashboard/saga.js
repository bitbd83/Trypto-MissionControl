import { all, call, put, fork, takeEvery } from 'redux-saga/effects';
import { GET, POST } from '../../../util/request';
import config from '../../../config/config';
import {
  fetchAllEventSuccess,
  fetchAllEventFailure,
  fetchOnSaleEventSuccess,
  fetchOnSaleEventFailure,
  fetchPastEventSuccess,
  fetchPastEventFailure,
  fetchDraftEventSuccess,
  fetchDraftEventFailure,
  switchOnSaleEventStatusSuccess,
  switchOnSaleEventStatusFailure,
  switchPastEventStatusSuccess,
  switchPastEventStatusFailure,
  switchDraftEventStatusSuccess,
  switchDraftEventStatusFailure
} from './actions';
import {
  FETCH_ALL_EVENTS,
  FETCH_ON_SALE_EVENTS,
  FETCH_PAST_EVENTS,
  FETCH_DRAFT_EVENTS,
  SWITCH_ONSALE_EVENT_STATUS,
  SWITCH_PAST_EVENT_STATUS,
  SWITCH_DRAFT_EVENT_STATUS
} from './constants';
import { Notification } from '../../../util/Notifications'

const getEvents = async ( skip = 0, take = 10, searchText, additionalParams ) =>
  await GET(`${localStorage.getItem('tenant_id')}/events?skip=${skip}&take=${take}${searchText !== '' ? '&searchTerm='+searchText : ''}${additionalParams ? '&'+ additionalParams : ''}`, {
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
    const { data } =  error.response;
    return { data: data.errorMessage, error };
  });

const switchStatusCall = async (eventId, action) =>
  await POST(`${localStorage.getItem('tenant_id')}/events/${eventId}/${action}`, {
    baseUrl: `${config.baseUrl}${config.eventsApiUrl}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json',
    }
  })
  .then(response => {
    const { status } = response;
    return { data: response.data, status };
  })
  .catch(error => {
    const { data } =  error.response;
    return { data: data.errorMessage, error };
  });


function* fetchEventRequest({ payload }) {
  const { skip, take, searchText='' } = payload;
  try {
    const eventcall = yield call(getEvents, skip, take, searchText, '');
    if(eventcall.error || eventcall.status >= 400){
      yield put(fetchAllEventFailure())
    }else {
      yield put(fetchAllEventSuccess(eventcall.data));
    }
  } catch (error) {
    console.error(error);
  }
}

function* fetchOnSaleEventRequest({ payload }) {
  const { skip, take, searchText=''} = payload;
  try {
    const eventcall = yield call(getEvents, skip, take, searchText, 'onSaleOnly=true');
    if(eventcall.error || eventcall.status >= 400){
      yield put(fetchOnSaleEventFailure())
    }else {
      yield put(fetchOnSaleEventSuccess(eventcall.data));
    }
  } catch (error) {
    console.error(error);
  }
}

function* fetchPastEventRequest({ payload }) {
  const { skip, take, searchText=''} = payload;
  try {
    const eventcall = yield call(getEvents, skip, take, searchText, 'pastEventsOnly=true');
    if(eventcall.error || eventcall.status >= 400){
      yield put(fetchPastEventFailure())
    }else {
      yield put(fetchPastEventSuccess(eventcall.data));
    }
  } catch (error) {
    console.error(error);
  }
}

function* fetchDraftEventRequest({ payload }) {
  const { skip, take, searchText=''} = payload;
  try {
    const eventcall = yield call(getEvents, skip, take, searchText, 'draftOnly=true');
    if(eventcall.error || eventcall.status >= 400){
      yield put(fetchDraftEventFailure())
    }else {
      yield put(fetchDraftEventSuccess(eventcall.data));
    }
  } catch (error) {
    console.error(error);
  }
}

function* switchOnSaleEventStatusRequest({ payload }) {
  const { eventId, action } = payload;
  try {
    const switchStatus = yield call(switchStatusCall, eventId, action);
    let errorMsg = 'Error occured!'
    if(switchStatus.error !== undefined)
      errorMsg = switchStatus.data;

    Notification(switchStatus, {error: errorMsg, success:  successMsg(action)});

    if(switchStatus.error || switchStatus.status >= 400){
      yield put(switchOnSaleEventStatusFailure())
    }else {
      yield put(switchOnSaleEventStatusSuccess({switchStatus, action}));
    }
  } catch (error) {
    console.error(error);
  }
}

function* switchPastEventStatusRequest({ payload }) {

  const { eventId, action } = payload;
  try {
    const switchStatus = yield call(switchStatusCall, eventId, action);
    let errorMsg = 'Error occured!'
    if(switchStatus.error !== undefined)
      errorMsg = switchStatus.data;

    Notification(switchStatus, {error: errorMsg, success:  successMsg(action)});
    if(switchStatus.error || switchStatus.status >= 400){
      yield put(switchPastEventStatusFailure())
    }else {
      yield put(switchPastEventStatusSuccess({switchStatus, action}));
    }
  } catch (error) {
    console.error(error);
  }
}

function* switchDraftEventStatusRequest({ payload }) {
  const { eventId, action } = payload;
  try {
    const switchStatus = yield call(switchStatusCall, eventId, action);
    let errorMsg = 'Error occured!'
    if(switchStatus.error !== undefined)
      errorMsg = switchStatus.data;

    Notification(switchStatus, {error: errorMsg, success: successMsg(action)});
    if(switchStatus.error || switchStatus.status >= 400){
      yield put(switchDraftEventStatusFailure())
    }else {
      yield put(switchDraftEventStatusSuccess({switchStatus, action}));
    }
  } catch (error) {
    console.error(error);
  }
}


const successMsg = (action) => {
  let msg = '';
  switch(action){
    case 'show' :
      msg = 'Event will now appear on your site.';
      break;
    case 'hide' :
      msg = "Event will not appear on your site anymore.";
      break;
    case 'on-sale' :
      msg = "Event is on sale and sales will begin at the Event's Sale Start Date.";
      break;
    case 'off-sale' :
      msg = "Event will no longer be on sale.";
      break;
    case 'not-featured' :
      msg = "This Event will not be shown in the Featured Events section anymore.";
      break;
    case 'featured' :
      msg = "This Event will be shown in the Featured Events section.";
      break;
    default :
      msg = `Event ${action} successfully!`;
  }
  return msg;
}

export function* fetchAllEvent() {
  yield takeEvery(FETCH_ALL_EVENTS, fetchEventRequest);
}

export function* fetchOnSaleEvent() {
  yield takeEvery(FETCH_ON_SALE_EVENTS, fetchOnSaleEventRequest);
}

export function* fetchPastEvent() {
  yield takeEvery(FETCH_PAST_EVENTS, fetchPastEventRequest);
}

export function* fetchDraftEvent() {
  yield takeEvery(FETCH_DRAFT_EVENTS, fetchDraftEventRequest);
}

export function* switchOnSaleEventStatus() {
  yield takeEvery(SWITCH_ONSALE_EVENT_STATUS, switchOnSaleEventStatusRequest);
}

export function* switchPastEventStatus() {
  yield takeEvery(SWITCH_PAST_EVENT_STATUS, switchPastEventStatusRequest);
}

export function* switchDraftEventStatus() {
  yield takeEvery(SWITCH_DRAFT_EVENT_STATUS, switchDraftEventStatusRequest);
}

export default function* rootSaga() {
  yield all([
    fork(fetchAllEvent),
    fork(fetchOnSaleEvent),
    fork(fetchPastEvent),
    fork(fetchDraftEvent),
    fork(switchOnSaleEventStatus),
    fork(switchPastEventStatus),
    fork(switchDraftEventStatus),
  ]);
}
