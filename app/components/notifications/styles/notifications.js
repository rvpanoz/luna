import { flexContainer, defaultFont } from 'styles/variables';

const styles = (theme) => ({
  transition: {
    transition: theme.transitions.create('width', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  toolbar: {
    width: '100%',
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
});

export default styles;
