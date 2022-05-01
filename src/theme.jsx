import { createTheme } from "@mui/material/styles";
import { blue, purple } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    // mode: 'dark',
    primary: {
      main: '#00adb5'
    },
    secondary: purple
  },
  typography: {
    fontFamily: 'Oswald',
    fontWeightLight: 300,
    fontWeightRegular: 300,
    fontWeightMedium: 500,
    fontWeightBold: 500,
    h1: {
      fontFamily: 'Oswald',
      fontWeight: 400,
      fontSize: "3em",
      color: '#3a3b3c',
    }
  }

});
