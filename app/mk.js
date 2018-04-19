//MK

import { merge } from 'ramda'
import { objectEntries } from './utils'

function UserException(msg, code) {
  Error.captureStackTrace(this, this.constructor)
  this.name = this.constructor.name
  this.message = msg || ''
  this.code = code || 999
  this.parts = objectEntries(arguments).map((arg) => arg[1])
}

merge(UserException.prototype, {
  toString: function() {
    let s = this.message.toString()
    return s.format.apply(s, this.parts)
  }
})

global.mk = {
  config: {},
  logToFile: false,
  log() {
    const dt = new Date()
    let cons,
      args = Array.prototype.slice.call(arguments, 0)
    let dtf = `${dt.getHours()}:${dt.getMinutes()}:${dt.getSeconds()}.${dt.getMilliseconds()}`

    args.unshift(dtf)

    if (this.gui && global.window) {
      cons = global.window.console
    } else {
      cons = console
    }

    if (this.logToFile) {
      this.debug(args)
    }

    args.unshift('\n')
    cons.log.apply(cons, args)
  },
  _cnc: function(args) {
    let txt = ''
    for (let i in args) txt += JSON.stringify(args[i]) + ' '
    return txt
  },
  debug: function(args) {
    const fs = require('fs'),
      txt = this._cnc(args)
    fs.writeFileSync('debug.log', txt + '\n', { flag: 'a' })
  }
}

global.UserException = UserException
export default global.mk
