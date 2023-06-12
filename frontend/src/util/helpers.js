export const isEnterOrClear = (keyValue) => {
  return keyValue === 'enter' || keyValue === 'clear'
}

export const copyArray = (array) => {
  const newArray = [...array.map((innerArray) => [...innerArray])]
  return newArray
}
