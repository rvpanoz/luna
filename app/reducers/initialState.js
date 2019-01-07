export default {
  mode: 'GLOBAL',
  manager: 'npm',
  page: 0,
  rowsPerPage: 10,
  directory: null,
  notifications: [],
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
    action: {
      name: null,
      error: null
    },
    packages: [],
    packagesOutdated: [],
    selected: [],
    filters: [],
    active: null,
    lastUpdatedAt: null,
    fromSearch: false,
    fromSort: false
  },
  metadata: {}
};
