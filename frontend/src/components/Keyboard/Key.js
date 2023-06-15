import '../../styles/Keyboard/Keyboard.css'
import '../../styles/colors.css'

import { useContext, useEffect } from 'react'
import { BoardContext } from '../../contexts/BoardContext'
import { useGameStateContext } from '../../contexts/GameStateContext'
import { wordLength } from '../../util/config'
import { KeyBoardColorContext } from '../../contexts/KeyboardColorContext'
import { isEnterOrClear, copyArray, joinWord } from '../../util/helpers'
import wordService from '../../services/words'

const Key = ({ keyValue }) => {
  const { board, setBoard, currentRow, setCurrentRow, currentCol, setCurrentCol } =
    useContext(BoardContext)
  const { greenKeys, orangeKeys, greyKeys } = useContext(KeyBoardColorContext)
  const gameState = useGameStateContext()

  const handleLetter = keyValue => {
    if (currentCol < wordLength) {
      const boardCopy = copyArray(board)
      boardCopy[currentRow][currentCol] = keyValue
      setBoard(boardCopy)
      setCurrentCol(currentCol + 1)
    }
  }

  const handleEnter = async () => {
    if (currentCol === wordLength) {
      const word = joinWord(board[currentRow])
      const exists = await wordService.checkWord(word)
      if (exists) {
        setCurrentCol(0)
        setCurrentRow(currentRow + 1)
      } else {
        console.log('word not found')
      }
    }
  }

  const handleClear = () => {
    if (currentCol - 1 >= 0) {
      const previousCol = currentCol - 1
      const boardCopy = copyArray(board)
      boardCopy[currentRow][previousCol] = ''
      setBoard(boardCopy)
      setCurrentCol(previousCol)
    }
  }

  const handleKeyPress = keyValue => {
    if (!gameState.isPlaying) return
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
      if (event.repeat || !gameState.isPlaying) return

      const key = event.key.toLowerCase()
      if (key === 'backspace') handleClear()
      if (key === 'enter') handleEnter()
      if (key.length === 1 && key >= 'a' && key <= 'z') handleLetter(key)
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
