import { useContext, useEffect, useState } from 'react'
// reactstrap components
import { Card, Container, Row, Col } from 'reactstrap'

import MUIDataTable, { MUIDataTableOptions } from 'mui-datatables'
import Header from '../../components/Headers/Header'
import { ATT, attCHANNEL, ipcCHANNEL, REPLIES, TITLE } from '../../Constants'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import { ping, writelog } from '../../utils'
import { Attendance, Employee, UserContextType } from '../../@types/decs'
import swal from 'sweetalert'
import TimeInput from 'react-widgets/TimeInput'
import 'react-widgets/styles.css'
import { UserContext } from '../../Context'

const DashboardForm = () => {
  // const { emps } = useContext(UserContext) as UserContextType
  const [value, setValue] = useState<string>()
  const [selectedLect, setSelectedLect] = useState('')

  return (
    <form className="attendance-form">
      {/* add attendance */}
      <select name="emps" id="emps" onChange={e => setSelectedLect(e.target.value)}>
        <option value="">--Choose {TITLE}--</option>
        {([] as Employee[]).map(emp => (
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
          window.main.once(REPLIES.ALERT, (res: boolean) => (res ? swal('Success!', 'Attendance has been added sucessfully!', 'success') : null))
        }}
      >
        Add Attendance
      </button>
    </form>
  )
}

const Index = () => {
  const { att, setAtt } = useContext(UserContext) as UserContextType
  writelog('att', att)

  useEffect(() => ping('dash'), [])
  useEffect(() => {
    window.main.once(attCHANNEL, (data: Array<Attendance>) => setAtt(data))
    writelog('useeffect is rerendering')
  })

  const columns = [
    {
      name: 'name',
      label: 'Name',
      options: {
        filter: true,
        sort: true,
        filterOptions: { fullWidth: true },
      },
    },
    {
      name: 'datetime',
      label: 'Time of Arrival',
      options: {
        filter: true,
        sort: true,
      },
    },
  ]

  const options = {
    // selectableRowsHideCheckboxes: true,
    // filterType: 'checkbox',
    responsive: 'vertical',
  }
  const muiCache = createCache({
    key: 'mui-datatables',
    prepend: true,
  })
  return (
    <>
      <Header />
      <DashboardForm />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="shadow">
              <CacheProvider value={muiCache}>
                <MUIDataTable title={'Attendance'} data={att} columns={columns} options={options as MUIDataTableOptions} />
              </CacheProvider>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Index
