import { defaultFont, flexContainer } from 'styles/variables';

const styles = theme => ({
  root: {
    width: '100%',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0
  },
  flexContainer: {
    ...flexContainer,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  toolbar: {
    width: '100%'
  },
  cards: {
    paddingBottom: theme.spacing.unit * 4
  },
  tableWrapper: {
    whiteSpace: 'nowrap',
    overflowY: 'scroll',
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
    fontSize: 12,
    lineHeight: '1.2em',
    textAlign: 'center',
    '& span': {
      display: 'inline-block',
      overflowWrap: 'break-word'
    },
    height: 60
  },
  outdated: {
    color: theme.palette.secondary.dark
  },
  avatar: {
    color: theme.palette.secondary.light
  },
  errorIcon: {
    color: theme.palette.common.white
  },
  warningIcon: {
    color: theme.palette.common.white
  },
  errorAvatar: {
    backgroundColor: theme.palette.error.light
  },
  warningAvatar: {
    backgroundColor: theme.palette.warning.light
  }
});

export default styles;
