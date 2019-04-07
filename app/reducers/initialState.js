/**
 * Application's initial state structure
 */

const initialState = {
  active: null,
  activePage: 'packages',
  directory: null,
  manager: 'npm',
  mode: 'global',
  onlineStatus: 'offline',
  operations: {
    operations: {
      packagesInstallOptions: []
    }
  },
  notifications: {
    byNotificationId: [],
    allNotificationsIds: []
  },
  npm: {
    commands: [],
    paused: false,
    env: '',
    command_error: '',
    command_message: '',
    operationStatus: 'idle',
    operationPackages: [],
    operationCommand: null
  },
  ui: {
    activePage: 'packages',
    commandsErrors: [],
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
  packagesData: {
    packages: {
      byName: [],
      allNames: []
    },
    packagesOutdated: {
      byPackageName: [],
      allPackagesNames: []
    },
    project: {
      name: null,
      version: null,
      description: null,
      license: null,
      author: null
    }
  }
};

export default initialState;
