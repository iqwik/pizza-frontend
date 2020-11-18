import { getState } from './namespace'

export const getCart = (state) => getState(state).cart
export const getIsCartLoaded = (state) => getState(state).isCartLoaded
export const getShowCheckoutDialog = (state) => getState(state).showCheckoutDialog
export const getSuccessOrder = (state) => getState(state).successOrder
