const Button = ({ onClick, className, text, ...props }) => {
  const defaultClassName =
    'cursor-pointer rounded-md border-none bg-gray-500 px-3 py-1 text-center text-sm uppercase tracking-wide text-gray-500 text-white shadow-md dark:text-gray-300'

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
