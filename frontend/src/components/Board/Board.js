import { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { KeyBoardColorContext } from '../../contexts/KeyboardColorContext'
import { handleLoss, handleWin } from '../../reducers/gameStateReducer'

import { tryAmount } from '../../util/config'
import { countOccurrences } from '../../util/helpers'

const Board = ({ word }) => {
  const dispatch = useDispatch()
  const { board, currentRow } = useSelector(state => state.board)
  const { playing } = useSelector(state => state.gameState)
  const { greenKeys, yellowKeys, grayKeys } = useContext(KeyBoardColorContext)

  const letters = word.split('')

  useEffect(() => {
    const checkGameState = () => {
      if (winCondition()) {
        dispatch(handleWin())
      } else if (loseCondition()) {
        dispatch(handleLoss())
      }
    }
    const winCondition = () => {
      return board[currentRow - 1].every((letter, i) => letter === letters[i])
    }
    const loseCondition = () => {
      return currentRow === tryAmount
    }

    if (currentRow > 0 && playing) checkGameState()
  }, [currentRow])

  const handleBackgroundColor = (row, col) => {
    const letter = board[row][col]
    const styleSheet =
      'xxshort:w-12 xxshort:h-12 short:text-2xl short:w-14 short:h-14 w-16 h-16 mr-1 border-solid border-2 border-slate-300 dark:border-slate-700 flex items-center justify-center mx-0.5 text-4xl font-bold dark:text-white '
    const letterCountInWord = countOccurrences(letters, letter)

    switch (true) {
      case row >= currentRow:
        return styleSheet

      case letter === letters[col]:
        greenKeys.add(letter)
        return styleSheet + 'bg-[#538d4e] cell-reveal green'

      case letters.includes(letter) && letterCountInWord > 1:
      case letters.includes(letter) &&
        letterCountInWord === 1 &&
        (!rowHasGreen(row) || isFirstRowOccurrence(letter, row, col)):
        yellowKeys.add(letter)
        return styleSheet + 'bg-[#b59f3b] cell-reveal yellow'

      default:
        grayKeys.add(letter)
        return styleSheet + 'bg-zinc-500 dark:bg-zinc-700 cell-reveal gray'
    }
  }

  const isFirstRowOccurrence = (letter, row, col) => {
    let result = true
    board[row].slice(0, col).forEach(cellLetter => {
      if (cellLetter === letter) {
        result = false
      }
    })
    return result
  }

  const rowHasGreen = row => {
    let result = false
    board[row].forEach((cellLetter, c) => {
      if (cellLetter === letters[c]) {
        result = true
      }
    })
    return result
  }

  const handleBounceAnimation = (row, col) => {
    if (board[row][col] !== '') return 'cell-fill'
    else return ''
  }

  return (
    <div className='mt-6 self-stretch' id='board'>
      {board.map((row, i) => (
        <div className='mt-1 flex flex-row justify-center' key={`row-${i}`}>
          {row.map((cell, j) => (
            <div
              className={handleBackgroundColor(i, j)}
              key={`cell-${i}-${j}`}
              id={`cell-${i}-${j}`}
              style={{ animationDelay: `${j * 250}ms` }}
            >
              <p
                className={`short:text-2xl cell-fix text-4xl font-bold uppercase dark:text-white 
								${handleBounceAnimation(i, j)}`}
              >
                {cell}
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default Board
