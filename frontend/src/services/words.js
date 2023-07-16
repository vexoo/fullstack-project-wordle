import axios from 'axios'
const baseUrl = '/api/words'

const getDaily = async () => {
  const request = axios.get(`${baseUrl}/daily-word`)
  const response = await request
  return response.data
}

const checkWord = async word => {
  const request = axios.get(`${baseUrl}/${word}`)
  const response = await request
  const { exists } = response.data
  console.log(exists)
  return exists
}

export default {
  getDaily,
  checkWord
}
