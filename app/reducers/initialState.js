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
    active: null,
    data: {
      packages: [],
      packagesOutdated: []
    },
    operations: {
      selected: [],
      packagesInstallOptions: [],
      action: {
        name: null,
        error: null
      }
    },
    project: {
      name: null,
      version: null,
      description: null,
      license: null,
      author: null
    },
    sortings: {
      sortBy: 'name',
      sortDir: 'asc'
    },
    filtering: {
      filters: []
    },
    metadata: {
      lastUpdatedAt: null,
      fromSearch: false,
      fromSort: false
    }
  },
  metadata: {}
};
