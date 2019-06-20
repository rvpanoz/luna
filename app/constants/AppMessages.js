export const INFO_MESSAGES = {
  loading: 'Loading packages..',
  loadingPackage: 'Loading package..',
  noData: 'No dependencies found.',
  loaded: 'Package loaded.',
  updating: 'Please wait. Updating packages..',
  installing: 'Please choose installation options',
  fixOptions: 'Please choose fix options',
  npmInstallInfo: 'Install all packages from package.json',
  npmAuditInfo: 'Scan project for vulnerabilities',
  npmAuditVulnerabiliesFound:
    'The audit command found %total% known vulnerabilities in your project',
  npmDoctorInfo: 'Run a set of checks to ensure your npm installation',
  loadDirectory: 'Load a directory from a package.json file',
  extraneous:
    'Found extraneous packages. Run npm prune from the Tools tab to fix them.',
  confirmNpmInstall: `Would you like to install all the packages from \n%directory% \n\nNote: This process will take some time `,
  confirmNpmSearch: 'Would you like to search for %packageName%?',
  confirmNpmInstallPackage: 'Do you want to install %name%?',
  confirmNpmUninstallPackage: 'Do you want to uninstall %name%?',
  confirmNpmUpdatePackage: 'Do you want to update %name%?',
  confirmNpmInstallPackageLatest:
    'Do you want to install %name% latest version?',
  confirmNpmInstallPackageVersion:
    'Do you want to install %name% version %version%?',
  noNotifications: 'No problems',
  noPackages: 'No packages found',
  noAuditData: 'No audit data',
  noDoctorData: 'No doctor data',
  installationOptionsTitle: 'Please select installation options'
};

export const WARNING_MESSAGES = {
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
