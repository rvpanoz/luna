import { lighten } from '@material-ui/core/styles/colorManipulator';
import { defaultFont, grayColor } from 'styles/variables';

const styles = theme => ({
  containerColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: theme.spacing(2)
  },
  noData: {
    ...defaultFont
  },
  withPadding: {
    padding: theme.spacing(1)
  },
  helperText: {
    ...defaultFont,
    color: lighten(grayColor, 0.1),
    fontSize: 16
  },
  buttonFix: {
    ...defaultFont,
    fontWeight: 300,
    margin: theme.spacing(1)
  }
});

export default styles;
