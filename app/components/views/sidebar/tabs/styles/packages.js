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
    ...defaultFont
  },
  stats: {
    ...defaultFont
  },
  listItem: {
    margin: 0
  },
  primaryColor: {
    color: theme.palette.primary.main
  },
  secondaryColor: {
    color: theme.palette.secondary.main
  },
  warningColor: {
    color: theme.palette.warning.light
  },
  errorColor: {
    color: theme.palette.error.light
  }
});

export default styles;
