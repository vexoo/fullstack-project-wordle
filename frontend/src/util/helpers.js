import { words } from './words'

export const isEnterOrClear = keyValue => {
  return keyValue === 'enter' || keyValue === 'clear'
}

export const copyArray = array => {
  const newArray = [...array.map(innerArray => [...innerArray])]
  return newArray
}

export const joinWord = row => {
  return row.join('')
}

export const countOccurrences = (array, element) => {
  return array.filter(cell => cell === element).length
}

export const checkWord = word => {
  const exists = words.includes(word)
  return exists
}
