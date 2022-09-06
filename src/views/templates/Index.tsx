import { useEffect, useMemo, useContext } from 'react'
// reactstrap components
import { Card, Container, Row, Col } from 'reactstrap'

import MUIDataTable from 'mui-datatables'
import 'react-widgets/styles.css'

import Header from '../../components/Headers/Header'
import { handlePing } from '../../utils'
import { UserContext } from '../../Context'
import { UserContextType } from '../../@types/decs'

const Index = () => {
  // emps == Employees, att == Attendance
  const {att, handleSetAtt} = useContext(UserContext) as UserContextType
  
  useMemo(() => handlePing('dash'), [])

  useEffect(() => {
    window.main.on('ipc-example', handleSetAtt)
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

  const options = {
    selectableRowsHideCheckboxes: true,
  }
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="shadow">
              <MUIDataTable
                title={'Attendance'}
                data={att}
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
