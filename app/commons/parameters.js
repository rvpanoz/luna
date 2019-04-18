export const viewParameters = {};

export const directoryParameters = {
  title: 'Choose directory',
  buttonLabel: 'Open',
  properties: ['openDirectory']
};

export const navigatorParameters = {
  title: 'Open package.json file',
  buttonLabel: 'Analyze',
  filters: [
    {
      name: 'package.json',
      extensions: ['json']
    }
  ],
  properties: ['openFile']
};
