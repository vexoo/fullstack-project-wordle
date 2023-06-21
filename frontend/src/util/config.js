export const wordLength = 5
export const tryAmount = 6

export const keys = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'clear']
]

export let token = null

export const setToken = newToken => {
  token = `Bearer ${newToken}`
}

export const localStorage = {
	dailyWord: 'wordleClone-dailyWord',
	wordleBoard: 'wordleClone-board',
	loggedUser: 'wordleClone-loggedUser'
}
