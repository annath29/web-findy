import React from 'react'
import ReactDOM from 'react-dom/client'
import {AppContextProvider} from './context/AppContext'
import AppRoutes from './routes/AppRoutes'
import { ThemeProvider } from '@emotion/react'
import { createTheme } from '@mui/material/styles'
import { red } from '@mui/material/colors'

const theme = createTheme({
  palette: {
    primary: {
      main: red[500],
    },
    secondary: {
      main: '#f44336',
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AppContextProvider>
        <AppRoutes/>
      </AppContextProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
