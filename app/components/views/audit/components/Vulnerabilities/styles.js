import { defaultFont } from 'styles/variables';

export default theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper
  },
  chip: {
    color: theme.palette.common.white,
    fontSize: '1rem',
    marginRight: theme.spacing.unit
  },
  section1: {
    margin: theme.spacing.unit
  },
  section2: {
    margin: theme.spacing.unit,
    display: 'flex'
  },
  section3: {
    marginTop: theme.spacing.unit * 4
  },
  types: {
    marginTop: theme.spacing.unit * 4,
    height: 200,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  tableWrapper: {
    whiteSpace: 'nowrap',
    overflowY: 'scroll',
    overflowX: 'hidden',
    [theme.breakpoints.up('md')]: {
      maxHeight: 300
    },
    [theme.breakpoints.up('lg')]: {
      maxHeight: 400
    }
  },
  tableRow: {
    border: 'none',
    padding: 10,
    lineHeight: '1.1',
    verticalAlign: 'middle'
  },
  table: {
    width: '100%',
    backgroundColor: 'transparent',
    borderSpacing: 0,
    borderCollapse: 'collapse'
  },
  tableHeadCell: {
    ...defaultFont,
    fontSize: 16
  },
  tableCell: {
    fontSize: 14,
    lineHeight: '1.4em',
    verticalAlign: 'middle',
    maxWidth: 200,
    whiteSpace: 'initial'
  },
  iconWrapper: {
    alignItems: 'center',
    borderRadius: '50%',
    display: 'inline-flex',
    height: '4rem',
    justifyContent: 'center',
    marginLeft: 'auto',
    width: '4rem',
    fontSize: 24,
    color: theme.palette.common.white
  },
  primaryColor: {
    backgroundColor: theme.palette.primary.main
  },
  secondaryColor: {
    backgroundColor: theme.palette.secondary.main
  },
  warningColor: {
    backgroundColor: theme.palette.warning.main
  },
  errorColor: {
    backgroundColor: theme.palette.error.main
  },
  primaryTextColor: {
    color: theme.palette.primary.main
  },
  secondaryTextColor: {
    color: theme.palette.secondary.main
  },
  warningTextColor: {
    color: theme.palette.warning.main
  },
  errorTextColor: {
    color: theme.palette.error.main
  },
  icon: {
    color: theme.palette.common.white,
    marginRight: theme.spacing.unit,
    fontSize: '2rem',
    height: '1.5rem',
    width: '1.5rem'
  },
  footer: {
    marginTop: theme.spacing.unit * 2,
    display: 'flex',
    alignItems: 'center'
  },
  caption: {
    marginLeft: theme.spacing.unit
  }
});
