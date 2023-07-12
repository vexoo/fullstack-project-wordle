import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import loginService from '../../services/login'
import userService from '../../services/user'
import securityQuestionService from '../../services/securityQuestion'
import InputForm from '../InputForm'
import { setToken } from '../../util/config'
import { setLocalLoggedUser } from '../../util/localStorageHelper'
import { setUser } from '../../reducers/userReducer'
import { onClose } from '../../reducers/modalReducer'
import { setNotification } from '../../reducers/notificationReducer'
import { signUpButtonText, signupNotification } from '../../util/strings'

const securityQuestions = [
  'What is your favorite color?',
  'What is the name of your first pet?'
]

const DropdownMenu = ({
  answer,
  setAnswer,
  selectedQuestion,
  setSelectedQuestion
}) => {
  const handleQuestionChange = event => {
    setSelectedQuestion(event.target.value)
  }

  const handleAnswerChange = event => {
    setAnswer(event.target.value)
  }

  return (
    <div className='grid grid-cols-2 gap-4'>
      <select
        className='block w-full rounded-md border border-gray-300 px-4 py-2'
        value={selectedQuestion}
        onChange={handleQuestionChange}
      >
        <option value=''>Security question</option>
        {securityQuestions.map((question, index) => (
          <option key={index} value={question}>
            {question}
          </option>
        ))}
      </select>
      <input
        type='text'
        className='block w-full rounded-md border border-gray-300 p-2'
        value={answer}
        onChange={handleAnswerChange}
        placeholder='Enter your answer'
      />
    </div>
  )
}

const SignUp = () => {
  const dispatch = useDispatch()
  const { isSignUpModalOpen } = useSelector(state => state.modals)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [selectedQuestion, setSelectedQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const usernameRef = useRef(null)

  const onSubmit = async event => {
    event.preventDefault()

    try {
      const newUser = await userService.create({
        username,
        password
      })
      const user = await loginService.login({
        username,
        password
      })
      const securityQuestion = await securityQuestionService.create(
        username,
        selectedQuestion,
        answer
      )
      setLocalLoggedUser(user)
      setToken(user.token)
      dispatch(setUser(user))
      setUsername('')
      setPassword('')
      dispatch(onClose())
      dispatch(setNotification(signupNotification, 3))
    } catch (e) {
      console.log(e)
      dispatch(setNotification(e.response.data.error, 3, true))
    }
  }

  useEffect(() => {
    if (isSignUpModalOpen) {
      usernameRef.current.focus()
    }
  }, [isSignUpModalOpen])

  return (
    <div>
      <InputForm
        onSubmit={onSubmit}
        usernameRef={usernameRef}
        setUsername={setUsername}
        setPassword={setPassword}
        buttonText={signUpButtonText}
      />
      <div className='mt-5'>
        <DropdownMenu
          answer={answer}
          setAnswer={setAnswer}
          selectedQuestion={selectedQuestion}
          setSelectedQuestion={setSelectedQuestion}
        />
      </div>
    </div>
  )
}

export default SignUp
