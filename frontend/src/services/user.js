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

const checkPassword = async (username, currentPassword) => {
  const config = { headers: { Authorization: token } }
  const data = { currentPassword }

  const response = await axios.post(
    `${baseUrl}/${username}/check-password`,
    data,
    config
  )
  return response.data.match
}

const updatePassword = async (username, newPassword) => {
  const config = { headers: { Authorization: token } }
  const data = { newPassword }

  const response = await axios.put(
    `${baseUrl}/${username}/change-password`,
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

export default {
  create,
  checkPassword,
  updateUsername,
  updatePassword,
  updateStats,
  deleteAccount
}
