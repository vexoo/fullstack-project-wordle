import axios from 'axios'
const baseUrl = '/api/users'

const create = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

const updateStats = async (user, stats) => {
  const response = await axios.put(`${baseUrl}/${user}/stats`, stats)
  return response.data
}

// eslint-disable-next-line
export default { create, updateStats }
