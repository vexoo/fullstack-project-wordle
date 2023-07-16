import { useDispatch } from 'react-redux'
import securityQuestionService from '../../services/securityQuestion'
import { setToken } from '../../util/config'
import { setNotification } from '../../reducers/notificationReducer'
import { continueButtonText } from '../../util/strings'
import { Formik, Form } from 'formik'
import Button from '../Button'
import InputField from '../InputForm/InputField'

const SecurityAnswerInputForm = ({ foundUser, setShowResetForm, question }) => {
  const dispatch = useDispatch()

  const onSubmit = async (values, { resetForm }) => {
    try {
      const { answer } = values
      const response = await securityQuestionService.checkAnswer(foundUser, answer)
      if (response) {
        setToken(response.token)
        setShowResetForm(true)
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
          answer: ''
        }}
        onSubmit={onSubmit}
      >
        <Form>
          <p className='mb-5 text-sm text-gray-500 dark:text-gray-300'>
            <strong>{question} </strong>
          </p>
          <InputField name='answer' label='Your answer' />
          <div className='mt-5'>
            <Button text={continueButtonText} type='submit' />
          </div>
        </Form>
      </Formik>
    </div>
  )
}

export default SecurityAnswerInputForm
