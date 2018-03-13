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

export function cardStyles(theme) {
  return {
    root: {
      marginTop: 0
    },
    button: {
      margin: theme.spacing.unit
    },
    card: {
      maxWidth: "100%"
    },
    content: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start"
    },
    collapseContent: {
      margin: theme.spacing.unit * 2
    },
    column: {
      flexBasis: "33.33%"
    },
    controls: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
      marginTop: theme.spacing.unit,
      "& fieldset": {
        margin: theme.spacing.unit
      }
    },
    details: {
      visibility: "visible",
      width: "100%",
      maxHeight: 200,
      marginBottom: 20,
      overflowX: "hidden",
      overflowY: "auto"
    },
    detailsAvatar: {
      marginTop: 15
    },
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 120,
      maxWidth: 300
    },
    textField: {
      margin: theme.spacing.unit,
      minWidth: 120,
      maxWidth: 300
    },
    chips: {
      display: "flex",
      flexWrap: "wrap"
    },
    chip: {
      margin: theme.spacing.unit / 4
    },
    description: {
      marginTop: 10
    },
    listItem: {
      paddingLeft: 0
    },
    actions: {
      display: "flex"
    },
    author: {
      flexGrow: 1
    },
    keywords: {
      flexGrow: 1,
      marginTop: 10
    },
    expand: {
      transform: "rotate(0deg)",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest
      }),
      marginLeft: "auto"
    },
    expandOpen: {
      transform: "rotate(180deg)"
    },
    updated: {
      fontSize: 12,
      fontWeight: 300,
      color: theme.palette.primary.dark,
      margin: "1em 0 0.7em"
    },
    center: {
      position: "absolute",
      top: "25%",
      left: "50%"
    },
    avatar: {
      backgroundColor: theme.palette.secondary.dark
    },
    heading: {
      color: "rgba(0, 0, 0, 0.54)",
      margin: "1em 0 0.7em",
      fontSize: "1.1rem",
      fontWeight: 400,
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      lineHeight: "1.35417em"
    },
    headingTail: {
      marginTop: 15
    },
    helper: {
      borderLeft: `2px solid ${theme.palette.divider}`,
      padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
    },
    link: {
      color: theme.palette.primary.main,
      textDecoration: "none",
      "&:hover": {
        textDecoration: "underline"
      }
    },
    innerList: {
      clear: "both",
      visibility: "visible",
      overflowX: "hidden",
      overflowY: "auto"
    },
    innerListLong: {
      maxHeight: "300px"
    },
    innerListSmall: {
      maxHeight: "200px"
    },
    actions: {
      display: "flex"
    },
    expand: {
      transform: "rotate(0deg)",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest
      }),
      marginLeft: "auto"
    },
    expandOpen: {
      transform: "rotate(180deg)"
    }
  };
}
