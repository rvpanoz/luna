import React from 'react';
import { string, objectOf, func, bool, object, arrayOf } from 'prop-types';
import { withStyles } from '@material-ui/styles';

import { AppTabs, AppLogo } from 'components/common/';
import {
  PackagesTab,
  ActionsTab,
  HistoryTab
} from 'components/views/sidebar/tabs';

import styles from './styles/sidebar';

const Sidebar = ({ classes, loading, mode, history, loadDirectory, updatedAt, tabPackagesData }) => <div className={classes.root}>
  <AppLogo />
  <AppTabs>
    <PackagesTab items={tabPackagesData} updatedAt={updatedAt} loading={loading} />
    <ActionsTab
      onClick={() => { }}
      mode={mode}
      loading={loading}
    />
    <HistoryTab
      directories={history}
      onClick={loadDirectory}
      loading={loading}
    />
  </AppTabs>
</div>

Sidebar.propTypes = {
  classes: objectOf(string).isRequired,
  mode: string.isRequired,
  loading: bool,
  history: arrayOf(object),
  loadDirectory: func,
  updatedAt: string,
  tabPackagesData: arrayOf(object)
};

export default withStyles(styles)(Sidebar);
