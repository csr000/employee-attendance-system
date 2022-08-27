import { useState, useEffect, SetStateAction, useMemo } from 'react'

// reactstrap components
import { Card, Container, Row, Col } from 'reactstrap'

import TimeInput from 'react-widgets/TimeInput'
import MUIDataTable from 'mui-datatables'
import 'react-widgets/styles.css'

import Header from '../components/Headers/Header'
import { handlePing } from './examples/utils'

const Index = () => {
  const [value, setValue] = useState()
  const [lects, setLects] = useState([])
  const [att, setAtt] = useState([])
  const [selectedLect, setSelectedLect] = useState([])
  useMemo(() => handlePing('dash'), [])
  // CONSTANTS
  const addATTENDANCE = 'add attendance'
  
  type Attendance = {
    id: string
    name: string
    email: string
    dept: string
    datetime: string
 }

  const handleSetAtt = (event: SetStateAction<never[]>[]) => {
    setLects(event[0]);
    (event[1] as Attendance[]).map((i: { datetime: any }) => {
      let { datetime } = i
      datetime = new Date(datetime)
      datetime = `${datetime.toDateString(

      )}, ${datetime.toLocaleTimeString()}`
      i.datetime = datetime
      return i
    })
    setAtt(event[1])
  }

  useEffect(() => {
    window.main.on('ipc-example', handleSetAtt)
    // handlePing()
    return () => {
      window.main.removeListener('ipc-example', handleSetAtt)
    }
  })

  const columns = [
    {
      name: 'name',
      label: 'Name',
      options: {
        filter: true,
        sort: true,
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

  const data = att

  const options = {
    selectableRowsHideCheckboxes : true
  }
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="12">
            <Row>
              {/* add attendance */}
              <form className="box">
                <select
                  name="lects"
                  onChange={(e: any) => setSelectedLect(e.target.value)}
                >
                  <option value="">--Choose Lecturer--</option>
                  {lects.map((lect: any) => (
                    <option key={lect.id} value={lect.name}>
                      {lect.name}
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
            <Card className="shadow">
              <MUIDataTable
                title={'Employee List'}
                data={data}
                columns={columns}
                options={options}
              />
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Index
