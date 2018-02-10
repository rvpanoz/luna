const fontWeightMedium = 600

export function themeA() {
  return {
    palette: {
      type: 'dark',
      primary: {
        contrastText: 'rgba(255, 255, 255, 0.87)',
        dark: '#0C0D0D',
        light: '#D8537E',
        main: '#e06691'
      },
      secondary: {
        contrastText: 'rgba(255, 255, 255, 0.87)',
        dark: '#022335',
        light: '#ADD517',
        main: '#074b63'
      },
      text: {
        primary: '#fafafa',
        secondary: '#fafafa',
        divider: 'rgb(255,87,34)'
      },
      background: {
        avatar: 'rgb(255,87,34)'
      },
      input: {
        bottomLine: 'rgba(255, 255, 255, 1)'
      }
    },
    typography: {
      fontFamily:
        '-apple-system,system-ui,BlinkMacSystemFont,' +
        '"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif',
      fontWeightMedium,
      body1: {
        fontWeight: fontWeightMedium
      },
      button: {
        fontStyle: 'italic'
      }
    }
  }
}
