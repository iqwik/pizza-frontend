import { action } from './namespace'
// eslint-disable-next-line
import { setAuthToken, setIsAuthChecked } from '../../Auth/model/actions'

export const setCurrency = action('SET_CURRENCY')
export const setIsLoading = action('IS_LOADING')
export const setIsPizzasLoaded = action('SET_IS_PIZZAS_LOADED')
export const setPizzas = action('SET_PIZZA_ITEMS')

/**
 * Get pizza items from Back
 */
export const loadPizzas = () => (dispatch, getState, { api }) => {
    dispatch(setIsLoading(true))
    return api.getToken()
        .then((respToken) => {
            if (respToken?.token) {
                dispatch(setAuthToken(respToken.token))
            }
            dispatch(setIsAuthChecked(true))
            return api.getPizzas()
                .then((respPizzas) => {
                    if (respPizzas?.data.length) {
                        dispatch(setPizzas(respPizzas.data))
                    }
                })
                .finally(() => dispatch(setIsPizzasLoaded(true)))
        })
        .catch((f) => f)
        .finally(() => {
            dispatch(setIsLoading(false))
        })
}
