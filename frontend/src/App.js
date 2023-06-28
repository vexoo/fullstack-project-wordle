import './App.css'

import { useEffect, useState } from 'react'
import Div100vh from 'react-div-100vh'
import { useDispatch } from 'react-redux'

import Board from './components/Board'
import Keyboard from './components/Keyboard'
import wordService from './services/words'
import sessionService from './services/session'
import Modals from './components/Modals/'
import Notification from './components/Notification'
import Header from './components/Header'

import { setUser } from './reducers/userReducer'
import { setBoard } from './reducers/boardReducer'

import { setToken } from './util/config'

import {
  getLocalDailyWord,
  getLocalWordleBoard,
  getLocalLoggedUser,
  setLocalDailyWord,
  removeLocalWordleBoard,
  removeLocalLoggedUser,
  getLocalGameState,
  setLocalGameState
} from './util/localStorageHelper'

import { setNotification } from './reducers/notificationReducer'
import { setLost, setPlaying, setWon } from './reducers/gameStateReducer'

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
        const gameStatus = getLocalGameState()
        if (state) {
          dispatch(setBoard(state))
          switch (gameStatus) {
            case 'won':
              return dispatch(setWon())

            case 'lost':
              return dispatch(setLost())

            default:
              return dispatch(setPlaying())
          }
        }
      } else {
        setLocalDailyWord(word)
        setLocalGameState('playing')
        removeLocalWordleBoard()
      }
    }
    if (word) fetchBoard()
  }, [word])

  useEffect(() => {
    const user = getLocalLoggedUser()
    console.log(user)
    if (user) {
      const sessionExists = sessionService.verifySession(user.token)
      if (sessionExists) {
        setToken(user.token)
        dispatch(setUser(user))
      } else {
        removeLocalLoggedUser()
        setLocalGameState('playing')
      }
    }
  }, [])

  if (!word) return <div>loading</div>

  return (
    <Div100vh>
      <div className='flex h-full flex-col'>
        <Header />
        <Notification />
        <div className='short:pb-2 flex grow flex-col justify-center pb-6'>
          <Board word={word} />
        </div>
        <Keyboard />
        <div className='short:pb-2 short:pt-2 mx-auto flex w-full grow flex-col px-1 pb-8 pt-2 sm:px-6 md:max-w-7xl lg:px-8'></div>
      </div>
      <Modals />
    </Div100vh>
  )
}

export default App
