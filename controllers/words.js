const router = require('express').Router()
const Word = require('../models/word')

router.get('/', async (req, res) => {
  const words = await Word.find({})
  return res.json(words)
})

router.get('/daily-word', async (req, res) => {
  if (process.env.NODE_ENV === 'test') {
    return res.json({ word: 'stout' })
  } else {
    const currentDate = new Date().toISOString().split('T')[0]
    const seed = parseInt(currentDate.replace(/-/g, ''))
    const totalCount = await Word.countDocuments()
    const randomIndex = seed % totalCount

    const word = await Word.findOne().skip(randomIndex)
    return res.json({ word: word.word })
  }
})

router.get('/:word', async (req, res) => {
  const { word } = req.params
  const foundWord = await Word.findOne({ word })
  if (foundWord) {
    return res.json({ exists: true })
  } else {
    return res.json({ exists: false })
  }
})

module.exports = router
