import {
  FETCH_TICKET_TYPES,
  FETCH_TICKET_TYPES_SUCCESS,
  FETCH_TICKET_TYPES_FAILURE,
  FETCH_TICKET_TYPE_OPTIONS,
  FETCH_TICKET_TYPE_OPTIONS_SUCCESS,
  FETCH_TICKET_TYPE_OPTIONS_FAILURE,
  ADD_PAID_TICKET_TYPES,
  ADD_PAID_TICKET_TYPES_SUCCESS,
  ADD_PAID_TICKET_TYPES_FAILURE,
  FETCH_INVENTORY,
  FETCH_INVENTORY_SUCCESS,
  FETCH_INVENTORY_FAILURE,
  CREATE_INVENTORY,
  CREATE_INVENTORY_SUCCESS,
  CREATE_INVENTORY_FAILURE,
  ADD_FEES,
  ADD_FEES_SUCCESS,
  ADD_FEES_FAILURE,
  ADD_TAX_GROUP,
  ADD_TAX_GROUP_SUCCESS,
  ADD_TAX_GROUP_FAILURE,
  FETCH_FEES,
  FETCH_FEES_SUCCESS,
  FETCH_FEES_FAILURE,
  FETCH_TAX_GROUP,
  FETCH_TAX_GROUP_SUCCESS,
  FETCH_TAX_GROUP_FAILURE,
  DELETE_FEES,
  DELETE_FEES_SUCCESS,
  DELETE_FEES_FAILURE,
  DELETE_TAX_GROUP,
  DELETE_TAX_GROUP_SUCCESS,
  DELETE_TAX_GROUP_FAILURE,
  PATCH_INVENTORY,
  PATCH_INVENTORY_SUCCESS,
  PATCH_INVENTORY_FAILURE,
  FETCH_TICKET_TYPE,
  FETCH_TICKET_TYPE_SUCCESS,
  FETCH_TICKET_TYPE_FAILURE,
  PATCH_TICKET_TYPE,
  PATCH_TICKET_TYPE_SUCCESS,
  PATCH_TICKET_TYPE_FAILURE,
  PUT_TICKET_TYPE,
  PUT_TICKET_TYPE_SUCCESS,
  PUT_TICKET_TYPE_FAILURE,
  LIST_TICKET_TYPE_PHOTOS,
  LIST_TICKET_TYPE_PHOTOS_SUCCESS,
  LIST_TICKET_TYPE_PHOTOS_FAILURE,
  POST_TICKET_TYPE_PHOTO,
  POST_TICKET_TYPE_PHOTO_SUCCESS,
  POST_TICKET_TYPE_PHOTO_FAILURE,
  DELETE_TICKET_TYPE_PHOTO,
  DELETE_TICKET_TYPE_PHOTO_SUCCESS,
  DELETE_TICKET_TYPE_PHOTO_FAILURE,
  SWITCH_TICKET_SALE,
  SWITCH_TICKET_SALE_SUCCESS,
  SWITCH_TICKET_SALE_FAILURE,
  CLONE_TICKET_TYPES,
  CLONE_TICKET_TYPES_SUCCESS,
  CLONE_TICKET_TYPES_FAILURE,
  CLONE_FEES,
  CLONE_FEES_SUCCESS,
  CLONE_FEES_FAILURE,
  CLONE_TAXES,
  CLONE_TAXES_SUCCESS,
  CLONE_TAXES_FAILURE,
  CLONE_TICKETS,
  CLONE_TICKETS_SUCCESS,
  CLONE_TICKETS_FAILURE,
} from './constants';

export const fetchTicketTypes = data => {
  return {
    type: FETCH_TICKET_TYPES,
    payload: data,
  };
};

export const fetchTicketTypesSuccess = data => {
  return {
    type: FETCH_TICKET_TYPES_SUCCESS,
    payload: data,
  };
};

export const fetchTicketTypesFailure = data => {
  return {
    type: FETCH_TICKET_TYPES_FAILURE,
    payload: data,
  };
};

export const fetchTicketType = data => {
  return {
    type: FETCH_TICKET_TYPE,
    payload: data,
  };
};

export const fetchTicketTypeSuccess = data => {
  return {
    type: FETCH_TICKET_TYPE_SUCCESS,
    payload: data,
  };
};

export const fetchTicketTypeFailure = data => {
  return {
    type: FETCH_TICKET_TYPE_FAILURE,
    payload: data,
  };
};

