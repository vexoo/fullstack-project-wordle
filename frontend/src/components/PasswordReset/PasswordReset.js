import { useState } from 'react'
import UsernameInputForm from './UsernameInputForm'
import SecurityAnswerInputForm from './SecurityAnswerInputForm'
import PasswordResetInputForm from './PasswordResetInputForm'

const PasswordReset = () => {
  const [foundUser, setFoundUser] = useState(null)
  const [question, setQuestion] = useState('')
  const [showResetForm, setShowResetForm] = useState(false)

  return (
    <div className='mt-3'>
      {!foundUser ? (
        <UsernameInputForm setFoundUser={setFoundUser} setQuestion={setQuestion} />
      ) : !showResetForm ? (
        <SecurityAnswerInputForm
          foundUser={foundUser}
          setShowResetForm={setShowResetForm}
          question={question}
        />
      ) : (
        <PasswordResetInputForm foundUser={foundUser} />
      )}
    </div>
  )
}

export default PasswordReset
