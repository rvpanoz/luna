const fontWeightMedium = 600;

export function themeA() {
  return {
    palette: {
      type: "dark",
      primary: {
        contrastText: "rgba(255, 255, 255, 0.87)",
        dark: "#0c1f2c",
        light: "#00b8d4",
        main: "#074b63"
      },
      secondary: {
        contrastText: "rgba(255, 255, 255, 0.87)",
        dark: "#CB2140",
        light: "#00b8d4",
        main: "#074b63"
      },
      text: {
        primary: "rgb(0,0,0,0.87)",
        secondary: "#9e9e9e"
      },
      background: {
        contentFrame: "rgb(0,0,1)"
      },
      input: {
        bottomLine: "rgba(255, 255, 255, 1)"
      },
      typography: {
        fontFamily:
          "-apple-system,system-ui,BlinkMacSystemFont," +
          '"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif',
        fontWeightMedium,
        body1: {
          fontWeight: fontWeightMedium
        },
        button: {
          fontStyle: "italic"
        }
      }
    }
  };
}
