import { defaultFont, grayColor, flexContainer } from 'styles/variables';
import { darken } from '@material-ui/core/styles/colorManipulator';

const styles = theme => ({
  containerHolder: {
    ...flexContainer
  },
  tab: {
    width: '100%'
  },
  title: {
    ...defaultFont,
  },
  stats: {
    ...defaultFont,
    fontSize: 24,
  },
  listItem: {
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
  }
});

export default styles;
