import { createContext, useContext } from 'react'

const KeyBoardColorContext = createContext()

const KeyBoardColorContextProvider = ({ children }) => {
  const greenKeys = new Set()
  const orangeKeys = new Set()
  const greyKeys = new Set()

  const contextValue = {
    greenKeys,
    orangeKeys,
    greyKeys
  }

  return (
    <KeyBoardColorContext.Provider value={contextValue}>
      {children}
    </KeyBoardColorContext.Provider>
  )
}

export const useKeyBoardColorContext = () => {
  const keyColorValues = useContext(KeyBoardColorContext)
  return keyColorValues
}

export { KeyBoardColorContext, KeyBoardColorContextProvider }
