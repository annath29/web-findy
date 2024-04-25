import React from 'react'
import ReactDOM from 'react-dom/client'
import {AppContextProvider} from './context/AppContext'
import AppRoutes from './routes/AppRoutes'
import { ThemeProvider } from '@emotion/react'
import { createTheme } from '@mui/material/styles'


const theme = createTheme({
  palette: {
    primary: {
      main: '#ff7674',
    },
    secondary: {
      main: '#ffff' ,
    },
    text:{
      main:'#2F2F2F',
      dark:'#000000'
    }
  },
  typography:{
    fontFamily:['Balsamiq Sans, sans-serif',]
  }

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
