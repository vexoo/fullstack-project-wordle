import './App.css'

import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import Header from './components/Header/Header'
import Keyboard from './components/Keyboard'
import Board from './components/Board/Board'
import Modals from './components/Modals'

import wordService from './services/words'
import sessionService from './services/session'

import { setUser } from './reducers/userReducer'
import { setBoard } from './reducers/boardReducer'

import { setToken } from './util/config'
import {
  getLocalDailyWord,
  getLocalWordleBoard,
  getLocalLoggedUser,
  setLocalDailyWord,
  removeLocalWordleBoard,
  removeLocalLoggedUser
} from './util/localStorageHelper'

const App = () => {
  const dispatch = useDispatch()
  const [word, setWord] = useState(null)

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

  useEffect(() => {
    const fetchBoard = async () => {
      const dailyWord = getLocalDailyWord()
      if (word === dailyWord) {
        const state = getLocalWordleBoard()
        if (state) {
          dispatch(setBoard(state))
        }
      } else {
        setLocalDailyWord(word)
        removeLocalWordleBoard()
      }
    }
    if (word) fetchBoard()
  }, [word])

  useEffect(() => {
    const user = getLocalLoggedUser()
    if (user) {
      const sessionExists = sessionService.verifySession(user.token)
      if (sessionExists) {
        setToken(user.token)
        dispatch(setUser(user))
      } else {
        removeLocalLoggedUser()
      }
    }
  }, [])

  if (!word) return <div>loading</div>

  return (
    <div className='container'>
      <Header />
      <Board word={word} />
      <Keyboard />
      <Modals />
    </div>
  )
}

export default App
