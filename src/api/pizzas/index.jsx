import axios from 'axios'

export const getPizzas = () => axios
    .get('/api/pizza.list')
    .then((response) => response.data)
