export const INFO_MESSAGES = {
  noVulnerabilities: 'No issues found',
  noHistory: 'History is empty',
  loading: 'Loading packages..',
  loadingPackage: 'Loading package..',
  noData: 'No dependencies found',
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
  createPackageJsonHelperText: 'Create a new package.json file',
  noPackages: 'No packages found',
  noAuditData: 'No audit data',
  noDoctorData: 'No doctor data',
  searching: 'Searching npm registry..',
  directorySelection: 'Select directory',
  directory: 'Directory',
  updatedAt: 'Updated at',
  auditCompleted: 'npm audit completed',
  createPackageJsonNote: 'Note: npm init will run with the default parameters.',
  auditFix:
    'Automatically install any compatible updates to vulnerable dependencies',
  auditForce:
    'Have audit fix install semver-major updates to toplevel dependencies, not just semver-compatible ones',
  backToPackages: 'Back to packages'
};

export const ACTION_MESSAGES = {
  analyze: 'Analyze',
  npmInstall: 'npm install',
  npmDoctor: 'npm doctor',
  install: 'Install',
  update: 'Update',
  view: 'View',
  uninstall: 'Uninstall',
  create: 'Create',
  cancel: 'Cancel',
  filter: 'Filter',
  close: 'Close',
  runDoctor: 'Run doctor',
  runAudit: 'Run audit',
  runAuditFix: 'Fix',
  runAuditFixForce: 'Force',
  runAuditFixProd: 'Fix only prod',
  runAuditFixDev: 'Fix only dev',
  runAuditFixLock: 'Fix only lock'
};

export const LABEL_MESSAGES = {
  versions: 'Versions',
  latest: 'Latest',
  next: 'Next',
  homepage: 'Homepage',
  repository: 'Repository',
  tarball: 'Tarball',
  engines: 'Engines',
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
  low: 'Low',
  moderate: 'Moderate',
  moduleName: 'Module',
  title: 'Title',
  patched_versions: 'Patched versions',
  severity: 'Severity',
  vulnerableVersions: 'Vulnerable versions',
  recommendation: 'Recommendation',
  visitAdvisory: 'Security advisory page',
  findings: 'Findings',
  access: 'Access',
  created: 'Created at',
  updated: 'Updated at'
};

export const TITLE_MESSAGES = {
  switchToGlobals: 'Switch to globals',
  notifications: 'Notifications',
  dashboard: 'Dashboard',
  dependencies: 'Dependencies',
  devDependencies: 'Development',
  optionalDependencies: 'Optional',
  bundleDependencies: 'Bundle',
  issues: 'Issues',
  actions: 'Actions',
  total: 'Total',
  vulnerabilities: 'Vulnerabilities',
  overview: 'Overview',
  audit: 'Audit',
  doctor: 'Doctor',
  loadDirectory: 'Load a directory from a package.json file',
  selectPackageJson: 'Select package.json file',
  installationOptions: 'Please select installation options',
  settings: 'Settings',
  switchGlobals: 'Switch to global packages',
  showFilters: 'Show filters',
  clearFilters: 'Clear filters',
  searchPackage: 'Search for package',
  clearActive: 'Close',
  packages: 'Packages',
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
  listReload: 'Reload',
  createPackageJson: 'Create a package.json file',
  doctorReport: 'Doctor report'
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

export const WARNING_MESSAGES = {
  noGlobalAudit: 'You can not run npm audit on global packages',
  peerMissing:
    'You have %packages% with peer missing. Check your notifications to fix it.',
  errorPackages:
    'Some packages have errors. Check your notifications to fix it.',
  yarnlock:
    'It is advised not to mix package managers in order to avoid resolution inconsistencies caused by unsynchronized lock files. \nTo clear this warning, remove yarn-lock.json.',
};

export const ERROR_MESSAGES = {
  installationError: 'Installation error',
  updateError: 'Update error',
  uninstallError: 'Uninstall error',
};
