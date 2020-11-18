import AuthModel from './Auth/model'
import CartModel from './Cart/model'
import MainModel from './Main/model'

/**
 * Main modules list as objects
 */
export const modules = [
    {
        module: MainModel.namespace,
        Component: MainModel.getComponent,
        name: 'Main',
        reducers: MainModel.reducers,
    },
    {
        module: AuthModel.namespace,
        Component: AuthModel.getComponent,
        name: 'Auth',
        reducers: AuthModel.reducers,
    },
    {
        module: CartModel.namespace,
        Component: CartModel.getComponent,
        name: 'Cart',
        reducers: CartModel.reducers,
    },
]
