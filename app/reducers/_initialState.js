/**
 * Application's initial state structure
 */

const initialState = {
  active: null,
  directory: null,
  commandsErrors: {
    byId: [],
    allIds: []
  },
  manager: 'npm',
  mode: 'global',
  npm: {
    commands: [],
    paused: false,
    env: '',
    operationStatus: 'idle',
    operationPackages: [],
    operationCommand: null
  },
  onlineStatus: 'offline',
  packagesInstallOptions: {
    byName: [],
    allNames: []
  },
  project: {
    name: null,
    version: null,
    description: null,
    license: null,
    author: null
  },
  selected: {
    byName: [],
    allNames: []
  },
  ui: {
    activePage: 'packages',
    filtering: {
      filters: []
    },
    loaders: {
      loader: {
        loading: false,
        message: null
      },
      packageLoader: {
        loading: false,
        message: null
      },
      snackbarOptions: {
        open: false,
        message: null
      }
    },
    pagination: {
      page: 0,
      rowsPerPage: 10
    },
    sorting: {
      sortBy: 'name',
      sortDir: 'asc'
    },
    uiException: null
  },
  packages: {
    byName: [],
    allNames: []
  },
  packagesOutdated: {
    byName: [],
    allNames: []
  },
  notifications: {
    byId: [],
    allIds: []
  }
};

export default initialState;
