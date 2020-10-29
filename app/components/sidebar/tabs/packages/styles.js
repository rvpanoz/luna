import {
  defaultFont,
  grayColor,
  flexContainer,
  defaultBoxShadow,
} from 'styles/variables';
import { darken, lighten } from '@material-ui/core/styles/colorManipulator';

const styles = (theme) => ({
  flex: {
    ...flexContainer,
  },
  card: {
    width: 270,
  },
  title: {
    ...defaultFont,
    fontSize: 20,
    paddingBottom: theme.spacing(1),
  },
  content: {
    minHeight: 150,
  },
  cardFlexContainer: {
    ...flexContainer,
    width: '100%',
    justifyContent: 'space-between',
    padding: theme.spacing(1),
    alignItems: 'center',
  },
  cardFlexContainerInner: {
    ...flexContainer,
    alignItems: 'center',
  },
  cardLabel: {
    ...defaultFont,
    fontSize: 12,
    color: darken(grayColor, 0.5),
  },
  tab: {
    width: '100%',
    minHeight: 115,
  },
  loading: {
    ...defaultFont,
    paddingTop: theme.spacing(1),
    fontSize: 14,
    color: darken(grayColor, 0.5),
  },
  listItem: {
    margin: 0,
  },
  secondaryText: {
    ...defaultFont,
    color: darken(grayColor, 0.2),
    fontSize: 12,
  },
  loader: {
    paddingTop: theme.spacing(1),
  },
  updateIcon: {
    color: darken(grayColor, 0.2),
    marginRight: theme.spacing(1) / 2,
  },
  primaryColor: {
    color: theme.palette.primary.main,
  },
  secondaryColor: {
    color: theme.palette.secondary.main,
  },
  warningColor: {
    color: theme.palette.error.light,
  },
  errorColor: {
    color: theme.palette.error.light,
  },
});

export default styles;
