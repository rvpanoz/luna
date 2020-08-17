type Operations = {
  action: Object | String,
  packagesInstallOptions: []
}

type Notifications = {
  action: Object | String,
  notifications: []
}

export interface AppState {
  manager: string;
  mode: string;
  onlinestatus: string;
  directory: string;
  operations: Operations;
  notifications: Notifications;
  ui: any;
  common?: any;
  npm?: any;
  uiException?: string;
}

