import { lighten } from '@material-ui/core/styles/colorManipulator';
import { flexContainer, defaultFont } from 'styles/variables';

const styles = theme => ({
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
  tableRow: {
    border: 'none',
    padding: theme.spacing(1),
    lineHeight: '1.1',
    verticalAlign: 'middle',
    '&:hover': {
      cursor: 'pointer'
    }
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
  name: {
    [theme.breakpoints.up('lg')]: {
      width: 'auto'
    },
    [theme.breakpoints.down('md')]: {
      width: 200
    },
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    textAlign: 'left'
  },
  group: {
    color: theme.palette.primary.main
  },
  statusMissing: {
    color: theme.palette.secondary.main
  },
  statusOK: {
    color: '#00b300'
  },
  statusPeerMissing: {
    color: theme.palette.secondary.main
  },
  statusOutdated: {
    color: theme.palette.warning.main
  },
  statusExtraneous: {
    color: theme.palette.secondary.main
  },
  statusError: {
    color: theme.palette.secondary.main
  }
});

export default styles;
