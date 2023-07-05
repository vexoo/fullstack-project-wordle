import { createContext, useContext } from 'react'

const KeyBoardColorContext = createContext()

const KeyBoardColorContextProvider = ({ children }) => {
  const greenKeys = new Set()
  const yellowKeys = new Set()
  const grayKeys = new Set()

  const contextValue = {
    greenKeys,
    yellowKeys,
    grayKeys
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
