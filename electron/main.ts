import { app, BrowserWindow, ipcMain } from 'electron'
import Database from 'better-sqlite3'

let mainWindow: BrowserWindow | null

// connection to the database
const db = new Database('db.db')
// creating default tables
db.prepare(
  'CREATE TABLE IF NOT EXISTS employees (id INTEGER PRIMARY KEY, name TEXT, email TEXT, phone TEXT, dept TEXT)'
).run()
db.prepare(
  'CREATE TABLE IF NOT EXISTS attendance (id INTEGER PRIMARY KEY, name TEXT, email TEXT, dept TEXT, datetime TEXT)'
).run()

db.prepare(
  'CREATE TABLE IF NOT EXISTS auth (id INTEGER PRIMARY KEY, password TEXT)'
).run()

ipcMain.on('ipc-example', async (event, arg) => {
  const EmpDict = arg[0]
  console.log(EmpDict)
  // auth
  if (EmpDict.aim === 'login') {
    // todo: create a stmt to recieve pwd n compare it to the one in the db and send a response
    console.log('in login')
    const stmt = db
      .prepare('SELECT password FROM auth WHERE password = ?')
      .get(EmpDict.pwd)
    stmt ? event.reply('ipc-example-reply', true) : event.reply('ipc-example-reply', false)
  }
  // Attendance
  if (EmpDict.aim === 'add attendance') {
    const stmt = db.prepare(
      'INSERT INTO attendance (name, datetime) VALUES (?, ?)'
    )
    stmt.run(EmpDict.selectedLect, EmpDict.datetime)
  }
  // Employees Info
  if (EmpDict.aim === 'create emp') {
    console.log('creating')
    const stmt = db.prepare(
      'INSERT INTO employees (name, email, phone, dept) VALUES (?, ?, ?, ?)'
    )
    stmt.run(EmpDict.name, EmpDict.email, EmpDict.phone, EmpDict.dept)
  }
  if (EmpDict.aim === 'delete emp') {
    const stmt = db.prepare('DELETE FROM employees WHERE id = ?')
    stmt.run(EmpDict.id)
  }
  if (EmpDict.aim === 'update emp') {
    const stmt = db.prepare(
      'UPDATE employees SET name = ?, email = ?, phone = ?, dept = ? WHERE id = ?'
    )
    stmt.run(
      EmpDict.name,
      EmpDict.email,
      EmpDict.phone,
      EmpDict.dept,
      EmpDict.id
    )
  }
  const employees = db.prepare('SELECT * FROM employees').all()
  const attendance = db.prepare('SELECT * FROM attendance').all()
  event.reply('ipc-example', [employees, attendance])
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
