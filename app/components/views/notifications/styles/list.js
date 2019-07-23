import { defaultFont, flexContainer, grayColor } from 'styles/variables';
import { darken, lighten } from '@material-ui/core/styles/colorManipulator';

const styles = theme => ({
  paper: {
    width: '100%',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0
  },
  container: {
    width: '100%'
  },
  title: {
    display: 'flex',
    color: darken(grayColor, 0.2),
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  divider: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  list: {
    whiteSpace: 'nowrap',
    overflowY: 'scroll',
    padding: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      maxHeight: 450
    },
    [theme.breakpoints.up('lg')]: {
      maxHeight: 750
    }
  },
  flexContainer: {
    ...flexContainer,
    justifyContent: 'space-between'
  },
  header: {
    flex: '0 0 auto',
    padding: theme.spacing(2) + 4
  },
  item: {
    ...defaultFont
  },
  containerHolder: {
    ...flexContainer,
    paddingTop: theme.spacing(2),
    flexDirection: 'column',
    alignItems: 'center'
  },
  helperText: {
    ...defaultFont,
    color: lighten(grayColor, 0.1),
    fontSize: 16
  },
  noData: {
    ...defaultFont
  },
  withPadding: {
    padding: theme.spacing(1) + 4
  }
});

export default styles;
