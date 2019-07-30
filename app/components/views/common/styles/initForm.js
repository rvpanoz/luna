import { darken } from '@material-ui/core/styles/colorManipulator';
import { flexContainer, grayColor } from 'styles/variables';

const styles = theme => ({
  root: {
    padding: 0,
    margin: 0
  },
  content: {
    ...flexContainer,
    flexDirection: 'column',
    alignItems: 'center',
  },
  actions: {
    padding: 0
  },
  caption: {
    color: darken(grayColor, 0.6),
    marginTop: theme.spacing(4)
  },
  options: {
    paddingTop: theme.spacing(4)
  },
  formControl: {
    margin: 0
  },
  flexGrow: {
    flexGrow: 1
  },
  title: {
    padding: theme.spacing(2),
  },
  info: {
    marginTop: theme.spacing(5)
  },
  directory: {
    padding: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(1)
  }
});

export default styles;
