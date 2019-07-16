import { lighten } from '@material-ui/core/styles/colorManipulator';
import { defaultFont, grayColor } from 'styles/variables';

const styles = theme => ({
  containerColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: theme.spacing.unit * 2
  },
  noData: {
    ...defaultFont
  },
  withPadding: {
    padding: theme.spacing.unit + 4
  },
  helperText: {
    ...defaultFont,
    color: lighten(grayColor, 0.1),
    fontSize: 16
  }
});

export default styles;
