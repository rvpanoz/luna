import { grayColor } from 'styles/variables';
import { lighten } from '@material-ui/core/styles/colorManipulator';

const styles = (theme) => ({
  root: {
    borderRadius: 4,
  },
  squared: {
    borderRadius: 0,
  },
  outlined: {
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${lighten(grayColor, 0.5)}`,
  },
});

export default styles;
