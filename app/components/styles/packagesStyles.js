/* eslint-disable */

import pink from '@material-ui/core/colors/pink';
import green from '@material-ui/core/colors/green';
import { lighten, darken } from '@material-ui/core/styles/colorManipulator';
import { defaultFont } from '../styles/general';

export const listStyles = theme => ({
  root: {
    width: '100%'
  },
  none: {
    display: 'none'
  },
  pagination: {},
  toolbar: {
    width: '100%'
  },
  tableWrapper: {
    whiteSpace: 'nowrap',
    overflowY: 'scroll',
    maxHeight: 1024,
    [theme.breakpoints.down('sm')]: {
      maxHeight: 285
    },
    [theme.breakpoints.down('md')]: {
      maxHeight: 300
    },
    [theme.breakpoints.down('lg')]: {
      maxHeight: 385
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
    width: '0.85em'
  },
  hidden: {
    display: 'none'
  },
  flexContainer: {
    display: 'flex'
  },
  iconContainer: {
    flexGrow: 1,
    position: 'relative',
    padding: '3px 0 0 6px'
  },
  avatar: {
    margin: theme.spacing.unit / 4
  },
  pinkAvatar: {
    color: '#fff',
    backgroundColor: pink[500]
  },
  greenAvatar: {
    color: '#fff',
    backgroundColor: lighten(theme.palette.primary.dark, 0.2)
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
