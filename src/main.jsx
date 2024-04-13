import React from 'react'
import ReactDOM from 'react-dom/client'
import {AppContextProvider} from './context/AppContext'
import AppRoutes from './routes/AppRoutes'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppContextProvider>
      <AppRoutes/>
    </AppContextProvider>
  </React.StrictMode>,
)
