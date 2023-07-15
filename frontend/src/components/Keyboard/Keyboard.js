import { keys } from '../../util/config'
import Key from './Key'

const Keyboard = () => {
  return (
    <div className='mt-16 flex flex-col items-center' id='keyboard'>
      {keys.map((keyRow, i) => (
        <div className='mb-1 flex justify-center' key={`row-${i}`}>
          {keyRow.map((keyValue, j) => (
            <Key keyValue={keyValue} key={`cell-${i}-${j}`} />
          ))}
        </div>
      ))}
    </div>
  )
}

export default Keyboard
