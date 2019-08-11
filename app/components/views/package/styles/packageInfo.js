import { flexContainer, defaultFont, grayColor } from 'styles/variables';
import { darken } from '@material-ui/core/styles/colorManipulator';

const styles = theme => ({
  flexContainer: {
    ...flexContainer,
    flexDirection: 'column'
  },
  root: {
    flexGrow: 1,
    maxWidth: 752
  },
  paper: {
    backgroundColor: theme.palette.background.paper
  },
  title: {
    margin: `${theme.spacing(1) * 4}px 0 ${theme.spacing(2)}px`
  },
  listItem: {
    padding: theme.spacing(1),
    margin: 0
  },
  secondaryColor: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.secondary.light
  },
  warningColor: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.error.light
  },
  errorColor: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.error.light
  },
  label: {
    ...defaultFont,
    fontSize: 20,
    color: grayColor
  },
  labelMini: {
    ...defaultFont,
    fontSize: 16,
    color: grayColor
  },
  link: {
    ...defaultFont,
    fontSize: 16,
    color: grayColor,
    textDecoration: 'none',
    '&:hover': {
      color: darken(grayColor, 0.4)
    }
  }
});

export default styles;
