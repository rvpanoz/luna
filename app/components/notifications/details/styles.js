import { flexContainer, defaultFont } from 'styles/variables';

const styles = (theme) => ({
  toolbar: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardHeader: {
    padding: theme.spacing(1),
  },
  subheader: {
    paddingTop: theme.spacing(1),
  },
  cardContent: {
    maxHeight: 375,
    overflowY: 'scroll',
    overflowX: 'hidden',
    padding: theme.spacing(1),
  },
});

export default styles;
