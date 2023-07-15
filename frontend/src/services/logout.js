import axios from 'axios'
import { token } from '../util/config'
const baseUrl = '/api/logout'

const logout = async () => {
  const config = { headers: { Authorization: token } }
  const response = await axios.delete(baseUrl, config)
  return response.data
}

export default { logout }
