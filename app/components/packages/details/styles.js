import { lighten, darken } from '@material-ui/core/styles/colorManipulator';
import { defaultFont, grayColor } from 'styles/variables';
import red from '@material-ui/core/colors/red';

const styles = (theme) => ({
  wrapper: {
    width: '100%',
  },
  paper: {
    width: '100%',
  },
  header: {
    ...defaultFont,
    backgroundColor: lighten(theme.palette.primary.main, 0.25),
    fontSize: 20,
    fontWeight: 400,
    padding: theme.spacing(1),
    '& > p': {
      color: theme.palette.common.white,
    },
  },
  list: {
    overflowY: 'scroll',
    minWidth: 225,
    maxHeight: 425,
  },
  listItem: {
    padding: theme.spacing(1),
    margin: 0,
  },
  cardHeader: {
    padding: theme.spacing(1),
  },
  subheader: {
    paddingTop: theme.spacing(1),
  },
  cardContent: {
    maxHeight: 375,
    overflowY: 'scroll',
    overflowX: 'hidden',
    padding: theme.spacing(1),
  },
  toolbar: {
    display: 'flex',
    flexDirection: 'column',
  },
  actions: {
    display: 'flex',
  },
  divider: {
    marginTop: theme.spacing(1),
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  secondaryColor: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.secondary.light,
  },
  warningColor: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.error.light,
  },
  errorColor: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.error.light,
  },
  label: {
    ...defaultFont,
    fontSize: 20,
    color: grayColor,
  },
  label: {
    ...defaultFont,
    fontSize: 16,
    color: grayColor,
  },
  link: {
    ...defaultFont,
    fontSize: 16,
    color: grayColor,
    textDecoration: 'none',
    '&:hover': {
      color: darken(grayColor, 0.4),
    },
  },
});

export default styles;
