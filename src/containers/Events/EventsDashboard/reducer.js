import { fromJS } from 'immutable';
import {
  FETCH_ALL_EVENTS,
  FETCH_ALL_EVENTS_SUCCESS,
  FETCH_ALL_EVENTS_FAILURE,
  FETCH_PAST_EVENTS,
  FETCH_PAST_EVENTS_SUCCESS,
  FETCH_PAST_EVENTS_FAILURE,
  FETCH_ON_SALE_EVENTS,
  FETCH_ON_SALE_EVENTS_SUCCESS,
  FETCH_ON_SALE_EVENTS_FAILURE,
  FETCH_DRAFT_EVENTS,
  FETCH_DRAFT_EVENTS_SUCCESS,
  FETCH_DRAFT_EVENTS_FAILURE,
  SELECTED_EVENT_ID,
  SWITCH_ONSALE_EVENT_STATUS,
  SWITCH_ONSALE_EVENT_STATUS_SUCCESS,
  SWITCH_ONSALE_EVENT_STATUS_FAILURE,
  SWITCH_PAST_EVENT_STATUS,
  SWITCH_PAST_EVENT_STATUS_SUCCESS,
  SWITCH_PAST_EVENT_STATUS_FAILURE,
  SWITCH_DRAFT_EVENT_STATUS,
  SWITCH_DRAFT_EVENT_STATUS_SUCCESS,
  SWITCH_DRAFT_EVENT_STATUS_FAILURE,
} from './constants';

const initialState = fromJS({
  selectedEventId: '',
  allEventsLoader:false,
  refetchOnSaleEvent: false,
  refetchPastEvent: false,
  refetchDraftEvent: false,
  allEvents:{
    "currentPage": 0,
    "totalCount": 0,
    "pageSize": 0,
    "totalPages": 0,
    "items": []
  },
  onSaleEventsLoader:false,
  onSaleEvents:{
    "currentPage": 0,
    "totalCount": 0,
    "pageSize": 0,
    "totalPages": 0,
    "items": []
  },
  pastEventsLoader:false,
  pastEvents:{
    "currentPage": 0,
    "totalCount": 0,
    "pageSize": 0,
    "totalPages": 0,
    "items": []
  },
  draftEventsLoader:false,
  draftEvents:{
    "currentPage": 0,
    "totalCount": 0,
    "pageSize": 0,
    "totalPages": 0,
    "items": []
  }
});

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_EVENTS:
      return state
      .set('allEventsLoader', true)
      .set('refetchOnSaleEvent', false);
    case FETCH_ALL_EVENTS_SUCCESS:
      return state
      .set('allEventsLoader', false)
      .set('allEvents', fromJS(action.payload));
    case FETCH_ALL_EVENTS_FAILURE:
      return state
      .set('allEventsLoader', false)

    case FETCH_ON_SALE_EVENTS:
      return state
      .set('onSaleEventsLoader', true)
      .set('refetchOnSaleEvent', false);
    case FETCH_ON_SALE_EVENTS_SUCCESS:
      return state
      .set('onSaleEventsLoader', false)
      .set('onSaleEvents', fromJS(action.payload));
    case FETCH_ON_SALE_EVENTS_FAILURE:
      return state
      .set('onSaleEventsLoader', false)

    case FETCH_PAST_EVENTS:
      return state
      .set('refetchPastEvent', false)
      .set('pastEventsLoader', true);
    case FETCH_PAST_EVENTS_SUCCESS:
      return state
      .set('pastEventsLoader', false)
      .set('pastEvents', fromJS(action.payload));
    case FETCH_PAST_EVENTS_FAILURE:
      return state
      .set('pastEventsLoader', false)

    case FETCH_DRAFT_EVENTS:
      return state
      .set('refetchDraftEvent', false)
      .set('draftEventsLoader', true);
    case FETCH_DRAFT_EVENTS_SUCCESS:
      return state
      .set('draftEventsLoader', false)
      .set('draftEvents', fromJS(action.payload));
    case FETCH_DRAFT_EVENTS_FAILURE:
      return state
      .set('draftEventsLoader', false)

    case SELECTED_EVENT_ID:{
      return state
      .set('selectedEventId', action.eventId);
    }

    case SWITCH_ONSALE_EVENT_STATUS:
      return state
      .set('refetchOnSaleEvent', false);
    case SWITCH_ONSALE_EVENT_STATUS_SUCCESS:{
      return state
      .set('refetchDraftEvent', action.payload.action === 'off-sale')
      .set('refetchOnSaleEvent', true);
    }

    case SWITCH_PAST_EVENT_STATUS:
      return state
      .set('refetchPastEvent', false);
    case SWITCH_PAST_EVENT_STATUS_SUCCESS:{
      return state
      .set('refetchPastEvent', true);
    }

    case SWITCH_DRAFT_EVENT_STATUS:
      return state
      .set('refetchDraftEvent', false);
    case SWITCH_DRAFT_EVENT_STATUS_SUCCESS:{
      return state
      .set('refetchDraftEvent', true)
      .set('refetchOnSaleEvent', action.payload.action === 'on-sale');
    }
    default:
      return state;
  }
};
