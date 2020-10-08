import { defaultFont, flexContainer } from 'styles/variables';

const styles = (theme) => ({
  container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: theme.spacing(1) * 4,
  },
  card: {
    width: '100%',
  },
});

export default styles;
