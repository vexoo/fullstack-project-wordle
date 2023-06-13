import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/words'

const getDaily = async () => {
  const request = axios.get(`${baseUrl}/daily-word`)
  const response = await request
  return response.data
}

const checkWord = async ({ word }) => {
  const request = axios.get(`${baseUrl}/${word}`)
  const response = await request
  const { exists } = response.data
  return Boolean(exists)
}

/*
const create = async (newObject) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (newObject) => {
  const request = axios.put(`${baseUrl}/${newObject.id}`, newObject)
  const response = await request
  return response.data
}

const remove = async (newObject) => {
  const config = {
    headers: { Authorization: token }
  }

  const request = axios.delete(`${baseUrl}/${newObject.id}`, config)
  const response = await request
  return response.data
}

const comment = async (id, comment) => {
  console.log(comment)
  const response = await axios.post(`${baseUrl}/${id}/comments`, { comment })
  return response.data
}
*/

export default {
  getDaily,
  checkWord
}
