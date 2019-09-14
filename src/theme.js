import grey from '@material-ui/core/colors/grey';
import indigo from '@material-ui/core/colors/indigo';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: grey[900],
    },
    secondary: {
      main: indigo[700],
    },
  },
});

export default theme;
