import { defaultFont, grayColor, flexContainer } from 'styles/variables';

const styles = theme => ({
  root: {
    ...flexContainer,
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    margin: theme.spacing.unit,
    padding: theme.spacing.unit
  },
  containerHolder: {
    ...flexContainer,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  textHolder: {
    ...defaultFont,
    paddingBottom: theme.spacing.unit,
    color: grayColor
  },
  buttonHolder: {
    ...defaultFont
  }
});

export default styles;
