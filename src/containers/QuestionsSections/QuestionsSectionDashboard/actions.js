import {
    FETCH_QUESTION_SECTION_LIST,
    FETCH_QUESTION_SECTION_LIST_SUCCESS,
    // ADD_NEW_QUESTION,
    // ADD_NEW_QUESTION_SUCCESS,
    // PATCH_QUESTION,
    // PATCH_QUESTION_SUCCESS,
    PUT_QUESTION_SECTION,
    PUT_QUESTION_SECTION_SUCCESS,
} from './constants';
  
  
export const fetchQuestionSectionsList = data => {
    return {
        type: FETCH_QUESTION_SECTION_LIST,
        payload: data,
    };
};

export const fetchQuestionSectionsListSucess = data => {
    return {
        type: FETCH_QUESTION_SECTION_LIST_SUCCESS,
        payload: data,
    };
};

// export const addNewQuestion = data => {
//     return {
//         type: ADD_NEW_QUESTION,
//         payload: data,
//     }
// }

// export const addNewQuestionSucess = data => {
//     console.log('stateis', data)
//     return {
//         type: ADD_NEW_QUESTION_SUCCESS,
//         payload: data,
//     }
// }

// export const patchQuestion = data => {
//     return {
//         type: PATCH_QUESTION,
//         payload: data,
//     }
// }

// export const patchQuestionSucess = data => {
//     return {
//         type: PATCH_QUESTION_SUCCESS,
//         payload: data,
//     }
// }

export const putQuestionSection = data => {
    return {
      type: PUT_QUESTION_SECTION,
      payload: data,
    };
};

export const putQuestionSectionSuccess = data => {
    return {
        type: PUT_QUESTION_SECTION_SUCCESS,
        payload: data,
    };
};