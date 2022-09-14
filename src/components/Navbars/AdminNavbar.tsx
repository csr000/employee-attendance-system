import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
// reactstrap components
import { Navbar, Container } from 'reactstrap'
import TimeInput from 'react-widgets/TimeInput'
import { ATT, EMP, ipcCHANNEL, TITLE } from '../../Constants'
import { UserContext } from '../../Context'
import { Employee, UserContextType } from '../../@types/decs'

const DashboardForm = () => {
  const [value, setValue] = useState<string>()
  const [selectedLect, setSelectedLect] = useState('')
  const { emps } = useContext(UserContext) as UserContextType
  // CONSTANTS
  return (
    <form className="box">
      {/* add attendance */}
      <select name="emps" onChange={e => setSelectedLect(e.target.value)}>
        <option value="">--Choose {TITLE}--</option>
        {(emps as Employee[]).map(emp => (
          <option key={emp.id} value={emp.name}>
            {emp.name}
          </option>
        ))}
      </select>
      <TimeInput
        use12HourClock
        // @ts-ignore
        defaultValue={new Date()}
        onChange={v => setValue(v?.toString())}
        style={{ width: 'auto' }}
      />
      <button
        className="add-btn"
        type="button"
        onClick={() => {
          const datetime = value || Date()
          window.main.sendMessage(ipcCHANNEL, [{ aim: ATT.ADD, selectedLect, datetime }])
        }}
      >
        Add Attendance
      </button>
    </form>
  )
}

const EmployeesForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [dept, setDept] = useState('')
  return (
    <form className="employee-form">
      <input type="text" placeholder="Name" onChange={e => setName(e.target.value)} />
      <input type="text" placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="text" placeholder="Mobile Number" onChange={e => setPhone(e.target.value)} />
      <input type="text" placeholder="Department" onChange={e => setDept(e.target.value)} />
      <button
        className="add-btn"
        type="button"
        onClick={() => {
          window.main.sendMessage(ipcCHANNEL, [{ aim: EMP.CREATE, name, email, phone, dept }])
        }}
      >
        Add {TITLE}
      </button>
    </form>
  )
}

const getForm = (brandtext: string) => {
  if (brandtext === 'Dashboard') {
    return <DashboardForm />
  } else if (brandtext === 'Employees') {
    return <EmployeesForm />
  } else {
    return ''
  }
}

const AdminNavbar = (props: { brandText: {} | null | undefined }) => {
  return (
    <>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>
          <Link className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block" to="/">
            {props.brandText}
          </Link>
          {getForm(props.brandText as string)}
        </Container>
      </Navbar>
    </>
  )
}

export default AdminNavbar
