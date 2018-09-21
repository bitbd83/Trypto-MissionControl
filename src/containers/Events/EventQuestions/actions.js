import {
  GET_QUESTIONS,
  GET_QUESTIONS_SUCCESS,
  GET_QUESTIONS_FAILURE,
  POST_QUESTION,
  POST_QUESTION_FAILURE,
  POST_QUESTION_SUCCESS,
  PUT_QUESTION,
  PUT_QUESTION_FAILURE,
  PUT_QUESTION_SUCCESS,
  DELETE_QUESTION,
  DELETE_QUESTION_FAILURE,
  DELETE_QUESTION_SUCCESS,
  REORDER_QUESTIONS,
  REORDER_QUESTIONS_FAILURE,
  REORDER_QUESTIONS_SUCCESS,
  PATCH_QUESTION_MANDATORY,
  PATCH_QUESTION_MANDATORY_FAILURE,
  PATCH_QUESTION_MANDATORY_SUCCESS,
} from './constants';

export const getEventQuestions = payload => {
  return {
    type: GET_QUESTIONS,
    payload,
  };
};

export const getEventQuestionsSuccess = payload => {
  return {
    type: GET_QUESTIONS_SUCCESS,
    payload,
  };
};

export const getEventQuestionsFailuer = payload => {
  return {
    type: GET_QUESTIONS_FAILURE,
    payload,
  };
};


export const postEventQuestion = payload => {
  return {
    type: POST_QUESTION,
    payload,
  };
};

export const postEventQuestionSuccess = payload => {
  return {
    type: POST_QUESTION_SUCCESS,
    payload,
  };
};

export const postEventQuestionFailuer = payload => {
  return {
    type: POST_QUESTION_FAILURE,
    payload,
  };
};


export const deleteEventQuestion = payload => {
  return {
    type: DELETE_QUESTION,
    payload,
  };
};

export const deleteEventQuestionSuccess = payload => {
  return {
    type: DELETE_QUESTION_SUCCESS,
    payload,
  };
};

export const deleteEventQuestionFailuer = payload => {
  return {
    type: DELETE_QUESTION_FAILURE,
    payload,
  };
};


export const reorderEventQuestion = payload => {
  return {
    type: REORDER_QUESTIONS,
    payload,
  };
};

export const reorderEventQuestionSuccess = payload => {
  return {
    type: REORDER_QUESTIONS_SUCCESS,
    payload,
  };
};

export const reorderEventQuestionFailuer = payload => {
  return {
    type: REORDER_QUESTIONS_FAILURE,
    payload,
  };
};

export const putEventQuestion = payload => {
  return {
    type: PUT_QUESTION,
    payload,
  };
};

export const putEventQuestionSuccess = payload => {
  return {
    type: PUT_QUESTION_SUCCESS,
    payload,
  };
};

export const putEventQuestionFailuer = payload => {
  return {
    type: PUT_QUESTION_FAILURE,
    payload,
  };
};

export const patchQuestionMandatory = payload => {
  return {
    type: PATCH_QUESTION_MANDATORY,
    payload,
  };
};

export const patchQuestionMandatorySuccess = payload => {
  return {
    type: PATCH_QUESTION_MANDATORY_SUCCESS,
    payload,
  };
};

export const patchQuestionMandatoryFailuer = payload => {
  return {
    type: PATCH_QUESTION_MANDATORY_FAILURE,
    payload,
  };
};

