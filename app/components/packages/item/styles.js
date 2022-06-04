import { darken } from '@material-ui/core/styles/colorManipulator';
import { flexContainer, defaultFont, grayColor } from 'styles/variables';

const styles = (theme) => ({
  flex: {
    ...flexContainer,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tableRow: {
    border: 'none',
    padding: theme.spacing(1),
    lineHeight: '1.1',
    verticalAlign: 'middle',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  tableCell: {
    ...defaultFont,
    textAlign: 'center',
    '& p': {
      overflowWrap: 'break-word',
    },
  },
  loader: {
    marginLeft: theme.spacing(1),
  },
  name: {
    fontSize: 14,
    color: darken(grayColor, 0.5),
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    textAlign: 'left',
    [theme.breakpoints.up('lg')]: {
      width: 'auto',
    },
    [theme.breakpoints.down('md')]: {
      width: 225,
    },
  },
  version: {
    fontSize: 14,
    color: darken(grayColor, 0.5),
  },
  group: {
    fontSize: 14,
    color: theme.palette.common.grayColor,
  },
  statusMissing: {
    color: theme.palette.secondary.main,
  },
  statusOK: {
    color: '#00b300',
  },
  statusPeerMissing: {
    color: theme.palette.secondary.main,
  },
  statusOutdated: {
    color: theme.palette.error.main,
  },
  statusExtraneous: {
    color: theme.palette.secondary.main,
  },
  statusError: {
    color: theme.palette.secondary.main,
  },
});

export default styles;
