import '../../styles/Keyboard/Keyboard.css'

import Key from './Key'
import { keys } from '../../util/config'

const Keyboard = () => {
  return (
    <div className='keyboard'>
      {keys.map((keyRow, i) => (
        <div className='key-row' key={`row-${i}`}>
          {keyRow.map((keyValue, j) => (
            <Key keyValue={keyValue} key={`cell-${i}-${j}`} />
          ))}
        </div>
      ))}
    </div>
  )
}

export default Keyboard
