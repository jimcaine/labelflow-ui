import { createTheme } from "@mui/material/styles";
import { blue, purple } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    primary: {
      main: blue[500],
    },
    secondary: purple
  },
  typography: {
    fontFamily: 'Oswald',
    fontWeightLight: 300,
    fontWeightRegular: 300,
    fontWeightMedium: 500,
    fontWeightBold: 500,
  }

});
