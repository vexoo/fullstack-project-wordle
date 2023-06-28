import { TextField, Button } from '@mui/material'

const InputForm = ({
  onSubmit,
  usernameRef,
  setUsername,
  setPassword,
  buttonText
}) => {
  return (
    <div className='mt-5'>
      <form onSubmit={onSubmit}>
        <div>
          <TextField
            className='bg-white'
            label='username'
            variant='filled'
            onChange={({ target }) => setUsername(target.value)}
            inputRef={usernameRef}
          />
        </div>
        <div>
          <TextField
            className='bg-white'
            label='password'
            variant='filled'
            type='password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <div className='mt-5'>
          <Button variant='contained' type='submit' sx={{backgroundColor: 'gray'}}>
            {buttonText}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default InputForm
