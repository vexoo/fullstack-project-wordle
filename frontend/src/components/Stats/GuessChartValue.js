const GuessChartValue = ({ index, size, label, isLatestResult }) => {
  return (
    <div className='justify-left m-1 flex'>
      <div className='w-2 items-center justify-center'>{index + 1}</div>
      <div className='ml-2 w-full'>
        <div
          style={{ width: `${8 + size}%` }}
          className={`p-0.5 text-center text-xs font-medium text-blue-100
					${isLatestResult ? 'bg-green-600' : 'bg-gray-600'}`}
        >
          {label}
        </div>
      </div>
    </div>
  )
}

export default GuessChartValue
