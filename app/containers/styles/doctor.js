import { defaultFont, flexContainer, grayColor } from 'styles/variables';
import { darken, lighten } from '@material-ui/core/styles/colorManipulator';

const styles = theme => ({
  wrapper: {
    whiteSpace: 'nowrap',
    padding: theme.spacing(1),
    overflowY: 'scroll',
    [theme.breakpoints.down('md')]: {
      maxHeight: 500
    },
    [theme.breakpoints.up('md')]: {
      maxHeight: 600
    }
  },
  paper: {
    width: '100%',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0
  },
  container: {
    width: '100%'
  },
  flexContainer: {
    ...flexContainer,
    justifyContent: 'space-between'
  },
  topSection: {
    ...flexContainer,
    justifyContent: 'space-between',
    flex: 1,
    width: '100%',
    padding: theme.spacing(2),
  },
  bottomSection: {
    ...flexContainer,
    justifyContent: 'space-between',
    width: '100%',
    padding: theme.spacing(2)
  },
  bottomLeft: {
    width: '50%',
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${lighten(grayColor, 0.5)}`
  },
  bottomRight: {
    width: '50%',
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${lighten(grayColor, 0.5)}`
  },
  header: {
    flex: '0 0 auto',
    padding: theme.spacing(2) + 4
  },
  title: {
    display: 'flex',
    color: darken(grayColor, 0.2),
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  divider: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  containerHolder: {
    ...flexContainer,
    paddingTop: theme.spacing(2),
    flexDirection: 'column',
    alignItems: 'center'
  },
  textHolder: {
    ...defaultFont,
    paddingBottom: theme.spacing(1),
    color: grayColor
  },
  table: {
    width: '100%'
  },
  tableHead: {
    ...defaultFont,
    color: darken(grayColor, 0.25),
    fontSize: 20
  },
  avatar: {
    backgroundColor: theme.palette.common.white
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
  },
  icon: {
    marginRight: theme.spacing(1),
    padding: 0
  }
});

export default styles;
