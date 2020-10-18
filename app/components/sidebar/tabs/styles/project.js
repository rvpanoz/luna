import {
  defaultFont,
  grayColor,
  flexContainer,
  defaultBoxShadow,
} from 'styles/variables';
import { darken, lighten } from '@material-ui/core/styles/colorManipulator';

const styles = (theme) => ({
  flexContainer: {
    ...flexContainer,
  },
  card: {
    width: 266,
    marginBottom: theme.spacing(2),
  },
  cardTitle: {
    ...defaultFont,
    fontSize: 20,
    paddingBottom: theme.spacing(1),
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
  info: {
    ...flexContainer,
    ...defaultFont,
    justifyContent: 'space-between',
    marginTop: theme.spacing(1),
    fontSize: 14,
    color: darken(grayColor, 0.5),
  },
});

export default styles;
