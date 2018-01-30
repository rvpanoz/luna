export default {
  mode: "GLOBAL",
  directory: null,
  loading: false,
  settingsModal: false,
  menuOpen: false,
  npmCmd: "",
  messages: [],
  cmdOptions: [],
  packages: {
    isLoading: false,
    total: 0,
    active: null,
    packages: [],
    actions: [
      {
        text: "Update",
        iconCls: "refresh"
      },
      {
        text: "Uninstall",
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
