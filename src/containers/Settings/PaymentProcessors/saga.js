import { all, call, put, fork, takeEvery } from 'redux-saga/effects';
import { GET, POST, PATCH, PUT } from '../../../util/request';
import config from '../../../config/config';
import {
  listPaymentProcessorsSuccess,
  listPaymentProcessorsFailure,
  postStripeProcessorSuccess,
  postStripeProcessorFailure,
  patchStripeProcessorSuccess,
  patchStripeProcessorFailure,
  putPaymentProcessorSuccess,
  putPaymentProcessorFailure,
} from './actions';
import { LIST_PAYMENT_PROCESSORS, POST_STRIPE_PROCESSOR, PATCH_STRIPE_PROCESSOR, PUT_PAYMENT_PROCESSOR } from './constants';
import { Notification } from 'util/Notifications';

const listPaymentProcessorsCall = async (skipPaging, skip, take, inactive, archived) =>
  await GET(`${localStorage.getItem('tenant_id')}/payment-processors?skipPaging=${skipPaging}&skip=${skip}&take=${take}&inactive=${inactive}&archived=${archived}`, {
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
  });

const postStripeProcessorCall = async data =>
  await POST(`${localStorage.getItem('tenant_id')}/payment-processors/stripe`, {
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

const patchStripeProcessorCall = async (processorId, data) =>
  await PATCH(`${localStorage.getItem('tenant_id')}/payment-processors/stripe/${processorId}`, {
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

const putPaymentProcessorCall = async (processorId, action) =>
  await PUT(`${localStorage.getItem('tenant_id')}/payment-processors/${processorId}/${action}`, {
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
  });

function* listPaymentProcessorsRequest({ params }) {
  const { skipPaging, skip, take, inactive, archived } = params;
  try {
    const listedPaymentProcessors = yield call(listPaymentProcessorsCall, skipPaging, skip, take, inactive, archived);
    if(listedPaymentProcessors.error || listedPaymentProcessors.status >= 400){
      yield put(listPaymentProcessorsFailure())
    }else{
      yield put(listPaymentProcessorsSuccess(listedPaymentProcessors.data));
    }
  } catch (error) {
    console.error(error);
  }
}

function* postStripeProcessorRequest({ params }) {
  const { data } = params;
  try {
    const postedStripeProcessor = yield call(postStripeProcessorCall, data);
    Notification(postedStripeProcessor, { error: 'Error occured!', success: 'Stripe Processor added successfully!' });
    if(postedStripeProcessor.error || postedStripeProcessor.status >= 400){
      yield put(postStripeProcessorFailure())
    }else{
      yield put(postStripeProcessorSuccess(postedStripeProcessor.data));
    }
  } catch (error) {
    console.error(error);
  }
}

function* patchStripeProcessorRequest({ params }) {
  const { processorId, data } = params;
  try {
    const patchedStripeProcessor = yield call(patchStripeProcessorCall, processorId, data);
    Notification(patchedStripeProcessor, { error: 'Error occured!', success: 'Stripe Processor updated successfully!' });
    if(patchedStripeProcessor.error || patchedStripeProcessor.status >= 400){
      yield put(patchStripeProcessorFailure())
    }else{
      yield put(patchStripeProcessorSuccess(patchedStripeProcessor.data));
    }
  } catch (error) {
    console.error(error);
  }
}

function* putPaymentProcessorRequest({ params }) {
  const { processorId, action } = params;
  try {
    const putedPaymentProcessor = yield call(putPaymentProcessorCall, processorId, action);
    Notification(putedPaymentProcessor, { error: 'Error occured!', success: `Payment Processor ${action} successfully!` });
    if(putedPaymentProcessor.error || putedPaymentProcessor.status >= 400){
      yield put(putPaymentProcessorFailure())
    }else{
      yield put(putPaymentProcessorSuccess(putedPaymentProcessor.data));
    }
  } catch (error) {
    console.error(error);
  }
}

export function* listPaymentProcessors() {
  yield takeEvery(LIST_PAYMENT_PROCESSORS, listPaymentProcessorsRequest);
}

export function* postStripeProcessor() {
  yield takeEvery(POST_STRIPE_PROCESSOR, postStripeProcessorRequest);
}

export function* patchStripeProcessor() {
  yield takeEvery(PATCH_STRIPE_PROCESSOR, patchStripeProcessorRequest);
}

export function* putPaymentProcessor() {
  yield takeEvery(PUT_PAYMENT_PROCESSOR, putPaymentProcessorRequest);
}

export default function* rootSaga() {
  yield all([fork(listPaymentProcessors), fork(postStripeProcessor), fork(patchStripeProcessor), fork(putPaymentProcessor)]);
}
