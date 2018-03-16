export default {
  npmCmd: '',
  mode: 'GLOBAL',
  directory: null,
  settings: null,
  loading: true,
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
    tabIndex: 0,
    total: 0,
    active: null,
    group: null,
    packages: [],
    selected: [],
    cmdOptions: [],
    version: '',
    order: 'asc',
    orderBy: 'name',
    page: 0,
    rowsPerPage: 15,
    defaultActions: [
      {
        text: 'update',
        color: 'primary',
        iconCls: 'update'
      },
      {
        text: 'uninstall',
        color: 'default',
        iconCls: 'trash'
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
