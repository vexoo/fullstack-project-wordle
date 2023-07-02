const Help = () => {
  return (
    <ul className='list-disc pl-4 text-base text-gray-500 dark:text-gray-300'>
      <p className='text-left'>Guess the word in 6 tries.</p>
      <li className='mt-4 text-left'>Each guess must be a valid 5-letter word.</li>
      <li className='text-left'>
        The color of the tiles will change to show how close your guess was to the
        word.
      </li>
      <p className='mt-5 text-left text-lg font-bold'>Examples</p>
      <img
        src={process.env.PUBLIC_URL + '/images/example1.png'}
        alt='First Example'
      />
      <p className='text-left text-base'>
        <strong>W</strong> is in the word and in the correct spot
      </p>

      <img
        className='mt-5'
        src={process.env.PUBLIC_URL + '/images/example2.png'}
        alt='Second Example'
      />
      <p className='text-left text-base'>
        <strong>I</strong> is in the word but in the wrong spot
      </p>

      <img
        className='mt-5'
        src={process.env.PUBLIC_URL + '/images/example3.png'}
        alt='Third'
      />
      <p className='text-left text-base'>No letters are found in the word</p>

      <p className='mt-6 text-base italic text-gray-500 dark:text-gray-300'>
        Wordle-clone made for the Fullstack-project course of University of Helsinki
      </p>
    </ul>
  )
}

export default Help
