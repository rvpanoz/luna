export const INFO_MESSAGES = {
  loading: 'Loading packages..',
  loadingPackage: 'Loading package..',
  noData: 'No dependencies found.',
  loaded: 'Package loaded.',
  showingGlobals: 'Showing globals',
  workingDirectory: 'Working directory',
  installingPackages: 'Please wait. Installing packages..',
  updating: 'Please wait. Updating packages..',
  npmInstallInfo: 'Install all packages from package.json',
  npmAuditInfo: 'Scan project for vulnerabilities',
  npmDoctorInfo: 'Run a set of checks to ensure your npm installation',
  npmAuditHelperText: 'Navigate to actions tab and run npm audit',
  npmDoctorHelperText: 'Navigate to actions tab and run npm doctor',
  noNotifications: 'No problems',
  notGlobalModeAvailable: 'Not available in global mode',
  notificationsHelperText: 'Woohoo! There are not any problems found.',
  npmAuditVulnerabiliesHelperText: 'Known valnerabilities in your project',
  createPackageJsonHelperText:
    'Create a new package.json file in directory and start working.',
  noPackages: 'No packages found',
  noAuditData: 'No audit data',
  noDoctorData: 'No doctor data',
  searching: 'Searching npm registry..',
  directorySelection: 'Select directory',
  directory: 'Directory',
  createPackageJsonNote: 'Note: npm init will run with the default parameters.'
};

export const ACTION_MESSAGES = {
  create: 'Create',
  cancel: 'Cancel',
  filter: 'Filter',
  close: 'Close'
};

export const LABEL_MESSAGES = {
  packageName: 'Package name',
  packageNameInput: 'Fill package name',
  groupType: 'Select packages based on group',
  byOutdated: 'Select outdated packages',
  status: 'Status'
};

export const TITLE_MESSAGES = {
  audit: 'Audit report',
  doctor: 'Doctor results',
  loadDirectory: 'Load a directory from a package.json file',
  selectPackageJson: 'Select package.json file',
  installationOptionsTitle: 'Please select installation options',
  system: 'Preview system',
  create: 'Create a package.json file',
  switchGlobals: 'Switch to global packages',
  showFilters: 'Show filters',
  installSelected: 'Install selected',
  clearFilters: 'Clear filters',
  searchPackage: 'Search for package',
  clearActive: 'Clear active package',
  packageDependencies: 'Package dependencies',
  packageVersions: 'Package versions',
  packageInstall: 'Install package',
  packageUninstall: 'Uninstall package',
  packageUpdate: 'Update package',
  packageUpdateLatest: 'Update to latest version',
  installLatest: 'Install latest version',
  updateSelected: 'Update selected packages',
  noNotifications: 'No problems',
  notificationsHelperText: 'No problems found.',
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
