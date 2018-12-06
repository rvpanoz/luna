/* eslint-disable */
// MK

global.mk = {
  logToFile: false,
  config: {
    defaultSettings: {
      manager: 'npm',
      registry: 'https://registry.npmjs.org/',
      startMinimized: true,
      fetchGithub: false,
      showDetails: false
    }
  },
  log(...args) {
    const dt = new Date();
    let cons;
    const _args = Array.prototype.slice.call(args, 0);
    const dtf = `${dt.getHours()}:${dt.getMinutes()}:${dt.getSeconds()}.${dt.getMilliseconds()}`;

    _args.unshift(dtf);

    if (this.gui && global.window) {
      cons = global.window.console;
    } else {
      cons = console;
    }

    if (this.logToFile) {
      this.debug(args);
    }

    args.unshift('\n');
    cons.log.apply(cons, args);
  },
  _cnc(args) {
    let txt = '';
    for (let i in args) txt += JSON.stringify(args[i]) + ' ';
    return txt;
  },
  debug(args) {
    const fs = require('fs'),
      txt = this._cnc(args);
    fs.writeFileSync('debug.log', txt + '\n', { flag: 'a' });
  }
};

export default global.mk;
