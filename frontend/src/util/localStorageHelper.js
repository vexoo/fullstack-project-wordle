const localStorage = {
  dailyWord: 'wordleClone-dailyWord',
  wordleBoard: 'wordleClone-board',
  loggedUser: 'wordleClone-loggedUser',
  theme: 'wordleClone-theme',
  gameState: 'wordleClone-gameState'
}

export const getLocalDailyWord = () => {
  const dailyWordJSON = window.localStorage.getItem(localStorage.dailyWord)
  return JSON.parse(dailyWordJSON)
}

export const setLocalDailyWord = word => {
  const wordJSON = JSON.stringify(word)
  window.localStorage.setItem(localStorage.dailyWord, wordJSON)
}

export const getLocalWordleBoard = () => {
  const boardJSON = window.localStorage.getItem(localStorage.wordleBoard)
  return JSON.parse(boardJSON)
}

export const setLocalWordleBoard = board => {
  const boardJSON = JSON.stringify(board)
  window.localStorage.setItem(localStorage.wordleBoard, boardJSON)
}

export const removeLocalWordleBoard = () => {
  window.localStorage.removeItem(localStorage.wordleBoard)
}

export const getLocalLoggedUser = () => {
  const loggedUserJSON = window.localStorage.getItem(localStorage.loggedUser)
  return JSON.parse(loggedUserJSON)
}

export const setLocalLoggedUser = user => {
  const userJSON = JSON.stringify(user)
  window.localStorage.setItem(localStorage.loggedUser, userJSON)
}

export const removeLocalLoggedUser = () => {
  window.localStorage.removeItem(localStorage.loggedUser)
}

export const getLocalTheme = () => {
  const themeJSON = window.localStorage.getItem(localStorage.theme)
  return JSON.parse(themeJSON)
}

export const setLocalTheme = theme => {
  const themeJSON = JSON.stringify(theme)
  window.localStorage.setItem(localStorage.theme, themeJSON)
}

export const removeLocalTheme = () => {
  window.localStorage.removeItem(localStorage.theme)
}

export const getLocalGameState = () => {
  const gameStateJSON = window.localStorage.getItem(localStorage.gameState)
  return JSON.parse(gameStateJSON)
}

export const setLocalGameState = gameState => {
  const gameStateJSON = JSON.stringify(gameState)
  window.localStorage.setItem(localStorage.gameState, gameStateJSON)
}

export const removeLocalGameState = () => {
  window.localStorage.removeItem(localStorage.gameState)
}
