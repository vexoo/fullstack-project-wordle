import '../../styles/Board/Board.css'

import { useContext, useEffect } from 'react'
import { BoardContext } from '../../contexts/BoardContext'
import { KeyBoardColorContext } from '../../contexts/KeyboardColorContext'
import { GameStateContext } from '../../contexts/GameStateContext'
import { currentState, tryAmount } from '../../util/config'

const Board = ({ word }) => {
  const { board, currentRow } = useContext(BoardContext)
  const { greenKeys, orangeKeys, greyKeys } = useContext(KeyBoardColorContext)
  const { gameState, changeGameState } = useContext(GameStateContext)

  const letters = word.split('')

  useEffect(() => {
    if (currentRow > 0) checkGameState()
  }, [currentRow])

  const checkGameState = () => {
    if (winCondition()) {
      changeGameState(currentState.WON)
    } else if (loseCondition()) {
      changeGameState(currentState.LOST)
    }
  }

  const winCondition = () => {
    return board[currentRow - 1].every((letter, i) => letter === letters[i])
  }

  const loseCondition = () => {
    return currentRow === tryAmount
  }

  const handleBackgroundColor = (row, col) => {
    const letter = board[row][col]
    const styleSheet = 'cell '

    if (row >= currentRow) return styleSheet + 'cell-black'
    if (letter === letters[col]) {
      greenKeys.add(letter)
      return styleSheet + 'cell-green'
    }
    if (letters.includes(letter)) {
      orangeKeys.add(letter)
      return styleSheet + 'cell-orange'
    }
    greyKeys.add(letter)
    return styleSheet + 'cell-darkgrey'
  }

  return (
    <div className='board'>
      {board.map((row, i) => (
        <div className='row' key={`row-${i}`}>
          {row.map((cell, j) => (
            <div className={handleBackgroundColor(i, j)} key={`cell-${i}-${j}`}>
              <p className='cell-text'>{cell}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default Board
