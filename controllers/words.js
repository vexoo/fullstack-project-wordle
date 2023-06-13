const router = require('express').Router()
const Word = require('../models/word')

router.get('/', async (req, res) => {
  const words = await Word.find({})
  res.json(words)
})

router.get('/daily-word', async (req, res) => {
  try {
    const currentDate = new Date().toISOString().split('T')[0]
    const seed = parseInt(currentDate.replace(/-/g, ''))
    const totalCount = await Word.countDocuments()
    const randomIndex = Math.floor(seed % totalCount)

    const word = await Word.findOne().skip(randomIndex)
    res.json({ word: word.word })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

router.get('/:word', async (req, res) => {
  const { word } = req.params

  const foundWord = await Word.findOne({ word })
  if (foundWord) {
    res.json({ exists: true })
  } else {
    res.json({ exists: false })
  }
})

module.exports = router