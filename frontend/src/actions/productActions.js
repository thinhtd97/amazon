import { 
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DETAIL_FAIL,
    PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST, 
    PRODUCT_LIST_SUCCESS, 
    PRODUCT_REVIEW_FAIL, 
    PRODUCT_REVIEW_REQUEST, 
    PRODUCT_REVIEW_SUCCESS, 
    PRODUCT_TOP_FAIL, 
    PRODUCT_TOP_REQUEST, 
    PRODUCT_TOP_SUCCESS, 
    PRODUCT_UPDATE_FAIL, 
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS} from "../contstants/productContstants"
import axios from 'axios'

export const listProduct = (keyword="", pageNumber="") => async (dispatch) => {
    try {
        dispatch({
            type: PRODUCT_LIST_REQUEST
        })
    
        const { data } = await axios.get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`)
    
        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload:error.response && 
                    error.response.data.message ? 
                    error.response.data.message : 
                    error.message
        })
    }
}
export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: PRODUCT_DETAIL_REQUEST
        })
    
        const { data } = await axios.get(`/api/products/${id}`)
    
        dispatch({
            type: PRODUCT_DETAIL_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAIL_FAIL,
            payload:error.response && error.response.data.message ? 
                    error.response.data.message : 
                    error.message
        })
    }
}   
export const getProductsTop = () => async (dispatch) => {
    try {
        dispatch({
            type: PRODUCT_TOP_REQUEST
        })
    
        const { data } = await axios.get(`/api/products/top`)
    
        dispatch({
            type: PRODUCT_TOP_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_TOP_FAIL,
            payload:error.response && error.response.data.message ? 
                    error.response.data.message : 
                    error.message
        })
    }
}
export const productDeleteAction = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_DELETE_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
           headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`
            }
        }
    
        await axios.delete(`/api/products/${id}`, config)
    
        dispatch({
            type: PRODUCT_DELETE_SUCCESS
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload:error.response && 
                    error.response.data.message ? 
                    error.response.data.message : 
                    error.message
        })
    }
}
export const productCreateAction = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_CREATE_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
           headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`
            }
        }
    
        const { data } = await axios.post(`/api/products`, {}, config)
    
        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload:error.response && 
                    error.response.data.message ? 
                    error.response.data.message : 
                    error.message
        })
    }
}
export const productUpdateAction = (product) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_UPDATE_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
           headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`
            }
        }
    
        await axios.put(`/api/products/${product._id}`, product, config)
    
        dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload:error.response && 
                    error.response.data.message ? 
                    error.response.data.message : 
                    error.message
        })
    }
}
export const productReviewAction = (productReview) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_REVIEW_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
           headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`
            }
        }
    
        await axios.post(`/api/products/${productReview._id}/reviews`, productReview, config)
    
        dispatch({
            type: PRODUCT_REVIEW_SUCCESS,
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_REVIEW_FAIL,
            payload: error.response && 
                    error.response.data.message ? 
                    error.response.data.message : 
                    error.message
        })
    }
}