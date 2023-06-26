import '../../styles/Keyboard/Keyboard.css'
import '../../styles/colors.css'

import { useContext, useEffect, useState } from 'react'
import { wordLength } from '../../util/config'
import { KeyBoardColorContext } from '../../contexts/KeyboardColorContext'
import { isEnterOrClear, copyArray, joinWord } from '../../util/helpers'
import { useSelector, useDispatch } from 'react-redux'
import {
  letterPress,
  clearPress,

  enterHandler
} from '../../reducers/boardReducer'
import { isAnyModalOpen } from '../../reducers/modalReducer'

const Key = ({ keyValue }) => {
  const dispatch = useDispatch()
  const isModalOpen = useSelector(isAnyModalOpen)
  const { board, currentRow, currentColumn } = useSelector(state => state.board)
  const { greenKeys, orangeKeys, greyKeys } = useContext(KeyBoardColorContext)
  const { playing } = useSelector(state => state.gameState)

  const handleLetter = keyValue => {
    if (currentColumn < wordLength) {
      dispatch(letterPress(keyValue))
    }
  }

  const handleEnter = () => {
    if (currentColumn !== 5) return
    dispatch(enterHandler())
  }

  const handleClear = () => {
    if (currentColumn - 1 >= 0) {
      dispatch(clearPress())
    }
  }

  const handleKeyPress = keyValue => {
    if (!playing) return
    if (keyValue === 'enter') handleEnter()
    else if (keyValue === 'clear') handleClear()
    else handleLetter(keyValue)
  }

  const getKeyBackgroundColor = key => {
    if (greenKeys.has(key)) return 'var(--green)'
    if (orangeKeys.has(key)) return 'var(--orange)'
    if (greyKeys.has(key)) return 'var(--darkgrey)'
    return 'var(--grey)'
  }

  useEffect(() => {
    const listener = event => {
      if (event.repeat || !playing || isModalOpen) return

      const key = event.key.toLowerCase()
      console.log(key)
      if (key === 'enter') return handleEnter()
      if (key === 'backspace') return handleClear()
      if (key.length === 1 && key >= 'a' && key <= 'z') return handleLetter(key)
    }

    window.addEventListener('keydown', listener)
    return () => {
      window.removeEventListener('keydown', listener)
    }
  })

  return (
    <button
      id={`${keyValue}-key`}
      className={isEnterOrClear(keyValue) ? 'key key-large' : 'key'}
      onClick={() => handleKeyPress(keyValue)}
      style={{ backgroundColor: getKeyBackgroundColor(keyValue) }}
    >
      <p className='key-text'>{keyValue}</p>
    </button>
  )
}

export default Key
