import { defaultFont, grayColor, flexContainer } from 'styles/variables';
import { darken } from '@material-ui/core/styles/colorManipulator';

const styles = theme => ({
  containerHolder: {
    ...flexContainer
  },
  icon: {
    marginRight: theme.spacing.unit / 2
  },
  avatar: {
    padding: theme.spacing.unit
  },
  tab: {
    backgroundColor: theme.palette.background.paper
  },
  title: {
    ...defaultFont,
    fontSize: 18,
    color: darken(grayColor, 0.2)
  },
  stats: {
    ...defaultFont,
    fontSize: 24,
    color: darken(grayColor, 0.2)
  },
  listItem: {
    padding: theme.spacing.unit,
    margin: 0
  },
  primaryColor: {
    color: darken(theme.palette.primary.main, 0.1)
  },
  secondaryColor: {
    color: theme.palette.secondary.main
  },
  warningColor: {
    color: theme.palette.warning.light
  },
  errorColor: {
    color: darken(theme.palette.secondary.main, 0.1)
  },
  withPadding: {
    padding: theme.spacing.unit / 2
  }
});

export default styles;
