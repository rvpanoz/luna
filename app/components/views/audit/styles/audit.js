import { defaultFont, flexContainer, grayColor } from 'styles/variables';
import { darken, lighten } from '@material-ui/core/styles/colorManipulator';

const styles = theme => ({
  root: {
    width: '100%'
  },
  container: {
    width: '100%',
    padding: theme.spacing.unit * 2,
  },
  types: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  half: {
    // flexGrow: 0,
    // flexShrink: 0,
    // flexBasis: '50%'
  },
  chart: {

  },
});

export default styles;
