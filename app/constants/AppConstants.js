export const APP_CONSTANTS  = {
  APP_MODES: {
    GLOBAL: 'GLOBAL',
    SEARCH: 'SEARCH',
    LOCAL: 'LOCAL',
    GLOBALACTIONS: [{
      action: 'Update',
      iconCls: 'fa-refresh'
    }, {
      action: 'Uninstall',
      iconCls: 'fa-trash'
    }],
    LOCALACTIONS: [{
      action: 'Install',
      iconCls: 'fa-download'
    }]
  },
  PACKAGE_GROUPS: ['dependencies', 'devDependencies', 'optionalDependencies'],
  COMMAND_OPTIONS: [
    'save*Package will appear in your dependencies',
    'save-dev*Package will appear in your devDependencies',
    'save-exact*Saved dependencies will be configured with an exact version rather than using npm\'s default semver range operator',
    'save-optional*Saved dependencies will also be added to your bundleDependencies list'
  ]
}
