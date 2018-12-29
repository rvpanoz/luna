const mapper = {
  list: [
    { manager: 'npm', command: 'list' },
    { manager: 'yarn', command: 'list' }
  ],
  outdated: [
    { manager: 'npm', command: 'outdated' },
    { manager: 'yarn', command: 'outdated' }
  ],
  search: [
    { manager: 'npm', command: 'search' },
    { manager: 'yarn', command: 'search' }
  ],
  install: [
    { manager: 'npm', command: 'install' },
    { manager: 'yarn', command: 'add' }
  ],
  uninstall: [
    { manager: 'npm', command: 'uninstall' },
    { manager: 'yarn', command: 'remove' }
  ]
};

export default mapper;
