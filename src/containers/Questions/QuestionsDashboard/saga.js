import { all, call, put, fork, takeEvery } from 'redux-saga/effects';
import { GET, POST, PATCH, PUT, formatPatchData } from '../../../util/request';
import config from '../../..//config/config';
import {
  fetchCountriesSucess,
  fetchCountriesFailure,
  fetchQuestionsListSucess,
  fetchQuestionsListFailure,
  addNewQuestionSucess,
  addNewQuestionFailure,
  patchQuestionSucess,
  patchQuestionFailure,
  putQuestionSuccess,
  putQuestionFailure,
 } from './actions';
import { FETCH_COUNTRIES, FETCH_QUESTIONS_LIST, ADD_NEW_QUESTION, PATCH_QUESTION, PUT_QUESTION } from './constants';
import { NotificationManager } from 'react-notifications';
import { Notification } from '../../../util/Notifications'


const getCountries = async () =>
  await GET('countries', {
    baseUrl: `${config.baseUrl}${config.catalogApiUrl}`,
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

const getQuestionsList = async (skip, take, archived = false, searchTerm = '') =>
  await GET(`${localStorage.getItem('tenant_id')}/fields?skip=${skip}&take=${take}${archived ? '&archived=true' : ''}${searchTerm !== '' ? '&searchTerm='+searchTerm : ''}`, {
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

const postQuestion = async (data) =>
  await POST(`${localStorage.getItem('tenant_id')}/fields`, {
    baseUrl: `${config.baseUrl}${config.eventsApiUrl}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json',
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

const patchQuestion = async (questionId, data) =>
  await PATCH(`${localStorage.getItem('tenant_id')}/fields/${questionId}`, {
    baseUrl: `${config.baseUrl}${config.eventsApiUrl}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json-patch+json',
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

const putQuestion = async (action, questionId) =>
  await PUT(`${localStorage.getItem('tenant_id')}/fields/${questionId}/${action}`, {
    baseUrl: `${config.baseUrl}${config.eventsApiUrl}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json',
    },
    // data
  })
    .then(response => {
      const { status } = response;
      return { data: response.data, status };
    })
    .catch(error => {
      return { error };
    });

function* fetchCountriesRequest({ payload }) {
  try {
    const countryCall = yield call(getCountries);
    if(countryCall.error || countryCall.status >= 400){
      yield put(fetchCountriesFailure())
    }else{
      yield put(fetchCountriesSucess(countryCall.data));
    }
  } catch (error) {
    console.error(error);
  }
}

function* fetchQuestionsListRequest({ payload }) {
  const { skip, take, archived, searchText } = payload;
  try {
    const getCall = yield call(getQuestionsList, skip, take, archived, searchText);
    if(getCall.error || getCall.status >= 400){
      yield put(fetchQuestionsListFailure())
    }else{
      yield put(fetchQuestionsListSucess(getCall.data));
    }
  } catch (error) {
    console.error(error);
  }
}

function* addQuestionRequest({ payload }) {
  const { data } = payload;
  try {
    const postCall = yield call(postQuestion, data);
    Notification(postCall, {error: 'Error occured!', success: 'Question created successfully!'});
    if(postCall.error || postCall.status >= 400){
      yield put(addNewQuestionFailure())
    }else{
      yield put(addNewQuestionSucess(postCall.data));
    }
  } catch (error) {
    NotificationManager.error(error);
    console.error(error);
  }
}

function* patchQuestionRequest({ payload }) {
  const { questionId, data } = payload;
  try {
    const patchCall = yield call(patchQuestion, questionId, data);
    Notification(patchCall, {error: 'Error occured!', success: 'Question updated successfully!'});
    if(patchCall.error || patchCall.status >= 400){
      yield put(patchQuestionFailure())
    }else{
      yield put(patchQuestionSucess());
    }
  } catch (error) {
    console.error(error);
  }
}

function* putQuestionRequest({ payload }) {
  const { questionId, action } = payload;
  try {
    const putCall = yield call(putQuestion, action, questionId);
    Notification(putCall, {error: 'Error occured!', success: `Question ${action} successfully!`});
    if(putCall.error || putCall.status >= 400){
      yield put(putQuestionFailure())
    }else{
      yield put(putQuestionSuccess(putCall.data));
    }
  } catch (error) {
    console.error(error);
  }
}

export function* fetchCountries() {
  yield takeEvery(FETCH_COUNTRIES, fetchCountriesRequest);
}

export function* fetchQuestionsList() {
  yield takeEvery(FETCH_QUESTIONS_LIST, fetchQuestionsListRequest);
}

export function* addNewQuestion() {
  yield takeEvery(ADD_NEW_QUESTION, addQuestionRequest);
}

export function* updateQuestion() {
  yield takeEvery(PATCH_QUESTION, patchQuestionRequest);
}

export function* switchQuestion() {
  yield takeEvery(PUT_QUESTION, putQuestionRequest);
}

export default function* rootSaga() {
  yield all([fork(fetchCountries), fork(fetchQuestionsList), fork(addNewQuestion), fork(updateQuestion), fork(switchQuestion)]);
}
