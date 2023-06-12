import { createContext } from 'react'

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

export { KeyBoardColorContext, KeyBoardColorContextProvider }
