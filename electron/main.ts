import { app, BrowserWindow, ipcMain } from 'electron'
import Database from 'better-sqlite3'
import { ipcCHANNEL, REPLIES } from '../src/Constants'
import { CREATE_DEFAULT_DB_TABLES } from './service'

const bcrypt = require('bcryptjs')

let mainWindow: BrowserWindow | null

// connection to the database
const db = new Database('db.db')
CREATE_DEFAULT_DB_TABLES(db)

ipcMain.on(ipcCHANNEL, async (event, arg) => {
  const EmpDict = arg[0]
  console.log(EmpDict)
  // auth
  if (EmpDict.aim === 'login') {
    const stmt = db.prepare('SELECT password FROM auth')

    bcrypt.compare(EmpDict.pwd, stmt.get().password, function (_err: Error, res: string) {
      res ? event.reply(REPLIES.LOGIN, true) : event.reply(REPLIES.LOGIN, false)
    })
  }
  // reset pwd
  if (EmpDict.aim === 'resetpwd') {
    const stmt = db.prepare('SELECT id, password FROM auth')

    bcrypt.compare(EmpDict.currentPwd, stmt.get().password, function (_err: Error, res: string) {
      if (res) {
        const updatePwd = db.prepare('UPDATE auth SET password = ? WHERE id = ?')
        bcrypt.genSalt(10, function (_err: Error, salt: string) {
          bcrypt.hash(EmpDict.newPwd, salt, function (_err: Error, hash: string) {
            // Store hash in your password DB.
            updatePwd.run(hash, stmt.get().id)
            event.reply(REPLIES.RESETpwd, true)
          })
        })
      } else {
        event.reply(REPLIES.RESETpwd, false)
      }
    })
  }
  // Attendance
  if (EmpDict.aim === 'add attendance') {
    const stmt = db.prepare('INSERT INTO attendance (name, datetime) VALUES (?, ?)')
    stmt.run(EmpDict.selectedLect, EmpDict.datetime)
  }
  // Employees Info
  if (EmpDict.aim === 'create emp') {
    console.log('creating')
    const stmt = db.prepare('INSERT INTO employees (name, email, phone, dept) VALUES (?, ?, ?, ?)')
    stmt.run(EmpDict.name, EmpDict.email, EmpDict.phone, EmpDict.dept)
  }
  if (EmpDict.aim === 'delete emp') {
    const stmt = db.prepare('DELETE FROM employees WHERE id = ?')
    stmt.run(EmpDict.id)
  }
  if (EmpDict.aim === 'update emp') {
    const stmt = db.prepare('UPDATE employees SET name = ?, email = ?, phone = ?, dept = ? WHERE id = ?')
    stmt.run(EmpDict.name, EmpDict.email, EmpDict.phone, EmpDict.dept, EmpDict.id)
  }
  const employees = db.prepare('SELECT * FROM employees').all()
  const attendance = db.prepare('SELECT * FROM attendance').all()
  event.reply(ipcCHANNEL, [employees, attendance])
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
    width: 1100,
    height: 700,
    backgroundColor: '#191622',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  })

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

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
