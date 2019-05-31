import { defaultFont, grayColor, flexContainer } from 'styles/variables';

const styles = theme => ({
  root: {
    ...flexContainer,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    margin: theme.spacing.unit,
    padding: theme.spacing.unit,
  },
  text: {
    ...defaultFont,
    color: grayColor
  }
});

export default styles;
