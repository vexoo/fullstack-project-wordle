const Button = ({ onClick, className, text, buttonType, ...props }) => {
  const normalButtonDefaultClass =
    'cursor-pointer rounded-md border-none bg-gray-500 px-3 py-1 text-center text-sm uppercase tracking-wide text-gray-500 text-white shadow-md dark:text-gray-300'
  const textButtonDefaultClass = 'text-x2 dark:text-white'

  const defaultClassName =
    buttonType === 'text' ? textButtonDefaultClass : normalButtonDefaultClass

  return (
    <button
      className={`${defaultClassName} ${className}`}
      onClick={onClick}
      {...props}
    >
      {text}
    </button>
  )
}

export default Button
