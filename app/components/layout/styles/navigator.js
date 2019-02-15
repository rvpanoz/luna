import { flexContainer } from 'styles/variables';

const styles = theme => ({
  flexContainer: {
    ...flexContainer,
    alignItems: 'center'
  },
  flexItem: {
    padding: theme.spacing.unit
  },
  categoryHeader: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit
  },
  categoryHeaderPrimary: {
    color: theme.palette.common.white
  },
  item: {
    padding: theme.spacing.unit,
    color: 'rgba(255, 255, 255, 0.7)'
  },
  itemCategory: {
    backgroundColor: '#232f3e',
    boxShadow: '0 -1px 0 #404854 inset',
    padding: theme.spacing.unit / 2
  },
  homeIcon: {
    fill: '#fff'
  },
  title: {
    fontSize: 24,
    fontFamily: 'Din-Bold',
    color: theme.palette.secondary.light
    // WebkitTextStroke: '1px white'
  },
  itemActionable: {
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.08)'
    }
  },
  itemActiveItem: {
    color: theme.palette.primary.light
  },
  itemPrimary: {
    color: 'inherit',
    fontSize: theme.typography.fontSize,
    '&$textDense': {
      fontSize: theme.typography.fontSize
    }
  },
  textDense: {
    paddingTop: theme.spacing.unit / 2
  },
  divider: {
    marginTop: theme.spacing.unit * 2
  }
});

export default styles;
