import { lighten } from '@material-ui/core/styles/colorManipulator';
import { defaultFont, grayColor } from 'styles/variables';

const styles = theme => ({
  root: {
    width: '100%'
  },
  buttonFix: {
    margin: theme.spacing.unit
  },
  container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: theme.spacing.unit * 4,
    paddingBottom: theme.spacing.unit * 4
  },
  gridContainer: {
    width: '100%',
    paddingTop: theme.spacing.unit * 4
  },
  containerColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: theme.spacing.unit * 2
  },
  types: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  typeItem: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: theme.spacing.unit
  },
  typeItemText: {
    ...defaultFont,
    fontSize: '18px !important',
    marginLeft: theme.spacing.unit
  },
  transition: {
    transition: theme.transitions.create('width', {
      duration: theme.transitions.duration.shortest
    })
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
