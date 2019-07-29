const styles = theme => ({
    root: {
        zIndex: 99999,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        paddingTop: theme.spacing(1) + 3,
    },
    divider: {
        margin: theme.spacing(1, 0)
    }
});

export default styles;
