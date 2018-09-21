import { all, call, put, fork, takeEvery } from 'redux-saga/effects';
import { GET, POST, DELETE, PUT } from '../../../util/request';
import config from '../../../config/config';
import {
  FETCH_ALL_TRANSACTION_FEE,
  ADD_TRANSACTION_FEE,
  DELETE_TRANSACTION_FEE,
} from './constants';
import {
  fetchAllTransactionFeeSuccess,
  fetchAllTransactionFeeFailure,
  addTransactionFeeSuccess,
  addTransactionFeeFailure,
  deleteTransactionFeeSuccess,
  deleteTransactionFeeFailure,
} from './actions'
import { Notification } from '../../../util/Notifications'

const getTransactionFee = async () =>
  await GET(`${localStorage.getItem('tenant_id')}/transaction-fees`, {
    baseUrl: `${config.baseUrl}${config.eventsApiUrl}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json',
    },
  })
  .then(response => {
    const { status } = response;
    return { data: response.data, status };
  })
  .catch(error => {
    return { error };
  });;

const addTransaction = async (data) =>
  await POST(`${localStorage.getItem('tenant_id')}/transaction-fees`, {
    baseUrl: `${config.baseUrl}${config.eventsApiUrl}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json',
    },
    data
  })
  .then(response => {
    const { status } = response;
    return { data, status };
  })
  .catch(error => {
    return { error };
  });

const deleteTransaction = async (data) =>
  await DELETE(`${localStorage.getItem('tenant_id')}/transaction-fees`, {
    baseUrl: `${config.baseUrl}${config.eventsApiUrl}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json',
    },
    data,
  })
  .then(response => {
    const { status } = response;
    return { data: response.data, status };
  })
  .catch(error => {
    return { error };
  });

function* fetchAllTransactionFeeRequest() {
  try {
    const getCall = yield call(getTransactionFee);
    if(getCall.error || getCall.status >= 400){
      yield put(fetchAllTransactionFeeFailure())
    }else{
      yield put(fetchAllTransactionFeeSuccess(getCall.data));
    }
  } catch (error) {
    console.error(error);
  }
}

function* addTransactionFeeRequest({payload}) {
  const { data } = payload
  try {
    const postCall = yield call(addTransaction, data);
    Notification(postCall, {error: 'Error occured!', success: 'Transaction fee added successfully!'});
    if(postCall.error || postCall.status >= 400){
      yield put(addTransactionFeeFailure())
    }else{
      yield put(addTransactionFeeSuccess(postCall.data));
    }
  } catch (error) {
    console.error(error);
  }
}

function* deleteTransactionFeeRequest({payload}) {
  const { data } = payload
  try {
    const deleteCall = yield call(deleteTransaction, data);
    Notification(deleteCall, {error: 'Error occured!', success: 'Transaction fee deleted successfully!'});
    if(deleteCall.error || deleteCall.status >= 400){
      yield put(deleteTransactionFeeFailure())
    }else{
      yield put(deleteTransactionFeeSuccess(deleteCall.data));
    }
  } catch (error) {
    console.error(error);
  }
}

export function* fetchAllTransactionFee() {
  yield takeEvery(FETCH_ALL_TRANSACTION_FEE, fetchAllTransactionFeeRequest);
}

export function* addTransactionFee() {
  yield takeEvery(ADD_TRANSACTION_FEE, addTransactionFeeRequest);
}

export function* deleteTransactionFee() {
  yield takeEvery(DELETE_TRANSACTION_FEE, deleteTransactionFeeRequest);
}

export default function* rootSaga() {
  yield all([
    fork(fetchAllTransactionFee),
    fork(addTransactionFee),
    fork(deleteTransactionFee),
  ]);
}
