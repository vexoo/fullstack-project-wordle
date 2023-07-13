import { Formik, Form, Field, ErrorMessage } from 'formik'
import { TextField } from '@mui/material'
import { securityQuestions } from '../../util/config'
import {
  securityAnswerPlaceholder,
  securityQuestionPlaceholder
} from '../../util/strings'

const SecurityQuestion = ({ values }) => {
  return (
    <div className='flex justify-center'>
      <div className='grid w-56 grid-cols-1 gap-1'>
        <Field
          as='select'
          name='securityQuestion'
          className='block w-full border border-gray-300'
        >
          <option value=''>{securityQuestionPlaceholder}</option>
          {securityQuestions.map((question, index) => (
            <option key={index} value={question}>
              {question}
            </option>
          ))}
        </Field>
        {values.securityQuestion && (
          <div>
            <Field
              type='text'
              name='answer'
              className='block w-full border border-gray-300 p-2'
              placeholder={securityAnswerPlaceholder}
            />
            <div className='error'>
              <ErrorMessage
                name='answer'
                component='div'
                className='text-red-500'
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SecurityQuestion
