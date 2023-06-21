const mongoose = require('mongoose')

const sessionSchema = new mongoose.Schema({
  token: {
    type: String
  }
})

sessionSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Session = mongoose.model('Session', sessionSchema)

module.exports = Session
