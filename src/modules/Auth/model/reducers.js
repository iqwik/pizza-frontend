import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions'
import {
    setIsAuthChecked,
    setIsHistoryOrdersLoaded,
    setIsLoggedIn,
    setUserData,
    setUserHistoryOrders,
} from './actions'

const isAuthChecked = handleActions(
    {
        [setIsAuthChecked]: (state, action) => action.payload,
    },
    false,
)

const isHistoryOrdersLoaded = handleActions(
    {
        [setIsHistoryOrdersLoaded]: (state, action) => action.payload,
    },
    false,
)

const isLoggedIn = handleActions(
    {
        [setIsLoggedIn]: (state, action) => action.payload,
    },
    false,
)

const userData = handleActions(
    {
        [setUserData]: (state, action) => ({ ...action.payload }),
    },
    {},
)

const userHistoryOrders = handleActions(
    {
        [setUserHistoryOrders]: (state, action) => [...action.payload],
    },
    [],
)

export default combineReducers({
    isAuthChecked,
    isHistoryOrdersLoaded,
    isLoggedIn,
    userData,
    userHistoryOrders,
})
