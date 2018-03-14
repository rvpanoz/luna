import { lighten } from "material-ui/styles/colorManipulator";
9;

export function listStyles(theme) {
  return {
    root: {
      width: "100%",
      marginTop: theme.spacing.unit * 3
    },
    table: {
      minWidth: 800
    },
    tableWrapper: {
      overflowX: "auto"
    }
  };
}

export function toolbarStyles(theme) {
  return {
    root: {
      paddingRight: theme.spacing.unit
    },
    highlight:
      theme.palette.type === "light"
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85)
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark
          },
    spacer: {
      flex: "1 1 100%"
    },
    actions: {
      color: theme.palette.text.secondary
    },
    title: {
      flex: "0 0 auto"
    }
  };
}
