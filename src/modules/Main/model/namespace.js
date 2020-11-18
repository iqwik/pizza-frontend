import { createAction } from 'redux-actions'

const namespace = 'main'

export const action = (type) => createAction(`${namespace}:${type}`)
export const getState = (state) => state[namespace]

export default namespace
