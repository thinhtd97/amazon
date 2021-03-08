import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { 
    productDetailsReducers, 
    productListReducers,
    productDeleteReducer, 
    productCreateReducer,
    productUpdateReducer,
    productReviewsReducer,
    productTopReducer} from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import { 
    loginReducer, 
    registerReducer, 
    userDeleteReducer, 
    userDetailProfileReducer, 
    userDetailProfileUpdateReducer,
    userDetailsReducer,
    userDetailUpdateReducer,
    userListReducer} from './reducers/userReducers'
import { 
    orderCreateReducer, 
    orderDetailsReducer, 
    orderListReducer, 
    orderMyListReducer, 
    orderUpdateToDeliveryReducer, 
    orderUpdateToPaidReducer } from './reducers/orderReducers'

const reducer = combineReducers({
    productList: productListReducers,
    productDetails: productDetailsReducers,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productReviews: productReviewsReducer,
    productsTop: productTopReducer,
    cart: cartReducer,
    userLogin: loginReducer,
    userRegister: registerReducer,
    userDetail: userDetailProfileReducer,
    userProfileUpdate: userDetailProfileUpdateReducer,
    usersList: userListReducer,
    userUpdate: userDetailUpdateReducer,
    userDetails: userDetailsReducer,
    userDelete: userDeleteReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderUpdateToPaidReducer,
    orderDelivery: orderUpdateToDeliveryReducer,
    orderList: orderListReducer,
    myListOrder: orderMyListReducer
})

const getCartFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const getUserInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const getShippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : null

const initialState = {
    cart: { cartItems: getCartFromStorage, shippingAddress: getShippingAddressFromStorage  },
    userLogin: { userInfo: getUserInfoFromStorage }
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store