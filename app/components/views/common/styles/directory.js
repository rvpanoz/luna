import { flexContainer } from 'styles/variables';

const styles = theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        paddingTop: theme.spacing(1)
    },
    flexContainer: {
        ...flexContainer,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    flexGrow: {
        flexGrow: 1
    },
});

export default styles;
