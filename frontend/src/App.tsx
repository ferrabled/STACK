import React from 'react';

//import theme from "config/theme.config.json";  
import './App.css';
import { AppFooter, AppHeader } from './pages';
import { AppRoutes } from './routes';

function App() {
  return (
    <div className="App"> 
      <AppHeader />
      <AppRoutes />
      <AppFooter />

    </div>
  )
  /* return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <body>
        <div className='h-10'>HOLA</div>
      </body>
    </div>
  ); */
}

export default App;
