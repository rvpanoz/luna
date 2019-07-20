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
  flexContainer: {
    ...flexContainer,
    justifyContent: 'space-between'
  },
  topSection: {
    ...flexContainer,
    justifyContent: 'space-between',
    flex: 1,
    width: '100%',
    padding: theme.spacing.unit * 2,
    overflow: 'hidden'
  },
  bottomSection: {
    ...flexContainer,
    justifyContent: 'space-between',
    width: '100%',
    padding: theme.spacing.unit * 2
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
    padding: theme.spacing.unit * 2 + 4
  },
  title: {
    display: 'flex',
    color: darken(grayColor, 0.2),
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  divider: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  containerHolder: {
    ...flexContainer,
    paddingTop: theme.spacing.unit * 2,
    flexDirection: 'column',
    alignItems: 'center'
  },
  textHolder: {
    ...defaultFont,
    paddingBottom: theme.spacing.unit,
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
    padding: theme.spacing.unit + 4
  },
  icon: {
    marginRight: theme.spacing.unit,
    padding: 0
  }
});

export default styles;
