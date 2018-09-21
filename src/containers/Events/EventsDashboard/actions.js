import {
  LOAD_EVENT_STATISTICS,
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

export const selectedEventFunc = eventId => {
  return {
    type: SELECTED_EVENT_ID,
    eventId,
  };
};

export const fetchAllEvents = (payload) => {
  return {
    type: FETCH_ALL_EVENTS,
    payload
  };
}

export const fetchAllEventSuccess = (payload) => {
  return {
    type: FETCH_ALL_EVENTS_SUCCESS,
    payload
  };
}

export const fetchAllEventFailure = (payload) => {
  return {
    type: FETCH_ALL_EVENTS_FAILURE,
    payload
  };
}


export const fetchOnSaleEvents = (payload) => {
  return {
    type: FETCH_ON_SALE_EVENTS,
    payload
  };
}

export const fetchOnSaleEventSuccess = (payload) => {
  return {
    type: FETCH_ON_SALE_EVENTS_SUCCESS,
    payload
  };
}

export const fetchOnSaleEventFailure = (payload) => {
  return {
    type: FETCH_ON_SALE_EVENTS_FAILURE,
    payload
  };
}


export const fetchPastEvents = (payload) => {
  return {
    type: FETCH_PAST_EVENTS,
    payload
  };
}

export const fetchPastEventSuccess = (payload) => {
  return {
    type: FETCH_PAST_EVENTS_SUCCESS,
    payload
  };
}

export const fetchPastEventFailure = (payload) => {
  return {
    type: FETCH_PAST_EVENTS_FAILURE,
    payload
  };
}


export const fetchDraftEvents = (payload) => {
  return {
    type: FETCH_DRAFT_EVENTS,
    payload
  };
}

export const fetchDraftEventSuccess = (payload) => {
  return {
    type: FETCH_DRAFT_EVENTS_SUCCESS,
    payload
  };
}

export const fetchDraftEventFailure = (payload) => {
  return {
    type: FETCH_DRAFT_EVENTS_FAILURE,
    payload
  };
}

export const switchOnSaleEventStatus = (payload) => {
  return {
    type: SWITCH_ONSALE_EVENT_STATUS,
    payload
  };
}

export const switchOnSaleEventStatusSuccess = (payload) => {
  return {
    type: SWITCH_ONSALE_EVENT_STATUS_SUCCESS,
    payload
  };
}

export const switchOnSaleEventStatusFailure = (payload) => {
  return {
    type: SWITCH_ONSALE_EVENT_STATUS_FAILURE,
    payload
  };
}

export const switchPastEventStatus = (payload) => {
  return {
    type: SWITCH_PAST_EVENT_STATUS,
    payload
  };
}

export const switchPastEventStatusSuccess = (payload) => {
  return {
    type: SWITCH_PAST_EVENT_STATUS_SUCCESS,
    payload
  };
}

export const switchPastEventStatusFailure = (payload) => {
  return {
    type: SWITCH_PAST_EVENT_STATUS_FAILURE,
    payload
  };
}

export const switchDraftEventStatus = (payload) => {
  return {
    type: SWITCH_DRAFT_EVENT_STATUS,
    payload
  };
}

export const switchDraftEventStatusSuccess = (payload) => {
  return {
    type: SWITCH_DRAFT_EVENT_STATUS_SUCCESS,
    payload
  };
}

export const switchDraftEventStatusFailure = (payload) => {
  return {
    type: SWITCH_DRAFT_EVENT_STATUS_FAILURE,
    payload
  };
}
