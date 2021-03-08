import { 
    ORDER_CREATE_FAIL, 
    ORDER_CREATE_REQUEST, 
    ORDER_CREATE_SUCCESS, 
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_REQUEST, 
    ORDER_DETAILS_SUCCESS,
    ORDER_UPDATE_TO_PAID_REQUEST, 
    ORDER_UPDATE_TO_PAID_FAIL, 
    ORDER_UPDATE_TO_PAID_SUCCESS, 
    ORDER_MY_LIST_REQUEST,
    ORDER_MY_LIST_SUCCESS,
    ORDER_MY_LIST_FAIL,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL,
    ORDER_UPDATE_TO_DELIVERY_REQUEST,
    ORDER_UPDATE_TO_DELIVERY_FAIL,
    ORDER_UPDATE_TO_DELIVERY_SUCCESS} from "../contstants/orderConstants"
import axios from 'axios'

export const createOrderAction = (dat) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_CREATE_REQUEST
        })

       const { userLogin: { userInfo } } = getState()

       const config = {
           headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${userInfo.token}`
           }
       }
    
        const { data } = await axios.post(`/api/orders`, dat, config)

        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && 
                    error.response.data.message ? 
                    error.response.data.message : 
                    error.message
        })
    }
}
export const detailsOrderAction = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_DETAILS_REQUEST
        })

       const { userLogin: { userInfo } } = getState()

       const config = {
           headers: {
               Authorization: `Bearer ${userInfo.token}`
           }
       }
    
        const { data } = await axios.get(`/api/orders/${id}`, config)

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response && 
                    error.response.data.message ? 
                    error.response.data.message : 
                    error.message
        })
    }
}
export const updateToPayAction = (orderId, paymentResult) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_UPDATE_TO_PAID_REQUEST
        })

       const { userLogin: { userInfo } } = getState()

       const config = {
           headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${userInfo.token}`
           }
       }
    
        await axios.put(`/api/orders/${orderId}/pay`, paymentResult, config)

        dispatch({
            type: ORDER_UPDATE_TO_PAID_SUCCESS
        })

    } catch (error) {   
        dispatch({
            type: ORDER_UPDATE_TO_PAID_FAIL,
            payload: error.response && 
                    error.response.data.message ? 
                    error.response.data.message : 
                    error.message
        })
    }
}
export const updateToDeliveryAction = (orderId) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_UPDATE_TO_DELIVERY_REQUEST
        })

       const { userLogin: { userInfo } } = getState()

       const config = {
           headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${userInfo.token}`
           }
       }
    
        await axios.put(`/api/orders/${orderId}/delivery`, {}, config)

        dispatch({
            type: ORDER_UPDATE_TO_DELIVERY_SUCCESS
        })

    } catch (error) {   
        dispatch({
            type: ORDER_UPDATE_TO_DELIVERY_FAIL,
            payload: error.response && 
                    error.response.data.message ? 
                    error.response.data.message : 
                    error.message
        })
    }
}
export const myListOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_MY_LIST_REQUEST
        })
    
        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/orders/myorders`, config)
    
        dispatch({
            type: ORDER_MY_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type:   ORDER_MY_LIST_FAIL,
            payload:error.response && 
                    error.response.data.message ? 
                    error.response.data.message : 
                    error.message
        })
    }
}
export const listOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_LIST_REQUEST
        })
    
        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/orders`, config)
    
        dispatch({
            type: ORDER_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ORDER_LIST_FAIL,
            payload:error.response && 
                    error.response.data.message ? 
                    error.response.data.message : 
                    error.message
        })
    }
}