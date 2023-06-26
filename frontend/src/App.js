import './App.css'

import { default as GraphemeSplitter } from 'grapheme-splitter'
import { useEffect, useState } from 'react'
import Div100vh from 'react-div-100vh'
import { useDispatch, useSelector } from 'react-redux'

import Board from './components/Board'
import Keyboard from './components/Keyboard'
import wordService from './services/words'
import sessionService from './services/session'
import Modals from './components/Modals/'
import { SettingsModal } from './components/Modals/SettingsModal'

import Header from './components/Header'

import { setUser } from './reducers/userReducer'
import { setBoard } from './reducers/boardReducer'

import { setToken } from './util/config'

import {
  onClose,
  setHelpModalOpen,
  setLoginModalOpen,
  setSettingsModalOpen,
  setSignUpModalOpen,
  setStatsModalOpen,
  setUserModalOpen
} from './reducers/modalReducer'

import {
  getLocalDailyWord,
  getLocalWordleBoard,
  getLocalLoggedUser,
  setLocalDailyWord,
  removeLocalWordleBoard,
  removeLocalLoggedUser,
  setLocalTheme,
  getLocalTheme
} from './util/localStorageHelper'

function App() {
  const dispatch = useDispatch()
  const [word, setWord] = useState(null)
  const {
    isHelpModalOpen,
    isSettingsModalOpen,
    isStatsModalOpen,
    isLoginModalOpen,
    isSignUpModalOpen,
    isUserModalOpen
  } = useSelector(state => state.modals)

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

  /*
  useEffect(() => {
    const getDailyWord = () => {
      const currentDate = new Date().toISOString().split('T')[0]
      const seed = parseInt(currentDate.replace(/-/g, ''))
      const totalCount = words.length
      const randomIndex = seed % totalCount
      setWord(words[randomIndex])
    }

    getDailyWord()
  }, [])
	*/

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
    <Div100vh>
      <div className='flex h-full flex-col'>
        <Header />
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

/*
          <div className="flex grow flex-col justify-center pb-6 short:pb-2">
            <Grid
              solution={solution}
              guesses={guesses}
              currentGuess={currentGuess}
              isRevealing={isRevealing}
              currentRowClassName={currentRowClass}
            />
          </div>
          <Keyboard
            onChar={onChar}
            onDelete={onDelete}
            onEnter={onEnter}
            solution={solution}
            guesses={guesses}
            isRevealing={isRevealing}
          />
          <InfoModal
            isOpen={isInfoModalOpen}
            handleClose={() => setIsInfoModalOpen(false)}
          />
          <StatsModal
            isOpen={isStatsModalOpen}
            handleClose={() => setIsStatsModalOpen(false)}
            solution={solution}
            guesses={guesses}
            gameStats={stats}
            isLatestGame={isLatestGame}
            isGameLost={isGameLost}
            isGameWon={isGameWon}
            handleShareToClipboard={() => showSuccessAlert(GAME_COPIED_MESSAGE)}
            handleShareFailure={() =>
              showErrorAlert(SHARE_FAILURE_TEXT, {
                durationMs: LONG_ALERT_TIME_MS,
              })
            }
            handleMigrateStatsButton={() => {
              setIsStatsModalOpen(false)
              setIsMigrateStatsModalOpen(true)
            }}
            isHardMode={isHardMode}
            isDarkMode={isDarkMode}
            isHighContrastMode={isHighContrastMode}
            numberOfGuessesMade={guesses.length}
          />
          <DatePickerModal
            isOpen={isDatePickerModalOpen}
            initialDate={solutionGameDate}
            handleSelectDate={(d) => {
              setIsDatePickerModalOpen(false)
              setGameDate(d)
            }}
            handleClose={() => setIsDatePickerModalOpen(false)}
          />
          <MigrateStatsModal
            isOpen={isMigrateStatsModalOpen}
            handleClose={() => setIsMigrateStatsModalOpen(false)}
          />
          <SettingsModal
            isOpen={isSettingsModalOpen}
            handleClose={() => setIsSettingsModalOpen(false)}
            isHardMode={isHardMode}
            handleHardMode={handleHardMode}
            isDarkMode={isDarkMode}
            handleDarkMode={handleDarkMode}
            isHighContrastMode={isHighContrastMode}
            handleHighContrastMode={handleHighContrastMode}
          />
          <AlertContainer />

*/

/*

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
import { words } from './util/words'

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
    const getDailyWord = () => {
      const currentDate = new Date().toISOString().split('T')[0]
      const seed = parseInt(currentDate.replace(/-/g, ''))
      const totalCount = words.length
      const randomIndex = seed % totalCount
      setWord(words[randomIndex])
    }

    getDailyWord()
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

  console.log(word)
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


*/
