import { defaultFont, grayColor } from 'styles/variables';
import { darken } from '@material-ui/core/styles/colorManipulator';

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 752
  },
  paper: {
    backgroundColor: theme.palette.background.paper
  },
  title: {
    ...defaultFont,
    color: darken(grayColor, 0.7),
    fontSize: 18,
    marginBottom: theme.spacing(1)
  },
  description: {
    ...defaultFont
  },
  listItem: {
    padding: theme.spacing(1),
    margin: 0
  },
  secondaryColor: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.light
  },
  warningColor: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.warning.light
  },
  errorColor: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.error.light
  }
});

export default styles;
