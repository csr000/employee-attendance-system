import { Database } from 'better-sqlite3'
import { IpcMainEvent } from 'electron/main'
import { attCHANNEL, empCHANNEL, REPLIES } from '../src/Constants'
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
 * process request from IPCmain.on & reply  with the latest information
 */
export function ProcessRequest(EmpDict: EmpDictType, db: Database, event: IpcMainEvent) {
  // function declarations
  function login() {
    const stmt = db.prepare('SELECT password FROM auth')

    bcrypt.compare(EmpDict.pwd, stmt.get().password, function (_err: Error, res: string) {
      res ? event.reply(REPLIES.LOGIN, true) : event.reply(REPLIES.LOGIN, false)
    })
  }
  function resetPwd() {
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

  function addAttendance() {
    const stmt = db.prepare('INSERT INTO attendance (name, datetime) VALUES (?, ?)')
    stmt.run(EmpDict.selectedLect, EmpDict.datetime)
  }

  function createEmployee() {
    const stmt = db.prepare('INSERT INTO employees (name, email, phone, dept) VALUES (?, ?, ?, ?)')
    stmt.run(EmpDict.name, EmpDict.email, EmpDict.phone, EmpDict.dept)
  }

  function deleteEmployee() {
    const stmt = db.prepare('DELETE FROM employees WHERE id = ?')
    stmt.run(EmpDict.id)
  }

  function updateEmployee() {
    const stmt = db.prepare('UPDATE employees SET name = ?, email = ?, phone = ?, dept = ? WHERE id = ?')
    stmt.run(EmpDict.name, EmpDict.email, EmpDict.phone, EmpDict.dept, EmpDict.id)
  }

  // function behaviour
  switch (EmpDict.aim) {
    // auth
    case 'login':
      login()
      break
    case 'resetpwd':
      resetPwd()
      NotifySweetAlert(event)
      break
    // attendance
    case 'add attendance':
      addAttendance()
      NotifySweetAlert(event)
      break
    // employee
    case 'create emp':
      createEmployee()
      NotifySweetAlert(event)
      break
    case 'delete emp':
      deleteEmployee()
      NotifySweetAlert(event)
      break
    case 'update emp':
      updateEmployee()
      NotifySweetAlert(event)
      break

    default:
      break
  }

  SendLatestInfoToWindow(db, event)
}

function SendLatestInfoToWindow(db: Database, event: IpcMainEvent) {
  const employees = db.prepare('SELECT * FROM employees').all()
  const attendance = db.prepare('SELECT * FROM attendance').all()
  event.reply(attCHANNEL, attendance)
  event.reply(empCHANNEL, employees)
}

function NotifySweetAlert(event: IpcMainEvent) {
  event.reply(REPLIES.ALERT, true)
}
