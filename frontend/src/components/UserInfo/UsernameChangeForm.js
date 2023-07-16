import { useDispatch } from 'react-redux'
import Button from '../Button'
import { changeUsername } from '../../reducers/userReducer'
import { Formik, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import InputField from '../InputForm/InputField'

const usernameValidationSchema = Yup.object({
  newUsername: Yup.string().required('Username can not be empty')
})

const UsernameChangeForm = ({ isEditingUsername, setIsEditingUsername }) => {
  const dispatch = useDispatch()

  const handleUsernameUpdate = (values, { resetForm }) => {
    if (window.confirm(`Confirm username change to '${values.newUsername}'`)) {
      dispatch(changeUsername(values.newUsername))
      resetForm()
      setIsEditingUsername(false)
    }
  }

  return (
    <div>
      {isEditingUsername ? (
        <Formik
          initialValues={{ newUsername: '' }}
          onSubmit={handleUsernameUpdate}
          validationSchema={usernameValidationSchema}
        >
          {({ isValid }) => (
            <Form className='flex'>
              <div className='flex flex-col items-start'>
                <InputField
                  name='newUsername'
                  label='New username'
                  id='new-username-form'
                />
                <ErrorMessage
                  name='newUsername'
                  component='div'
                  className='text-red-500'
                />
                <Button
                  id='save-newusername-button'
                  className={`mt-2 px-4 py-2 ${!isValid ? 'opacity-50' : ''}`}
                  type='submit'
                  text={'save'}
                />
              </div>
            </Form>
          )}
        </Formik>
      ) : null}
    </div>
  )
}

export default UsernameChangeForm
