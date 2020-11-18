import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions'
import {
    setCart,
    setIsCartLoaded,
    setShowCheckoutDialog,
    setSuccessOrder,
} from './actions'

const cart = handleActions(
    {
        [setCart]: (state, action) => ({ ...action.payload }),
    },
    {},
)

const isCartLoaded = handleActions(
    {
        [setIsCartLoaded]: (state, action) => action.payload,
    },
    false,
)

const showCheckoutDialog = handleActions(
    {
        [setShowCheckoutDialog]: (state, action) => action.payload,
    },
    false,
)

const successOrder = handleActions(
    {
        [setSuccessOrder]: (state, action) => action.payload,
    },
    false,
)

export default combineReducers({
    cart,
    isCartLoaded,
    showCheckoutDialog,
    successOrder,
})
