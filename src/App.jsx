import {
  ThemeProvider as MuiThemeProvider,
  createTheme
} from "@mui/material";
import { ThemeProvider } from "@emotion/react";

import { useSelector } from "react-redux";

import SignIn from "./pages/SignIn";
import MainPage from "./pages/Main";

const theme = createTheme({})

function App() {

  const { isAuth } = useSelector(state => state.user);

  const renderPage = () => {
    if (isAuth) {
      return <MainPage />
    } else {
      return <SignIn />
    }
  }

  return (
    <MuiThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        {renderPage()}
      </ThemeProvider>
    </MuiThemeProvider>
  );
}

export default App;
