/**
 * Electron's main process
 *
 * When running `npm run build` or `npm run build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack.
 *
 */

import { app, BrowserWindow, ipcMain } from 'electron'
import fs from 'fs'
import electron from 'electron'
import MenuBuilder from './menu'
import fixPath from 'fix-path'
const path = require('path')
const config = require('./config')

const NODE_ENV = process.env.NODE_ENV
const shell = require('./shell')

const debug = /--debug/.test(process.argv[2])
let mainWindow = null

const MIN_WIDTH = 1366
const MIN_HEIGHT = 768

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
 * IPC events
 */

ipcMain.on('analyze-json', (event, filePath) => {
  if (!filePath) {
    throw new Error('filePath is not defined')
  }
  fs.readFile(filePath, 'utf8', (err, fileContent) => {
    if (err) {
      if (err.code === 'ENOENT') {
        console.error('package.json does not exist')
        return
      }
      throw err
    }

    let content = false
    try {
      content = JSON.parse(fileContent)
      event.sender.send('analyze-json-close', filePath, content)
    } catch (e) {
      throw new Error('Error: Unable to parse package.json file.')
    }
  })
})

ipcMain.on('ipc-event', (event, options) => {
  const opts = options || {}
  const { ipcEvent } = opts || {}

  function callback(data, command, status, error) {
    if (error) {
      console.log(error)
    }
    switch (status) {
      case 'close':
        if (['install', 'update', 'uninstall'].indexOf(ipcEvent) > -1) {
          event.sender.send('action-close', data, command)
        } else {
          event.sender.send(`${ipcEvent}-close`, data, command)
        }
        break
      case 'error':
        event.sender.send('ipcEvent-error', data)
        break
      default:
        event.sender.send(`${ipcEvent}-reply`, data, command, status, stats)
    }
  }

  /**
   * At this point we try to run a shell command
   * sending output using spawn to renderer via ipc events
   * */
  try {
    shell.doCommand(opts, callback)
  } catch (e) {
    throw new Error(e)
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

  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined')
    }

    // show mainWindow
    mainWindow.show()
    mainWindow.focus()

    mainWindow.openDevTools()
    // detTools in development
    // if (
    //   process.env.NODE_ENV === 'development' ||
    //   process.env.DEBUG_PROD === 'true'
    // ) {
    //   mainWindow.openDevTools()
    // }
  })

  mainWindow.webContents.on('crashed', () => {
    // todo..
  })

  mainWindow.on('unresponsive', () => {
    // todo..
  })

  mainWindow.on('show', () => {
    // todo..
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  const menuBuilder = new MenuBuilder(mainWindow)
  menuBuilder.buildMenu()
})

process.on('uncaughtException', (err) => {
  console.error(err)
})
