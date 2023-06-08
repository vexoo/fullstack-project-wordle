import '../styles/Keyboard/Keyboard.css'
import '../styles/shared/colors.css'

const keyWidth = 55
const keyHeight = keyWidth * 1.2

const keyStyle = {
  width: keyWidth,
  height: keyHeight,
  margin: 2,
  borderRadius: 5,
  backgroundColor: 'var(--grey)',
  justifyContent: 'center',
  alignItems: 'center'
}

const Key = ({ keyValue }) => {
  const isEnterOrClear = (keyValue) => {
    return keyValue === 'ENTER' || keyValue === 'CLEAR'
  }

  const handleKeyPress = (keyValue) => {
    console.log('hello')
  }

  return (
    <button
      onClick={() => handleKeyPress(keyValue)}
			style={{
				...keyStyle,
				...(isEnterOrClear(keyValue) ? { width: keyWidth * 1.4 } : {})
			}}
    >
      <p className='key-text'>{keyValue.toUpperCase()}</p>
    </button>
  )
}

export default Key
