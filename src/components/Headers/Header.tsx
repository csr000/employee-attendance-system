// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from 'reactstrap'

const Header = () => {
  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              <Col lg="6" xl="6">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody style={{ padding: '2rem' }}>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h2"
                          className="text-uppercase text-muted mb-0"
                        >
                          Number of Employees
                        </CardTitle>
                        <span className="display-4 font-weight-bold mb-0">
                          350,897
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="fas fa-chart-bar" />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="6">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody style={{ padding: '2rem' }}>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h2"
                          className="text-uppercase text-muted mb-0"
                        >
                          Number of Recoreded Attendance
                        </CardTitle>
                        <span className="display-4 font-weight-bold mb-0">
                          112,357
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                          <i className="fas fa-chart-pie" />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  )
}

export default Header
