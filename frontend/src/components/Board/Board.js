import '../../styles/Board/Board.css'

import { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { KeyBoardColorContext } from '../../contexts/KeyboardColorContext'
import { tryAmount } from '../../util/config'
import { countOccurrences } from '../../util/helpers'
import {
  increaseColumn,
  letterPress,
  reduceColumn,
  setBoard
} from '../../reducers/boardReducer'
import { setLost, setWon } from '../../reducers/gameStateReducer'

const Board = ({ word }) => {
  const dispatch = useDispatch()
  const { board, currentRow, currentColumn } = useSelector(state => state.board)
  const { greenKeys, orangeKeys, greyKeys } = useContext(KeyBoardColorContext)
  const { playing, won } = useSelector(state => state.gameState)

  const letters = word.split('')

  useEffect(() => {
    if (currentRow > 0) checkGameState()
    // eslint-disable-next-line
  }, [currentRow])

  const checkGameState = () => {
    if (winCondition()) {
      dispatch(setWon())
    } else if (loseCondition()) {
      dispatch(setLost())
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
    const letterCountInWord = countOccurrences(letters, letter)

    switch (true) {
      case row >= currentRow:
        return styleSheet + 'cell-black'

      case letter === letters[col]:
        greenKeys.add(letter)
        return styleSheet + 'cell-green'

      case letters.includes(letter) && letterCountInWord > 1:
      case letters.includes(letter) &&
        letterCountInWord === 1 &&
        firstRowOccurrence(letter, row, col):
        orangeKeys.add(letter)
        return styleSheet + 'cell-orange'

      default:
        greyKeys.add(letter)
        return styleSheet + 'cell-darkgrey'
    }
  }

  const firstRowOccurrence = (letter, row, col) => {
    for (let c = 0; c < col; c++) {
      if (board[row][c] === letter) {
        return false
      }
    }
    return true
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
