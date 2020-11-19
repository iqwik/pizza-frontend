import { createOrder, getOrders } from './orders'
import { createUser, getUser } from './users'
import { getPizzas } from './pizzas'
import {
    getToken,
    loginUser,
    logoutUser,
} from './auth'

export default {
    createOrder,
    createUser,
    getOrders,
    getPizzas,
    getToken,
    getUser,
    loginUser,
    logoutUser,
}
