const bcrypt = require('bcrypt')
const router = require('express').Router()
const User = require('../models/user')

const { tokenExtractor, sessionChecker } = require('../utils/middleware')

router.post('/', async (req, res) => {
  const { username, password } = req.body

  if (!password) {
    return res.status(401).json({ error: 'password required' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    passwordHash
  })

  const savedUser = await user.save()
  res.status(201).json({ message: 'User created', username: savedUser.username })
})

router.put('/:username', tokenExtractor, sessionChecker, async (req, res) => {
  const { username } = req.params
  const { newUsername } = req.body

  if (!req.decodedToken) {
    return res.status(401).json({ error: 'missing token' })
  }

  if (!req.decodedToken.id) {
    return res.status(401).json({ error: 'token invalid' })
  }

  const user = await User.findOne({ username })

  if (user && newUsername) {
    user.username = newUsername
    await user.save()
    res.json(user)
  } else {
    res.status(404).end()
  }
})

router.post(
  '/:username/check-password',
  tokenExtractor,
  sessionChecker,
  async (req, res) => {
    const { username } = req.params
    const { currentPassword } = req.body

    if (!req.decodedToken) {
      return res.status(401).json({ error: 'missing token' })
    }

    if (!req.decodedToken.id) {
      return res.status(401).json({ error: 'token invalid' })
    }

    const user = await User.findOne({ username })

    if (!user) {
      return res.status(404).json({ error: 'user not found' })
    }

    const passwordMatch = await bcrypt.compare(currentPassword, user.passwordHash)

    if (!passwordMatch) {
      return res.status(401).json({ match: false, error: 'incorrect password' })
    }

    res.status(200).json({ match: true })
  }
)

router.put('/:username/change-password', tokenExtractor, async (req, res) => {
  const { username } = req.params
  const { newPassword } = req.body

  if (!req.decodedToken) {
    return res.status(401).json({ error: 'missing token' })
  }

  if (!req.decodedToken.id) {
    return res.status(401).json({ error: 'token invalid' })
  }

  const user = await User.findOne({ username })

  if (!user) {
    return res.status(404).json({ error: 'user not found' })
  }

  const saltRounds = 10
  const newPasswordHash = await bcrypt.hash(newPassword, saltRounds)

  user.passwordHash = newPasswordHash
  await user.save()

  res.status(200).json({ message: 'Password changed' })
})

router.put('/:username/stats', async (req, res) => {
  const { username } = req.params
  const { played, won, currStreak, maxStreak, guessDistribution } = req.body

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

  res.status(200).json({ message: 'Stats updated successfully' })
})

router.delete('/:username', tokenExtractor, sessionChecker, async (req, res) => {
  const { username } = req.params

  await User.deleteOne({ username })
  res.status(200).json()
})

module.exports = router
