export const INFO_MESSAGES = {
  loading: 'Loading packages..',
  loadingPackage: 'Loading package..',
  noData: 'No dependencies found.',
  loaded: 'Package loaded.',
  updating: 'Please wait. Updating packages..',
  installing: 'Please choose installation options',
  fixOptions: 'Please choose fix options',
  extraneous:
    'Found extraneous packages. Run npm prune from the Tools tab to fix them.'
};

export const WARNING_MESSAGES = {
  peerMissing:
    'You have packages with peer missing. Check your notifications to fix it.',
  errorPackages:
    'Some packages have errors. Check your notifications to fix it.',
  yarnlock:
    'yarn-lock file detected. Please remove it before running any action operation',
  newerSelected:
    'A package with the same name and newer version is already selected',
  oldorEqualSelected:
    'A package with the same name and same or lower version is already selected'
};

export const ERROR_MESSAGES = {
  offline: 'App is now offline. Your operations are limited.'
};
