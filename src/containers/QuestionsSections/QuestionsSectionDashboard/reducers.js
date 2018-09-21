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
import { fromJS } from 'immutable';
  
const initialState = fromJS({
    loader: false,
    isFetching: false,
    actionLoader: false,
    refetchList: false,
    questionSectionsList: {
        "currentPage": 0,
        "totalCount": 0,
        "pageSize": 0,
        "totalPages": 0,
        "items": []
      },
  });

  export default (state = initialState, action) => {
    switch (action.type) {

        case FETCH_QUESTION_SECTION_LIST: {
            return state
            .set('isFetching', true)
          }

        case FETCH_QUESTION_SECTION_LIST_SUCCESS: {
            return state
                .set('isFetching', false)
                .set('questionSectionsList', fromJS(action.payload))
                .set('refetchList', false)
        };
        // case ADD_NEW_QUESTION: {
        //     return state
        //     .set('actionLoader', true)
        // }
        // case ADD_NEW_QUESTION_SUCCESS: {
        //     return state
        //     .set('actionLoader', false)
        //     .set('refetchList', true)
        // }
        // case PATCH_QUESTION: {
        //     return state
        //       .set('actionLoader', true);
        //   }
          
        // case PATCH_QUESTION_SUCCESS: {
        //     return state
        //         .set('actionLoader', false)
        //         .set('refetchList', true)
        // }
        case PUT_QUESTION_SECTION: {
            return state
              .set('actionLoader', true);
        }
          
        case PUT_QUESTION_SECTION_SUCCESS: {
        return state
            .set('actionLoader', false)
            .updateIn(['questionSectionsList', 'items'], items => items.map(item => {
            let data = {};
            switch(action.payload.action){
                case 'archive': data = {isArchived: true}; break;
                case 'restore': data = {isArchived: false}; break;
            }
            return item.get('id') === action.payload.sectionId ? item.merge(data) : item;
            }));
        }
        default:
        return state;
    }
}