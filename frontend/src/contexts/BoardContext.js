import { createContext, useContext, useState } from 'react'
import { wordLength, tryAmount } from '../util/config'

const BoardContext = createContext()

const BoardContextProvider = ({ children }) => {
  const [board, setBoard] = useState(
    new Array(tryAmount).fill(new Array(wordLength).fill(''))
  )
  const [currentRow, setCurrentRow] = useState(0)
  const [currentCol, setCurrentCol] = useState(0)

  const setBoardValue = newBoard => {
    setBoard(newBoard)
  }

  const setCurrentRowValue = newCurrentRow => {
    setCurrentRow(newCurrentRow)
  }

  const setCurrentColValue = newCurrentCol => {
    setCurrentCol(newCurrentCol)
  }

  const contextValue = {
    board,
    setBoard: setBoardValue,
    currentRow,
    setCurrentRow: setCurrentRowValue,
    currentCol,
    setCurrentCol: setCurrentColValue
  }

  return (
    <BoardContext.Provider value={contextValue}>{children}</BoardContext.Provider>
  )
}

export const useBoardContext = () => {
  const boardValues = useContext(BoardContext)
  return boardValues
}

export { BoardContext, BoardContextProvider }
