import { Database } from 'better-sqlite3'
import { IpcMainEvent } from 'electron/main'
import { ipcCHANNEL, REPLIES } from '../src/Constants'
const bcrypt = require('bcryptjs')

type EmpDictType = {
  aim: string
  pwd: string
  currentPwd: string
  newPwd: string
  selectedLect: string
  datetime: string
  name: string
  email: string
  phone: string
  dept: string
  id: string
}
/**
 * process request from IPCmain.on & rreply  with the latest information
 */
export function ProcessRequest(EmpDict: EmpDictType, db: Database, event: IpcMainEvent) {
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
  SendLatestInfoToWindow(db, event)
}

function SendLatestInfoToWindow(db: Database, event: IpcMainEvent) {
  const employees = db.prepare('SELECT * FROM employees').all()
  const attendance = db.prepare('SELECT * FROM attendance').all()
  event.reply(ipcCHANNEL, [employees, attendance])
}
