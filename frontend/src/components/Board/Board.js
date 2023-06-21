import '../../styles/Board/Board.css'

import { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { KeyBoardColorContext } from '../../contexts/KeyboardColorContext'
import { tryAmount } from '../../util/config'
import { countOccurrences } from '../../util/helpers'
import { setLost, setWon } from '../../reducers/gameStateReducer'
import { setWinStats, setLossStats } from '../../reducers/userReducer'

const Board = ({ word }) => {
  const dispatch = useDispatch()
  const { board, currentRow } = useSelector(state => state.board)
  const { greenKeys, orangeKeys, greyKeys } = useContext(KeyBoardColorContext)
  const user = useSelector(state => state.user)

  const letters = word.split('')

  useEffect(() => {
    if (currentRow > 0) checkGameState()
    // eslint-disable-next-line
  }, [currentRow])

  const checkGameState = () => {
    console.log(user)

    if (winCondition()) {
      dispatch(setWon())
      dispatch(setWinStats(currentRow - 1))
    } else if (loseCondition()) {
      dispatch(setLost())
      dispatch(setLossStats())
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
        isFirstRowOccurrence(letter, row, col):
        orangeKeys.add(letter)
        return styleSheet + 'cell-orange'

      default:
        greyKeys.add(letter)
        return styleSheet + 'cell-darkgrey'
    }
  }

  const isFirstRowOccurrence = (letter, row, col) => {
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
