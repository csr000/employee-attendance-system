import { useState, useEffect } from 'react'
// import Chart from 'chart.js'
// react plugin used to create charts
// reactstrap components
import { Card, Container, Row, Col } from 'reactstrap'

import TimeInput from 'react-widgets/TimeInput'
import MUIDataTable from 'mui-datatables'
import 'react-widgets/styles.css'

// core components
// import {
//   chartOptions,
//   parseOptions,
// } from "../variables/charts";

import Header from '../components/Headers/Header'

const Index = () => {
  const [value, setValue] = useState()
  const [lects, setLects] = useState([])
  const [att, setAtt] = useState([])
  const [selectedLect, setSelectedLect] = useState([])
  const [isExec, setIsExec] = useState(false)
  // CONSTANTS
  const addATTENDANCE = 'add attendance'

  const handlePing = () => {
    if (!isExec) {
      window.main.sendMessage('ipc-example', ['dash'])
      setIsExec(true)
    }
  }

  const handleSetLects = (event: ILect[][]) => {
    setLects(event[0])
    event[1].map((i: ILect) => {
      let { datetime } = i
      datetime = new Date(datetime)
      datetime = `${datetime.toDateString()}, ${datetime.toLocaleTimeString()}`
      i.datetime = datetime
      return i
    })
    setAtt(event[1])
  }

  useEffect(() => {
    window.main.on('ipc-example', handleSetLects)
    handlePing()
    return window.main.on('ipc-example', handleSetLects)
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
    // filterType: 'checkbox',
    selectableRows: 'none', // <===== will turn off checkboxes in rows
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
                  onChange={e => setSelectedLect(e.target.value)}
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
                  onChange={v => setValue(v?.toString())}
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
