import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#607d8b', // blueGrey-500
      dark: '#455a64', // blueGrey-700
      light: '#90a4ae', // blueGrey-300
    },
    secondary: {
      main: '#90a4ae', // blueGrey-300
      dark: '#546e7a', // blueGrey-600
      light: '#eceff1', // blueGrey-50
    },
    background: {
      default: '#cfd8dc', // blueGrey-100
      paper: '#ffffff',
    },
    text: {
      primary: '#455a64', // blueGrey-700
      secondary: '#607d8b', // blueGrey-50
    },
  },
});

export default theme;