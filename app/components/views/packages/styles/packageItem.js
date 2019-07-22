import { darken, lighten } from "@material-ui/core/styles/colorManipulator";
import { flexContainer, defaultFont } from "styles/variables";

const styles = theme => ({
  flexContainer: {
    ...flexContainer,
    alignItems: "center",
    justifyContent: "space-between"
  },
  flexContainerCell: {
    ...flexContainer,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  tableRow: {
    border: "none",
    padding: 10,
    lineHeight: "1.1",
    verticalAlign: "middle",
    "&:hover": {
      cursor: "pointer"
    }
  },
  tableCell: {
    ...defaultFont,
    fontSize: "1rem",
    textAlign: "center",
    "& p": {
      overflowWrap: "break-word"
    }
  },
  loader: {
    marginLeft: theme.spacing.unit
  },
  name: {
    ...defaultFont,
    [theme.breakpoints.up("lg")]: {
      width: "auto"
    },
    [theme.breakpoints.down("md")]: {
      width: 200
    },
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    textAlign: "left"
  },
  group: {
    color: darken(theme.palette.secondary.light, 0.3)
  },
  statusMissing: {
    color: darken(theme.palette.secondary.main, 0.1)
  },
  statusOK: {
    color: lighten("#00b300", 0.3)
  },
  statusPeerMissing: {
    color: darken(theme.palette.secondary.main, 0.1)
  },
  statusOutdated: {
    color: lighten(theme.palette.warning.main, 0.3)
  },
  statusExtraneous: {
    color: darken(theme.palette.secondary.main, 0.1)
  },
  statusError: {
    color: darken(theme.palette.secondary.main, 0.1)
  }
});

export default styles;
