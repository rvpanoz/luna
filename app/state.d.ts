type Operations = {
  action: Object | String,
  packagesInstallOptions: []
}

type Notifications = {
  action: Object | String,
  notifications: []
}

type Common = {
  directory: string | null,
  manager: string,
  mode: string,
  operations: Operations
}

type Packages = {
  active: Object | null,
  packagesFromSearch: [],
  packagesData: [],
  packagesOutdated: [],
  metadata: any
}

type Npm = {
  env: any,
  operationStatus: string,
  operationCommand: string,
  operationPackages: [string],
  command_error?: string,
  command_message?: string
}

export interface AppState {
  manager: string;
  mode: string;
  onlinestatus: string;
  directory: string;
  packages: Packages;
  notifications: Notifications;
  ui: any;
  common: Common;
  npm: Npm;
  uiException?: string;
}

