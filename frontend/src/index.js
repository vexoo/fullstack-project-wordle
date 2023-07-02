import './index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import { KeyBoardColorContextProvider } from './contexts/KeyboardColorContext'
import store from './reducers/store'
import { Provider } from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <KeyBoardColorContextProvider>
        <App />
      </KeyBoardColorContextProvider>
    </Provider>
  </React.StrictMode>
)
