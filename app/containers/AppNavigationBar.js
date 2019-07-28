import React from 'react';
import { useMappedState, useDispatch } from 'redux-react-hook';

import { setActivePage } from 'models/ui/actions'
import { DirectoryInfo } from 'components/views/common';

const mapState = ({
    common: { mode, directory },
    ui: {
        activePage,
        loaders: {
            loader: { loading }
        }
    },
    npm: { env } }) => ({
        activePage,
        mode,
        directory,
        env,
        loading
    });

const AppNavigationBar = () => {
    const {
        env,
        mode,
        directory,
        activePage
    } = useMappedState(mapState)

    const dispatch = useDispatch();

    const setActivePageHandler = (page) => dispatch(setActivePage({
        page,
        paused: true
    }))

    return <DirectoryInfo mode={mode} directory={directory} env={env} activePage={activePage} setActivePage={setActivePageHandler} />
};

export default AppNavigationBar;
