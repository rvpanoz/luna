export function loaderStyles() {
  return {
    root: {
      position: 'fixed',
      top: '50%',
      left: '50%',
      zIndex: 999,
      '&:before': {
        content: '" "',
        display: 'block',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
      }
    }
  }
}
