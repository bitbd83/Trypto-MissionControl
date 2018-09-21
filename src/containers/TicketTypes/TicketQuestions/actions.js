import {
  GET_TT_QUESTIONS,
  GET_TT_QUESTIONS_SUCCESS,
  GET_TT_QUESTIONS_FAILURE,
  POST_TT_QUESTION,
  POST_TT_QUESTION_FAILURE,
  POST_TT_QUESTION_SUCCESS,
  PUT_TT_QUESTION,
  PUT_TT_QUESTION_FAILURE,
  PUT_TT_QUESTION_SUCCESS,
  DELETE_TT_QUESTION,
  DELETE_TT_QUESTION_FAILURE,
  DELETE_TT_QUESTION_SUCCESS,
  REORDER_TT_QUESTIONS,
  REORDER_TT_QUESTIONS_FAILURE,
  REORDER_TT_QUESTIONS_SUCCESS,
  PATCH_QUESTION_MANDATORY,
  PATCH_QUESTION_MANDATORY_FAILURE,
  PATCH_QUESTION_MANDATORY_SUCCESS,
} from './constants';

export const getTicketQuestions = payload => {
  return {
    type: GET_TT_QUESTIONS,
    payload,
  };
};

export const getTicketQuestionsSuccess = payload => {
  return {
    type: GET_TT_QUESTIONS_SUCCESS,
    payload,
  };
};

export const getTicketQuestionsFailuer = payload => {
  return {
    type: GET_TT_QUESTIONS_FAILURE,
    payload,
  };
};


export const postTicketQuestion = payload => {
  return {
    type: POST_TT_QUESTION,
    payload,
  };
};

export const postTicketQuestionSuccess = payload => {
  return {
    type: POST_TT_QUESTION_SUCCESS,
    payload,
  };
};

export const postTicketQuestionFailuer = payload => {
  return {
    type: POST_TT_QUESTION_FAILURE,
    payload,
  };
};


export const deleteTicketQuestion = payload => {
  return {
    type: DELETE_TT_QUESTION,
    payload,
  };
};

export const deleteTicketQuestionSuccess = payload => {
  return {
    type: DELETE_TT_QUESTION_SUCCESS,
    payload,
  };
};

export const deleteTicketQuestionFailuer = payload => {
  return {
    type: DELETE_TT_QUESTION_FAILURE,
    payload,
  };
};


export const reorderTicketQuestion = payload => {
  return {
    type: REORDER_TT_QUESTIONS,
    payload,
  };
};

export const reorderTicketQuestionSuccess = payload => {
  return {
    type: REORDER_TT_QUESTIONS_SUCCESS,
    payload,
  };
};

export const reorderTicketQuestionFailuer = payload => {
  return {
    type: REORDER_TT_QUESTIONS_FAILURE,
    payload,
  };
};

export const putTicketQuestion = payload => {
  return {
    type: PUT_TT_QUESTION,
    payload,
  };
};

export const putTicketQuestionSuccess = payload => {
  return {
    type: PUT_TT_QUESTION_SUCCESS,
    payload,
  };
};

export const putTicketQuestionFailuer = payload => {
  return {
    type: PUT_TT_QUESTION_FAILURE,
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

