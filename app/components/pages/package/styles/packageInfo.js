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
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`
  },
  listItem: {
    padding: theme.spacing.unit,
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
  },
  label: {
    ...defaultFont,
    fontSize: 20,
    color: theme.palette.secondary.light
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
