const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router = require('express').Router()
const User = require('../models/user')
const SecurityQuestion = require('../models/securityQuestion')
const config = require('../utils/config')

router.get('/', async (req, res) => {
  const securityQuestions = await SecurityQuestion.find({})
  return res.json(securityQuestions)
})

router.get('/:username', async (req, res) => {
  const { username } = req.params
  const user = await User.findOne({ username })

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  const securityQuestion = await SecurityQuestion.findOne({ user: user.id })

  if (!securityQuestion) {
    return res.status(404).json({ message: 'Security question not found' })
  }

  res.json(securityQuestion)
})

router.post('/:username/check-answer', async (req, res) => {
  const { username } = req.params
  const { answer } = req.body

  const user = await User.findOne({ username })

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  const securityQuestion = await SecurityQuestion.findOne({ user: user._id })
  if (!securityQuestion) {
    return res.status(404).json({ message: 'Security question not found' })
  }

  const answerMatch = await bcrypt.compare(answer, securityQuestion.answerHash)

  if (answerMatch) {
    const userForToken = {
      username: user.username,
      id: user._id
    }
    const token = jwt.sign(userForToken, config.SECRET)
    res.json({ token, message: 'Answer is correct' })
  } else {
    res.status(401).json({ message: 'Incorrect answer' })
  }
})

router.post('/', async (req, res) => {
  const { username, question, answer } = req.body

  const user = await User.findOne({ username })

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  const saltRounds = 10
  const answerHash = await bcrypt.hash(answer, saltRounds)

  const securityQuestion = new SecurityQuestion({
    user: user._id,
    question,
    answerHash
  })

  await securityQuestion.save()

  res.status(201).json(securityQuestion)
})

module.exports = router
