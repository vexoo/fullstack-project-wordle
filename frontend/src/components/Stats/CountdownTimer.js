import Countdown from 'react-countdown'
import { timeUntilNextWordText } from '../../util/strings'

const calculateTimeUntilNextDay = () => {
  const currentDate = new Date()
  const currentDay = currentDate.getDate()
  const nextDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDay + 1
  )
  return nextDay - currentDate
}

const CountdownTimer = () => {
  const timeUntilNextDay = calculateTimeUntilNextDay()

  return (
    <div className='mt-5 items-center justify-center text-center dark:text-white sm:mt-6'>
      <div className=''>
        <h1>{timeUntilNextWordText}: </h1>
        <Countdown
          className='text-lg font-medium text-gray-900 dark:text-gray-100'
          date={Date.now() + timeUntilNextDay}
          daysInHours={true}
        />
      </div>
    </div>
  )
}

export default CountdownTimer
