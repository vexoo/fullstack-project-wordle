import { useSelector } from 'react-redux'
import GuessChartValue from './GuessChartValue'

const GuessChart = () => {
  const user = useSelector(state => state.user)
  const winDistribution = user.guessDistribution
  const maxValue = Math.max(...winDistribution, 1)

  return (
    <div className='justify-left m-2 columns-1 text-sm dark:text-white'>
      {winDistribution.map((value, i) => (
        <GuessChartValue
          key={i}
          index={i}
          size={90 * (value / maxValue)}
          label={String(value)}
        />
      ))}
    </div>
  )
}
export default GuessChart
