import { defaultFont, grayColor, flexContainer } from 'styles/variables';
import { darken } from '@material-ui/core/styles/colorManipulator';

const styles = theme => ({
  containerHolder: {
    ...flexContainer
  },
  icon: {
    marginRight: theme.spacing(0.5)
  },
  avatar: {
    padding: theme.spacing(1)
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
    padding: theme.spacing(1),
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
    padding: theme.spacing(0.5)
  }
});

export default styles;
