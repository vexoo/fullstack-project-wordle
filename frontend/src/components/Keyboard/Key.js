import '../../styles/Keyboard/Keyboard.css'
import '../../styles/colors.css'

import { useContext, useEffect } from 'react'
import { wordLength } from '../../util/config'
import { KeyBoardColorContext } from '../../contexts/KeyboardColorContext'
import { isEnterOrClear, copyArray, joinWord } from '../../util/helpers'
import wordService from '../../services/words'
import { useSelector, useDispatch } from 'react-redux'
import {
  increaseColumn,
  letterPress,
  reduceColumn,
  setBoard,
  resetColumn,
  clearPress,
  enterPress
} from '../../reducers/boardReducer'

const Key = ({ keyValue }) => {
  const dispatch = useDispatch()

  const { board, currentRow, currentColumn } = useSelector(state => state.board)
  const { greenKeys, orangeKeys, greyKeys } = useContext(KeyBoardColorContext)
  const { playing, won, lost } = useSelector(state => state.gameState)

  const handleLetter = keyValue => {
    console.log('current column', currentColumn)
    if (currentColumn < wordLength) {
      dispatch(letterPress(keyValue))
    }
  }

  const handleEnter = async () => {
    console.log('current row', currentRow)
    console.log('current column', currentColumn)
    if (currentColumn === wordLength) {
      const word = joinWord(board[currentRow])
      const exists = wordService.checkWord(word)
      if (exists) {
        dispatch(enterPress())
        console.log('current row', currentRow)
        console.log('current column', currentColumn)
      } else {
        console.log('word not found')
      }
    }
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
      if (event.repeat || !playing) return

      const key = event.key.toLowerCase()
      console.log(key)
      if (key === 'backspace') return handleClear()
      if (key === 'enter') return handleEnter()
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
