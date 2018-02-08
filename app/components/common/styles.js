export function folderListStyles(theme) {
  return {
    root: {
      width: '100%',
      maxWidth: 360,
      marginTop: 15,
      backgroundColor: theme.palette.background.paper
    },
    list: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'stretch'
    }
  }
}
