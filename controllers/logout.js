const router = require('express').Router()
const { tokenExtractor } = require('../utils/middleware')

const Session = require('../models/session')

router.delete('/', tokenExtractor, async (req, res) => {
  const token = req.get('authorization').substring(7)

  await Session.deleteOne({ token })
  res.status(200).json({ message: 'User has been logged out' })
})

module.exports = router
