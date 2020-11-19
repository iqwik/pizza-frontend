import axios from 'axios'

export const createOrder = ({ submitData }) => axios
    .post('/api/orders.create', submitData)
    .then((response) => response.data)

export const getOrders = () => axios
    .get('/api/orders.list')
    .then((response) => response.data)
