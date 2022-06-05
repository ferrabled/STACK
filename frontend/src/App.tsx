import { createTheme, responsiveFontSizes, ThemeProvider } from "@mui/material";
import { Shadows } from "@mui/material/styles/shadows";
import theme from "config/theme.config.json";
import React from "react";
import "./App.css";
import { AppRoutes } from "./routes";

function App() {
  return (
    <ThemeProvider
      theme={responsiveFontSizes(
        createTheme({
          ...theme,
          shadows: Array(25).fill(
            "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
          ) as Shadows,
        })
      )}
    >
      <div className="App">
        <AppRoutes />
      </div>
    </ThemeProvider>
  );
}

export default App;
