import { createContext, useState } from 'react'
import { wordLength, tryAmount } from '../util/config'

const BoardContext = createContext()

const BoardContextProvider = ({ children }) => {
  const [board, setBoard] = useState(
    new Array(tryAmount).fill(new Array(wordLength).fill(''))
  )
  const [currentRow, setCurrentRow] = useState(0)
  const [currentCol, setCurrentCol] = useState(0)

  const contextValue = {
    board,
    setBoard,
    currentRow,
    setCurrentRow,
    currentCol,
    setCurrentCol
  }

  return (
    <BoardContext.Provider value={contextValue}>
      {children}
    </BoardContext.Provider>
  )
}

export { BoardContext, BoardContextProvider }
