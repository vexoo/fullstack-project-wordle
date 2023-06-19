const jwt = require('jsonwebtoken')
const router = require('express').Router()
const Session = require('../models/session')
const { SECRET } = require('../utils/config')

router.get('/', async (request, response) => {
  const { token } = request.query

  console.log(token)
  const decodedToken = jwt.verify(token, SECRET)

  if (decodedToken) {
    response.status(200).json({ sessionExists: true })
  } else {
    response.status(200).json({ sessionExists: false })
  }
})

module.exports = router
