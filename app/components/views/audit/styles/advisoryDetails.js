import { lighten, darken } from '@material-ui/core/styles/colorManipulator';
import { defaultFont, grayColor } from 'styles/variables';
import red from '@material-ui/core/colors/red';

const styles = theme => ({
  actions: {
    display: 'flex'
  },
  cardHeader: {
    padding: theme.spacing.unit
  },
  cardContent: {
    maxHeight: 375,
    overflowY: 'scroll',
    overflowX: 'hidden',
    padding: theme.spacing.unit
  },
  avatar: {
    width: 50,
    height: 50,
    backgroundColor: red[500]
  },
  badge: {
    margin: theme.spacing.unit
  },
  divider: {
    margin: theme.spacing.unit
  },
  group: {
    padding: 0,
    margin: 0
  },
  link: {
    ...defaultFont,
    fontSize: 16,
    color: grayColor,
    textDecoration: 'none',
    '&:hover': {
      color: darken(grayColor, 0.4)
    }
  },
  header: {
    ...defaultFont,
    backgroundColor: lighten(theme.palette.secondary.light, 0.9),
    fontSize: 20,
    fontWeight: 400,
    padding: theme.spacing.unit
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  toolbar: {
    display: 'flex',
    flexDirection: 'column'
  },
  paper: {
    width: '100%'
  },
  wrapper: {
    width: '100%'
  },
  withPadding: {
    padding: theme.spacing.unit
  },
  overview: {
    paddingTop: theme.spacing.unit * 2
  },
  padTop: {
    paddingTop: theme.spacing.unit
  }
});

export default styles;
