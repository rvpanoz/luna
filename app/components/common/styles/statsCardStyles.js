import { flexContainer, flexItem } from 'styles/variables';

const styles = theme => ({
  card: {
    background: '#fff',
    padding: theme.spacing.unit,
    WebkitTransition: 'all 200ms ease-out',
    MozTransition: 'all 200ms ease-out',
    OTransition: 'all 200ms ease-out',
    transition: 'all 200ms ease-out'
  },
  cardBox: {
    ...flexContainer
  },
  text: {
    ...flexItem,
    fontSize: 22,
    color: '#393c45'
  }
});

export default styles;
