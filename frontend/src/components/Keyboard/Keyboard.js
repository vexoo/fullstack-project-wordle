import { useEffect } from 'react'
import { keys } from '../../util/config'
import Key from './Key'
import { isAnyModalOpen } from '../../reducers/modalReducer'
import { useDispatch, useSelector } from 'react-redux'
import { wordLength } from '../../util/config'
import { clearPress, enterHandler, letterPress } from '../../reducers/boardReducer'

const Keyboard = () => {
  const dispatch = useDispatch()
  const isModalOpen = useSelector(isAnyModalOpen)
  const { currentColumn } = useSelector(state => state.board)
  const { playing } = useSelector(state => state.gameState)

  const handleLetter = keyValue => {
    if (currentColumn < wordLength) {
      dispatch(letterPress(keyValue))
    }
  }

  const handleEnter = () => {
    if (currentColumn !== wordLength) return
    return dispatch(enterHandler())
  }

  const handleClear = () => {
    if (currentColumn - 1 >= 0) {
      dispatch(clearPress())
    }
  }

  useEffect(() => {
    const listener = event => {
      if (event.repeat || !playing || isModalOpen) return

      const key = event.key.toLowerCase()
      if (key === 'enter') return handleEnter()
      if (key === 'backspace') return handleClear()
      if (key.length === 1 && key >= 'a' && key <= 'z') return handleLetter(key)
    }

    window.addEventListener('keydown', listener)
    return () => {
      window.removeEventListener('keydown', listener)
    }
  })

  return (
    <div className='mt-16 flex flex-col items-center' id='keyboard'>
      {keys.map((keyRow, i) => (
        <div className='mb-1 flex justify-center' key={`row-${i}`}>
          {keyRow.map((keyValue, j) => (
            <Key
              keyValue={keyValue}
              handleLetter={handleLetter}
              handleEnter={handleEnter}
              handleClear={handleClear}
              key={`cell-${i}-${j}`}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default Keyboard
