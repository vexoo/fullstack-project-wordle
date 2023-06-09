import '../styles/Board/Board.css'

import { useContext } from 'react'
import { BoardContext } from '../contexts/BoardContext'

const Board = () => {
  const { board } = useContext(BoardContext)

  return (
    <div className='board'>
      {board.map((row, i) => (
        <div className='row' key={`row-${i}`}>
          {row.map((cell, j) => (
            <div className='cell' key={`cell-${i}-${j}`}>
              <p className='cell-text'>{cell}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default Board
