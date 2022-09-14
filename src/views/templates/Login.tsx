import { useState } from 'react'
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  Container,
} from 'reactstrap'
import moment from 'moment'

// core components
import AuthNavbar from '../../components/Navbars/AuthNavbar'
import { AUTH, ipcCHANNEL } from '../../Constants'

const Login = () => {
  const [pwd, setPwd] = useState('')

  
  return (
    <div className="main-content bg-gradient-info" style={{ height: '100vh' }}>
      <AuthNavbar />
      <div className="header py-7 py-lg-8">
        <Container>
          <div className="header-body mb-7"></div>
        </Container>
      </div>
      {/* Page content */}
      <Container className="mt--8 pb-5">
        <Row className="justify-content-center">
          <>
            <Col lg="5" md="7">
              <Card className="bg-secondary shadow border-0">
                <CardHeader className="bg-transparent">
                  <div className="btn-wrapper text-center">
                    <span className="btn-inner--icon">
                      <img
                        alt="..."
                        src={require('../../assets/img/theme/logo.jpg').default}
                        height={100}
                        className="rounded-circle"
                      />
                    </span>
                  </div>
                </CardHeader>
                <CardBody className="px-lg-5 py-lg-5">
                  <Form role="form">
                    {/* <FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-email-83" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Email"
                            type="email"
                            autoComplete="new-email"
                          />
                        </InputGroup>
                      </FormGroup> */}
                    <FormGroup>
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-lock-circle-open" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Password"
                          type="password"
                          autoComplete="new-password"
                          onChange={e => setPwd(e.target.value)}
                        />
                      </InputGroup>
                    </FormGroup>
                    {/* <div className="custom-control custom-control-alternative custom-checkbox">
                        <input
                          className="custom-control-input"
                          id=" customCheckLogin"
                          type="checkbox"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor=" customCheckLogin"
                        >
                          <span className="text-muted">Remember me</span>
                        </label>
                      </div> */}
                    <div className="text-center">
                      <Button
                        className="my-1"
                        color="primary"
                        type="button"
                        onClick={() =>
                          window.main.sendMessage(ipcCHANNEL, [
                            { aim: AUTH.LOGIN, pwd },
                          ])
                        }
                      >
                        Login
                      </Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
              <Row className="mt-3">
                <Col xs="6">
                  {/* <a
                      className="text-light"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                    >
                      <small>Forgot password?</small>
                    </a> */}
                </Col>
                <Col className="text-right" xs="6">
                  <a
                    className="text-light"
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                  >
                    <small>{moment().format('MMMM Do YYYY, h:mm:ss a')}</small>
                  </a>
                </Col>
              </Row>
            </Col>
          </>
        </Row>
      </Container>
    </div>
  )
}

export default Login
