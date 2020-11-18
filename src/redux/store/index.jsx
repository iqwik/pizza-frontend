import thunk from 'redux-thunk'
import {
    applyMiddleware,
    combineReducers,
    compose,
    createStore as createReduxStore,
} from 'redux'
import api from '../../api'

const createStore = (
    reducers,
    history,
    initialState = {},
) => createReduxStore(
    combineReducers(reducers),
    initialState,
    compose(
        applyMiddleware(thunk.withExtraArgument({ api, history })),
        window.__REDUX_DEVTOOLS_EXTENSION__
            ? window.__REDUX_DEVTOOLS_EXTENSION__({ name: 'Main' })
            : compose,
    ),
)

export default createStore
