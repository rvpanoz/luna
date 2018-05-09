export default {
  mode: 'GLOBAL',
  directory: null,
  settings: null,
  loading: false,
  settingsOpen: false,
  menuOpen: false,
  snackBarOpen: false,
  drawerOpen: false,
  snackbar: {
    action: null,
    actionText: '',
    message: ''
  },
  messages: [],
  packages: {
    isLoading: false,
    expanded: false,
    showFilters: false,
    tabIndex: 0,
    total: 0,
    active: null,
    group: null,
    errors: [],
    packages: [],
    selected: [],
    filters: [],
    nprotected: ['npm'],
    cmdOptions: ['save'],
    version: '',
    order: 'asc',
    orderBy: 'name',
    page: 0,
    rowsPerPage: 10,
    defaultActions: [
      {
        text: 'update',
        color: 'accent',
        iconCls: 'update'
      },
      {
        text: 'uninstall',
        color: 'primary',
        iconCls: 'uninstall'
      }
    ],
    actions: []
  },
  packageJSON: {
    license: null,
    author: '',
    name: '',
    dependencies: [],
    devDependencies: [],
    optionalDependencies: []
  }
}
