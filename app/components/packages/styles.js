/* eslint-disable */

export const listStyles = theme => ({
  root: {
    width: '100%',
    marginTop: 15
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
  }
});
