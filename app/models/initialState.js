/**
 * Application's initial state structure
 */

const initialState = {
  manager: 'npm',
  mode: 'global',
  onlineStatus: 'offline',
  directory: null,
  operations: {
    action: null,
    packagesInstallOptions: [],
  },
  notifications: {
    active: null,
    notifications: [],
  },
  npm: {
    commands: [],
    env: '',
    command_error: '',
    command_message: '',
    operationStatus: 'idle',
    operationPackages: [],
    operationCommand: null,
    audit: {
      result: null,
      fix: false,
    },
    doctor: {
      result: null,
      error: false,
    },
    cache: {
      result: null,
      error: false,
    },
  },
  ui: {
    paused: false,
    activePage: 'packages',
    commandsErrors: [],
    dialog: {
      open: false,
      report: {
        name: null,
        content: null,
      },
    },
    filtering: {
      filters: [],
    },
    loaders: {
      loader: {
        loading: false,
        message: null,
      },
      packageLoader: {
        loading: false,
        message: null,
      },
      auditLoader: {
        loading: false,
        message: null,
      },
      doctorLoader: {
        loading: false,
        message: null,
      },
    },
    pagination: {
      page: 0,
      rowsPerPage: 25,
    },
    snackbar: {
      type: 'info',
      open: false,
      message: null,
      positiom: {
        vertical: 'bottom',
        horizontal: 'right',
      },
      hideOnClose: false,
    },
    sorting: {
      sortBy: 'name',
      sortDir: 'asc',
    },
    selected: [],
    uiException: null,
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
      author: null,
    },
    metadata: {
      lastUpdatedAt: null,
      fromSearch: false,
      fromSort: false,
    },
  },
};

export default initialState;
