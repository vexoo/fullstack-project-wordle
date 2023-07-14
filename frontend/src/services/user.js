import axios from 'axios'
import { token } from '../util/config'
const baseUrl = '/api/users'

const create = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

const updateUsername = async (username, newUsername) => {
  const config = { headers: { Authorization: token } }
  const data = { newUsername }

  const response = await axios.put(`${baseUrl}/${username}`, data, config)
  return response.data
}

const updatePassword = async (username, currentPassword, newPassword) => {
  const config = { headers: { Authorization: token } }
  const data = { currentPassword, newPassword }

  const response = await axios.put(
    `${baseUrl}/${username}/password-change`,
    data,
    config
  )
  return response.data
}

const updateStats = async (username, stats) => {
  const response = await axios.put(`${baseUrl}/${username}/stats`, stats)
  return response.data
}

const deleteAccount = async username => {
  const config = { headers: { Authorization: token } }
  const response = await axios.delete(`${baseUrl}/${username}`, config)
  return response.data
}

// eslint-disable-next-line
export default { create, updateUsername, updatePassword, updateStats, deleteAccount }
