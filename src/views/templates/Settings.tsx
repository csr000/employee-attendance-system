// reactstrap components
import { useEffect, useState } from 'react'
import { Card, Container, Row, FormGroup, Form, Input, Col, CardHeader, Button, CardBody } from 'reactstrap'

import Header from '../../components/Headers/Header'
import { ipcCHANNEL, REPLIES } from '../../Constants'

const Settings = () => {
  const [currentPwd, setCurrentPwd] = useState<string>()
  const [newPwd, setNewPwd] = useState<string>()
  const [confirmPwd, setConfirmPwd] = useState<string>()
  const [errorMsg, setErrorMsg] = useState<string>()
  const [updateIsSuccess, setUpdateIsSuccess] = useState<boolean>(true)
  // CONSTANTS
  const reset = 'resetpwd'

  const validate = () => {
    // compare pwds, if new === confirm proceed to send it to main,
    //  once main gets it, checks if it matches data in db,
    // if yes update and reply true else reply false
    if (newPwd === confirmPwd) {
      window.main.sendMessage(ipcCHANNEL, [{ aim: reset, newPwd, currentPwd }])
      setErrorMsg('')
    } else {
      setErrorMsg('New password does not match Confirm password')
    }
    window.main.once(REPLIES.RESETpwd, handleUpdateIsSuccess)
  }
  
  const handleUpdateIsSuccess = (state: boolean) => {
    setUpdateIsSuccess(state)
  }
  

  useEffect(() => {
    updateIsSuccess ? setErrorMsg('') : setErrorMsg('Current password is incorrect')
  }, [])

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Col className="order-xl-1" xl="12">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Password Settings</h3>
                    </Col>
                    <Col className="text-right" xs="4">
                      <Button color="primary" onClick={validate} size="sm">
                        Save
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form>
                    <div className="pl-lg-4">
                      <p style={{ color: 'red' }}>{errorMsg}</p>
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <Input
                              className="form-control-alternative"
                              placeholder="Current Password"
                              type="text"
                              onChange={e => setCurrentPwd(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <Input
                              className="form-control-alternative"
                              placeholder="New Password"
                              type="text"
                              onChange={e => setNewPwd(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <Input
                              className="form-control-alternative"
                              placeholder="Confirm New Password"
                              type="text"
                              onChange={e => setConfirmPwd(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </div>
        </Row>
      </Container>
    </>
  )
}

export default Settings
