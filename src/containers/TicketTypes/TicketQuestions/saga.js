import { all, call, put, fork, takeEvery } from 'redux-saga/effects';
import { GET, POST, DELETE, PUT, formatPatchData, PATCH } from '../../../util/request';
import config from '../../../config/config';
import {
  getTicketQuestionsSuccess,
  getTicketQuestionsFailuer,
  postTicketQuestionSuccess,
  postTicketQuestionFailuer,
  putTicketQuestionSuccess,
  putTicketQuestionFailuer,
  deleteTicketQuestionSuccess,
  deleteTicketQuestionFailuer,
  reorderTicketQuestionSuccess,
  reorderTicketQuestionFailuer,
  patchQuestionMandatorySuccess,
  patchQuestionMandatoryFailuer,
} from './actions';
import {
  GET_TT_QUESTIONS,
  POST_TT_QUESTION,
  PUT_TT_QUESTION,
  REORDER_TT_QUESTIONS,
  DELETE_TT_QUESTION,
  PATCH_QUESTION_MANDATORY
} from './constants';
import { Notification } from '../../../util/Notifications'

const getQuestionsList = async (tenantId, eventId, ticketTypeId, inactive) =>
  await GET(`${tenantId}/events/${eventId}/ticket-types/${ticketTypeId}/questions?inactive=${inactive}`, {
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


const postQuestion = async (tenantId, eventId, ticketTypeId, data) =>
  await POST(`${tenantId}/events/${eventId}/ticket-types/${ticketTypeId}/questions`, {
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

const reorderQuestions = async (tenantId, eventId, ticketTypeId, data) =>
  await POST(`${tenantId}/events/${eventId}/ticket-types/${ticketTypeId}/questions/reorder`, {
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

const deleteQuestion = async (tenantId, eventId, ticketTypeId, questionId) =>
  await DELETE(`${tenantId}/events/${eventId}/ticket-types/${ticketTypeId}/questions/${questionId}`, {
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


const putQuestion = async (tenantId, eventId, ticketTypeId, questionId, action) =>
  await PUT(`${tenantId}/events/${eventId}/ticket-types/${ticketTypeId}/questions/${questionId}/${action}`, {
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

const patchQuestion = async (tenantId, eventId, ticketTypeId, questionId, data) =>
  await PATCH(`${tenantId}/events/${eventId}/ticket-types/${ticketTypeId}/questions/${questionId}`, {
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
  const {tenantId,  eventId, ticketTypeId, inactive = false } = payload;
  try {
    const dataCall = yield call(getQuestionsList,tenantId,  eventId, ticketTypeId, inactive);
    if(dataCall.error || dataCall.status >= 400){
      yield put(getTicketQuestionsFailuer());
    }else{
      yield put(getTicketQuestionsSuccess(dataCall.data));
    }
  } catch (error) {
    console.error(error);
  }
}

function* postQuestionRequest({ payload }) {
  const {tenantId,  eventId, ticketTypeId, data} = payload;
  try {
    const dataCall = yield call(postQuestion,tenantId,  eventId, ticketTypeId, data);
    Notification(dataCall, {error: 'Error occured!', success: 'Question Added successfully!'});
    if(dataCall.error || dataCall.status >= 400){
      yield put(postTicketQuestionFailuer());
    }else{
      yield put(postTicketQuestionSuccess(dataCall.data));
    }
  } catch (error) {
    console.error(error);
  }
}

function* reorderQuestionsRequest({ payload }) {
  const {tenantId,  eventId, ticketTypeId, data } = payload;
  try {
    const patchCall = yield call(reorderQuestions, tenantId, eventId, ticketTypeId, data);
    Notification(patchCall, {error: 'Error occured!', success: 'Questions reordered successfully!'});
    if(patchCall.error || patchCall.status >= 400){
      yield put(reorderTicketQuestionFailuer());
    }else{
      yield put(reorderTicketQuestionSuccess(patchCall.data));
    }
  } catch (error) {
    console.error(error);
  }
}

function* putQuestionRequest({ payload }) {
  const {tenantId,  eventId, ticketTypeId, questionId, action } = payload;
  try {
    const putCall = yield call(putQuestion, tenantId, eventId, ticketTypeId, questionId, action);
    Notification(putCall, {error: 'Error occured!', success: `Question ${action} successfully!`});
    if(putCall.error || putCall.status >= 400){
      yield put(putTicketQuestionFailuer());
    }else{
      yield put(putTicketQuestionSuccess(putCall.data));
    }
  } catch (error) {
    console.error(error);
  }
}

function* patchQuestionMandatoryRequest({ payload }) {
  const {tenantId,  eventId, ticketTypeId, questionId, data } = payload;
  try {
    const patchCall = yield call(patchQuestion, tenantId, eventId, ticketTypeId, questionId, data);
    Notification(patchCall, {error: 'Error occured!', success: `Question Updated successfully!`});
    if(patchCall.error || patchCall.status >= 400){
      yield put(patchQuestionMandatoryFailuer());
    }else{
      yield put(patchQuestionMandatorySuccess(patchCall.data));
    }
  } catch (error) {
    console.error(error);
  }
}

function* deleteQuestionRequest({ payload }) {
  const {tenantId,  eventId, ticketTypeId, questionId } = payload;
  try {
    const putCall = yield call(deleteQuestion,tenantId,  eventId, ticketTypeId, questionId);
    Notification(putCall, {error: 'Error occured!', success: `Question deleted successfully!`});
    if(putCall.error || putCall.status >= 400){
      yield put(deleteTicketQuestionFailuer());
    }else{
      yield put(deleteTicketQuestionSuccess(putCall.data));
    }
  } catch (error) {
    console.error(error);
  }
}

export function* getAllQuestions() {
  yield takeEvery(GET_TT_QUESTIONS, getQuestionsRequest);
}

export function* addQuestionSaga() {
  yield takeEvery(POST_TT_QUESTION, postQuestionRequest);
}

export function* deleteQuestionSaga() {
  yield takeEvery(DELETE_TT_QUESTION, deleteQuestionRequest);
}

export function* reorderQuestionSaga() {
  yield takeEvery(REORDER_TT_QUESTIONS, reorderQuestionsRequest);
}
export function* putQuestionSaga() {
  yield takeEvery(PUT_TT_QUESTION, putQuestionRequest);
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
