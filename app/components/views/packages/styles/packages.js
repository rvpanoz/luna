import { darken, lighten } from '@material-ui/core/styles/colorManipulator';
import { flexContainer, defaultFont } from 'styles/variables';

const styles = theme => ({
  root: {
    width: '100%',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0
  },
  typo: {
    ...defaultFont,
    fontSize: 16
  },
  flexContainer: {
    ...flexContainer,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  flexContainerCell: {
    ...flexContainer,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  flexRow: {
    ...flexContainer,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  flexItem: {
    marginRight: theme.spacing.unit
  },
  toolbar: {
    width: '100%'
  },
  tableWrapper: {
    whiteSpace: 'nowrap',
    overflowY: 'scroll',
    padding: theme.spacing.unit,
    [theme.breakpoints.up('md')]: {
      maxHeight: 500
    },
    [theme.breakpoints.up('lg')]: {
      maxHeight: 650
    }
  },
  tableRow: {
    border: 'none',
    padding: 10,
    lineHeight: '1.1',
    verticalAlign: 'middle',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  table: {
    width: '100%',
    backgroundColor: 'transparent',
    borderSpacing: 0,
    borderCollapse: 'collapse'
  },
  hasFilterBlur: {
    filter: 'blur(15px)'
  },
  tableResponsive: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },
  tableCell: {
    ...defaultFont,
    fontSize: '1rem',
    textAlign: 'center',
    '& p': {
      overflowWrap: 'break-word'
    }
  },
  loader: {
    marginLeft: theme.spacing.unit
  },
  outdated: {
    color: lighten(theme.palette.error.main, 0.1)
  },
  transition: {
    transition: theme.transitions.create('width', {
      duration: theme.transitions.duration.shortest
    })
  },
  withPadding: {
    padding: theme.spacing.unit + 4
  },
  nodata: {
    padding: theme.spacing.unit + 4
  },
  icon: {
    width: '0.85em'
  },
  hidden: {
    display: 'none'
  },
  statusMissing: {
    color: darken(theme.palette.secondary.main, 0.1)
  },
  statusOK: {
    color: lighten('#00b300', 0.3)
  },
  statusPeerMissing: {
    color: darken(theme.palette.secondary.main, 0.1)
  },
  statusOutdated: {
    color: lighten(theme.palette.warning.main, 0.3)
  },
  statusExtraneous: {
    color: darken(theme.palette.secondary.main, 0.1)
  },
  statusError: {
    color: darken(theme.palette.secondary.main, 0.1)
  },
  chip: {
    margin: theme.spacing.unit
  },
  group: {
    color: darken(theme.palette.secondary.light, 0.3)
  },
  name: {
    ...defaultFont,
    fontSize: '1rem',
    [theme.breakpoints.up('md')]: {
      maxWidth: '100%'
    },
    [theme.breakpoints.up('lg')]: {
      width: 'auto'
    },
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
});

export default styles;
