const bcrypt = require('bcrypt')
const User = require('../models/user')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

let authHeader

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()

    const response = await api
      .post('/api/login')
      .send({ username: 'root', password: 'sekret' })
    authHeader = `Bearer ${response.body.token}`
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
  test('updating the username of a user with authorization is successful', async () => {
    const newUsername = {
      newUsername: 'rooter'
    }

    await api
      .put('/api/users/root')
      .set('Authorization', authHeader)
      .send(newUsername)

    const usersAtEnd = await helper.usersInDb()
    const updatedUser = usersAtEnd.find(user => user.username === 'rooter')

    expect(updatedUser.username).toEqual('rooter')
  })

  test('updating the username without authorization is not succesful', async () => {
    const newUsername = {
      newUsername: 'rooter'
    }

    await api.put('/api/users/root').send(newUsername).expect(401)

    const usersAtEnd = await helper.usersInDb()
    const updatedUser = usersAtEnd.find(user => user.username === 'root')

    expect(updatedUser.username).toEqual('root')
  })

  test('deleting the user with authorization is successful', async () => {
    await api.delete('/api/users/root').set('Authorization', authHeader).expect(200)

    const usersAtEnd = await helper.usersInDb()

    expect(usersAtEnd.length).toEqual(0)
  })

  test('deleting the user without authorization is unsuccessful', async () => {
    await api.delete('/api/users/root').expect(401)

    const usersAtEnd = await helper.usersInDb()

    expect(usersAtEnd.length).toEqual(1)
  })

  test('changing password is successful', async () => {
    const passwordChange = {
      newPassword: 'secret'
    }
    await api
      .put('/api/users/root/change-password')
      .set('Authorization', authHeader)
      .send(passwordChange)
      .expect(200)
  })

  test('changing password without authorization is unsuccessful', async () => {
    const passwordChange = {
      newPassword: 'secret'
    }
    await api.put('/api/users/root/change-password').send(passwordChange).expect(401)
  })

  test('checking current password match with right password is successful', async () => {
    const passwordChange = {
      currentPassword: 'sekret'
    }
    await api
      .post('/api/users/root/check-password')
      .set('Authorization', authHeader)
      .send(passwordChange)
      .expect(200)
  })

  test('checking current password match with wrong password is unsuccessful', async () => {
    const passwordChange = {
      currentPassword: 'lllllllll'
    }
    await api
      .post('/api/users/root/check-password')
      .set('Authorization', authHeader)
      .send(passwordChange)
      .expect(401)
  })
})
