import { defaultFont, flexContainer, grayColor } from 'styles/variables';
import { darken, lighten } from '@material-ui/core/styles/colorManipulator';

const styles = theme => ({
  root: {},
  container: {},
  marginTop: {
    marginTop: theme.spacing.unit * 2
  },
  card: {
    minHeight: "100%",
    display: "flex",
    flexDirection: "column"
  },
  innerContainer: {
    height: '100%',
    display: "flex",
    alignItems: "center",
    flexGrow: 1,
    padding: theme.spacing.unit
  },
  subtitle: {
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit * 2,
  },
  progressSection: {
    marginBottom: theme.spacing.unit
  },
  progressTitle: {
    marginBottom: theme.spacing.unit * 2
  },
  progress: {
    marginBottom: theme.spacing.unit,
    backgroundColor: theme.palette.primary.main
  },
  horizontalFlex: {
    display: 'flex',
    flexContainer: 'row',
    justifyContent: 'space-around',
    marginTop: theme.spacing.unit * 2
  },
  padLeft: {
    paddingLeft: theme.spacing.unit * 12
  },
  legendItemContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing.unit
  },
  halfWidth: {
    width: '50%'
  },
  fullHeightBody: {
    display: "flex",
    flexGrow: 1,
    flexDirection: "column"
  },
  tableWidget: {
    overflowX: "auto"
  },
  progressBar: {
    backgroundColor: theme.palette.warning.main
  },
  findingsWrapper: {
    display: "flex",
    flexGrow: 1,
    alignItems: "center",
    marginBottom: theme.spacing.unit
  },
  legendElement: {
    display: "flex",
    alignItems: "center",
    flexGrow: 0,
    marginRight: theme.spacing.unit * 2,
  },
  legendElementText: {
    marginLeft: theme.spacing.unit,
  },
  mainChartBody: {
    overflowX: 'auto',
  },
  mainChartHeader: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    [theme.breakpoints.only("xs")]: {
      flexWrap: 'wrap',
    }
  },
  mainChartHeaderLabels: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.only("xs")]: {
      order: 3,
      width: '100%',
      justifyContent: 'center',
      marginTop: theme.spacing.unit * 3,
      marginBottom: theme.spacing.unit * 2,
    }
  },
  mainChartHeaderLabel: {
    display: "flex",
    alignItems: "center",
    marginLeft: theme.spacing.unit * 3,
  },
  mainChartLegentElement: {
    fontSize: '18px !important',
    marginLeft: theme.spacing.unit,
  }
});

export default styles;
