import axios from 'axios'

export const getUser = (id = null) => axios
    .get(`/api/users.list${id ? `?id=${id}` : ''}`)
    .then((response) => response.data)

export const createUser = ({ name, email, password }) => axios
    .post('/api/users.create', { name, email, password })
    .then((response) => response.data)
