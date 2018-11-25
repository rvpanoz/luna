/**
 * Electron's main process
 *
 * When running `npm run build` or `npm run build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack.
 *
 */

import electron, { app, BrowserWindow, ipcMain } from "electron";
import { merge } from "ramda";
import fixPath from "fix-path";
import fs from "fs";
import electronStore from "electron-store";
import path from "path";
import mk from "../mk";
import shell from "./shell";

mk.logToFile = true;

const APP_PATHS = {
  appData: app.getPath("appData"),
  userData: app.getPath("userData")
};

const { defaultSettings } = mk.config;

//NODE_EVN
const NODE_ENV = process.env.NODE_ENV;

//get parameters
const debug = /--debug/.test(process.argv[2]);
const needslog = /--log/.test(process.argv[3]);

//window min resolution
const MIN_WIDTH = 1366;
const MIN_HEIGHT = 768;

// store initialization
const Store = new electronStore();

// clear opened packages
Store.set("openedPackages", []);

// Is dev mode?
const isDevMode = process.execPath.match(/[\\/]electron/);

if (isDevMode) {
  enableLiveReload({ strategy: "react-hmr" });
}

//main window
let mainWindow = null;

if (process.env.NODE_ENV === "production") {
  const sourceMapSupport = require("source-map-support");
  sourceMapSupport.install();
  fixPath();
}

if (
  process.env.NODE_ENV === "development" ||
  process.env.DEBUG_PROD === "true"
) {
  require("electron-debug")();
  const path = require("path");
  const p = path.join(__dirname, "..", "app", "node_modules");
  require("module").globalPaths.push(p);
}

// devtools
const installExtensions = async () => {
  const installer = require("electron-devtools-installer");
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ["REACT_DEVELOPER_TOOLS", "REDUX_DEVTOOLS"];

  return Promise.all(
    extensions.map(name => installer.default(installer[name], forceDownload))
  ).catch(console.log);
};

/**
 * ipcMain event listeners
 * communicate asynchronously from the main process to renderer processes.
 */

//analyze directory
ipcMain.on("analyze-json", (event, filePath) => {
  if (!filePath) {
    throw new Error("filePath is not defined");
  }

  try {
    fs.readFile(filePath, "utf8", (err, fileContent) => {
      if (err) {
        if (err.code === "ENOENT") {
          return;
        }
        throw new Error(err);
      }

      const content = JSON.parse(fileContent);
      const openedPackages = Store.get("openedPackages") || [];

      if (openedPackages.indexOf(filePath) === -1) {
        Store.set("openedPackages", [].concat(openedPackages, filePath));
      }

      event.sender.send(
        "analyze-json-close",
        filePath,
        content,
        Store.get("openedPackages")
      );
    });
  } catch (e) {
    console.log(e);
    throw new Error(e.message);
  }
});

//store application settings
ipcMain.on("save-settings", (event, settings) => {
  if (settings && typeof settings === "object") {
    try {
      Store.set("user_settings", settings);
      event.sender.send("settings_saved", Store.get("user_settings"));
    } catch (e) {
      throw new Error(e.message);
    }
  }
});

// generic ipc-event dispatcher
ipcMain.on("ipc-event", (event, options) => {
  const opts = options || {};
  const { ipcEvent } = opts || {};

  function callback(status, command, data, latest, stats) {
    const isStatus = status && typeof status === "string";

    if (!isStatus) {
      mk.log("FATAL: command status is not valid");
      throw new Error("command status is not valid");
    }

    const args = arguments;

    if (args.length === 1) {
      console.log(args);
      return;
    }

    if (args.length === 2) {
      event.sender.send("ipcEvent-reply", args[1]);
      return;
    }

    switch (status) {
      case "close":
        if (["install", "update", "uninstall"].indexOf(ipcEvent) > -1) {
          event.sender.send("action-close", data, command);
        } else {
          event.sender.send(`${ipcEvent}-close`, data, command, latest, stats);
        }
        break;
      case "error":
        event.sender.send("ipcEvent-error", data);
        break;
    }
  }

  /**
   * At this point we try to run a shell command
   * sending output using spawn to renderer via ipc events
   * */
  try {
    const settings = Store.get("user_settings");
    shell.doCommand(merge(opts, settings || {}), callback);
  } catch (e) {
    throw new Error(e.message);
  }
});

/* =========================== */

/**
 * Add event listeners
 */

const createWindow = async () => {
  try {
    if (
      process.env.NODE_ENV === "development" ||
      process.env.DEBUG_PROD === "true"
    ) {
      await installExtensions();
    }

    const Screen = electron.screen;
    let x = 0,
      y = 0;
    const screenSize = Screen.getPrimaryDisplay().size;
    const displays = electron.screen.getAllDisplays();
    const externalDisplay = displays.find(
      display => display.bounds.x !== 0 || display.bounds.y !== 0
    );

    if (externalDisplay) {
      x = externalDisplay.bounds.x + 50;
      y = externalDisplay.bounds.y + 50;
    }

    /** Needs work for RETINA displays **/
    // if (MIN_WIDTH > screenSize.width) {
    //   mk.log(`FATAL: low_resolution ${screenSize.width}x${screenSize.height}`)
    //   throw new Error(
    //     `Resolution ${screenSize.width}x${screenSize.height} is not supported.`
    //   )
    // }

    // create main window
    mainWindow = new BrowserWindow({
      minWidth: MIN_WIDTH || screenSize.width,
      minHeight: MIN_HEIGHT || screenSize.height,
      x: x,
      y: y,
      show: false,
      resizable: true,
      icon: path.join(__dirname, "resources/icon.ico")
    });

    // load app.html file
    mainWindow.loadURL(`file://${__dirname}/index.html`);

    mainWindow.webContents.on("did-finish-load", event => {
      if (!mainWindow) {
        mk.log('FATAL: mainWindow" is not defined');
        throw new Error('"mainWindow" is not defined');
      }

      //get user settings
      const userSettings = Store.get("user_settings") || defaultSettings;
      event.sender.send("settings_loaded", userSettings);

      //openedPackages
      const openedPackages = Store.get("openedPackages") || [];
      event.sender.send("openedPackages_loaded", openedPackages);

      // show mainWindow
      mainWindow.show();
      mainWindow.focus();

      // open devTools in development
      if (
        process.env.NODE_ENV === "development" ||
        process.env.DEBUG_PROD === "true"
      ) {
        mainWindow.openDevTools();
      }
    });

    mainWindow.webContents.on("crashed", event => {
      // TODO: error reporting //
    });

    mainWindow.on("unresponsive", event => {
      // TODO: error reporting //
    });

    mainWindow.on("show", event => {
      // TODO: on show window //
    });

    mainWindow.on("closed", () => {
      mainWindow = null;
      mk.log("mainWindow is closed");
    });
  } catch (e) {
    throw new Error(e);
  }
};

app.on("window-all-closed", () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("ready", createWindow);

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

process.on("uncaughtException", err => {
  mk.log(`${err}`);
  mainWindow.webContents.send("uncaught-exception", `${err}`);
});
