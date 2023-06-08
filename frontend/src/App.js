import './App.css'

import React from 'react'
import { useState, useEffect } from 'react'

import Keyboard from './components/Keyboard'

const words = ['prank', 'night', 'phone']

const App = () => {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }

  const rowStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  }

  const cellStyle = {
    backgroundColor: '#383838',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    display: 'flex',
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: 70
  }

  const mapStyle = {
    alignSelf: 'stretch',
    marginTop: 15
  }

  const textStyle = {
    fontWeight: 'bold',
    fontSize: 30
  }

  const titleStyle = {
    fontSize: 80,
    fontWeight: 'bold',
    letterSpacing: 5
  }

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

  console.log(word)
  const letters = word.split('')
  const board = new Array(6).fill(new Array(letters.length).fill('a'))

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Wordle</h1>
      <div style={mapStyle}>
        {board.map((row) => (
          <div style={rowStyle}>
            {row.map((cell) => (
              <div style={cellStyle}>
                <p style={textStyle}>{cell.toUpperCase()}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
      <Keyboard />
    </div>
  )
}

export default App
