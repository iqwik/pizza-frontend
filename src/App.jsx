import React from 'react'
import {
    BrowserRouter,
    Redirect,
    Route,
    Switch,
} from 'react-router-dom'
import { modules } from './modules'
import SubApp from './SubApp'
import './template/reset.css'
import 'primeicons/primeicons.css'
import 'primereact/resources/primereact.min.css'

const App = () => (
    <BrowserRouter>
        <Switch>
            {modules.map(({ module, Component }) => (
                <Route path={`/${module === 'main' ? '/' : module}`} key={module || 'module_not_found'}>
                    <SubApp module={module}>
                        <Component />
                    </SubApp>
                </Route>
            ))}
            <Redirect to="/" />
        </Switch>
    </BrowserRouter>
)

export default App
