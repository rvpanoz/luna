import { flexContainer } from 'styles/variables';

const styles = theme => ({
    root: {
        display: 'flex',
    },
    flexContainer: {
        ...flexContainer,
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingBottom: theme.spacing(3)
    },
    flexGrow: {
        flexGrow: 1
    }
});

export default styles;
