import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions'
import {
    setCurrency,
    setIsLoading,
    setIsPizzasLoaded,
    setPizzas,
} from './actions'

const currency = handleActions(
    {
        [setCurrency]: (state, action) => action.payload,
    },
    'usd',
)

const isLoading = handleActions(
    {
        [setIsLoading]: (state, action) => action.payload,
    },
    false,
)

const isPizzasLoaded = handleActions(
    {
        [setIsPizzasLoaded]: (state, action) => action.payload,
    },
    false,
)

const pizzas = handleActions(
    {
        [setPizzas]: (state, action) => [...action.payload],
    },
    [],
)

export default combineReducers({
    currency,
    isLoading,
    isPizzasLoaded,
    pizzas,
})
