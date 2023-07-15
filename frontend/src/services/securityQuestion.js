import axios from 'axios'
import { token } from '../util/config'
const baseUrl = '/api/security-questions'

const create = async (username, question, answer) => {
  const response = await axios.post(baseUrl, { username, question, answer })
  return response.data
}

const checkAnswer = async (username, answer) => {
  const response = await axios.post(`${baseUrl}/${username}/check-answer`, {
    answer
  })
  return response.data
}

const findUser = async username => {
  const response = await axios.get(`${baseUrl}/${username}`)
  return response.data
}

export default { create, checkAnswer, findUser }
