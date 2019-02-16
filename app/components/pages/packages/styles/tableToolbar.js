import { lighten } from '@material-ui/core/styles/colorManipulator';
import { defaultFont, flexContainer } from 'styles/variables';

const styles = theme => ({
  root: {
    width: '100%'
  },
  tableListToolbar: {
    paddingRight: 8
  },
  spacer: {
    flex: '1 1 100%'
  },
  header: {
    flex: '0 0 auto',
    padding: theme.spacing.unit * 2 + 4
  },
  title: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  directory: {
    ...defaultFont,
    fontSize: 12
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  actions: {
    ...flexContainer,
    alignItems: 'center',
    flex: '0 0 auto',
    padding: theme.spacing.unit,
    color: theme.palette.text.secondary
  }
});

export default styles;
