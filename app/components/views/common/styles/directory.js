import { flexContainer } from 'styles/variables';

const styles = theme => ({
    root: {
        ...flexContainer,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingBottom: theme.spacing(3)
    },
    flexGrow: {
        flexGrow: 1
    }
});

export default styles;
