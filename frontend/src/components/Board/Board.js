import '../../styles/Board/Board.css'

import { useContext, useEffect } from 'react'
import { BoardContext } from '../../contexts/BoardContext'
import { KeyBoardColorContext } from '../../contexts/KeyboardColorContext'
import { useGameStateContext } from '../../contexts/GameStateContext'
import { tryAmount } from '../../util/config'
import { countOccurrences } from '../../util/helpers'

const Board = ({ word }) => {
  const { board, currentRow } = useContext(BoardContext)
  const { greenKeys, orangeKeys, greyKeys } = useContext(KeyBoardColorContext)
  const gameState = useGameStateContext()

  const letters = word.split('')

  useEffect(() => {
    if (currentRow > 0) checkGameState()
    // eslint-disable-next-line
  }, [currentRow])

  const checkGameState = () => {
    if (winCondition()) {
      gameState.setWon()
    } else if (loseCondition()) {
      gameState.setLost()
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
    const letterCount = countOccurrences(letters, letter)

    if (row >= currentRow) return styleSheet + 'cell-black'

    switch (true) {
      case letter === letters[col]:
        greenKeys.add(letter)
        return styleSheet + 'cell-green'

      case letters.includes(letter) && letterCount > 1:
      case letters.includes(letter) && letterCount === 1 && !greenKeys.has(letter):
        orangeKeys.add(letter)
        return styleSheet + 'cell-orange'

      default:
        greyKeys.add(letter)
        return styleSheet + 'cell-darkgrey'
    }
  }

  return (
    <div className='board' id='board'>
      {board.map((row, i) => (
        <div className='row' key={`row-${i}`}>
          {row.map((cell, j) => (
            <div
              className={handleBackgroundColor(i, j)}
              key={`cell-${i}-${j}`}
              id={`cell-${i}-${j}`}
            >
              <p className='cell-text'>{cell}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default Board
