import './App.css'

import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Header from './components/Header/Header'
import Keyboard from './components/Keyboard'
import Board from './components/Board/Board'
import Modals from './components/Modals'

import wordService from './services/words'
import sessionService from './services/session'
import { setUser } from './reducers/userReducer'
import { setToken } from './util/config'

const App = () => {
  const dispatch = useDispatch()
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

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedWordleUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      const sessionExists = sessionService.verifySession(user.token)
      if (sessionExists) {
        setToken(user.token)
        dispatch(
          setUser({
            username: user.username,
            token: user.token
          })
        )
      }
    }
  }, [])

  if (word === '') return <div>loading</div>

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
