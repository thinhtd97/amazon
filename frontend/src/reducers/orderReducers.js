import { 
  ORDER_CREATE_FAIL, 
  ORDER_CREATE_REQUEST, 
  ORDER_CREATE_RESET, 
  ORDER_CREATE_SUCCESS, 
  ORDER_DETAILS_FAIL, 
  ORDER_DETAILS_REQUEST, 
  ORDER_DETAILS_RESET, 
  ORDER_DETAILS_SUCCESS, 
  ORDER_LIST_FAIL, 
  ORDER_LIST_REQUEST, 
  ORDER_LIST_RESET, 
  ORDER_LIST_SUCCESS, 
  ORDER_MY_LIST_FAIL, 
  ORDER_MY_LIST_REQUEST, 
  ORDER_MY_LIST_RESET, 
  ORDER_MY_LIST_SUCCESS, 
  ORDER_UPDATE_TO_DELIVERY_FAIL, 
  ORDER_UPDATE_TO_DELIVERY_REQUEST, 
  ORDER_UPDATE_TO_DELIVERY_SUCCESS, 
  ORDER_UPDATE_TO_PAID_FAIL, 
  ORDER_UPDATE_TO_PAID_REQUEST, 
  ORDER_UPDATE_TO_PAID_SUCCESS } from "../contstants/orderConstants";

export const orderCreateReducer = (state = { order: {} }, action) => {
    switch (action.type) {
        case ORDER_CREATE_REQUEST:
          return {
              loading: true
          }
        case ORDER_CREATE_SUCCESS: 
          return {
              loading: false,
              success: true,
              order: action.payload
          }
        case ORDER_CREATE_FAIL: 
          return {
              loading: false, error: action.payload
          }
        case ORDER_CREATE_RESET: 
          return {}
        default:
            return state
    }
}
export const orderDetailsReducer = (state = { shippingAddress: {}, orderItems: [] }, action) => {
  switch (action.type) {
      case ORDER_DETAILS_REQUEST:
        return {
            ...state,
            loading: true
        }
      case ORDER_DETAILS_SUCCESS: 
        return {
            loading: false,
            order: action.payload
        }
      case ORDER_DETAILS_FAIL: 
        return {
          loading: false, error: action.payload
        }
      case ORDER_DETAILS_RESET: 
        return {}
      default:
          return state
  }
}
export const orderUpdateToPaidReducer = (state = {}, action) => {
  switch (action.type) {
      case ORDER_UPDATE_TO_PAID_REQUEST:
        return {
            loading: true
        }
      case ORDER_UPDATE_TO_PAID_SUCCESS: 
        return {
            loading: false,
            success: true
        }
      case ORDER_UPDATE_TO_PAID_FAIL: 
        return {
            loading: false, 
            error: action.payload
        }
      default:
          return state
  }
}
export const orderUpdateToDeliveryReducer = (state = {}, action) => {
  switch (action.type) {
      case ORDER_UPDATE_TO_DELIVERY_REQUEST:
        return {
            loading: true
        }
      case ORDER_UPDATE_TO_DELIVERY_SUCCESS: 
        return {
            loading: false,
            success: true
        }
      case ORDER_UPDATE_TO_DELIVERY_FAIL: 
        return {
            loading: false, 
            error: action.payload
        }
      default:
          return state
  }
}
export const orderMyListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
      case ORDER_MY_LIST_REQUEST:
        return {
            ...state,
            loading: true
        }
      case ORDER_MY_LIST_SUCCESS: 
        return {
            loading: false,
            orders: action.payload
        }
      case ORDER_MY_LIST_FAIL: 
        return {
            loading: false, 
            error: action.payload
        }
      case ORDER_MY_LIST_RESET: 
          return { orders: [] }
      default:
          return state
  }
}
export const orderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
      case ORDER_LIST_REQUEST:
        return {
            ...state,
            loading: true
        }
      case ORDER_LIST_SUCCESS: 
        return {
            loading: false,
            orders: action.payload
        }
      case ORDER_LIST_FAIL: 
        return {
            loading: false, 
            error: action.payload
        }
      case ORDER_LIST_RESET: 
          return { orders: [] }
      default:
          return state
  }
}