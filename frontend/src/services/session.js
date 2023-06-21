import axios from 'axios'
const baseUrl = '/api/session'

const verifySession = async token => {
  const response = await axios.get(`${baseUrl}?token=${token}`)
  return response.data
}

// eslint-disable-next-line
export default { verifySession }
