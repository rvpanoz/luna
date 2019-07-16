import { defaultFont, flexContainer } from 'styles/variables';

const styles = theme => ({
  container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: theme.spacing.unit * 4
  },
  tableWrapper: {
    whiteSpace: 'nowrap',
    padding: theme.spacing.unit,
    overflowY: 'scroll',
    [theme.breakpoints.up('md')]: {
      maxHeight: 450
    },
    [theme.breakpoints.down('md')]: {
      maxWidth: '100%'
    }
  },
  tableRow: {
    border: 'none',
    padding: 10,
    lineHeight: '1.1',
    verticalAlign: 'middle',
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: theme.palette.secondary.ligth
    }
  },
  table: {
    backgroundColor: 'transparent',
    borderSpacing: 0,
    borderCollapse: 'collapse'
  },
  tableCell: {
    fontSize: 12,
    '& p': {
      overflowWrap: 'break-word'
    }
  },
  flexContainer: {
    ...flexContainer,
    alignItems: 'center'
  },
  cellCenter: {
    textAlign: 'center'
  },
  spacer: {
    flex: '1 1 100%'
  },
  header: {
    flex: '0 0 auto',
    padding: theme.spacing.unit * 2 + 4
  },
  title: {
    ...defaultFont
  },
  text: {
    ...defaultFont,
    fontSize: 12,
    [theme.breakpoints.up('md')]: {
      maxWidth: '100%'
    },
    [theme.breakpoints.up('lg')]: {
      width: 'auto'
    },
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  actions: {
    ...flexContainer,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing.unit * 2
  },
  padRight: {
    paddingRight: theme.spacing.unit * 2.5
  },
  marLeft: {
    marginLeft: theme.spacing.unit * 2
  }
});

export default styles;
