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
    }
  }
}
