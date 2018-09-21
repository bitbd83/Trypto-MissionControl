import { all, call, put, fork, takeEvery } from 'redux-saga/effects';
import { GET, POST, PATCH, DELETE, PUT } from '../../util/request';
import config from '../../config/config';
import { NotificationManager } from 'react-notifications';
import { Notification } from '../../util/Notifications'
import {
  fetchTicketTypesSuccess,
  fetchTicketTypesFailure,
  fetchTicketTypeOptionsSuccess,
  fetchTicketTypeOptionsFailure,
  addPaidTicketTypeSuccess,
  addPaidTicketTypeFailure,
  fetchInventorySuccess,
  fetchInventoryFailure,
  createInventorySuccess,
  createInventoryFailure,
  addFeesSuccess,
  addFeesFailure,
  addTaxGroupSuccess,
  addTaxGroupFailure,
  fetchFeesSuccess,
  fetchFeesFailure,
  fetchTaxGroupSuccess,
  fetchTaxGroupFailure,
  deleteFeesSuccess,
  deleteFeesFailure,
  patchInventorySuccess,
  patchInventoryFailure,
  fetchTicketTypeSuccess,
  fetchTicketTypeFailure,
  deleteTaxGroupSuccess,
  deleteTaxGroupFailure,
  patchTicketTypeSuccess,
  patchTicketTypeFailure,
  putTicketTypeSuccess,
  putTicketTypeFailure,
  listTicketTypePhotosSuccess,
  listTicketTypePhotosFailure,
  postTicketTypePhotoSuccess,
  postTicketTypePhotoFailure,
  deleteTicketTypePhotoSuccess,
  deleteTicketTypePhotoFailure,
  switchTicketSaleSuccess,
  switchTicketSaleFailure,
  cloneTicketTypesSuccess,
  cloneTicketTypesFailure,
  cloneFeesSuccess,
  cloneFeesFailure,
  cloneTaxesSuccess,
  cloneTaxesFailure,
  cloneTicketsSuccess,
  cloneTicketsFailure,
} from './actions';
import {
  FETCH_TICKET_TYPES,
  FETCH_TICKET_TYPE_OPTIONS,
  ADD_PAID_TICKET_TYPES,
  FETCH_INVENTORY,
  CREATE_INVENTORY,
  ADD_FEES,
  ADD_TAX_GROUP,
  FETCH_FEES,
  FETCH_TAX_GROUP,
  DELETE_FEES,
  PATCH_INVENTORY,
  FETCH_TICKET_TYPE,
  DELETE_TAX_GROUP,
  PATCH_TICKET_TYPE,
  PUT_TICKET_TYPE,
  LIST_TICKET_TYPE_PHOTOS,
  POST_TICKET_TYPE_PHOTO,
  DELETE_TICKET_TYPE_PHOTO,
  SWITCH_TICKET_SALE,
  CLONE_TICKET_TYPES,
  CLONE_FEES,
  CLONE_TAXES,
  CLONE_TICKETS,
} from './constants';

