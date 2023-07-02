import { useSelector } from 'react-redux'

const StatisticItem = ({ label, value }) => {
  return (
    <div className='m-1 w-1/4 items-center justify-center dark:text-white'>
      <div className='text-3xl font-bold'>{value}</div>
      <div className='text-xs uppercase'>{label}</div>
    </div>
  )
}

const StatsBar = () => {
  const user = useSelector(state => state.user)

  const calculateWinPercentage = () => {
    return user.played > 0
      ? `${((user.won / user.played) * 100).toFixed(0)}%`
      : '0%'
  }
  return (
    <div className='my-2 flex justify-center'>
      <StatisticItem label='played' value={user.played} />
      <StatisticItem label='win %' value={calculateWinPercentage()} />
      <StatisticItem label='current streak' value={user.currStreak} />
      <StatisticItem label='max streak' value={user.maxStreak} />
    </div>
  )
}

export default StatsBar
