/**
 * Run shell commands
 * npm [cmd] [[<@scope>/]<pkg> ...]
 * */

const path = require('path')
const cp = require('child_process')
const Q = require('q')

import npmApi from './npmApi'
import * as R from 'ramda'

exports.doCommand = function(options, callback) {
  const opts = options || {}
  const { cmd, ...rest } = opts
  // console.log(options)
  function combine() {
    let promises = []

    if (!cmd || !Array.isArray(cmd)) {
      throw new Error('shell[doCommand]:cmd must be given and must be an array')
    }

    cmd.forEach((c, idx) => {
      promises.push(
        (function() {
          return npmApi[c] ? npmApi[c].call(this, rest, callback) : null
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
