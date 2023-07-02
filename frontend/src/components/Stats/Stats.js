import StatsBar from './StatsBar'
import GuessChart from './GuessChart'
import CountdownTimer from './CountdownTimer'
import { useDispatch, useSelector } from 'react-redux'
import {
  setLoginModalOpen,
  onClose,
  setSignUpModalOpen
} from '../../reducers/modalReducer'

const Stats = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const handleLoginTransition = () => {
    dispatch(onClose())
    dispatch(setLoginModalOpen())
  }

  const handleSignUpTransition = () => {
    dispatch(onClose())
    dispatch(setSignUpModalOpen())
  }

  if (!user) {
    return (
      <div className='list-disc pl-4 text-base text-gray-500 dark:text-gray-300'>
        <p className='text-left'>Looks like you aren't logged in.</p>
        <button
          className='float-left rounded font-bold text-white underline'
          onClick={handleLoginTransition}
        >
          Log in
        </button>
        <p className='text-left'>{'\u00A0'}to track your stats.</p>
        <p className='mt-4 text-left'>Don't have an account yet?</p>
        <button
          className='float-left rounded font-bold text-white underline'
          onClick={handleSignUpTransition}
        >
          Create one
        </button>
      </div>
    )
  }
  return (
    <div>
      <StatsBar />
      <GuessChart />
      <CountdownTimer />
    </div>
  )
}

export default Stats
