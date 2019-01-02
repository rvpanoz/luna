/* eslint-disable */
import { lighten, darken } from '@material-ui/core/styles/colorManipulator';
import { defaultFont } from '../styles/general';

export const listStyles = theme => ({
  root: {
    width: '100%'
  },
  none: {
    display: 'none'
  },
  pagination: {
    backgroundColor: 'red !important'
  },
  toolbar: {
    width: '100%'
  },
  tableWrapper: {
    overflowX: 'auto'
  },
  tableRow: {
    border: 'none',
    padding: 10,
    lineHeight: '1.4',
    verticalAlign: 'middle',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  tablelist: {
    visibility: 'visible',
    overflowX: 'auto',
    overflowY: 'auto',
    clear: 'both',
    maxHeight: 850,
    [theme.breakpoints.down('1367')]: {
      maxHeight: 650
    }
  },
  table: {
    marginBottom: 0,
    width: '100%',
    maxWidth: '100%',
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
    fontSize: 14,
    fontFamily: 'Regular',
    lineHeight: '1.4em',
    '& span': {
      display: 'inline-block',
      overflowWrap: 'break-word'
    }
  },
  outdated: {
    color: theme.palette.secondary.dark
  },
  updated: {
    color: darken('#00b300', 0.1)
  },
  nodata: {
    padding: theme.spacing.unit * 2.5
  },
  icon: {
    width: '0.85em',
    color: darken(theme.palette.secondary.light, 0.1)
  },
  hidden: {
    display: 'none'
  }
});

export const tableHeaderStyles = theme => ({
  tableHeadCell: {
    ...defaultFont,
    fontSize: 16
  },
  tableCell: {
    fontSize: 14,
    lineHeight: '1.4em',
    padding: '0px 12px',
    verticalAlign: 'middle',
    maxWidth: 100
  }
});

export const tableToolbarStyles = theme => ({
  root: {
    width: '100%'
  },
  tableListToolbar: {
    paddingRight: 8
  },
  highlight: {
    color: '#ccc'
  },
  spacer: {
    flex: '1 1 100%'
  },

  header: {
    flex: '0 0 auto',
    padding: theme.spacing.unit * 2 + 4
  },

  title: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  directory: {
    fontSize: 12
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  spacer: {
    flex: '1 1 100%'
  },
  actions: {
    color: theme.palette.text.secondary
  },
  flexContainer: { display: 'flex', flexDirection: 'row' }
});

export const tableFiltersStyles = theme => ({
  root: {
    maxWidth: 400,
    padding: theme.spacing.unit,
    margin: theme.spacing.unit,
    '& > h2': {
      color: theme.palette.primary.light,
      fontSize: 18
    }
  },
  filterItems: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: theme.spacing.unit * 2
  },
  bottomDivider: {
    margin: theme.spacing.unit
  },
  headline: {
    marginBottom: theme.spacing.unit
  },
  leftIcon: {
    marginRight: theme.spacing.unit / 2
  }
});
