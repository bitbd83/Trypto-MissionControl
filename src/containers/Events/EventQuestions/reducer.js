import { fromJS } from 'immutable';
import {
  GET_QUESTIONS,
  GET_QUESTIONS_SUCCESS,
  GET_QUESTIONS_FAILURE,
  POST_QUESTION,
  POST_QUESTION_FAILURE,
  POST_QUESTION_SUCCESS,
  DELETE_QUESTION,
  DELETE_QUESTION_FAILURE,
  DELETE_QUESTION_SUCCESS,
  REORDER_QUESTIONS,
  REORDER_QUESTIONS_FAILURE,
  REORDER_QUESTIONS_SUCCESS,
  PUT_QUESTION,
  PUT_QUESTION_FAILURE,
  PUT_QUESTION_SUCCESS,
  PATCH_QUESTION_MANDATORY,
  PATCH_QUESTION_MANDATORY_FAILURE,
  PATCH_QUESTION_MANDATORY_SUCCESS,
} from './constants';

const INIT_STATE = fromJS({
  isFetching: false,
  actionLoader: false,
  refetchList: false,
  newQuestion: null,
  questions: {
    currentPage: 0,
    totalCount: 0,
    pageSize: 0,
    totalPages: 0,
    items: []
  },
});

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_QUESTIONS: {
      return state
        .set('isFetching', true);
    }
    case GET_QUESTIONS_SUCCESS: {
      return state
        .set('isFetching', false)
        .set('refetchList', false)
        .set('newQuestion', null)
        .set('questions', fromJS(action.payload));
    }
    case GET_QUESTIONS_FAILURE: {
      return state
        .set('isFetching', false)
        .set('refetchList', false)
    }

    case POST_QUESTION: {
      return state
        .set('actionLoader', true);
    }
    case POST_QUESTION_SUCCESS: {
      const newQuestion = action.payload ? action.payload.id : null
      return state
        .set('actionLoader', false)
        .set('newQuestion', newQuestion)
        .set('refetchList', true);
    }
    case POST_QUESTION_FAILURE: {
      return state
        .set('actionLoader', false)
    }

    case DELETE_QUESTION: {
      return state
        .set('actionLoader', true);
    }
    case DELETE_QUESTION_SUCCESS: {
      return state
        .set('actionLoader', false)
        .set('refetchList', true);
    }
    case DELETE_QUESTION_FAILURE: {
      return state
        .set('actionLoader', false)
    }

    case REORDER_QUESTIONS: {
      return state
        .set('actionLoader', true);
    }
    case REORDER_QUESTIONS_SUCCESS: {
      return state
        .set('actionLoader', false);
    }
    case REORDER_QUESTIONS_FAILURE: {
      return state
        .set('actionLoader', false);
    }

    case PUT_QUESTION: {
      return state
        .set('actionLoader', true);
    }
    case PUT_QUESTION_SUCCESS: {
      return state
        .set('actionLoader', false)
        .set('refetchList', true);
    }
    case PUT_QUESTION_FAILURE: {
      return state
        .set('actionLoader', false)
    }

    case PATCH_QUESTION_MANDATORY: {
      return state
        .set('actionLoader', true);
    }
    case PATCH_QUESTION_MANDATORY_SUCCESS: {
      return state
        .set('actionLoader', false)
        .set('refetchList', true);
    }
    case PATCH_QUESTION_MANDATORY_FAILURE: {
      return state
        .set('actionLoader', false)
    }

    default:
      return state;
  }
};
