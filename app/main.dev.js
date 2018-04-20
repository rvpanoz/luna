/**
 * Electron's main process
 *
 * When running `npm run build` or `npm run build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack.
 *
 */

import { app, BrowserWindow, ipcMain } from 'electron'
import { merge } from 'ramda'
import { APP_GLOBALS } from './constants/AppConstants'
import fixPath from 'fix-path'
import fs from 'fs'
import electron from 'electron'
import electronStore from 'electron-store'
import electronLog from 'electron-log'
import path from 'path'
import MenuBuilder from './menu'
import config from './config'
import shell from './shell'
import mk from './mk'

const APP_PATHS = {
  appData: app.getPath('appData'),
  userData: app.getPath('userData')
}

const { defaultSettings } = config

//NODE_EVN
const NODE_ENV = process.env.NODE_ENV

//get parameters
const debug = /--debug/.test(process.argv[2])
const needslog = /--log/.test(process.argv[3])

//window min resolution
const MIN_WIDTH = 1366
const MIN_HEIGHT = 768

// store initialization
const Store = new electronStore()

//main window
let mainWindow = null

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support')
  sourceMapSupport.install()
  fixPath()
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')()
  const path = require('path')
  const p = path.join(__dirname, '..', 'app', 'node_modules')
  require('module').globalPaths.push(p)
}

// devtools
const installExtensions = async () => {
  const installer = require('electron-devtools-installer')
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS']

  return Promise.all(
    extensions.map((name) => installer.default(installer[name], forceDownload))
  ).catch(console.log)
}

/**
 * ipcMain event listeners
 * communicate asynchronously from the main process to renderer processes.
 */

//analyze directory
ipcMain.on('analyze-json', (event, filePath) => {
  if (!filePath) {
    throw new Error('filePath is not defined')
  }

  try {
    fs.readFile(filePath, 'utf8', (err, fileContent) => {
      if (err) {
        if (err.code === 'ENOENT') {
          return
        }
        throw new Error(err)
      }

      const content = JSON.parse(fileContent)
      event.sender.send('analyze-json-close', filePath, content)
    })
  } catch (e) {
    console.log(e)
    throw new Error(e.message)
  }
})

//user settings
ipcMain.on('save-settings', (event, settings) => {
  throw new UserException('FATAL', 3030, 'extra info')
  if (settings) {
    try {
      Store.set('user_settings', settings)
      event.sender.send('settings_saved', Store.get('user_settings'))
    } catch (e) {
      throw new Error(e.message)
    }
  }
})

ipcMain.on('ipc-event', (event, options) => {
  const opts = options || {}
  const { ipcEvent } = opts || {}

  function callback(status, command, data, latest, stats) {
    const isStatus = status && typeof status === 'string'

    if (!isStatus) {
      throw new Error('FATAL ERROR: status is not valid')
    }

    const args = arguments

    if (args.length === 2) {
      event.sender.send('ipcEvent-reply', args[1])
      return
    }

    switch (status) {
      case 'close':
        if (['install', 'update', 'uninstall'].indexOf(ipcEvent) > -1) {
          event.sender.send('action-close', data, command)
        } else {
          event.sender.send(`${ipcEvent}-close`, data, command, latest, stats)
        }
        break
      case 'error':
        event.sender.send('ipcEvent-error', data)
        break
    }
  }

  /**
   * At this point we try to run a shell command
   * sending output using spawn to renderer via ipc events
   * */
  try {
    const settings = Store.get('user_settings')
    shell.doCommand(merge(opts, settings || {}), callback)
  } catch (e) {
    throw new Error(e.message)
  }
})

/* =========================== */

/**
 * Add event listeners
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('ready', async () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions()
  }

  const Screen = electron.screen
  let x = 0,
    y = 0
  const screenSize = Screen.getPrimaryDisplay().size
  const displays = electron.screen.getAllDisplays()
  const externalDisplay = displays.find(
    (display) => display.bounds.x !== 0 || display.bounds.y !== 0
  )

  if (externalDisplay) {
    x = externalDisplay.bounds.x + 50
    y = externalDisplay.bounds.y + 50
  }

  if (MIN_WIDTH > screenSize.width) {
    throw new Error('Fatal: LOW_RESOLUTION')
  }

  // create main window
  mainWindow = new BrowserWindow({
    webPreferences: { webSecurity: false },
    minWidth: MIN_WIDTH || screenSize.width,
    minHeight: MIN_HEIGHT || screenSize.height,
    x: x,
    y: y,
    show: false,
    resizable: true,
    icon: path.join(__dirname, 'resources/icon.ico')
  })

  // load app.html file
  mainWindow.loadURL(`file://${__dirname}/app.html`)

  mainWindow.webContents.on('did-finish-load', (event) => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined')
    }

    //get user settings
    const userSettings = Store.get('user_settings') || defaultSettings
    event.sender.send('settings_loaded', userSettings)

    // show mainWindow
    mainWindow.show()
    mainWindow.focus()

    // devTools in development
    if (
      process.env.NODE_ENV === 'development' ||
      process.env.DEBUG_PROD === 'true'
    ) {
      mainWindow.openDevTools()
    }
  })

  mainWindow.webContents.on('crashed', (event) => {
    //todo
  })

  mainWindow.on('unresponsive', (event) => {
    // todo..
  })

  mainWindow.on('show', (event) => {
    // todo..
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  const menuBuilder = new MenuBuilder(mainWindow)
  menuBuilder.buildMenu()
})

process.on('uncaughtException', (err) => {
  electronLog.error(`${err}`)
  mainWindow.webContents.send('uncaught-exception', `${err}`)
})
