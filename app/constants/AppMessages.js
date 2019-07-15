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
  createPackageJsonNote: 'Note: npm init will run with the default parameters.',
  run_audit_fix:
    'Automatically install any compatible updates to vulnerable dependencies',
  run_with_force:
    'Have audit fix install semver-major updates to toplevel dependencies, not just semver-compatible ones'
};

export const ACTION_MESSAGES = {
  create: 'Create',
  cancel: 'Cancel',
  filter: 'Filter',
  close: 'Close'
};

export const LABEL_MESSAGES = {
  dependencies: 'Dependencies',
  devDependencies: 'Development',
  optionalDependencies: 'Optional',
  bundleDependencies: 'Bundle',
  packageName: 'Package name',
  packageNameInput: 'Fill package name',
  groupType: 'Select packages based on group',
  byOutdated: 'Select outdated packages',
  status: 'Status',
  critical: 'Critical',
  info: 'Info',
  high: 'High',
  moderate: 'Moderate',
  module_name: 'Module',
  title: 'Title',
  patched_versions: 'Patched versions',
  severity: 'Severity'
};

export const TITLE_MESSAGES = {
  total: 'Total',
  vulnerabilities: 'Vulnerabilities',
  overview: 'Overview',
  audit: 'Audit report',
  doctor: 'Doctor results',
  loadDirectory: 'Load a directory from a package.json file',
  selectPackageJson: 'Select package.json file',
  installationOptions: 'Please select installation options',
  system: 'Preview system',
  create: 'Create a package.json file',
  switchGlobals: 'Switch to global packages',
  showFilters: 'Show filters',
  clearFilters: 'Clear filters',
  searchPackage: 'Search for package',
  clearActive: 'Close',
  packageDependencies: 'Package dependencies',
  packageVersions: 'Package versions',
  packageInstall: 'Install package',
  packageUninstall: 'Uninstall package',
  packageUpdate: 'Update package',
  packageUpdateLatest: 'Update to latest version',
  installVersion: 'Install version',
  installLatest: 'Install latest version',
  installSelected: 'Install selected packages',
  updatePackage: 'Update package',
  updateSelected: 'Update selected packages',
  uninstallSelected: 'Uninstall selected packages',
  noNotifications: 'No problems',
  notGlobalModeAvailable: 'Not available in global mode',
  notificationsHelperText: 'Woohoo! There are not any problems found.',
  npmAuditVulnerabiliesHelperText: 'Known valnerabilities in your project',
  noPackages: 'No packages found',
  noAuditData: 'No audit data',
  searching: 'Searching npm registry..',
  backList: 'Back to list',
  listReload: 'Reload'
};

export const CONFIRMATION_MESSAGES = {
  actionRun:
    '\nDo you want to run %name%?\nNote: This process will take some time',
  installAll: `\nDo you want to install all the packages from \n%directory% \nNote: This process will take some time `,
  installPackage: '\nDo you want to install %name%?',
  installSelected: '\nDo you want to install the selected packages?',
  installLatest: '\nDo you want to install %name% latest version?',
  installVersion: '\nDo you want to install %name% version %version%?',
  updatePackage: '\nDo you want to update %name%?',
  uninstallPackage: '\nDo you want to uninstall %name%?',
  searchPackage: '\nDo you want to search for %packageName%?',
  installLatestSelected:
    '\nDo you want to install the latest version of the selected packages?',
  updateSelected: '\nDo you want to update the selected packages?',
  uninstallSelected: '\nDo you want to uninstall the selected packages?',
  auditFix:
    '\nDo you want to run npm audit fix? \n\nIt will automatically install any compatible updates to vulnerable dependencies.',
  auditFixForce:
    '\nDo you want to run npm audit fix --force? \n\nInstall semver-major updates to toplevel dependencies, not just semver-compatible ones.',
  auditFixOnlyProd:
    '\nDo you want to run npm audit fix --only=prod?\n\nIt will skip updating devDependencies.',
  auditFixOnlyDev:
    '\nDo you want to run npm audit fix --only=dev? \n\nIt will skip updating dependencies.'
};

export const LABEL_MESSAGE = {
  packageName: 'Package name',
  packageNameInput: 'Fill package name',
  groupType: 'Select packages based on group',
  outdatedPackages: 'Select outdated packages'
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
