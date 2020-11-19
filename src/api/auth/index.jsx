import axios from 'axios'

export const getToken = () => axios
    .get('/api/auth.check')
    .then((response) => response.data)

export const loginUser = ({ email, password }) => axios
    .post('/api/auth.login', { email, password })
    .then((response) => response.data)

export const logoutUser = () => axios
    .get('/api/auth.logout')
    .then((response) => response.data)
