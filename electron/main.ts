import { app, BrowserWindow, ipcMain } from 'electron'
import Database from 'better-sqlite3';

let mainWindow: BrowserWindow | null

// connection to the database
const db = new Database('db.db');
// creating default tables
db.prepare(
  'CREATE TABLE IF NOT EXISTS lecturers (id INTEGER PRIMARY KEY, name TEXT, email TEXT, phone TEXT, dept TEXT)'
).run();
db.prepare(
  'CREATE TABLE IF NOT EXISTS attendance (id INTEGER PRIMARY KEY, name TEXT, email TEXT, dept TEXT, datetime TEXT)'
).run();

db.prepare(
  'CREATE TABLE IF NOT EXISTS auth (id INTEGER PRIMARY KEY, password TEXT)'
).run();

ipcMain.on('ipc-example', async (event, arg) => {
  const LectDict = arg[0];
  console.log(LectDict);
  // auth
  if (LectDict.aim === 'login') {
    // todo: create a stmt to recieve pwd n compare it to the one in the db and send a response
    // const stmt = db.prepare(
    //   'INSERT INTO attendance (name, datetime) VALUES (?, ?)'
    // );
    // stmt.run(LectDict.selectedLect, LectDict.datetime);
    event.reply('ipc-example-reply', true);
  }
  // Attendance
  if (LectDict.aim === 'add attendance') {
    const stmt = db.prepare(
      'INSERT INTO attendance (name, datetime) VALUES (?, ?)'
    );
    stmt.run(LectDict.selectedLect, LectDict.datetime);
  }
  // Lecturers Info
  if (LectDict.aim === 'create emp') {
    console.log('creating')
    const stmt = db.prepare(
      'INSERT INTO lecturers (name, email, phone, dept) VALUES (?, ?, ?, ?)'
    );
    stmt.run(LectDict.name, LectDict.email, LectDict.phone, LectDict.dept);
  }
  if (LectDict.aim === 'delete emp') {
    const stmt = db.prepare('DELETE FROM lecturers WHERE id = ?');
    stmt.run(LectDict.id);
  }
  if (LectDict.aim === 'update emp') {
    const stmt = db.prepare(
      'UPDATE lecturers SET name = ?, email = ?, phone = ?, dept = ? WHERE id = ?'
    );
    stmt.run(
      LectDict.name,
      LectDict.email,
      LectDict.phone,
      LectDict.dept,
      LectDict.id
    );
  }
  const employees = db.prepare('SELECT * FROM lecturers').all();
  const attendance = db.prepare('SELECT * FROM attendance').all();
  event.reply('ipc-example', [employees, attendance]);
});

declare const MAIN_WINDOW_WEBPACK_ENTRY: string
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string

// const assetsPath =
//   process.env.NODE_ENV === 'production'
//     ? process.resourcesPath
//     : app.getAppPath()

function createWindow () {
  mainWindow = new BrowserWindow({
    // icon: path.join(assetsPath, 'assets', 'icon.png'),
    width: 1100,
    height: 700,
    backgroundColor: '#191622',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
    }
  })

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

async function registerListeners () {
  /**
   * This comes from bridge integration, check bridge.ts
   */
  ipcMain.on('message', (_, message) => {
    console.log(message)
  })
}

app.on('ready', createWindow)
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
