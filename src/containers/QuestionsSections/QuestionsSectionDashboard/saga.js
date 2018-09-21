import { all, call, put, fork, takeEvery } from 'redux-saga/effects';
import { GET, POST, PATCH, PUT, formatPatchData } from '../../../util/request';
import config from '../../..//config/config';
import { fetchQuestionSectionsListSucess, addNewQuestionSucess, patchQuestionSucess, putQuestionSectionSuccess } from './actions';
import {  FETCH_QUESTION_SECTION_LIST, ADD_NEW_QUESTION, PATCH_QUESTION, PUT_QUESTION_SECTION } from './constants';

const event_id = '5ad7be4142e6e4465c07de3e';
const tenant_id = '5ad7bdb342e6e4465c07de3c';


const getQuestionsSectionList = async () =>
    await GET(`${tenant_id}/field-sections?archived=${true}`, {
      baseUrl: `${config.baseUrl}${config.eventsApiUrl}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.data)
      .catch(error => error);

// const postQuestion = async (data) =>
//     await POST(`${tenant_id}/fields`, {
//     baseUrl: `${config.baseUrl}${config.eventsApiUrl}`,
//     headers: {
//         Authorization: `Bearer ${localStorage.getItem('access_token')}`,
//         'Content-Type': 'application/json',
//     },
//     data
//     })
//     .then(response => response.data)
//     .catch(error => error);

// const patchQuestion = async (sectionId, data) =>
//     await PATCH(`${tenant_id}/fields/${sectionId}`, {
//       baseUrl: `${config.baseUrl}${config.eventsApiUrl}`,
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem('access_token')}`,
//         'Content-Type': 'application/json-patch+json',
//       },
//       data
//     })
//       .then(response => {
//         return {data, sectionId };
//       })
//       .catch(error => error);

const putQuestionSection = async (action, sectionId) =>
    await PUT(`${tenant_id}/field-sesctions/${sectionId}/${action}`, {
    baseUrl: `${config.baseUrl}${config.eventsApiUrl}`,
    headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'application/json',
    },
    // data
    })
    .then(response => {
        return {action, sectionId};
    })
    .catch(error => error);


function* fetchQuestionSectionsListRequest({ payload }) {
    try {
        const questionsSectionListRequest = yield call(getQuestionsSectionList);
        yield put(fetchQuestionSectionsListSucess(questionsSectionListRequest));
    } catch (error) {
        console.error(error)
    }
}

// function* addQuestionRequest({ payload }) {
//     const { data } = payload;
//     try {
//       const addQuestion = yield call(postQuestion, data);
//       yield put(addNewQuestionSucess(addQuestion));
//     } catch (error) {
//       console.error(error);
//     }
// }

// function* patchQuestionRequest({ payload }) {
//     const { sectionId, data } = payload;
//     try {
//       const patchCall = yield call(patchQuestion, sectionId, data);
//       yield put(patchQuestionSucess(patchCall));
//     } catch (error) {
//       console.error(error);
//     }
// }

function* putQuestionSectionRequest({ payload }) {
  // console.log('putquestion data', payload)
    const { sectionId, action } = payload;
    try {
      const putCall = yield call(putQuestionSection, action, sectionId);
      yield put(putQuestionSectionSuccess(putCall));
    } catch (error) {
      console.error(error);
    }
}

export function* fetchQuestionSectionsList() {
    yield takeEvery(FETCH_QUESTION_SECTION_LIST, fetchQuestionSectionsListRequest);
}

// export function* addNewQuestion() {
//     yield takeEvery(ADD_NEW_QUESTION, addQuestionRequest);
// }

// export function* updateQuestion() {
//     yield takeEvery(PATCH_QUESTION, patchQuestionRequest);
// }

export function* switchQuestionSection() {
    yield takeEvery(PUT_QUESTION_SECTION, putQuestionSectionRequest);
}

export default function* rootSaga() {
  yield all([
    // fork(fetchCountries),
    fork(fetchQuestionSectionsList),
    // fork(addNewQuestion),
    // fork(updateQuestion),
    fork(switchQuestionSection),
  ]);
}
