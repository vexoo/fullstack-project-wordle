import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import { KeyBoardColorContextProvider } from './contexts/KeyboardColorContext'
import store from './reducers/store'
import { Provider } from 'react-redux'
import { StyledEngineProvider } from '@mui/material'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <Provider store={store}>
        <KeyBoardColorContextProvider>
          <App />
        </KeyBoardColorContextProvider>
      </Provider>
    </StyledEngineProvider>
  </React.StrictMode>
)
