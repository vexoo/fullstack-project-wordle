import './App.css'

import React from 'react'
import { useState, useEffect } from 'react'

import Header from './components/Header/Header'
import Keyboard from './components/Keyboard'
import Board from './components/Board/Board'

import wordService from './services/words'

const App = () => {
  const [word, setWord] = useState('')

  useEffect(() => {
    const fetchDailyWord = async () => {
      try {
        const result = await wordService.getDaily()
        if (result) setWord(result.word)
      } catch (error) {
        console.error('Error:', error)
      }
    }

    fetchDailyWord()
  }, [])

  if (word === '') return <div>loading</div>

  return (
    <div className='container'>
      <Header />
      <Board word={word} />
      <Keyboard />
    </div>
  )
}

export default App
