const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('words are returned as json', async () => {
  await api
    .get('/api/words')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('daily word is returned at correct route', async () => {
  await api
    .get('/api/words/daily-word')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

describe('GET /api/words/:word', () => {
  test('returns exists: true if word exists in the database', async () => {
    const word = 'prank'

    const response = await api
      .get(`/api/words/${word}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toEqual({ exists: true })
  })

  test('returns exists: false if word does not exist in the database', async () => {
    const word = 'bbbbb'

    const response = await api
      .get(`/api/words/${word}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toEqual({ exists: false })
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
