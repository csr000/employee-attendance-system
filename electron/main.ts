import { app, BrowserWindow, ipcMain } from 'electron'
// import Database from 'better-sqlite3'
import { ipcCHANNEL } from '../src/Constants'
import { CREATE_DEFAULT_DB_TABLES } from './service'
import { ProcessRequest } from './processRequest'
const Database = require('better-sqlite3')

let mainWindow: BrowserWindow | null

// connection to the database
const db = new Database('db.db')
db.pragma('journal_mode = WAL');
CREATE_DEFAULT_DB_TABLES(db)

ipcMain.on(ipcCHANNEL, async (event, arg) => {
  const EmpDict = arg[0]
  // console.log(EmpDict)
  ProcessRequest(EmpDict, db, event)
})

declare const MAIN_WINDOW_WEBPACK_ENTRY: string
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string

// const assetsPath =
//   process.env.NODE_ENV === 'production'
//     ? process.resourcesPath
//     : app.getAppPath()

function createWindow() {
  mainWindow = new BrowserWindow({
    // icon: path.join(assetsPath, 'assets', 'icon.png'),
    show: false,
    backgroundColor: '#191622',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  })

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

  mainWindow.maximize()
  mainWindow.show()

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

async function registerListeners() {
  /**
   * This comes from bridge integration, check bridge.ts
   */
  ipcMain.on('message', (_, message) => {
    console.log(message)
  })
}

app
  .on('ready', createWindow)
  .whenReady()
  .then(registerListeners)
  .catch(e => console.error(e))

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
