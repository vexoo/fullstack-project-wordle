import { useDispatch } from 'react-redux'
import securityQuestionService from '../../services/securityQuestion'
import { setNotification } from '../../reducers/notificationReducer'
import { continueButtonText } from '../../util/strings'
import { Formik, Form } from 'formik'
import Button from '../Button'
import InputField from '../InputForm/InputField'

const UsernameInputForm = ({ setFoundUser, setQuestion }) => {
  const dispatch = useDispatch()

  const onSubmit = async (values, { resetForm }) => {
    try {
      const { username } = values
      const response = await securityQuestionService.findUser(username)
      if (response) {
        setQuestion(response.question)
        setFoundUser(username)
        resetForm()
      }
    } catch (e) {
      dispatch(setNotification(e.response.data.error, 3, true))
    }
  }

  return (
    <div>
      <Formik
        initialValues={{
          username: '',
          answer: '',
          newPassword: '',
          confirmNewPassword: ''
        }}
        onSubmit={onSubmit}
      >
        <Form>
          <InputField name='username' label='Enter your username' />
          <div className='mt-5'>
            <Button text={continueButtonText} type='submit' />
          </div>
        </Form>
      </Formik>
    </div>
  )
}

export default UsernameInputForm
