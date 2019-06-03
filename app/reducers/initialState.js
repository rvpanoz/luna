/**
 * Application's initial state structure
 */

const initialState = {
  manager: 'npm',
  mode: 'global',
  directory: null,
  onlineStatus: 'offline',
  operations: {
    action: null,
    packagesInstallOptions: []
  },
  notifications: [],
  npm: {
    commands: [],
    env: '',
    command_error: '',
    command_message: '',
    operationStatus: 'idle',
    operationPackages: [],
    operationCommand: null,
    auditData: null,
    doctorData: null
  },
  ui: {
    paused: false,
    activePage: 'packages',
    commandsErrors: [],
    dialog: {
      open: false,
      report: {
        name: null,
        content: null
      }
    },
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
      }
    },
    pagination: {
      page: 0,
      rowsPerPage: 10
    },
    snackbar: {
      type: 'info',
      open: false,
      message: null
    },
    sorting: {
      sortBy: 'name',
      sortDir: 'asc'
    },
    selected: [],
    uiException: null
  },
  packages: {
    active: null,
    packagesFromSearch: [],
    packagesData: [],
    packagesOutdated: [],
    project: {
      name: null,
      version: null,
      description: null,
      license: null,
      author: null
    },
    metadata: {
      lastUpdatedAt: null,
      fromSearch: false,
      fromSort: false
    }
  }
};

export default initialState;
