import '../styles/Keyboard/Keyboard.css'
import '../styles/colors.css'

import { useContext, useEffect } from 'react'
import { BoardContext } from '../contexts/BoardContext'
import { wordLength } from '../util/config'

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

  const isEnterOrClear = (keyValue) => {
    return keyValue === 'ENTER' || keyValue === 'CLEAR'
  }

  const handleKeyPress = (keyValue) => {
    if (currentCol < wordLength) {
      const boardCopy = copyArray(board)
      boardCopy[currentRow][currentCol] = keyValue
      setBoard(boardCopy)
      setCurrentCol(currentCol + 1)
    }
  }
  useEffect(() => {
    const listener = (event) => {
      if (event.repeat) return

      const key = event.key.toLowerCase()
      // To do: handle enter and backspace
			//if (key === 'backspace') return something
      //if (key === 'enter') return something
      if (key.length === 1 && key >= 'a' && key <= 'z') handleKeyPress(key)
    }

    window.addEventListener('keydown', listener)
    return () => {
      window.removeEventListener('keydown', listener)
    }
  })

  return (
    <button
      onClick={() => handleKeyPress(keyValue)}
      style={{
        ...keyStyle,
        ...(isEnterOrClear(keyValue) ? { width: keyWidth * 1.4 } : {})
      }}
    >
      <p className='key-text'>{keyValue}</p>
    </button>
  )
}

export default Key