export const addPaidTicketType = data => {
  return {
    type: ADD_PAID_TICKET_TYPES,
    payload: data,
  };
};

export const fetchTicketTypeOptions = data => {
  return {
    type: FETCH_TICKET_TYPE_OPTIONS,
    payload: data,
  };
};

export const fetchTicketTypeOptionsSuccess = data => {
  return {
    type: FETCH_TICKET_TYPE_OPTIONS_SUCCESS,
    payload: data,
  };
};

export const fetchTicketTypeOptionsFailure = data => {
  return {
    type: FETCH_TICKET_TYPE_OPTIONS_FAILURE,
    payload: data,
  };
};

export const addPaidTicketTypeSuccess = data => {
  return {
    type: ADD_PAID_TICKET_TYPES_SUCCESS,
    payload: data,
  };
};

export const addPaidTicketTypeFailure = data => {
  return {
    type: ADD_PAID_TICKET_TYPES_FAILURE,
    payload: data,
  };
};

export const fetchInventory = data => {
  return {
    type: FETCH_INVENTORY,
    payload: data,
  };
};

export const fetchInventorySuccess = data => {
  return {
    type: FETCH_INVENTORY_SUCCESS,
    payload: data,
  };
};

export const fetchInventoryFailure = data => {
  return {
    type: FETCH_INVENTORY_FAILURE,
    payload: data,
  };
};

export const createInventory = data => {
  return {
    type: CREATE_INVENTORY,
    payload: data,
  };
};

export const createInventorySuccess = data => {
  return {
    type: CREATE_INVENTORY_SUCCESS,
    payload: data,
  };
};

export const createInventoryFailure = data => {
  return {
    type: CREATE_INVENTORY_FAILURE,
    payload: data,
  };
};

export const addFees = data => {
  return {
    type: ADD_FEES,
    payload: data,
  };
};

export const addFeesSuccess = data => {
  return {
    type: ADD_FEES_SUCCESS,
    payload: data,
  };
};

export const addFeesFailure = data => {
  return {
    type: ADD_FEES_FAILURE,
    payload: data,
  };
};

export const addTaxGroup = data => {
  return {
    type: ADD_TAX_GROUP,
    payload: data,
  };
};

export const addTaxGroupSuccess = data => {
  return {
    type: ADD_TAX_GROUP_SUCCESS,
    payload: data,
  };
};

export const addTaxGroupFailure = data => {
  return {
    type: ADD_TAX_GROUP_FAILURE,
    payload: data,
  };
};

export const fetchFees = data => {
  return {
    type: FETCH_FEES,
    payload: data,
  };
};

export const fetchFeesSuccess = data => {
  return {
    type: FETCH_FEES_SUCCESS,
    payload: data,
  };
};

export const fetchFeesFailure = data => {
  return {
    type: FETCH_FEES_FAILURE,
    payload: data,
  };
};

export const fetchTaxGroup = data => {
  return {
    type: FETCH_TAX_GROUP,
    payload: data,
  };
};

export const fetchTaxGroupSuccess = data => {
  return {
    type: FETCH_TAX_GROUP_SUCCESS,
    payload: data,
  };
};

export const fetchTaxGroupFailure = data => {
  return {
    type: FETCH_TAX_GROUP_FAILURE,
    payload: data,
  };
};

export const deleteFees = data => {
  return {
    type: DELETE_FEES,
    payload: data,
  };
};

export const deleteFeesSuccess = data => {
  return {
    type: DELETE_FEES_SUCCESS,
    payload: data,
  };
};

export const deleteFeesFailure = data => {
  return {
    type: DELETE_FEES_FAILURE,
    payload: data,
  };
};

export const deleteTaxGroup = data => {
  return {
    type: DELETE_TAX_GROUP,
    payload: data,
  };
};

export const deleteTaxGroupSuccess = data => {
  return {
    type: DELETE_TAX_GROUP_SUCCESS,
    payload: data,
  };
};

export const deleteTaxGroupFailure = data => {
  return {
    type: DELETE_TAX_GROUP_FAILURE,
    payload: data,
  };
};

export const patchInventory = data => {
  return {
    type: PATCH_INVENTORY,
    payload: data,
  };
};

export const patchInventorySuccess = data => {
  return {
    type: PATCH_INVENTORY_SUCCESS,
    payload: data,
  };
};

