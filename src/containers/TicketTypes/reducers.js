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
import { fromJS } from 'immutable';

const initialState = fromJS({
  loader: false,
  isFetching: false,
  isFetchingFee: false,
  isFetchingTaxGroup: false,
  isFetchingInventory: false,
  actionLoader: false,
  ticketType: {},
  refetchFees: false,
  submitStatus: false,
  inventory: {},
  newInventoryId: '',
  refetchTaxGroup: false,
  refetchInventory: false,
  refetchTicketType: false,
  fees: {
    items: [],
  },
  taxGroup: {
    items: [],
  },
  newTicketId: '',
  ticketTypesList: {
    items: [],
  },
  ticketTypeOptions: {
    items: [],
  },
  listTicketPhotos: {},
  postedTicketPhoto: undefined,
  deletedTicketPhoto: false,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TICKET_TYPES: {
      return state
        .set('loader', true)
        .set('isFetching', true)
        .set('refetchTicketType', false)
        .set('newTicketId', '');
    }
    case FETCH_TICKET_TYPES_SUCCESS: {
      return state
        .set('loader', false)
        .set('isFetching', false)
        .set('ticketTypesList', fromJS(action.payload));
    }
    case FETCH_TICKET_TYPES_FAILURE: {
      return state
        .set('loader', false)
        .set('isFetching', false)
    }

    case FETCH_TICKET_TYPE: {
      return state
        .set('loader', true)
        .set('isFetching', true)
        .set('newTicketId', '');
    }
    case FETCH_TICKET_TYPE_SUCCESS: {
      return state
        .set('loader', false)
        .set('isFetching', false)
        .set('ticketType', fromJS(action.payload));
    }
    case FETCH_TICKET_TYPE_FAILURE: {
      return state
        .set('loader', false)
        .set('isFetching', false)
    }

    case FETCH_TICKET_TYPE_OPTIONS: {
      return state.set('isFetching', true).setIn(['ticketTypeOptions', 'items'], fromJS([]));
    }
    case FETCH_TICKET_TYPE_OPTIONS_SUCCESS: {
      return state.set('isFetching', false).set('ticketTypeOptions', fromJS(action.payload));
    }
    case FETCH_TICKET_TYPE_OPTIONS_FAILURE: {
      return state.set('isFetching', false);
    }

    case FETCH_FEES: {
      return state
        .set('loader', true)
        .set('isFetchingFee', true)
        .set('refetchFees', false);
    }
    case FETCH_FEES_SUCCESS: {
      return state
        .set('loader', false)
        .set('isFetchingFee', false)
        .set('fees', fromJS(action.payload));
    }
    case FETCH_FEES_FAILURE: {
      return state
        .set('loader', false)
        .set('isFetchingFee', false)
    }

    case FETCH_TAX_GROUP: {
      return state
        .set('loader', true)
        .set('isFetchingTaxGroup', true)
        .set('refetchTaxGroup', false);
    }
    case FETCH_TAX_GROUP_SUCCESS: {
      return state
        .set('loader', false)
        .set('refetchTaxGroup', false)
        .set('isFetchingTaxGroup', false)
        .set('taxGroup', fromJS(action.payload));
    }
    case FETCH_TAX_GROUP_FAILURE: {
      return state
        .set('loader', false)
        .set('refetchTaxGroup', false)
        .set('isFetchingTaxGroup', false)
    }

    case FETCH_INVENTORY: {
      return state
        .set('loader', true)
        .set('isFetchingInventory', true)
        .set('refetchInventory', false)
        .set('newInventoryId', '');
    }
    case FETCH_INVENTORY_SUCCESS: {
      return state
        .set('loader', false)
        .set('isFetchingInventory', false)
        .set('inventory', fromJS(action.payload));
    }
    case FETCH_INVENTORY_FAILURE: {
      return state
        .set('loader', false)
        .set('isFetchingInventory', false)
    }

    case ADD_PAID_TICKET_TYPES: {
      return state.set('actionLoader', true).set('submitStatus', false);
    }
    case ADD_PAID_TICKET_TYPES_SUCCESS: {
      const newTicketId = action.payload ? action.payload.id : null;
      return state.set('actionLoader', false).set('newTicketId', newTicketId);
    }
    case ADD_PAID_TICKET_TYPES_FAILURE: {
      return state.set('actionLoader', false);
    }

    case ADD_FEES:
      return state.set('actionLoader', true);

    case ADD_FEES_SUCCESS:
      return state.set('actionLoader', false).set('refetchFees', true);
    case ADD_FEES_FAILURE:
      return state.set('actionLoader', false);

    case ADD_TAX_GROUP:
      return state.set('actionLoader', true);

    case ADD_TAX_GROUP_SUCCESS:
      return state.set('actionLoader', false).set('refetchTaxGroup', true);
    case ADD_TAX_GROUP_FAILURE:
      return state.set('actionLoader', false);

    case CREATE_INVENTORY: {
      return state.set('actionLoader', true);
    }

    case CREATE_INVENTORY_SUCCESS:
      const newInventoryId = action.payload && action.payload.inventory ? action.payload.inventory.id : null;
      {
        return state
          .set('actionLoader', false)
          .set('newInventoryId', newInventoryId)
          .set('refetchInventory', true);
      }
    case CREATE_INVENTORY_FAILURE:
        return state.set('actionLoader', false)


    case PATCH_INVENTORY:
      return state.set('actionLoader', true);

    case PATCH_INVENTORY_SUCCESS:
      return state
        .set('actionLoader', false)
        .set('newInventoryId', newInventoryId)
        .set('refetchInventory', true);
    case PATCH_INVENTORY_FAILURE:
      return state
        .set('actionLoader', false)

    case PATCH_TICKET_TYPE:
      return state.set('actionLoader', true);

    case PATCH_TICKET_TYPE_SUCCESS:
      const newTicketId = action.payload ? action.payload.id : null;
      return state.set('actionLoader', false).set('newTicketId', newTicketId);

    case PATCH_TICKET_TYPE_FAILURE:
      return state.set('actionLoader', false);

    case DELETE_TAX_GROUP:
      return state.set('refetchTaxGroup', false);

    case DELETE_TAX_GROUP_SUCCESS:
      return state.set('refetchTaxGroup', true);

    case DELETE_FEES:
      return state.set('actionLoader', true);

    case DELETE_FEES_SUCCESS:
      return state.set('actionLoader', false).set('refetchFees', true);

      case DELETE_FEES_FAILURE:
        return state.set('actionLoader', false);

    case PUT_TICKET_TYPE:
      return state.set('actionLoader', true);

    case PUT_TICKET_TYPE_SUCCESS:
      return state.set('refetchTicketType', true).set('actionLoader', false);

    case PUT_TICKET_TYPE_FAILURE:
      return state.set('actionLoader', false);

    case SWITCH_TICKET_SALE:
      return state.set('actionLoader', true);

    case SWITCH_TICKET_SALE_SUCCESS:
      return state.set('refetchTicketType', true).set('actionLoader', false);

    case SWITCH_TICKET_SALE_FAILURE:
      return state.set('actionLoader', false);

    case LIST_TICKET_TYPE_PHOTOS:
      return state.set('postedTicketPhoto', undefined);

    case LIST_TICKET_TYPE_PHOTOS_SUCCESS:
      return state.set('listTicketPhotos', fromJS(action.data));

    case POST_TICKET_TYPE_PHOTO_SUCCESS:
      return state.set('postedTicketPhoto', action.data);

    case DELETE_TICKET_TYPE_PHOTO:
      return state.set('deletedTicketPhoto', true);

    case DELETE_TICKET_TYPE_PHOTO_SUCCESS:
      return state.set('deletedTicketPhoto', false);

    case DELETE_TICKET_TYPE_PHOTO_FAILURE:
      return state.set('deletedTicketPhoto', false);

    case CLONE_TICKET_TYPES:
      return state.set('actionLoader', true).set('refetchTicketType', false);

    case CLONE_TICKET_TYPES_SUCCESS:
      return state.set('actionLoader', false).set('refetchTicketType', true);

    case CLONE_TICKET_TYPES_FAILURE:
      return state.set('actionLoader', false);

    case CLONE_FEES:
      return state.set('actionLoader', true).set('refetchFees', false);

    case CLONE_FEES_SUCCESS:
      return state.set('actionLoader', false).set('refetchFees', true);

    case CLONE_FEES_FAILURE:
      return state.set('actionLoader', false);

    case CLONE_TAXES:
      return state.set('actionLoader', true).set('refetchTaxGroup', false);

    case CLONE_TAXES_SUCCESS:
      return state.set('actionLoader', false).set('refetchTaxGroup', true);

    case CLONE_TAXES_FAILURE:
      return state.set('actionLoader', false);

    case CLONE_TICKETS:
      return state.set('actionLoader', true).set('refetchTicketType', false);

    case CLONE_TICKETS_SUCCESS:
      return state.set('actionLoader', false).set('refetchTicketType', true);

    case CLONE_TICKETS_FAILURE:
      return state.set('actionLoader', false);

    default:
      return state;
  }
};
