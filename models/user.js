const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  played: {
    type: Number,
    default: 0
  },
  won: {
    type: Number,
    default: 0
  },
  currStreak: {
    type: Number,
    default: 0
  },
  maxStreak: {
    type: Number,
    default: 0
  },
  guessDistribution: {
    type: [Number],
    default: [0, 0, 0, 0, 0, 0]
  }
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User
