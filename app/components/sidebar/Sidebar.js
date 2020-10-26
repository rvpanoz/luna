import React from 'react';
import { string, objectOf, func, bool, object, arrayOf } from 'prop-types';

import Tabs from './tabs/Tabs';
import { PackagesTab, ActionsTab, HistoryTab } from './tabs';
import { Logo } from '../common/logo';

const Sidebar = ({
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
}) => {
  return (
    <>
      <Logo />
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
        <HistoryTab
          directories={history}
          onHistoryClick={loadDirectory}
          loading={loading}
        />
        <ActionsTab
          mode={mode}
          onInstallPackagesFromJson={installPackagesFromJson}
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
  dedupe: func.isRequired,
  cache: func.isRequired,
  updatedAt: string,
  projectInfo: objectOf(string).isRequired,
  npmEnv: object,
  fromSearch: bool,
  tabPackagesData: arrayOf(object),
};

export default Sidebar;
