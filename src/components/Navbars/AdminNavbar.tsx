import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
// reactstrap components
import { Navbar, Container } from 'reactstrap'
import TimeInput from 'react-widgets/TimeInput'
import { EMP, TITLE } from '../../constants'
import { Context } from '../../context'
import { Employee } from '../../@types/decs'

const DashboardForm = () => {
  const [value, setValue] = useState()
  const [selectedLect, setSelectedLect] = useState([])
  const { emps } = useContext<any>(Context)
  // CONSTANTS
  const addATTENDANCE = 'add attendance'
  return (
    <form className="box">
      {/* add attendance */}
      <select
        name="emps"
        onChange={(e: any) => setSelectedLect(e.target.value)}
      >
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
        onChange={(v: any) => setValue(v?.toString())}
        style={{ width: 'auto' }}
      />
      <button
        className="button"
        type="button"
        onClick={() => {
          const datetime = value || Date()
          window.main.sendMessage('ipc-example', [
            {
              aim: addATTENDANCE,
              selectedLect,
              datetime,
            },
          ])
        }}
      >
        <p className="add">Add New</p>
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
    <form>
      <input
        type="text"
        placeholder="Name"
        onChange={e => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Mobile Number"
        onChange={e => setPhone(e.target.value)}
      />
      <input
        type="text"
        placeholder="Department"
        onChange={e => setDept(e.target.value)}
      />
      <button
        className="button"
        style={{ padding: '10px' }}
        type="button"
        onClick={() => {
          window.main.sendMessage('ipc-example', [
            { aim: EMP.CREATE, name, email, phone, dept },
          ])
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

const AdminNavbar = (props: any) => {
  return (
    <>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>
          <Link
            className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
            to="/"
          >
            {props.brandText}
          </Link>
          {getForm(props.brandText)}
        </Container>
      </Navbar>
    </>
  )
}

export default AdminNavbar
