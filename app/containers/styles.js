import deepOrange from "material-ui/colors/deepOrange";
import deepPurple from "material-ui/colors/deepPurple";
import pink from "material-ui/colors/pink";
import red from "material-ui/colors/red";

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
export function layoutStyles(theme) {
  return {
    root: {
      position: "relative",
      width: "100%",
      height: "100%",
      zIndex: 1,
      overflow: "hidden"
    },
    content: {
      width: "100%",
      height: "100%",
      flexGrow: 1,
      overflow: "hidden",
      position: "relative",
      marginTop: 50,
      padding: 25
    },
    paper: {
      position: "absolute",
      width: theme.spacing.unit * 50,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing.unit * 4
    },
    heading: {
      margin: "1.5em 0 1em",
      fontSize: "1.5rem",
      fontWeight: 400,
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      lineHeight: "1.35417em"
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 300
    },
    button: {
      margin: theme.spacing.unit,
      fontStyle: "normal"
    }
  };
}