export const patchInventoryFailure = data => {
  return {
    type: PATCH_INVENTORY_FAILURE,
    payload: data,
  };
};

export const patchTicketType = data => {
  return {
    type: PATCH_TICKET_TYPE,
    payload: data,
  };
};

export const patchTicketTypeSuccess = data => {
  return {
    type: PATCH_TICKET_TYPE_SUCCESS,
    payload: data,
  };
};

export const patchTicketTypeFailure = data => {
  return {
    type: PATCH_TICKET_TYPE_FAILURE,
    payload: data,
  };
};

export const putTicketType = data => {
  return {
    type: PUT_TICKET_TYPE,
    payload: data,
  };
};

export const putTicketTypeSuccess = data => {
  return {
    type: PUT_TICKET_TYPE_SUCCESS,
    payload: data,
  };
};

export const putTicketTypeFailure = data => {
  return {
    type: PUT_TICKET_TYPE_FAILURE,
    payload: data,
  };
};

export const listTicketTypePhotos = params => {
  return {
    type: LIST_TICKET_TYPE_PHOTOS,
    params,
  };
};

export const listTicketTypePhotosSuccess = data => {
  return {
    type: LIST_TICKET_TYPE_PHOTOS_SUCCESS,
    data,
  };
};

export const listTicketTypePhotosFailure = data => {
  return {
    type: LIST_TICKET_TYPE_PHOTOS_FAILURE,
    data,
  };
};

export const postTicketTypePhoto = params => {
  return {
    type: POST_TICKET_TYPE_PHOTO,
    params,
  };
};

export const postTicketTypePhotoSuccess = data => {
  return {
    type: POST_TICKET_TYPE_PHOTO_SUCCESS,
    data,
  };
};

export const postTicketTypePhotoFailure = data => {
  return {
    type: POST_TICKET_TYPE_PHOTO_FAILURE,
    data,
  };
};

export const deleteTicketTypePhoto = params => {
  return {
    type: DELETE_TICKET_TYPE_PHOTO,
    params,
  };
};

export const deleteTicketTypePhotoSuccess = data => {
  return {
    type: DELETE_TICKET_TYPE_PHOTO_SUCCESS,
    data,
  };
};

export const deleteTicketTypePhotoFailure = data => {
  return {
    type: DELETE_TICKET_TYPE_PHOTO_FAILURE,
    data,
  };
};

export const switchTicketSale = data => {
  return {
    type: SWITCH_TICKET_SALE,
    payload: data,
  };
};

export const switchTicketSaleSuccess = data => {
  return {
    type: SWITCH_TICKET_SALE_SUCCESS,
    payload: data,
  };
};

export const switchTicketSaleFailure = data => {
  return {
    type: SWITCH_TICKET_SALE_FAILURE,
    payload: data,
  };
};

export const cloneTicketTypes = data => {
  return {
    type: CLONE_TICKET_TYPES,
    payload: data,
  };
};

export const cloneTicketTypesSuccess = data => {
  return {
    type: CLONE_TICKET_TYPES_SUCCESS,
    payload: data,
  };
};

export const cloneTicketTypesFailure = data => {
  return {
    type: CLONE_TICKET_TYPES_FAILURE,
    payload: data,
  };
};

export const cloneFees = data => {
  return {
    type: CLONE_FEES,
    payload: data,
  };
};

export const cloneFeesSuccess = data => {
  return {
    type: CLONE_FEES_SUCCESS,
    payload: data,
  };
};

export const cloneFeesFailure = data => {
  return {
    type: CLONE_FEES_FAILURE,
    payload: data,
  };
};

export const cloneTaxes = data => {
  return {
    type: CLONE_TAXES,
    payload: data,
  };
};

export const cloneTaxesSuccess = data => {
  return {
    type: CLONE_TAXES_SUCCESS,
    payload: data,
  };
};

export const cloneTaxesFailure = data => {
  return {
    type: CLONE_TAXES_FAILURE,
    payload: data,
  };
};

export const cloneTickets = data => {
  return {
    type: CLONE_TICKETS,
    payload: data,
  };
};

export const cloneTicketsSuccess = data => {
  return {
    type: CLONE_TICKETS_SUCCESS,
    payload: data,
  };
};

export const cloneTicketsFailure = data => {
  return {
    type: CLONE_TICKETS_FAILURE,
    payload: data,
  };
};

