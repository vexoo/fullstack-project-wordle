const SettingsToggle = ({ settingName, flag, handleFlag, description }) => {
  return (
    <>
      <div className='flex justify-between gap-4 py-3'>
        <div className='mt-2 text-left text-gray-500 dark:text-gray-300'>
          <p className='leading-none'>{settingName}</p>
          {description && (
            <p className='mt-1 text-xs text-gray-500 dark:text-gray-300'>
              {description}
            </p>
          )}
        </div>
        <div
          id={`${settingName}-toggle`}
          className={`flex h-8 w-14 shrink-0 cursor-pointer items-center rounded-full bg-gray-300 p-1 duration-300 ease-in-out 
					${flag ? 'bg-green-400' : 'bg-gray-300'}`}
          onClick={() => handleFlag(!flag)}
        >
          <div
            className={`h-6 w-6 transform cursor-pointer rounded-full bg-white shadow-md duration-300 ease-in-out 
						${flag ? 'translate-x-6' : ''}`}
          />
        </div>
      </div>
    </>
  )
}

export default SettingsToggle
