import deepOrange from "material-ui/colors/deepOrange";
import deepPurple from "material-ui/colors/deepPurple";
import pink from "material-ui/colors/pink";
import red from "material-ui/colors/red";

export function appHeaderStyles(theme) {
  const drawerWidth = 240;
  return {
    appBar: {
      position: "fixed",
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    drawerInner: {
      // Make the items inside not wrap when transitioning:
      width: drawerWidth
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: "0 8px",
      ...theme.mixins.toolbar
    },
    drawerPaperClose: {
      width: 60,
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    menuButton: {
      marginLeft: 12,
      marginRight: 36
    },
    hide: {
      display: "none"
    },
    info: {
      display: "flex",
      flexDirection: "row",
      margin: theme.spacing.unit
    },
    searchBoxLabel: {
      color: "#fff"
    },
    searchBoxInput: {
      width: 200,
      color: "#fff"
    },
    modeIcon: {
      margin: theme.spacing.unit + 10
    },
    mode: {
      fontFamily: "'Open Sans', sans-serif",
      fontWeight: "bold",
      textAlign: "center",
      marginTop: theme.spacing.unit + 15
    }
  };
}

export function appHeaderContentStyles() {
  return {
    iconHover: {
      "&:hover": {
        fill: "rgb(225, 0, 80)"
      }
    }
  };
}

export function packagesListStyles(theme) {
  return {
    flexRow: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start"
    },
    flexColumn: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start"
    },
    heading: {
      margin: "1em 0 0.7em",
      fontSize: "1.5rem",
      fontWeight: 400,
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      lineHeight: "1.35417em"
    },
    avatar: {
      margin: 20
    },
    iconbutton: {
      position: "relative",
      top: "15px",
      marginLeft: "auto"
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200
    },
    directory: {
      margin: theme.spacing.unit + 5
    },
    chip: {
      margin: theme.spacing.unit
    },
    lcontainer: {
      overflowY: "auto"
    },
    list: {
      visibility: "visible",
      overflowX: "hidden",
      overflowY: "auto",
      clear: "both",
      maxHeight: "750px"
    }
  };
}
