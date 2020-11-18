import { action } from './namespace'
import { resetToken, setToken } from '../../../axios'
// eslint-disable-next-line
import { setIsLoading } from '../../Main/model/actions'
import { refactorOrdersData } from '../../../common/constans'

export const setIsAuthChecked = action('SET_IS_AUTH_CHECKED')
export const setIsHistoryOrdersLoaded = action('SET_IS_HISTORY_ORDERS_LOADED')
export const setIsLoggedIn = action('SET_IS_LOGGED_ID')
export const setUserData = action('SET_USER_DATA')
export const setUserHistoryOrders = action('SET_USER_HISTORY_ORDERS')

const loadUserData = (respUser, respHistory) => (dispatch) => {
    if (respUser?.data?.[0]) {
        const [data] = respUser.data
        if (data?.address) {
            data.address = JSON.parse(data.address)
        }
        dispatch(setUserData(data))
        dispatch(setIsLoggedIn(true))
        if (respHistory?.data?.length) {
            const orders = refactorOrdersData(respHistory.data)
            dispatch(setUserHistoryOrders(orders))
        }
        dispatch(setIsHistoryOrdersLoaded(true))
    }
}

export const loadUser = () => (dispatch, getState, { api }) => Promise.all([
    api.getUser(),
    api.getOrders(),
])
    .then(([respUser, respHistory]) => dispatch(loadUserData(respUser, respHistory)))
    .catch((f) => f)

/**
 * Set auth token
 */
export const setAuthToken = (token) => (dispatch) => {
    setToken(token)
    return dispatch(loadUser())
}

/**
 * Check session, get and set token to Header Authorization: Bearer (Logged IN)
 */
export const checkToken = () => (dispatch, getState, { api }) => {
    dispatch(setIsLoading(true))
    return api.getToken()
        .then((respToken) => {
            if (respToken?.token) {
                setToken(respToken.token)
                return dispatch(loadUser())
            }
            return false
        })
        .catch((f) => f)
        .finally(() => {
            dispatch(setIsAuthChecked(true))
            dispatch(setIsLoading(false))
        })
}

export const loginUser = ({ email, password }) => (dispatch, getState, { api }) => {
    dispatch(setIsLoading(true))
    return api.loginUser({ email, password })
        .then((resp) => {
            if (resp.code === 200 && resp?.token) {
                setToken(resp.token)
                return dispatch(loadUser())
            }
            return false
        })
        .catch((f) => f)
        .finally(() => dispatch(setIsLoading(false)))
}

export const logoutUser = () => (dispatch, getState, { api }) => {
    dispatch(setIsLoading(true))
    return api.logoutUser()
        .then((resp) => {
            if (resp.code === 200) {
                resetToken()
                dispatch(setIsLoggedIn(false))
                dispatch(setUserData({}))
                dispatch(setUserHistoryOrders([]))
                dispatch(setIsHistoryOrdersLoaded(false))
            }
        })
        .catch((f) => f)
        .finally(() => dispatch(setIsLoading(false)))
}

export const createUser = ({ name, email, password }) => (dispatch, getState, { api }) => {
    dispatch(setIsLoading(true))
    return api.createUser({ name, email, password })
        .then((resp) => {
            if (resp.code === 201 && resp?.token) {
                setToken(resp.token)
                return api.getUser()
                    .then((respUser) => dispatch(loadUserData(respUser)))
            }
            return false
        })
        .catch((f) => f)
        .finally(() => dispatch(setIsLoading(false)))
}

export const loadUserHistoryOrders = () => (dispatch, getState, { api }) => {
    dispatch(setIsLoading(true))
    return api.getOrders()
        .then((resp) => {
            if (resp.code === 200 && resp?.data?.length) {
                const orders = refactorOrdersData(resp.data)
                dispatch(setUserHistoryOrders(orders))
            }
        })
        .catch((f) => f)
        .finally(() => {
            dispatch(setIsHistoryOrdersLoaded(true))
            dispatch(setIsLoading(false))
        })
}
