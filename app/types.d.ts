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
