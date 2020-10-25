import { flexContainer, defaultFont } from 'styles/variables';

const styles = (theme) => ({
  transition: {
    transition: theme.transitions.create('width', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  toolbar: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  wrapper: {
    whiteSpace: 'nowrap',
    overflowY: 'scroll',
    padding: theme.spacing(1),
  },
  listItem: {
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: theme.palette.secondary.light,
    },
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
