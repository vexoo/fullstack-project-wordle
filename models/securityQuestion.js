const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const securityQuestionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  question: {
    type: String,
    required: true
  },
  answerHash: {
    type: String,
    required: true
  }
})

securityQuestionSchema.plugin(uniqueValidator)

securityQuestionSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.answerHash
  }
})

const SecurityQuestion = mongoose.model('SecurityQuestion', securityQuestionSchema)

module.exports = SecurityQuestion
