import { useSelector } from 'react-redux'
import GuessChartValue from './GuessChartValue'

const GuessChart = () => {
  const user = useSelector(state => state.user)
  const { currentRow } = useSelector(state => state.board)
  const { won } = useSelector(state => state.gameState)

  const winDistribution = user.guessDistribution
  const maxValue = Math.max(...winDistribution, 1)

  const handleLatestResult = index => {
    if (won && index === currentRow - 1) {
      return true
    } else return false
  }
  return (
    <div className='justify-left m-2 columns-1 text-sm dark:text-white'>
      {winDistribution.map((value, i) => (
        <GuessChartValue
          key={i}
          index={i}
          size={90 * (value / maxValue)}
          label={String(value)}
          isLatestResult={handleLatestResult(i)}
        />
      ))}
    </div>
  )
}
export default GuessChart
