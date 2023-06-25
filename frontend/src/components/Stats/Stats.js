import { useDispatch, useSelector } from 'react-redux'
import '../../styles/Header/Header.css'
import '../../styles/Modal/Modal.css'

const Stats = () => {
  const dispatch = useDispatch
  const user = useSelector(state => state.user)

  console.log(user)
  return (
    <div className='modal'>
      <h1 className='h1'>Statistics </h1>
      <p>played: {user.played}</p>
      <p>
        win %: {user.played !== 0 ? ((user.won / user.played) * 100).toFixed(2) : 0}%{' '}
      </p>
      <p>Current Streak: {user.currStreak}</p>
      <p>maxStreak: {user.maxStreak}</p>
    </div>
  )
}

export default Stats
