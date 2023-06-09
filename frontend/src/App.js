import './App.css'

import React from 'react'
import { useState, useEffect } from 'react'

import Header from './components/Header'
import Keyboard from './components/Keyboard'
import Board from './components/Board'

const words = ['prank', 'night', 'phone']

const App = () => {
  const [word, setWord] = useState('')

  useEffect(() => {
    const getWord = () => {
      const index = Math.floor(Math.random() * words.length)
      const selectedWord = words[index]
      setWord(selectedWord)
    }
    getWord()
  }, [])

  if (word === '') return <div>loading</div>

  return (
    <div className='container'>
      <Header />
      <Board />
      <Keyboard />
    </div>
  )
}

export default App
