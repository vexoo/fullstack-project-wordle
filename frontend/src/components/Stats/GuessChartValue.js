import classNames from 'classnames'

const GuessChartValue = ({ index, size, label }) => {
  /*
	const currentRowClass = classNames(
    'text-xs font-medium text-blue-100 text-center p-0.5',
    { 'bg-blue-600': isCurrentDayStatRow, 'bg-gray-600': !isCurrentDayStatRow }
  )
	*/
  return (
    <div className='justify-left m-1 flex'>
      <div className='w-2 items-center justify-center'>{index + 1}</div>
      <div className='ml-2 w-full'>
        <div
          style={{ width: `${8 + size}%` }}
          className='p-0.5 text-center text-xs font-medium text-blue-100 bg-gray-600'
        >
          {label}
        </div>
      </div>
    </div>
  )
}

export default GuessChartValue
