import { flexContainer, defaultFont } from 'styles/variables';

const styles = theme => ({
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
    '& p': {
      overflowWrap: 'break-word'
    }
  },
  cellText: {
    ...defaultFont,
    textAlign: 'left',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  requiredBy: {
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
  span: {
    color: '#fff'
  },
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
  },
});

export default styles;
