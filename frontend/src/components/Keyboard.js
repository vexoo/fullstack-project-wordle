import '../styles/Keyboard/Keyboard.css'

import Key from './Key'

const keys = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['ENTER', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'CLEAR']
]

const Keyboard = () => {
  return (
    <div className='keyboard'>
      {keys.map((keyRow, i) => (
        <div className='key-row' key={i}>
          {keyRow.map((key) => (
            <Key keyValue={key} />
          ))}
        </div>
      ))}
    </div>
  )
}

export default Keyboard
