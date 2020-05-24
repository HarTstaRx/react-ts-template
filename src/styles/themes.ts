import { createMuiTheme } from '@material-ui/core/styles';

export const defaultTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#43788d',
    },
    secondary: {
      main: '#ff5621',
    },
    error: {
      main: '#d32f2f',
    },
    background: {
      default: '#ffffff',
    },
  },
  typography: {
    fontFamily: "Montserrat",
    fontSize: 16,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500
  }
});
