import '../../styles/Keyboard/Keyboard.css'
import '../../styles/colors.css'

import { useContext, useEffect } from 'react'
import { BoardContext } from '../../contexts/BoardContext'
import { wordLength } from '../../util/config'
import { KeyBoardColorContext } from '../../contexts/KeyboardColorContext'

const keyWidth = 55
const keyHeight = keyWidth * 1.2

const keyStyle = {
  width: keyWidth,
  height: keyHeight,
  margin: 2,
  borderRadius: 5,
  backgroundColor: 'var(--grey)',
  justifyContent: 'center',
  alignItems: 'center'
}

const copyArray = (array) => {
  const newArray = [...array.map((innerArray) => [...innerArray])]
  return newArray
}

const Key = ({ keyValue }) => {
  const {
    board,
    setBoard,
    currentRow,
    setCurrentRow,
    currentCol,
    setCurrentCol
  } = useContext(BoardContext)

  const { greenKeys, orangeKeys, greyKeys } = useContext(KeyBoardColorContext)

  const isEnterOrClear = (keyValue) => {
    return keyValue === 'ENTER' || keyValue === 'CLEAR'
  }

  const handleLetter = (keyValue) => {
    if (currentCol < wordLength) {
      const boardCopy = copyArray(board)
      boardCopy[currentRow][currentCol] = keyValue
      setBoard(boardCopy)
      setCurrentCol(currentCol + 1)
    }
  }

  const handleEnter = () => {
    if (currentCol === wordLength) {
      setCurrentCol(0)
      setCurrentRow(currentRow + 1)
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

  const handleKeyPress = (keyValue) => {
    if (keyValue === 'ENTER') handleEnter()
    else if (keyValue === 'CLEAR') handleClear()
    else handleLetter(keyValue)
  }

  const getKeyBackgroundColor = (key) => {
    if (greenKeys.has(key)) {
      return 'var(--green)'
    }
    if (orangeKeys.has(key)) {
      return 'var(--orange)'
    }
    if (greyKeys.has(key)) {
      return 'var(--darkgrey)'
    }
    return 'var(--grey)'
  }

  useEffect(() => {
    const listener = (event) => {
      if (event.repeat) return

      const key = event.key.toLowerCase()
      if (key === 'backspace') handleClear()
      if (key === 'enter') handleEnter()
      if (key.length === 1 && key >= 'a' && key <= 'z') handleKeyPress(key)
    }

    window.addEventListener('keydown', listener)
    return () => {
      window.removeEventListener('keydown', listener)
    }
  })

  //to do: change to a conditional classname implementation for .css
  return (
    <button
      onClick={() => handleKeyPress(keyValue)}
      style={{
        ...keyStyle,
        ...(isEnterOrClear(keyValue) ? { width: keyWidth * 1.4 } : {},
        { backgroundColor: getKeyBackgroundColor(keyValue) })
      }}
    >
      <p className='key-text'>{keyValue}</p>
    </button>
  )
}

export default Key
