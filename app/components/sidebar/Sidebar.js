import React from 'react';
import { string, objectOf, func, bool, object, arrayOf } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Tabs from './tabs/Tabs';
import { PackagesTab, ActionsTab, HistoryTab } from './tabs';
import Logo from '../common/logo/Logo';

import styles from './styles';

const Sidebar = ({
  classes,
  loading,
  fromSearch,
  mode,
  history,
  loadDirectory,
  updatedAt,
  tabPackagesData,
  projectInfo,
  npmEnv,
  installPackagesFromJson,
  onDedupe,
  cache,
}) => {
  return (
    <>
      <Logo />
      <Tabs className={classes.tabs}>
        <PackagesTab
          items={tabPackagesData}
          updatedAt={updatedAt}
          loading={loading}
          fromSearch={fromSearch}
          projectInfo={projectInfo}
          mode={mode}
          npmEnv={npmEnv}
        />
        <ActionsTab
          mode={mode}
          onInstallPackagesFromJson={installPackagesFromJson}
          onDedupe={onDedupe}
        />
        <HistoryTab
          directories={history}
          onHistoryClick={loadDirectory}
          loading={loading}
        />
      </Tabs>
    </>
  );
};

Sidebar.propTypes = {
  mode: string.isRequired,
  loading: bool,
  history: arrayOf(object),
  loadDirectory: func.isRequired,
  installPackagesFromJson: func.isRequired,
  onDedupe: func.isRequired,
  cache: func.isRequired,
  projectInfo: objectOf(string).isRequired,
  updatedAt: string,
  npmEnv: object,
  fromSearch: bool,
  tabPackagesData: arrayOf(object),
};

export default withStyles(styles)(Sidebar);
