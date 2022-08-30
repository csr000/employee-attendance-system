import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
// reactstrap components
import { Navbar, Container, Row } from 'reactstrap'
import TimeInput from 'react-widgets/TimeInput'
import { TITLE } from '../../constants'
import { Context } from '../../context'
import { Employee } from '../../@types/decs'

const DashboardForm = () => {
  const [value, setValue] = useState()
  const [selectedLect, setSelectedLect] = useState([])
  const {emps} = useContext<any>(Context)
  // CONSTANTS
  const addATTENDANCE = 'add attendance'
  return  <Row>
  {/* add attendance */}
  <form className="box">
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
  </form>
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
</Row>
}

const EmployeesForm = () => {
  return <h1>employees</h1>
}

const getForm = (brandtext: string) => {
  if (brandtext === "Dashboard") { return <DashboardForm/> }
  else if (brandtext === "Employees") { return <EmployeesForm/> }
  else { return "" }
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
          { getForm(props.brandText) }
        </Container>
      </Navbar>
    </>
  )
}

export default AdminNavbar
