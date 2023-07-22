import { useContext } from 'react'
import { useSelector } from 'react-redux'
import { KeyBoardColorContext } from '../../contexts/KeyboardColorContext'
import { isEnterOrClear } from '../../util/helpers'

const Key = ({ keyValue, handleLetter, handleEnter, handleClear }) => {
  const { greenKeys, yellowKeys, grayKeys } = useContext(KeyBoardColorContext)
  const { playing } = useSelector(state => state.gameState)

  const handleKeyPress = keyValue => {
    if (!playing) return
    if (keyValue === 'enter') handleEnter()
    else if (keyValue === 'clear') handleClear()
    else handleLetter(keyValue)
  }

  const getKeyBackgroundColor = key => {
    if (greenKeys.has(key)) return 'bg-[#538d4e]'
    if (yellowKeys.has(key)) return 'bg-[#b59f3b]'
    if (grayKeys.has(key)) return 'bg-zinc-600 dark:bg-zinc-700'
    return ' shadowed bg-slate-400 dark:bg-gray-500'
  }

  return (
    <button
      id={`${keyValue}-key`}
      className={`short:h-12 xshort:h-10 xshort:w-10 xxshort:h-8 xxshort:w-8 mx-0.5 flex h-14 cursor-pointer select-none items-center justify-center rounded text-xs font-bold dark:text-white
			${getKeyBackgroundColor(keyValue)}`}
      onClick={() => handleKeyPress(keyValue)}
      style={{
        width: isEnterOrClear(keyValue) ? '77px' : '55px'
      }}
    >
      <p className='text-lightgray-500 font-bold uppercase'>{keyValue}</p>
    </button>
  )
}

export default Key
