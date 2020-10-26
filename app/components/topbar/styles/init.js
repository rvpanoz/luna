import { darken } from '@material-ui/core/styles/colorManipulator';
import { flexContainer, grayColor } from 'styles/variables';

const styles = (theme) => ({
  root: {
    padding: 0,
    margin: 0,
  },
  content: {
    ...flexContainer,
    flexDirection: 'column',
    alignItems: 'center',
  },
  actions: {
    padding: 0,
  },
  directory: {
    padding: theme.spacing(1),
  },
  button: {
    marginBottom: theme.spacing(8),
  },
});

export default styles;
