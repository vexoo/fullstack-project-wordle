const router = require('express').Router()
const User = require('../models/user')
const SecurityQuestion = require('../models/securityQuestion')

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

router.post('/', async (req, res) => {
  const { username, question, answer } = req.body

  const user = await User.findOne({ username })

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  const securityQuestion = new SecurityQuestion({
    user: user._id,
    question,
    answer
  })

  await securityQuestion.save()

  res.status(201).json(securityQuestion)
})

module.exports = router
