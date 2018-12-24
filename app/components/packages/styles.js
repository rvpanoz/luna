/* eslint-disable */
import { lighten } from '@material-ui/core/styles/colorManipulator';

export const listStyles = theme => ({
  root: {
    width: '100%'
  },
  none: {
    display: 'none'
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
    overflowX: 'hidden',
    overflowY: 'auto',
    clear: 'both',
    maxHeight: 850
  },
  table: {
    marginBottom: 0,
    width: '100%',
    maxWidth: '100%',
    backgroundColor: 'transparent',
    borderSpacing: 0,
    borderCollapse: 'collapse'
  },
  tableCell: {
    fontSize: 14,
    lineHeight: '1.4em',
    padding: '12px 8px',
    verticalAlign: 'middle'
  },
  hasFilterBlur: {
    filter: 'blur(15px)'
  },
  outdated: {
    color: lighten(theme.palette.secondary.dark, 0.85)
  }
});

export const tableHeaderStyles = theme => ({
  tableHeadCell: {
    color: 'inherit',
    fontSize: 14
  },
  tableCell: {
    lineHeight: '1.50',
    padding: '0px 13px',
    verticalAlign: 'middle'
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
  }
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
