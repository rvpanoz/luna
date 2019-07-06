import { lighten } from '@material-ui/core/styles/colorManipulator';
import { defaultFont } from 'styles/variables';

const styles = theme => ({
    divider: {
        margin: theme.spacing.unit
    },
    header: {
        ...defaultFont,
        backgroundColor: lighten(theme.palette.secondary.light, 0.9),
        fontSize: 20,
        fontWeight: 400,
        padding: theme.spacing.unit
    },
    paper: {
        width: '100%'
    },
    listItem: {
        padding: theme.spacing.unit,
        margin: 0
    },
    wrapper: {
        width: '100%'
    },
    withPadding: {
        padding: theme.spacing.unit
    }
});

export default styles;
