import '../styles/Header/Header.css'

const Header = () => {
  const handleClick = (buttonName) => {
    console.log(`${buttonName} clicked`)
  }

  return (
    <header className='header'>
      <div className='left-container'>
        <button className='button' onClick={handleClick('help')}>
          Help
        </button>
      </div>
      <div className='title-container'>
        <h1 className='title'>Wordle</h1>
      </div>
      <div className='right-container'>
        <button className='button' onClick={handleClick('stats')}>
          Stats
        </button>
        <button className='button' onClick={handleClick('settings')}>
          Settings
        </button>
      </div>
    </header>
  )
}

/*
  return (
    <header className='header'>
      <div className='help-container'>
        <button className='button' onClick={handleSettingsClick}>
          Help
        </button>
      </div>
      <h1 className='title'>Wordle</h1>
      <div className='button-container'>
        <button className='button' onClick={handleSettingsClick}>
          Stats
        </button>
        <button className='button' onClick={handleSettingsClick}>
          Settings
        </button>
      </div>
    </header>
  )
	*/

export default Header
