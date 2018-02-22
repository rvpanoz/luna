export default {
  mode: "GLOBAL",
  directory: null,
  settings: null,
  snackbar: null,
  loading: false,
  settingsOpen: false,
  menuOpen: false,
  snackBarOpen: false,
  npmCmd: "",
  messages: [],
  cmdOptions: [],
  packages: {
    isLoading: false,
    total: 0,
    active: null,
    packages: [],
    group: null,
    expanded: false,
    version: "",
    tabIndex: 0,
    actions: [
      {
        text: "Update",
        color: "primary",
        iconCls: "update"
      },
      {
        text: "Uninstall",
        color: "default",
        iconCls: "trash"
      }
    ]
  },
  packageJSON: {
    license: null,
    author: "",
    name: "",
    dependencies: [],
    devDependencies: [],
    optionalDependencies: []
  }
};
