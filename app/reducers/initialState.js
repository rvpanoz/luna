export default {
  npmCmd: '',
  mode: 'GLOBAL',
  directory: null,
  settings: null,
  loading: false,
  settingsOpen: false,
  menuOpen: false,
  snackBarOpen: false,
  drawerOpen: false,
  dialogOpen: false,
  snackbar: {
    action: null,
    actionText: '',
    message: ''
  },
  messages: [],
  packages: {
    isLoading: false,
    expanded: false,
    tabIndex: 0,
    total: 0,
    active: null,
    group: null,
    errors: [],
    packages: [],
    selected: [],
    cmdOptions: [],
    version: '',
    order: 'asc',
    orderBy: 'name',
    page: 0,
    rowsPerPage: 10,
    defaultActions: [
      {
        text: 'update',
        color: 'secondary',
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
