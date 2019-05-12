import { darken, lighten } from '@material-ui/core/styles/colorManipulator';
import { defaultFont, flexContainer, grayColor } from 'styles/variables';

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
    color: darken(grayColor, 0.2),
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  directory: {
    ...defaultFont,
    fontSize: 12
  },
  highlight: {
    color: theme.palette.common.white,
    backgroundColor: lighten(theme.palette.secondary.light, 0.9)
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
