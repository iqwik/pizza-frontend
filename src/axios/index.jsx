import axios from 'axios'

/**
 * Set Authorization Token in Global axios defaults.
 * @param authToken
 * @returns {string}
 */
export const setToken = (authToken) => {
    axios.defaults.timeout = 5 * 60 * 1000 // 5 minutes
    axios.defaults.headers.common.Authorization = `Bearer ${authToken}`
}

export const resetToken = () => {
    axios.defaults.headers.common.Authorization = ''
}
