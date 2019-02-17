export default {
  mode: 'global',
  manager: 'npm',
  activePage: 'packages',
  directory: null,
  enableNotifications: false,
  page: 0,
  rowsPerPage: 10,
  notifications: [],
  commands: [],
  npm: {
    env: ''
  },
  uiException: {
    message: null
  },
  snackbarOptions: {
    open: false,
    message: null
  },
  loader: {
    loading: false,
    message: null
  },
  packageLoader: {
    loading: false,
    message: null
  },
  packages: {
    projectName: null,
    projectVersion: null,
    projectDescription: null,
    projectLicense: null,
    projectAuthor: null,
    sortBy: 'name',
    sortDir: 'asc',
    action: {
      name: null,
      error: null
    },
    packages: [],
    packagesOutdated: [],
    selected: [],
    packagesInstallOptions: [],
    filters: [],
    active: null,
    lastUpdatedAt: null,
    fromSearch: false,
    fromSort: false
  },
  metadata: {}
};
