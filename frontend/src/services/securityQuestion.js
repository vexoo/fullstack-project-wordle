import axios from 'axios'
import { token } from '../util/config'
const baseUrl = '/api/security-questions'

const create = async (username, question, answer) => {
  const response = await axios.post(baseUrl, { username, question, answer })
  return response.data
}

// eslint-disable-next-line
export default { create }
