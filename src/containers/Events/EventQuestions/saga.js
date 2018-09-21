import { all, call, put, fork, takeEvery } from 'redux-saga/effects';
import { GET, POST, DELETE, PUT, formatPatchData, PATCH } from '../../../util/request';
import config from '../../../config/config';
import {
  getEventQuestionsSuccess,
  getEventQuestionsFailuer,
  postEventQuestionSuccess,
  postEventQuestionFailuer,
  putEventQuestionSuccess,
  putEventQuestionFailuer,
  deleteEventQuestionSuccess,
  deleteEventQuestionFailuer,
  reorderEventQuestionSuccess,
  reorderEventQuestionFailuer,
  patchQuestionMandatorySuccess,
  patchQuestionMandatoryFailuer,
} from './actions';
import {
  GET_QUESTIONS,
  POST_QUESTION,
  PUT_QUESTION,
  REORDER_QUESTIONS,
  DELETE_QUESTION,
  PATCH_QUESTION_MANDATORY
} from './constants';
import { Notification } from '../../../util/Notifications'

const getQuestionsList = async ( tenantId, eventId, inactive) =>
  await GET(`${tenantId}/events/${eventId}/buyer-questions?inactive=${inactive}`, {
    baseUrl: `${config.baseUrl}${config.eventsApiUrl}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json',
    },
  })
    .then(response =>{
      const { status } = response;
      return { data: response.data, status, error: false };
    })
    .catch(error => {
      return { data: error.response.data.message, status: error.response.status, error: true };
    });


const postQuestion = async (tenantId, eventId, data) =>
  await POST(`${tenantId}/events/${eventId}/buyer-questions`, {
    baseUrl: `${config.baseUrl}${config.eventsApiUrl}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json',
    },
    data
  })
  .then(response => {
    const { status } = response;
    return { data: response.data, status, error: false };
  })
  .catch(error => {
    return { data: error.response.message, status: error.response.status, error: true };
  });

const reorderQuestions = async (tenantId, eventId, data) =>
  await POST(`${tenantId}/events/${eventId}/buyer-questions/reorder`, {
    baseUrl: `${config.baseUrl}${config.eventsApiUrl}`,
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
    return { data: error.response.data, status: error.response.status };
  });

const deleteQuestion = async (tenantId, eventId, questionId) =>
  await DELETE(`${tenantId}/events/${eventId}/buyer-questions/${questionId}`, {
    baseUrl: `${config.baseUrl}${config.eventsApiUrl}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json-patch+json',
    }
  })
  .then(response => {
    const { status } = response;
    return { data: response.data, status };
  })
  .catch(error => {
    return { error };
  });


const putQuestion = async (tenantId, eventId, questionId, action) =>
  await PUT(`${tenantId}/events/${eventId}/buyer-questions/${questionId}/${action}`, {
    baseUrl: `${config.baseUrl}${config.eventsApiUrl}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json',
    }
  })
  .then(response => {
    const { status, data } = response;
    return { data, status };
  })
  .catch(error => {
    return { error };
  });

const patchQuestion = async (tenantId, eventId, questionId, data) =>
  await PATCH(`${tenantId}/events/${eventId}/buyer-questions/${questionId}`, {
    baseUrl: `${config.baseUrl}${config.eventsApiUrl}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json',
    },
    data
  })
  .then(response => {
    const { status } = response;
    return { data: response.data, status, error: false };
  })
  .catch(error => {
    return { data: error.response.message, status: error.response.status, error: true };
  });

function* getQuestionsRequest({ payload }) {
  const { tenantId, eventId, inactive = false } = payload;
  try {
    const dataCall = yield call(getQuestionsList, tenantId, eventId, inactive);
    if(dataCall.error || dataCall.status >= 400){
      yield put(getEventQuestionsFailuer())
    }else {
      yield put(getEventQuestionsSuccess(dataCall.data));
    }
  } catch (error) {
    console.error(error);
  }
}

function* postQuestionRequest({ payload }) {
  const { tenantId, eventId, data} = payload;
  try {
    const dataCall = yield call(postQuestion, tenantId, eventId, data);
    Notification(dataCall, {error: 'Error occured!', success: 'Question Added successfully!'});
    if(dataCall.error || dataCall.status >= 400){
      yield put(postEventQuestionFailuer())
    }else {
      yield put(postEventQuestionSuccess(dataCall.data));
    }
  } catch (error) {
    console.error(error);
  }
}

function* reorderQuestionsRequest({ payload }) {
  const { tenantId, eventId, data } = payload;
  try {
    const patchCall = yield call(reorderQuestions, tenantId, eventId, data);
    Notification(patchCall, {error: 'Error occured!', success: 'Questions reordered successfully!'});
    if(patchCall.error || patchCall.status >= 400){
      yield put(reorderEventQuestionFailuer())
    }else {
      yield put(reorderEventQuestionSuccess(patchCall.data));
    }
  } catch (error) {
    console.error(error);
  }
}

function* putQuestionRequest({ payload }) {
  const { tenantId, eventId, questionId, action } = payload;
  try {
    const putCall = yield call(putQuestion, tenantId, eventId, questionId, action);
    Notification(putCall, {error: 'Error occured!', success: `Question ${action} successfully!`});
    if(putCall.error || putCall.status >= 400){
      yield put(putEventQuestionFailuer())
    }else {
      yield put(putEventQuestionSuccess(putCall.data));
    }
  } catch (error) {
    console.error(error);
  }
}

function* patchQuestionMandatoryRequest({ payload }) {
  const { tenantId, eventId, questionId, data } = payload;
  try {
    const patchCall = yield call(patchQuestion, tenantId, eventId, questionId, data);
    Notification(patchCall, {error: 'Error occured!', success: `Question Updated successfully!`});
    if(patchCall.error || patchCall.status >= 400){
      yield put(patchQuestionMandatoryFailuer())
    }else {
      yield put(patchQuestionMandatorySuccess(patchCall.data));
    }
  } catch (error) {
    console.error(error);
  }
}

function* deleteQuestionRequest({ payload }) {
  const { tenantId, eventId, questionId } = payload;
  try {
    const deleteCall = yield call(deleteQuestion, tenantId, eventId, questionId);
    Notification(deleteCall, {error: 'Error occured!', success: `Question deleted successfully!`});
    if(deleteCall.error || deleteCall.status >= 400){
      yield put(deleteEventQuestionFailuer())
    }else {
      yield put(deleteEventQuestionSuccess(deleteCall.data));
    }
  } catch (error) {
    console.error(error);
  }
}

export function* getAllQuestions() {
  yield takeEvery(GET_QUESTIONS, getQuestionsRequest);
}

export function* addQuestionSaga() {
  yield takeEvery(POST_QUESTION, postQuestionRequest);
}

export function* deleteQuestionSaga() {
  yield takeEvery(DELETE_QUESTION, deleteQuestionRequest);
}

export function* reorderQuestionSaga() {
  yield takeEvery(REORDER_QUESTIONS, reorderQuestionsRequest);
}

export function* putQuestionSaga() {
  yield takeEvery(PUT_QUESTION, putQuestionRequest);
}

export function* patchQuestionMandatory() {
  yield takeEvery(PATCH_QUESTION_MANDATORY, patchQuestionMandatoryRequest);
}

export default function* rootSaga() {
  yield all([
    fork(getAllQuestions),
    fork(addQuestionSaga),
    fork(deleteQuestionSaga),
    fork(reorderQuestionSaga),
    fork(putQuestionSaga),
    fork(patchQuestionMandatory),
  ]);
}
