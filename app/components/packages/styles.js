import deepOrange from "material-ui/colors/deepOrange";
import deepPurple from "material-ui/colors/deepPurple";
import pink from "material-ui/colors/pink";
import red from "material-ui/colors/red";

export function listStyles(theme) {
  return {
    root: {
      width: "100%"
    },
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
      margin: "0.5em 0 1.0em",
      fontSize: "1.5rem",
      fontWeight: 400,
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      lineHeight: "1.35417em"
    },
    avatar: {
      margin: "0.5em"
    },
    iconbutton: {
      position: "relative",
      top: "7px",
      marginLeft: "auto"
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200
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
    },
    directory: {
      fontSize: "0.9em",
      overflowWrap: "break-word",
      overflow: "hidden"
    }
  };
}
