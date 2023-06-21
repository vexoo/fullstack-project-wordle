const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router = require('express').Router()
const User = require('../models/user')
const Session = require('../models/session')
const config = require('../utils/config')

router.post('/', async (request, response) => {
  const { username, password } = request.body

  const user = await User.findOne({ username })
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id
  }
  const token = jwt.sign(userForToken, config.SECRET)
  Session.create({ token: token, userId: user.id })

  response.status(200).send({
    token,
    username: user.username,
    played: user.played,
    won: user.won,
    currStreak: user.currStreak,
    maxStreak: user.maxStreak,
    guessDistribution: user.guessDistribution
  })
})

module.exports = router
