const cp = require('child_process')
const spawn = cp.spawn
const Q = require('q')
const path = require('path')

import * as R from 'ramda'

// npm list [[<@scope>/]<pkg> ...]
exports.list = function(opts, callback) {
  const command = ['list']
  const deferred = Q.defer()
  const cwd = process.cwd()
  const { mode, directory, options } = opts
  const defaults = ['--depth=0', '--json']

  let result = '',
    error = ''

  if (!command || !Array.isArray(command)) {
    return Q.reject(
      new Error('shell[doCommand]:cmd must be given and must be an array')
    )
  }

  const commandArgs = mode === 'GLOBAL' ? [].concat(defaults, '-g') : defaults
  console.log(`running: npm ${command.concat(commandArgs).join(' ')}`)

  // on windows use npm.cmd
  const npmc = spawn(
    /^win/.test(process.platform) ? 'npm.cmd' : 'npm',
    command.concat(commandArgs),
    {
      env: process.env,
      cwd: directory ? path.dirname(directory) : cwd
    }
  )

  npmc.stdout.on('data', (data) => {
    const dataToString = data.toString()
    result += dataToString
  })

  npmc.stderr.on('data', (error) => {
    const errorToString = error.toString()
    error += `${errorToString} | `
    callback(errorToString, null, 'error')
  })

  npmc.on('close', () => {
    console.log(`finished: npm ${command.concat(commandArgs).join(' ')}`)
    deferred.resolve({
      status: 'close',
      error: error.length ? error : null,
      data: result,
      cmd: command[0]
    })
  })

  return deferred.promise
}

// npm list [[<@scope>/]<pkg> ...]
exports.outdated = function(opts, callback) {
  const command = ['outdated']
  const deferred = Q.defer()
  const cwd = process.cwd()
  const { mode, directory, options } = opts
  const defaults = ['--depth=0', '--json']

  let result = '',
    error = ''

  if (!command || !Array.isArray(command)) {
    return Q.reject(
      new Error('shell[doCommand]:cmd must be given and must be an array')
    )
  }

  const commandArgs = mode === 'GLOBAL' ? [].concat(defaults, '-g') : defaults
  console.log(`running: npm ${command.concat(commandArgs).join(' ')}`)

  // on windows use npm.cmd
  const npmc = spawn(
    /^win/.test(process.platform) ? 'npm.cmd' : 'npm',
    command.concat(commandArgs),
    {
      env: process.env,
      cwd: directory ? path.dirname(directory) : cwd
    }
  )

  npmc.stdout.on('data', (data) => {
    const dataToString = data.toString()
    result += dataToString
  })

  npmc.stderr.on('data', (error) => {
    const errorToString = error.toString()
    error += `${errorToString} | `
    callback(errorToString, null, 'error')
  })

  npmc.on('close', () => {
    console.log(`finished: npm ${command.concat(commandArgs).join(' ')}`)
    deferred.resolve({
      status: 'close',
      error: error.length ? error : null,
      data: result,
      cmd: command[0]
    })
  })

  return deferred.promise
}

exports.view = function(opts, callback) {}

exports.search = function(opts, callback) {
  const command = ['search']
  const deferred = Q.defer()
  const { pkgName } = opts
  const defaults = ['--depth=0', '--json']

  let result = '',
    error = ''

  if (!command || !Array.isArray(command)) {
    return Q.reject(
      new Error('shell[doCommand]:cmd must be given and must be an array')
    )
  }

  console.log(`running: npm ${[].concat(command, pkgName).join(' ')}`)

  // on windows use npm.cmd
  const npmc = spawn(
    /^win/.test(process.platform) ? 'npm.cmd' : 'npm',
    [].concat(command, pkgName).concat(defaults),
    {
      env: process.env
    }
  )

  npmc.stdout.on('data', (data) => {
    const dataToString = data.toString()
    result += dataToString
  })

  npmc.stderr.on('data', (error) => {
    const errorToString = error.toString()
    error += `${errorToString} | `
    callback(errorToString, null, 'error')
  })

  npmc.on('close', () => {
    console.log(`finished: npm ${[].concat(command, pkgName).join(' ')}`)
    deferred.resolve({
      status: 'close',
      error: error.length ? error : null,
      data: result,
      cmd: command[0]
    })
  })

  return deferred.promise
}
