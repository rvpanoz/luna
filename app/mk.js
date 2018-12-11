// @Mike Car
export class UserException extends Error {
  constructor(...args) {
    super();

    this.message = args.slice(0) || '';
    this.code = args.slice(1) || 999;
    this.parts = args.slice(2);

    console.log(this.message, this.code, this.parts);
    Error.captureStackTrace(this, this.constructor);
  }
}

const mk = {
  logToFile: false,
  syslog: null,
  config: {
    defaultSettings: {
      manager: 'yarn',
      registry: 'https://registry.npmjs.org/',
      startMinimized: false,
      fetchGithub: false,
      showDetails: false
    }
  },
  _cnc(args) {
    let txt = '';
    const values = Object.values(args);

    values.forEach(element => {
      txt += String(JSON.stringify(element));
    });

    return txt;
  },
  log(...args) {
    const dt = new Date();
    const dtf = `${dt.getHours()}:${dt.getMinutes()}:${dt.getSeconds()}.${dt.getMilliseconds()}`;
    let cons;

    args.unshift(dtf);

    if (this.gui && global.window) {
      cons = global.window.console;
    } else {
      cons = console;
    }

    if (this.logToFile) {
      this.debug(args);
    }

    args.unshift('\n');

    // eslint-disable-next-line prefer-spread
    cons.log.apply(cons, args);
  },
  debug(args) {
    // eslint-disable-next-line global-require
    const fs = require('fs');

    // eslint-disable-next-line no-underscore-dangle
    const txt = this._cnc(args);

    fs.writeFileSync('debug.log', `${txt}\n`, { flag: 'a' });
  }
};

export default mk;
