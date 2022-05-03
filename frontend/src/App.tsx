import React from 'react';

import { createTheme, responsiveFontSizes, ThemeProvider } from "@mui/material";
import theme from "config/theme.config.json";  
import './App.css';
import { AppFooter, AppHeader } from './pages';
import { AppRoutes } from './routes';

function App() {
  return (
    <ThemeProvider theme={responsiveFontSizes(createTheme(theme))}>
    <div className="App"> 
      <AppRoutes />
      <AppFooter />
    </div>
    </ThemeProvider>
  )
}

export default App;
