import {
    FETCH_CONTOURIES,
    FETCH_CONTOURIES_SUCCESS,
    FETCH_CONTOURIES_FAILURE,
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

export const fetchCountries = data => {
    return {
        type: FETCH_CONTOURIES,
        payload: data,
    };
};

export const fetchCountriesSucess = data => {
    return {
        type: FETCH_CONTOURIES_SUCCESS,
        payload: data,
    };
};

export const fetchCountriesFailure = data => {
    return {
        type: FETCH_CONTOURIES_FAILURE,
        payload: data,
    };
};

export const fetchQuestionsList = data => {
    return {
        type: FETCH_QUESTIONS_LIST,
        payload: data,
    };
};

export const fetchQuestionsListSucess = data => {
    return {
        type: FETCH_QUESTIONS_LIST_SUCCESS,
        payload: data,
    };
};

export const fetchQuestionsListFailure = data => {
    return {
        type: FETCH_QUESTIONS_LIST_FAILURE,
        payload: data,
    };
};

export const addNewQuestion = data => {
    return {
        type: ADD_NEW_QUESTION,
        payload: data,
    }
}

export const addNewQuestionSucess = data => {
    return {
        type: ADD_NEW_QUESTION_SUCCESS,
        payload: data,
    }
}

export const addNewQuestionFailure = data => {
    return {
        type: ADD_NEW_QUESTION_FAILURE,
        payload: data,
    }
}

export const patchQuestion = data => {
    return {
        type: PATCH_QUESTION,
        payload: data,
    }
}

export const patchQuestionSucess = data => {
    return {
        type: PATCH_QUESTION_SUCCESS,
        payload: data,
    }
}

export const patchQuestionFailure = data => {
    return {
        type: PATCH_QUESTION_FAILURE,
        payload: data,
    }
}

export const putQuestion = data => {
    return {
      type: PUT_QUESTION,
      payload: data,
    };
};

export const putQuestionSuccess = data => {
    return {
        type: PUT_QUESTION_SUCCESS,
        payload: data,
    };
};

export const putQuestionFailure = data => {
    return {
        type: PUT_QUESTION_FAILURE,
        payload: data,
    };
};
export const resetNewQuestion = () => {
  return {
    type: RESET_NEW_QUESTION
  };
};
