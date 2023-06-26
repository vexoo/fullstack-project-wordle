import '../../styles/colors.css'

import { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { KeyBoardColorContext } from '../../contexts/KeyboardColorContext'
import { clearPress, enterHandler, letterPress } from '../../reducers/boardReducer'
import { isAnyModalOpen } from '../../reducers/modalReducer'
import { wordLength } from '../../util/config'
import { isEnterOrClear } from '../../util/helpers'

const Key = ({ keyValue }) => {
  const dispatch = useDispatch()
  const isModalOpen = useSelector(isAnyModalOpen)
  const { currentColumn } = useSelector(state => state.board)
  const { greenKeys, orangeKeys, greyKeys } = useContext(KeyBoardColorContext)
  const { playing } = useSelector(state => state.gameState)

  const handleLetter = keyValue => {
    if (currentColumn < wordLength) {
      dispatch(letterPress(keyValue))
    }
  }

  const handleEnter = () => {
    if (currentColumn !== 5) return
    dispatch(enterHandler())
  }

  const handleClear = () => {
    if (currentColumn - 1 >= 0) {
      dispatch(clearPress())
    }
  }

  const handleKeyPress = keyValue => {
    if (!playing) return
    if (keyValue === 'enter') handleEnter()
    else if (keyValue === 'clear') handleClear()
    else handleLetter(keyValue)
  }

  const getKeyBackgroundColor = key => {
    if (greenKeys.has(key)) return 'var(--green)'
    if (orangeKeys.has(key)) return 'var(--orange)'
    if (greyKeys.has(key)) return 'var(--darkgrey)'
    return 'var(--grey)'
  }

  useEffect(() => {
    const listener = event => {
      if (event.repeat || !playing || isModalOpen) return

      const key = event.key.toLowerCase()
      console.log(key)
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
    <button
      id={`${keyValue}-key`}
      className='short:h-12 xshort:h-10 xshort:w-10 xxshort:h-8 xxshort:w-8 mx-0.5 flex h-14 cursor-pointer select-none items-center justify-center rounded bg-slate-200 text-xs font-bold hover:bg-slate-300 active:bg-slate-400 dark:bg-slate-600 dark:text-white'
      onClick={() => handleKeyPress(keyValue)}
      style={{
        backgroundColor: getKeyBackgroundColor(keyValue),
        width: isEnterOrClear(keyValue) ? '77px' : '55px'
      }}
    >
      <p className='text-lightgray-500 font-bold uppercase'>{keyValue}</p>
    </button>
  )
}

export default Key
