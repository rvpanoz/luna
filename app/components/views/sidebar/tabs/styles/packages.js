import { defaultFont, grayColor, flexContainer } from 'styles/variables';
import { darken, lighten } from '@material-ui/core/styles/colorManipulator';

const styles = theme => ({
  flexContainer: {
    ...flexContainer
  },
  card: {
    width: 268,
  },
  cardTitle: {
    ...defaultFont,
    fontSize: 20,
    paddingBottom: theme.spacing(1)
  },
  cardFlexContainer: {
    ...flexContainer,
    width: '100%',
    justifyContent: 'space-between',
    padding: theme.spacing(1),
    alignItems: 'center'
  },
  cardFlexContainerInner: {
    ...flexContainer,
    alignItems: 'center'
  },
  cardLabel: {
    ...defaultFont,
    fontSize: 12,
    color: darken(grayColor, 0.5)
  },
  tab: {
    width: '100%',
    minHeight: 150
  },
  listItem: {
    margin: 0
  },
  loader: {
    paddingTop: theme.spacing(1)
  },
  updateIcon: {
    color: lighten(theme.palette.primary.main, 0.2),
    marginRight: theme.spacing(1)
  },
  primaryColor: {
    color: theme.palette.primary.main
  },
  secondaryColor: {
    color: theme.palette.secondary.main
  },
  warningColor: {
    color: theme.palette.warning.light
  },
  errorColor: {
    color: theme.palette.error.light
  }
});

export default styles;
