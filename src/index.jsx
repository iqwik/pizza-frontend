import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createHashHistory } from 'history'
import createStore from './redux/store'
import { getReducers } from './redux/reducers'
import App from './App'

const pizzaStore = createStore(
    getReducers(),
    createHashHistory(),
    {},
)

ReactDOM.render(
    <Provider store={pizzaStore}>
        <App />
    </Provider>,
    document.getElementById('app'),
)
