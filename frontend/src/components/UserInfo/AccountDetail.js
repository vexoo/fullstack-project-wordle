const AccountDetail = ({ label, detail }) => {
  return (
    <div className='flex justify-between gap-4 py-10'>
      <div className='ml-10 text-left text-gray-500 dark:text-gray-300'>
        <p className='text-lg leading-none'>
          <strong>{label}: </strong>
        </p>
      </div>
      <div className='mr-10 text-left text-gray-500 dark:text-gray-300'>
        <p className='text-lg leading-none'>{detail}</p>
      </div>
    </div>
  )
}

export default AccountDetail
