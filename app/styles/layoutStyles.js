const drawerWidth = 240

export function layoutStyles(theme) {
  return {
    wrapper: {
      position: 'relative',
      top: 0,
      height: '100%',
      overflow: 'hidden'
    },
    content: {
      flexGrow: 1,
      position: 'relative',
      marginTop: 50,
      marginLeft: 50,
      padding: 25,
      width: '100%',
      height: '100%'
    },
    'body *, html *': {
      boxSizing: 'border-box'
    },
    'html, body': {
      backgroundColor: theme.palette.shades['dark'].background.default,
      fontSize: '18px',
      margin: 0,
      padding: 0,
      fontFamily: '"Helvetica", "Arial", sans-serif'
    },
    a: {
      color: theme.palette.common.teal['500'],
      textDecoration: 'underline',
      cursor: 'pointer'
    },
    '.page-content': {
      paddingTop: '65px',
      flex: '1 1 100%',
      margin: '0 auto'
    }
  }
}
