export const INFO_MESSAGES = {
  loading: 'Loading packages..',
  loadingPackage: 'Loading package..',
  noData: 'No dependencies found.',
  loaded: 'Package loaded.',
  updating: 'Please wait. Updating packages..',
  installing: 'Please choose installation options',
  npmInstallInfo: 'Install all packages from package.json',
  npmAuditInfo: 'Scan project for vulnerabilities',
  npmAuditVulnerabiliesFound:
    'The audit command found %total% known vulnerabilities in your project',
  npmDoctorInfo: 'Run a set of checks to ensure your npm installation',
  npmAuditHelperText: 'Navigate to actions tab and run npm audit',
  npmDoctorHelperText: 'Navigate to actions tab and run npm doctor',
  loadDirectory: 'Load a directory from a package.json file',
  extraneous:
    'Found extraneous packages. Run npm prune from the Tools tab to fix them.',
  noNotifications: 'No problems',
  notificationsHelperText: 'Woohoo! There are not any problems found.',
  noPackages: 'No packages found',
  noAuditData: 'No audit data',
  noDoctorData: 'No doctor data'
};

export const CONFIRMATION_MESSAGES = {
  actionRun:
    'Would you like to run %actionName% \n\nNote: This process will take some time',
  installAll: `Would you like to install all the packages from \n%directory% \n\nNote: This process will take some time `,
  installPackage: 'Do you want to install %name%?',
  installLatest: 'Do you want to install %name% latest version?',
  installVersion: 'Do you want to install %name% version %version%?',
  updatePackage: 'Do you want to update %name%?',
  uninstallPackage: 'Do you want to uninstall %name%?',
  searchPackage: 'Would you like to search for %packageName%?',
  installLatestSelected:
    'Do you want to install the latest version of the selected packages?',
  updateSelected: 'Do you want to update the selected packages?',
  uninstallSelected: 'Do you want to uninstall the selected packages?'
};

export const LABEL_MESSAGE = {
  packageName: 'Package name',
  packageNameInput: 'Fill package name',
  groupType: 'Select packages based on group',
  outdatedPackages: 'Select outdated packages'
};

export const TITLE_MESSAGES = {
  selectPackageJson: 'Select package.json file',
  installationOptions: 'Please select installation options',
  system: 'Preview system',
  switchGlobals: 'Switch to global packages',
  showFilters: 'Show filters',
  installSelected: 'Install selected',
  clearFilters: 'Clear filters',
  searchPackage: `Search for %name%`,
  clearActive: 'Clear active package',
  packageDependencies: 'Package dependencies',
  packageVersions: 'Package versions',
  packageInstall: 'Install package',
  packageUninstall: 'Uninstall package',
  packageUpdate: 'Update package',
  packageUpdateLatest: 'Update to latest version',
  installLatest: 'Install latest version',
  updateSelected: 'Update selected packages'
};

export const WARNING_MESSAGES = {
  notGlobalModeAvailable: 'Not available in global mode',
  peerMissing:
    'You have %packages% with peer missing. Check your notifications to fix it.',
  errorPackages:
    'Some packages have errors. Check your notifications to fix it.',
  yarnlock:
    'yarn-lock file detected. Please remove it before running any action operation',
  newerSelected:
    'A package with the same name and newer version is already selected',
  oldorEqualSelected:
    'A package with the same name and same or lower version is already selected'
};

export const ERROR_MESSAGES = {};
