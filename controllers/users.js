const bcrypt = require('bcrypt')
const router = require('express').Router()
const User = require('../models/user')

router.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

router.post('/', async (request, response) => {
  const { username, password } = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    passwordHash,
    played: 0,
    won: 0,
    currStreak: 0,
    maxStreak: 0,
    guessDistribution: [0, 0, 0, 0, 0, 0]
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

router.put('/:username/stats', async (req, res) => {
  const { username } = req.params
  const { played, won, currStreak, maxStreak, guessDistribution } = req.body

  try {
    const user = await User.findOne({ username })

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    user.played = played
    user.won = won
    user.currStreak = currStreak
    user.maxStreak = maxStreak
    user.guessDistribution = guessDistribution

    await user.save()

    res.status(200).json({ message: 'User stats updated successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Server error' })
  }
})

module.exports = router