import '../../styles/Board/Board.css'

import { useContext } from 'react'
import { BoardContext } from '../../contexts/BoardContext'
import { KeyBoardColorContext } from '../../contexts/KeyboardColorContext'

const Board = ({ word }) => {
  const { board, currentRow } = useContext(BoardContext)
  const { greenKeys, orangeKeys, greyKeys } = useContext(KeyBoardColorContext)

  const letters = word.split('')

  const getBackgroundColor = (row, col) => {
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
            <div className={getBackgroundColor(i, j)} key={`cell-${i}-${j}`}>
              <p className='cell-text'>{cell}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default Board
