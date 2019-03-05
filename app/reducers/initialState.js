export default {
  mode: 'global',
  manager: 'npm',
  activePage: 'packages',
  directory: null,
  enableNotifications: true,
  notifications: [],
  npm: {
    commands: [],
    paused: false,
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
  modules: {
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
    sorting: {
      sortBy: 'name',
      sortDir: 'asc'
    },
    filtering: {
      filters: []
    },
    pagination: {
      page: 0,
      rowsPerPage: 10
    },
    metadata: {
      lastUpdatedAt: null,
      fromSearch: false,
      fromSort: false
    }
  }
};
