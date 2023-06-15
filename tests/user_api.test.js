const bcrypt = require('bcrypt')
const User = require('../models/user')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('user creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'testUser',
      password: 'secret'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('updating found user stats is successful', async () => {
    const stats = {
      played: 1,
      won: 1,
      currStreak: 1,
      maxStreak: 1,
      guessDistribution: [0, 1, 0, 0, 0, 0]
    }

    await api
      .put('/api/users/root/stats')
      .send(stats)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    const updatedUser = usersAtEnd.find(user => user.username === 'root')

    expect(updatedUser.played).toBe(stats.played)
    expect(updatedUser.won).toBe(stats.won)
    expect(updatedUser.currStreak).toBe(stats.currStreak)
    expect(updatedUser.maxStreak).toBe(stats.maxStreak)
    expect(updatedUser.guessDistribution).toEqual(stats.guessDistribution)
  })

  test('updating nonexistent user stats returns 404', async () => {
    const stats = {
      played: 1,
      won: 1,
      currStreak: 1,
      maxStreak: 1,
      guessDistribution: [0, 1, 0, 0, 0, 0]
    }

    await api.put('/api/users/user/stats').send(stats).expect(404)
  })
})
