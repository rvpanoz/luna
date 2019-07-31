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
    [theme.breakpoints.up('lg')]: {
      width: 'auto'
    },
    [theme.breakpoints.down('md')]: {
      width: 150
    },
    textAlign: 'left',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
});

export default styles;
