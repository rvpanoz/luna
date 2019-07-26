import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames'

import { useMappedState, useDispatch } from 'redux-react-hook';
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';

import Snackbar from '@material-ui/core/Snackbar';

import AppTopBar from 'containers/AppTopBar';
import AppSidebar from 'containers/AppSidebar';
import { SnackbarContent } from 'components/common';
import { Notifications } from 'components/views/notifications';

import { setSnackbar } from 'models/ui/actions';
import { switchcase, shrinkDirectory } from 'commons/utils';

import Packages from './Packages';
import Audit from './Audit';
import Doctor from './Doctor';

import styles from './styles/appLayout';

const mapState = ({
  common: { mode, directory, onlineStatus },
  ui: { activePage, snackbar }
}) => ({
  onlineStatus,
  activePage,
  mode,
  directory,
  snackbar
});

const AppLayout = ({ classes, children, theme }) => {
  const {
    activePage,
    snackbar,
    mode,
    directory,
    onlineStatus
  } = useMappedState(mapState);

  const dispatch = useDispatch();

  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
    defaultMatches: true
  });

  const sidebarOpen = isDesktop ? true : openSidebar;

  return (
    <MuiThemeProvider theme={theme}>
      <div
        className={cn({
          [classes.root]: true,
          [classes.shiftContent]: isDesktop
        })}
      >
        <AppTopBar />
        <AppSidebar open={sidebarOpen} />
        <main className={classes.content}>
          {switchcase({
            packages: () => <Packages />,
            problems: () => <Notifications />,
            audit: () => <Audit />
          })(<Packages />)(activePage)}
        </main>
      </div>
    </MuiThemeProvider>
  );
};

AppLayout.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired
};

export default withStyles(styles, {
  withTheme: true
})(AppLayout);
