import { createAction } from 'redux-actions'

const namespace = 'cart'

export const action = (type) => createAction(`${namespace}:${type}`)
export const getState = (state) => state[namespace]

export default namespace