const getTicketTypes = async (tenantId, eventId, archived = false, searchTerm = '') =>
  await GET(`${tenantId}/events/${eventId}/ticket-types?${archived ? '&archived=true' : ''}&${searchTerm !== '' ? '&searchTerm='+searchTerm : ''}`, {
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

const getTicketType = async (tenantId, eventId, ticketTypeId) =>
  await GET(`${tenantId}/events/${eventId}/ticket-types/${ticketTypeId}`, {
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

const getTicketTypeOptions = async (tenantId, eventId, ticketTypeId) =>
  await GET(`${tenantId}/events/${eventId}/ticket-types/${ticketTypeId}/feature-options`, {
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

const addPaidTicket = async (tenantId, eventId, data) =>
  await POST(`${tenantId}/events/${eventId}/ticket-types`, {
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

const getInventory = async (tenantId, eventId, ticketTypeId) =>
  await GET(`${tenantId}/events/${eventId}/ticket-types/${ticketTypeId}/inventory`, {
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

const addInventory = async (tenantId, eventId, ticketTypeId, data) =>
  await POST(`${tenantId}/events/${eventId}/ticket-types/${ticketTypeId}/inventory`, {
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

const addFee = async (tenantId, eventId, ticketTypeId, data) =>
  await POST(`${tenantId}/events/${eventId}/ticket-types/${ticketTypeId}/fees`, {
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

const addTax = async (tenantId, eventId, ticketTypeId, taxGroupId) =>
  await POST(`${tenantId}/events/${eventId}/ticket-types/${ticketTypeId}/tax-groups?taxGroupId=${taxGroupId}`, {
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

const getFees = async (tenantId, eventId, ticketTypeId) =>
  await GET(`${tenantId}/events/${eventId}/ticket-types/${ticketTypeId}/fees`, {
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

const getTaxGroup = async (tenantId, eventId, ticketTypeId) =>
  await GET(`${tenantId}/events/${eventId}/ticket-types/${ticketTypeId}/tax-groups`, {
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

const deleteFee = async (tenantId, eventId, ticketTypeId, data) =>
  await DELETE(`${tenantId}/events/${eventId}/ticket-types/${ticketTypeId}/fees`, {
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

const deleteTaxGroups = async (tenantId, eventId, ticketTypeId, data) =>
  await DELETE(`${tenantId}/events/${eventId}/ticket-types/${ticketTypeId}/tax-groups`, {
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

const patchInventoryCall = async (tenantId, eventId, ticketTypeId, data) =>
  await PATCH(`${tenantId}/events/${eventId}/ticket-types/${ticketTypeId}/inventory`, {
    baseUrl: `${config.baseUrl}${config.eventsApiUrl}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json-patch+json',
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

const patchTicketTypeCall = async (tenantId, eventId, ticketTypeId, data) =>
  await PATCH(`${tenantId}/events/${eventId}/ticket-types/${ticketTypeId}`, {
    baseUrl: `${config.baseUrl}${config.eventsApiUrl}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json-patch+json',
    },
    data,
  })
    .then(response => {
      const { status } = response;
      return { data: {id: ticketTypeId, eventId, data}, status };
    })
    .catch(error => {
      return { error };
    });

const putTicket = async (tenantId, eventId, ticketTypeId, action) =>
  await PUT(`${tenantId}/events/${eventId}/ticket-types/${ticketTypeId}/${action}`, {
    baseUrl: `${config.baseUrl}${config.eventsApiUrl}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json',
    },
    // data
  })
    .then(response => {
      const { status } = response;
      return { data: response.data, status };
    })
    .catch(error => {
      return { error };
    });

  const switchTicketSaleCall = async (tenantId, eventId, ticketTypeId, action) =>
    await POST(`${tenantId}/events/${eventId}/ticket-types/${ticketTypeId}/${action}`, {
      baseUrl: `${config.baseUrl}${config.eventsApiUrl}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'application/json',
      },
      // data
    })
      .then(response => {
        const { status } = response;
        return { data: response.data, status };
      })
      .catch(error => {
        return { error };
      });

  const cloneTicketCall = async (tenantId, eventId, sourceEventId) =>
    await POST(`${tenantId}/events/${eventId}/clone-ticket-types/${sourceEventId}`, {
      baseUrl: `${config.baseUrl}${config.eventsApiUrl}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'application/json',
      },
      // data
    })
      .then(response => {
        const { status } = response;
        return { data: response.data, status };
      })
      .catch(error => {
        return { error };
      });

const listTicketTypePhotosCall = async (tenantId, eventId, ticketTypeId) =>
  await GET(`${tenantId}/events/${eventId}/ticket-types/${ticketTypeId}/photos`, {
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

const postTicketTypePhotoCall = async (tenantId, eventId, ticketTypeId, data) =>
  await POST(`${tenantId}/events/${eventId}/ticket-types/${ticketTypeId}/photos`, {
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

const deleteTicketTypePhotoCall = async (tenantId, eventId, ticketTypeId, photoId) =>
  await DELETE(`${tenantId}/events/${eventId}/ticket-types/${ticketTypeId}/photos/${photoId}`, {
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

const cloneFeesCall = async (tenantId, eventId, ticketTypeId, sourceTicketTypeId) =>
  await POST(`${tenantId}/events/${eventId}/ticket-types/${ticketTypeId}/clone-fees/${sourceTicketTypeId}`, {
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

const cloneTaxesCall = async (tenantId, eventId, ticketTypeId, sourceTicketTypeId) =>
  await POST(`${tenantId}/events/${eventId}/ticket-types/${ticketTypeId}/clone-taxes/${sourceTicketTypeId}`, {
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

const cloneTicketsCall = async (tenantId, eventId, ticketTypeId) =>
  await POST(`${tenantId}/events/${eventId}/ticket-types/${ticketTypeId}/clone-ticket-type`, {
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


function* fetchTicketTypesRequest({ payload }) {
  const { tenantId, eventId, archived, searchText = '' } = payload;
  try {
    const ticketCall = yield call(getTicketTypes, tenantId, eventId, archived, searchText);
    if(ticketCall.error || ticketCall.status >= 400){
      yield put(fetchTicketTypesFailure());
    }else{
      yield put(fetchTicketTypesSuccess(ticketCall.data));
    }
  } catch (error) {
    console.error(error);
  }
}

function* fetchTicketTypeRequest({ payload }) {
  const { tenantId, eventId, ticketTypeId } = payload;
  try {
    const ticketCall = yield call(getTicketType, tenantId, eventId, ticketTypeId);
    if(ticketCall.error || ticketCall.status >= 400){
      yield put(fetchTicketTypeFailure());
    }else{
      yield put(fetchTicketTypeSuccess(ticketCall.data));
    }
  } catch (error) {
    console.error(error);
  }
}

function* fetchTicketTypeOptionsRequest({ payload }) {
  const { tenantId, eventId, ticketTypeId } = payload;
  try {
    const ticketCall = yield call(getTicketTypeOptions, tenantId, eventId, ticketTypeId);
    if(ticketCall.error || ticketCall.status >= 400){
      yield put(fetchTicketTypeOptionsFailure());
    }else{
      yield put(fetchTicketTypeOptionsSuccess(ticketCall.data));
    }
  } catch (error) {
    console.error(error);
  }
}

function* addPaidTicketRequest({ payload }) {
  const { tenantId, eventId, data } = payload;
  try {
    const requestPaidTicket = yield call(addPaidTicket, tenantId, eventId, data);
    Notification(requestPaidTicket, {error: 'Error occured!', success: 'Paid ticket type created successfully!'});
    if(requestPaidTicket.error || requestPaidTicket.status >= 400){
      yield put(addPaidTicketTypeFailure());
    }else{
      yield put(addPaidTicketTypeSuccess(requestPaidTicket.data));
    }
  } catch (error) {
    NotificationManager.error(error);
    console.error(error);
  }
}

function* fetchInventoryRequest({ payload }) {
  const { tenantId, eventId, ticketTypeId } = payload;
  try {
    const inventoryCall = yield call(getInventory, tenantId, eventId, ticketTypeId);
    if(inventoryCall.error || inventoryCall.status >= 400){
      yield put(fetchInventoryFailure());
    }else{
      yield put(fetchInventorySuccess(inventoryCall.data));
    }
  } catch (error) {
    console.error(error);
  }
}

function* createInventoryRequest({ payload }) {
  const { data, eventId, ticketTypeId, tenantId } = payload;
  try {
    const createInventoryCall = yield call(addInventory, tenantId, eventId, ticketTypeId, data);
    Notification(createInventoryCall, {error: 'Error occured!', success: 'Inventory created successfully!'});
    if(createInventoryCall.error || createInventoryCall.status >= 400){
      yield put(createInventoryFailure());
    }else{
      yield put(createInventorySuccess(createInventoryCall.data));
    }
  } catch (error) {
    console.error(error);
  }
}

function* addFeesRequest({ payload }) {
  const { data, tenantId, ticketTypeId, eventId } = payload;
  try {
    const addFeesCall = yield call(addFee, tenantId, eventId, ticketTypeId, data);
    Notification(addFeesCall, {error: 'Error occured!', success: 'New fee created successfully!'});
    if(addFeesCall.error || addFeesCall.status >= 400){
      yield put(addFeesFailure());
    }else{
      yield put(addFeesSuccess(addFeesCall.data));
    }
  } catch (error) {
    NotificationManager.error(error);
    console.error(error);
  }
}

function* addTaxGroupRequest({ payload }) {
  const { tenantId, eventId, ticketTypeId, taxGroupId } = payload;
  try {
    const addTaxGroupCall = yield call(addTax, tenantId, eventId, ticketTypeId, taxGroupId);
    Notification(addTaxGroupCall, {error: 'Error occured!', success: 'New tax group created successfully!'});
    if(addTaxGroupCall.error || addTaxGroupCall.status >= 400){
      yield put(addTaxGroupFailure());
    }else{
      yield put(addTaxGroupSuccess(addTaxGroupCall.data));
    }
  } catch (error) {
    console.error(error);
  }
}

function* fetchFeesRequest({ payload }) {
  const { tenantId, eventId, ticketTypeId } = payload;
  try {
    const fetchFeesCall = yield call(getFees, tenantId, eventId, ticketTypeId);
    if(fetchFeesCall.error || fetchFeesCall.status >= 400){
      yield put(fetchFeesFailure());
    }else{
      yield put(fetchFeesSuccess(fetchFeesCall.data));
    }
  } catch (error) {
    console.error(error);
  }
}

function* fetchTaxGroupRequest({ payload }) {
  const { tenantId, eventId, ticketTypeId } = payload;
  try {
    const fetchTaxGroupCall = yield call(getTaxGroup, tenantId, eventId, ticketTypeId);
    if(fetchTaxGroupCall.error || fetchTaxGroupCall.status >= 400){
      yield put(fetchTaxGroupFailure());
    }else{
      yield put(fetchTaxGroupSuccess(fetchTaxGroupCall.data));
    }
  } catch (error) {
    console.error(error);
  }
}

function* deleteFeesRequest({ payload }) {
  const { data, tenantId, ticketTypeId, eventId } = payload;
  try {
    const deleteFeesCall = yield call(deleteFee, tenantId, eventId, ticketTypeId, data);
    Notification(deleteFeesCall, {error: 'Error in delete fee', success: 'Fee deleted successfully'});
    if(deleteFeesCall.error || deleteFeesCall.status >= 400){
      yield put(deleteFeesFailure());
    }else{
      yield put(deleteFeesSuccess(deleteFeesCall.data));
    }
  } catch (error) {
    NotificationManager.error(error);
    console.error(error);
  }
}

function* deleteTaxGroupRequest({ payload }) {
  const { data, tenantId, ticketTypeId, eventId } = payload;
  try {
    const deleteTaxGroupCall = yield call(deleteTaxGroups, tenantId, eventId, ticketTypeId, data);
    Notification(deleteTaxGroupCall, {error: 'Error occured!', success: 'Tax group deleted successfully!'});
    if(deleteTaxGroupCall.error || deleteTaxGroupCall.status >= 400){
      yield put(deleteTaxGroupFailure());
    }else{
      yield put(deleteTaxGroupSuccess(deleteTaxGroupCall.data));
    }
  } catch (error) {
    NotificationManager.error(error);
    console.error(error);
  }
}

function* patchInventoryRequest({ payload }) {
  const { data, tenantId, eventId, ticketTypeId } = payload;
  try {
    const patchCall = yield call(patchInventoryCall, tenantId, eventId, ticketTypeId, data);
    Notification(patchCall, {error: 'Error occured!', success: 'Inventory updated successfully!'});
    if(patchCall.error || patchCall.status >= 400){
      yield put(patchInventoryFailure());
    }else{
      yield put(patchInventorySuccess(patchCall.data));
    }
  } catch (error) {
    NotificationManager.error(error);
    console.error(error);
  }
}

function* patchTicketTypeRequest({ payload }) {
  const { data, tenantId, eventId, ticketTypeId } = payload;
  try {
    const patchCall = yield call(patchTicketTypeCall, tenantId, eventId, ticketTypeId, data);

    Notification(patchCall, {error: 'Error occured!', success: 'Ticket type updated successfully!'});

    if(patchCall.error || patchCall.status >= 400){
      yield put(patchTicketTypeFailure());
    }else{
      debugger
      yield put(patchTicketTypeSuccess(patchCall.data));
    }

  } catch (error) {
    NotificationManager.error(error);
    console.error(error);
  }
}

function* putTicketTypeRequest({ payload }) {
  const { tenantId, eventId, ticketTypeId, action } = payload;
  try {
    const putCall = yield call(putTicket, tenantId, eventId, ticketTypeId, action);
    Notification(putCall, {error: `Error occured!`, success: `Successfully ${action} Ticket Types!`});
    if(putCall.error || putCall.status >= 400){
      yield put(putTicketTypeFailure());
    }else{
      yield put(putTicketTypeSuccess(putCall.data));
    }
  } catch (error) {
    console.error(error);
  }
}

function* switchTicketSaleRequest({ payload }) {
  const { tenantId, eventId, ticketTypeId, action } = payload;
  try {
    const switchCall = yield call(switchTicketSaleCall, tenantId, eventId, ticketTypeId, action);
    let successMsg = `Ticket Type successfully marked ${action}!`
    if(action === 'show'){
      successMsg = 'Ticket Type published successfully!';
    } else if(action === 'hide') {
      successMsg = 'Ticket Type unpublished successfully!';
    }
    Notification(switchCall, {error: `Error occured!`, success: successMsg});
    if(switchCall.error || switchCall.status >= 400){
      yield put(switchTicketSaleFailure());
    }else{
      yield put(switchTicketSaleSuccess(switchCall.data));
    }
  } catch (error) {
    console.error(error);
  }
}

function* cloneTicketTypesRequest({ payload }) {
  const { tenantId, eventId, sourceEventId } = payload;
  try {
    const postCall = yield call(cloneTicketCall, tenantId, eventId, sourceEventId);
    Notification(postCall, {error: `Error occured!`, success: 'Ticket Cloned successfully!'});
    if(postCall.error || postCall.status >= 400){
      yield put(cloneTicketTypesFailure());
    }else{
      yield put(cloneTicketTypesSuccess(postCall.data));
    }
  } catch (error) {
    console.error(error);
  }
}

function* listTicketTypePhotosRequest({ params }) {
  const { tenantId, eventId, ticketTypeId } = params;
  try {
    const listedPhotos = yield call(listTicketTypePhotosCall, tenantId, eventId, ticketTypeId);
    if(listedPhotos.error || listedPhotos.status >= 400){
      yield put(listTicketTypePhotosFailure());
    }else{
      yield put(listTicketTypePhotosSuccess(listedPhotos.data));
    }
  } catch (error) {
    console.error(error);
  }
}

function* postTicketTypePhotoRequest({ params }) {
  const { tenantId, eventId, ticketTypeId, data } = params;
  try {
    const postedPhoto = yield call(postTicketTypePhotoCall, tenantId, eventId, ticketTypeId, data);
    Notification(postedPhoto, {error: `Error occured!`, success: `Successfully added ticket type photo!`});
    if(postedPhoto.error || postedPhoto.status >= 400){
      yield put(postTicketTypePhotoFailure());
    }else{
      yield put(postTicketTypePhotoSuccess(postedPhoto.data));
    }
  } catch (error) {
    console.error(error);
  }
}

function* deleteTicketTypePhotoRequest({ params }) {
  const { tenantId, eventId, ticketTypeId, photoId } = params;
  try {
    const deletedPhoto = yield call(deleteTicketTypePhotoCall, tenantId, eventId, ticketTypeId, photoId);
    Notification(deletedPhoto, {error: `Error occured!`, success: `Successfully deleted ticket type photo!`});
    if(deletedPhoto.error || deletedPhoto.status >= 400){
      yield put(deleteTicketTypePhotoFailure());
    }else{
      yield put(deleteTicketTypePhotoSuccess(deletedPhoto.data));
    }
  } catch (error) {
    console.error(error);
  }
}

function* cloneFeesRequest({ payload }) {
  const { tenantId, eventId, ticketTypeId, sourceTicketTypeId } = payload;
  try {
    const postCall = yield call(cloneFeesCall, tenantId, eventId, ticketTypeId, sourceTicketTypeId);
    Notification(postCall, {error: `Error occured!`, success: `Fees Cloned successfully!`});
    if(postCall.error || postCall.status >= 400){
      yield put(cloneFeesFailure());
    }else{
      yield put(cloneFeesSuccess(postCall.data));
    }
  } catch (error) {
    console.error(error);
  }
}

function* cloneTaxesRequest({ payload }) {
  const { tenantId, eventId, ticketTypeId, sourceTicketTypeId } = payload;
  try {
    const postCall = yield call(cloneTaxesCall, tenantId, eventId, ticketTypeId, sourceTicketTypeId);
    Notification(postCall, {error: `Error occured!`, success: `Taxes Cloned successfully!`});
    if(postCall.error || postCall.status >= 400){
      yield put(cloneTaxesFailure());
    }else{
      yield put(cloneTaxesSuccess(postCall.data));
    }
  } catch (error) {
    console.error(error);
  }
}

function* cloneTicketsRequest({ payload }) {
  const { tenantId, eventId, ticketTypeId } = payload;
  try {
    const postCall = yield call(cloneTicketsCall, tenantId, eventId, ticketTypeId);
    Notification(postCall, {error: `Error occured!`, success: `Ticket Cloned successfully!`});
    if(postCall.error || postCall.status >= 400){
      yield put(cloneTicketsFailure());
    }else{
      yield put(cloneTicketsSuccess(postCall.data));
    }
  } catch (error) {
    console.error(error);
  }
}


export function* fetchTicketTypes() {
  yield takeEvery(FETCH_TICKET_TYPES, fetchTicketTypesRequest);
}

export function* fetchTicketType() {
  yield takeEvery(FETCH_TICKET_TYPE, fetchTicketTypeRequest);
}

export function* fetchTicketTypeOptions() {
  yield takeEvery(FETCH_TICKET_TYPE_OPTIONS, fetchTicketTypeOptionsRequest);
}

export function* addPaidTicketType() {
  yield takeEvery(ADD_PAID_TICKET_TYPES, addPaidTicketRequest);
}

export function* fetchInventory() {
  yield takeEvery(FETCH_INVENTORY, fetchInventoryRequest);
}

export function* createInventory() {
  yield takeEvery(CREATE_INVENTORY, createInventoryRequest);
}

export function* addFees() {
  yield takeEvery(ADD_FEES, addFeesRequest);
}

export function* addTaxGroup() {
  yield takeEvery(ADD_TAX_GROUP, addTaxGroupRequest);
}

export function* fetchFees() {
  yield takeEvery(FETCH_FEES, fetchFeesRequest);
}

export function* fetchTaxGroup() {
  yield takeEvery(FETCH_TAX_GROUP, fetchTaxGroupRequest);
}

export function* deleteFees() {
  yield takeEvery(DELETE_FEES, deleteFeesRequest);
}

export function* deleteTaxGroup() {
  yield takeEvery(DELETE_TAX_GROUP, deleteTaxGroupRequest);
}

export function* patchInventory() {
  yield takeEvery(PATCH_INVENTORY, patchInventoryRequest);
}

export function* patchTicketType() {
  yield takeEvery(PATCH_TICKET_TYPE, patchTicketTypeRequest);
}

export function* putTicketType() {
  yield takeEvery(PUT_TICKET_TYPE, putTicketTypeRequest);
}

export function* listTicketTypePhotos() {
  yield takeEvery(LIST_TICKET_TYPE_PHOTOS, listTicketTypePhotosRequest);
}

export function* postTicketTypePhoto() {
  yield takeEvery(POST_TICKET_TYPE_PHOTO, postTicketTypePhotoRequest);
}

export function* deleteTicketTypePhoto() {
  yield takeEvery(DELETE_TICKET_TYPE_PHOTO, deleteTicketTypePhotoRequest);
}

export function* switchTicketSale() {
  yield takeEvery(SWITCH_TICKET_SALE, switchTicketSaleRequest);
}

export function* cloneTicketTypes() {
  yield takeEvery(CLONE_TICKET_TYPES, cloneTicketTypesRequest);
}

export function* cloneFees() {
  yield takeEvery(CLONE_FEES, cloneFeesRequest);
}

export function* cloneTaxes() {
  yield takeEvery(CLONE_TAXES, cloneTaxesRequest);
}

export function* cloneTickets() {
  yield takeEvery(CLONE_TICKETS, cloneTicketsRequest);
}

export default function* rootSaga() {
  yield all([
    fork(fetchTicketTypes),
    fork(fetchTicketTypeOptions),
    fork(addPaidTicketType),
    fork(fetchInventory),
    fork(createInventory),
    fork(addFees),
    fork(addTaxGroup),
    fork(fetchFees),
    fork(fetchTaxGroup),
    fork(deleteFees),
    fork(patchInventory),
    fork(fetchTicketType),
    fork(deleteTaxGroup),
    fork(patchTicketType),
    fork(putTicketType),
    fork(listTicketTypePhotos),
    fork(postTicketTypePhoto),
    fork(deleteTicketTypePhoto),
    fork(switchTicketSale),
    fork(cloneTicketTypes),
    fork(cloneFees),
    fork(cloneTaxes),
    fork(cloneTickets),
  ]);
}
