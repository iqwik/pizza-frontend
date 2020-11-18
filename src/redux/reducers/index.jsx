import { modules } from '../../modules'

export const getReducers = () => (modules.reduce(
    (result, { module, reducers }) => ({
        ...result,
        [module]: reducers,
    }),
    {},
))
