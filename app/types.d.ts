export type CommandOptions = {
  manager: string,
  mode: string,
  directory: string,
  commandArgs: [string],
  packageJson?: boolean,
  pkgName?: string
}

export type RunOptions = {
  cmd: [string],
  activeManager: string,
  mode: string,
  directory?: string,
}

export type CommandResult = {
  status: string,
  errors: string,
  data: string,
  cmd: [string],
  packageJson?: boolean,
  initDirectory?: string
}

export type ActiveSchema = {
  name: string,
  description: string,
  ['dist-tags']: {
    latest: string,
    bridge: string
  },
  versions: [string],
  maintainers: [string],
  time: any,
  homepage: string,
  keywords: [string],
  repository: {
    type: string,
    url: string
  },
  author: string,
  license: string,
  readmeFilename: string,
  users: {
    sshrike: boolean,
    severen: boolean,
    cfleschhut: boolean
  },
  bugs: {
    url: string
  },
  version: string,
  main: string,
  publishConfig: {
    access: string
  },
  engines: {
    node: string
  },
  browser: any,
  dependencies: any,
  devDependencies: any,
  gitHead: string,
  dist: {
    integrity: string,
    shasum: string
  },
  directories: any
}

export type PackageSchema = {
  name: string,
  isOutdated: boolean,
  latest: string,
  version: string,
  from: string,
  resolved: string,
  __invalid?: boolean,
  __hasError?: boolean,
  __missing?: boolean,
  __fromSearch?: boolean,
  __group?: string
}
