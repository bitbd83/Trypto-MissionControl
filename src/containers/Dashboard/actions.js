import {
  DEFAULT_ACTION,
  TOP_EVENT_LIST_FAILURE,
  TOP_EVENT_LIST_SUCCESS,
  TOP_EVENT_LIST
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function getTopEvent(payload) {
  return {
    type: TOP_EVENT_LIST,
    payload
  };
}
export function getTopEventSuccess(payload) {
  return {
    type: TOP_EVENT_LIST_SUCCESS,
    payload
  };
}
export function getTopEventFailure() {
  return {
    type: TOP_EVENT_LIST_FAILURE,
  };
}
