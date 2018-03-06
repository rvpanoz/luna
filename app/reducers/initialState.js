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
  cmdOptions: [],
  packages: {
    isLoading: false,
    total: 0,
    active: null,
    packages: [],
    selected: [],
    group: null,
    expanded: false,
    version: '',
    tabIndex: 0,
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
