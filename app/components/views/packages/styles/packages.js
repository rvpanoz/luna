import { darken, lighten } from '@material-ui/core/styles/colorManipulator';
import { flexContainer, defaultFont } from 'styles/variables';

const styles = theme => ({
  paper: {
    width: '100%',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    [theme.breakpoints.up('md')]: {
      maxWidth: '100%'
    },
    [theme.breakpoints.up('lg')]: {
      maxWidth: 1024
    }
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
  containerHolder: {
    ...flexContainer,
    paddingTop: theme.spacing(2),
    flexDirection: 'column',
    alignItems: 'center'
  },
  flexRow: {
    ...flexContainer,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  flexItem: {
    marginRight: theme.spacing(1)
  },
  toolbar: {
    width: '100%'
  },
  tableWrapper: {
    whiteSpace: 'nowrap',
    overflowY: 'scroll',
    padding: theme.spacing(1),
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
    marginTop: theme.spacing(3),
    overflowX: 'auto'
  },
  tableCell: {
    ...defaultFont,
    textAlign: 'center',
    '& p': {
      overflowWrap: 'break-word'
    }
  },
  loader: {
    marginLeft: theme.spacing(1)
  },
  outdated: {
    color: lighten(theme.palette.error.main, 0.1)
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
    padding: theme.spacing(1) + 4
  },
  smallIcon: {
    width: 15,
    height: 15,
    marginRight: theme.spacing(0.5)
  },
  nodata: {
    ...defaultFont
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
    margin: theme.spacing(1)
  },
  group: {
    color: darken(theme.palette.secondary.light, 0.3)
  },
  name: {
    ...defaultFont,
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
