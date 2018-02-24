/**
 * Run shell commands
 * npm [cmd] [[<@scope>/]<pkg> ...]
 * */

const path = require('path')
const cp = require('child_process')
const Q = require('q')

const spawn = cp.spawn
const defaults = ['--depth=0', '--json']

import { parse } from './utils'

function runCommand(command, mode, directory, callback) {
  const deferred = Q.defer()
  const cwd = process.cwd()

  let result = '',
    error = ''

  if (!command || typeof command !== 'object') {
    return Q.reject(
      new Error('shell[doCommand]:cmd must be given and must be an array')
    )
  }

  console.log(`running: npm ${command.join(' ')}`)

  // on windows use npm.cmd
  const npmc = spawn(
    /^win/.test(process.platform) ? 'npm.cmd' : 'npm',
    command,
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
    console.log(`finish: npm ${command.join(' ')}`)
    deferred.resolve({
      status: 'close',
      error: error.length ? error : null,
      data: result,
      cmd: command[0]
    })
  })

  return deferred.promise
}

/** WIP **/
exports.install = function() {}

exports.update = function() {}

exports.uninstall = function() {}

exports.view = function() {}

exports.list = function() {}

exports.doCommand = function(options, callback) {
  const opts = options || {}
  if (!opts.cmd) {
    throw new Error('shell[doCommand]: cmd parameter must given')
  }

  const { mode, pkgVersion, pkgOptions, directory } = opts

  let run = [],
    params = [],
    args = [],
    pkgInfo = [],
    pkgName = opts.pkgName

  if (pkgName) {
    if (pkgVersion) {
      const hasAt = pkgName.indexOf('@')
      if (hasAt > -1) {
        pkgName = pkgName.replace('@', '')
      }
      pkgInfo.push(`${pkgName}@${pkgVersion}`)
    } else {
      pkgInfo.push(pkgName)
    }
  }

  const typeOfCommand = typeof opts.cmd
  switch (typeOfCommand) {
    case 'object':
      for (let z = 0; z < opts.cmd.length; z++) {
        run.push(opts.cmd[z])
      }
      break
    case 'string':
      run.push(opts.cmd)
    default:
      break
  }

  if (mode === 'GLOBAL') {
    params.push('-g')
  }

  // setup options e.g --save-dev
  if (pkgOptions) {
    switch (true) {
      case pkgOptions.length > 0:
        for (let z = 0; z < pkgOptions.length; z++) {
          const opt = pkgOptions[z]
          args.push(`--${opt}`)
        }
        break
      default:
        args.push('--no-save')
    }
  }

  // setup arguments e.g --depth, --json etc
  if (opts.arguments) {
    for (const z in opts.arguments) {
      const v = opts.arguments[z]
      args.push(`--${z}=${v}`)
    }
  } else {
    args = args.concat(defaults.concat())
  }

  function combine() {
    let promises = []
    run.forEach((cmd, idx) => {
      promises.push(
        (function() {
          const command = [cmd]
            .concat(pkgInfo)
            .concat(params)
            .concat(args)
          return runCommand(command, mode, directory, callback)
        })()
      )
    })
    return promises
  }

  Q.allSettled(combine()).then((results) => {
    results.forEach((result) => {
      if (result.state === 'fulfilled') {
        callback(result.value.data, result.value.cmd, result.value.status)
      } else {
        const reason = result.reason
        console.log(reason)
      }
    })
  })
}
