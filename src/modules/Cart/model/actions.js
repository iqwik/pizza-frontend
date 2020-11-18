import { action } from './namespace'
import { updateStore, deliveryCost } from '../../../common/constans'
import { getCart } from './selectors'
import { getCurrency } from '../../Main/model/selectors'
import { setIsLoading } from '../../Main/model/actions'
import { setAuthToken, setIsHistoryOrdersLoaded } from '../../Auth/model/actions'

export const setCart = action('SET_CART')
export const setIsCartLoaded = action('SET_IS_CART_LOADED')
export const setShowCheckoutDialog = action('SET_SHOW_CHECKOUT_DIALOG')
export const setSuccessOrder = action('SET_SUCCESS_ORDER')

/**
 * Get Cart from localStorage
 */
export const loadCart = () => (dispatch, getState) => {
    const cart = JSON.parse(localStorage.getItem('cart'))
    if (cart?.items && cart?.items !== getCart(getState())) {
        dispatch(setCart(cart))
    }
    dispatch(setIsCartLoaded(true))
}

/**
 * Update cart (redux store & localStorage)
 */
export const updateCart = (act, item, num) => (dispatch) => {
    const cart = updateStore(act, item, num)
    dispatch(setCart(cart))
}

export const sendOrder = ({ userId, data }) => (dispatch, getState, { api }) => {
    dispatch(setIsLoading(true))
    // eslint-disable-next-line
    const { name, email, comment, address } = data
    const cart = getCart(getState())
    cart.delivery = deliveryCost
    cart.selectedCurrency = getCurrency(getState())
    const submitData = {
        order: {
            customer: { name, email },
            cart,
            comment,
            address,
        },
    }
    if (userId) {
        submitData.userId = userId
    }
    if (data?.password) {
        submitData.password = data.password
    }
    return api.createOrder({ submitData })
        .then((resp) => {
            if (resp.code === 201) {
                if (resp?.token) {
                    dispatch(setAuthToken(resp.token))
                }
                dispatch(setShowCheckoutDialog(false))
                localStorage.clear()
                dispatch(setCart({}))
                dispatch(setIsHistoryOrdersLoaded(false))
                dispatch(setSuccessOrder(true))
            }
        })
        .catch((f) => f)
        .finally(() => dispatch(setIsLoading(false)))
}
