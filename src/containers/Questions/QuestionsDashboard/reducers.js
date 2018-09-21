import {
    FETCH_QUESTIONS_LIST,
    FETCH_QUESTIONS_LIST_SUCCESS,
    FETCH_QUESTIONS_LIST_FAILURE,
    ADD_NEW_QUESTION,
    ADD_NEW_QUESTION_SUCCESS,
    ADD_NEW_QUESTION_FAILURE,
    PATCH_QUESTION,
    PATCH_QUESTION_SUCCESS,
    PATCH_QUESTION_FAILURE,
    PUT_QUESTION,
    PUT_QUESTION_SUCCESS,
    PUT_QUESTION_FAILURE,
    RESET_NEW_QUESTION,
} from './constants';
import { fromJS } from 'immutable';
import { NotificationContainer, NotificationManager } from 'react-notifications';

const initialState = fromJS({
  loader: false,
  isFetching: false,
  countries: {},
  actionLoader: false,
  newQuestion: null,
  refetchList: false,
  questionsList: {
    currentPage: 0,
    totalCount: 0,
    pageSize: 0,
    totalPages: 0,
    items: [],
  },
});

export default (state = initialState, action) => {
  switch (action.type) {

    case FETCH_QUESTIONS_LIST: {
      return state.set('isFetching', true);
    }
    case FETCH_QUESTIONS_LIST_SUCCESS: {
      return state
        .set('isFetching', false)
        .set('newQuestion', null)
        .set('questionsList', fromJS(action.payload))
        .set('refetchList', false);
    }
    case FETCH_QUESTIONS_LIST_FAILURE: {
      return state
        .set('isFetching', false)
    }

    case ADD_NEW_QUESTION: {
      return state.set('actionLoader', true)
      .set('refetchList', false);
    }
    case ADD_NEW_QUESTION_SUCCESS: {
      return state.set('actionLoader', false)
      .set('refetchList', true)
      .set('newQuestion', action.payload.id);
    }
    case ADD_NEW_QUESTION_FAILURE: {
      return state.set('actionLoader', false)
      // .set('refetchList', true)
      // .set('newQuestion', true)
    }

    case PATCH_QUESTION: {
      return state.set('actionLoader', true);
    }
    case PATCH_QUESTION_SUCCESS: {
      return state.set('actionLoader', false).set('refetchList', true);
    }
    case PATCH_QUESTION_FAILURE: {
      return state.set('actionLoader', false);
    }

    case PUT_QUESTION: {
      return state.set('actionLoader', true);
    }
    case PUT_QUESTION_SUCCESS: {
      return state.set('actionLoader', false).set('refetchList', true);
    }
    case PUT_QUESTION_FAILURE: {
      return state.set('actionLoader', false);
    }

    case RESET_NEW_QUESTION: {
      return state.set('actionLoader', false)
        .set('newQuestion', null)
        .set('refetchList', false);
    }

    default:
      return state;
  }
};
