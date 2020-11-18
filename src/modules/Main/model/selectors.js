import { getState } from './namespace'

export const getCurrency = (state) => getState(state).currency
export const getIsLoading = (state) => getState(state).isLoading
export const getIsPizzasLoaded = (state) => getState(state).isPizzasLoaded
export const getPizzaItems = (state) => getState(state).pizzas
