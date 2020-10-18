import React from 'react';
import { string, objectOf, func, bool, object, arrayOf } from 'prop-types';
import { withStyles } from '@material-ui/styles';

import { AppLogo } from 'components/common';
import { PackagesTab, ProjectTab, HistoryTab } from './tabs';
import Tabs from './tabs/Tabs';
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
  dedupe,
  cache,
}) => (
  <>
    <AppLogo />
    <Tabs>
      <PackagesTab
        items={tabPackagesData}
        updatedAt={updatedAt}
        loading={loading}
        fromSearch={fromSearch}
        projectInfo={projectInfo}
        mode={mode}
        npmEnv={npmEnv}
      />
      <ProjectTab projectInfo={projectInfo} npmEnv={npmEnv} />
      <HistoryTab
        directories={history}
        onClick={loadDirectory}
        loading={loading}
      />
    </Tabs>
  </>
);

Sidebar.propTypes = {
  classes: objectOf(string).isRequired,
  mode: string.isRequired,
  loading: bool,
  history: arrayOf(object),
  loadDirectory: func.isRequired,
  installPackagesFromJson: func.isRequired,
  dedupe: func.isRequired,
  cache: func.isRequired,
  updatedAt: string,
  projectInfo: objectOf(string).isRequired,
  npmEnv: object,
  fromSearch: bool,
  tabPackagesData: arrayOf(object),
};

export default withStyles(styles)(Sidebar);
