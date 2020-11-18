import { getState } from './namespace'

export const getIsAuthChecked = (state) => getState(state).isAuthChecked
export const getIsHistoryOrdersLoaded = (state) => getState(state).isHistoryOrdersLoaded
export const getIsLoggedIn = (state) => getState(state).isLoggedIn
export const getUserData = (state) => getState(state).userData
export const getUserHistoryOrders = (state) => getState(state).userHistoryOrders
