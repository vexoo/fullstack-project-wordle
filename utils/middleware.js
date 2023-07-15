const jwt = require('jsonwebtoken')
const { SECRET } = require('../utils/config')
const Session = require('../models/session')

const unknownEndpoint = (_request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
  }
  /*
  let token = authorization?.substring(7)
  const session = await Session.findOne({ token })
  if (!session) {
    return res.status(401).json({ error: 'No session found, login required' })
  }
*/
  next()
}

const sessionChecker = async (req, res, next) => {
  const authorization = req.get('authorization')
  let token = authorization?.substring(7)
  const session = await Session.findOne({ token })
  if (!session) {
    return res.status(401).json({ error: 'No session found, login required' })
  }

  next()
}

module.exports = {
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  sessionChecker
}
