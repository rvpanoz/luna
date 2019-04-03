import { flexContainer, defaultFont, grayColor } from 'styles/variables';
import { darken } from '@material-ui/core/styles/colorManipulator';

const styles = theme => ({
  root: {
    width: '100%'
  },
  container: {
    ...flexContainer,
    display: 'flex',
    flexDirection: 'row',
    flexBasis: '100%',
    flex: 1,
    justifyContent: 'space-between',
    padding: theme.spacing.unit,
    alignItems: 'center'
  },
  header: {
    ...defaultFont,
    flex: '0 0 auto',
    fontSize: 22,
    color: darken(grayColor, 0.5)
  },
  tabs: {
    flex: '0 0 auto'
  },
  column: {
    height: '100%'
  },
  indicator: {
    backgroundColor: theme.palette.secondary.light
  }
});

export default styles;
