// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
} from 'reactstrap'
// core components
import UserHeader from '../../components/Headers/UserHeader'

const Profile = () => {
  return (
    <>
      <UserHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="12">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      <img
                        alt="..."
                        className="rounded-circle"
                        src={require('../../assets/img/theme/logo.jpg').default}
                      />
                    </a>
                  </div>
                </Col>
              </Row>
              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                <div className="d-flex justify-content-between">
                  <Button
                    className="mr-4"
                    color="info"
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                    size="sm"
                  >
                    Connect
                  </Button>
                  <Button
                    className="float-right"
                    color="default"
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                    size="sm"
                  >
                    Message
                  </Button>
                </div>
              </CardHeader>
              <CardBody className="pt-0 pt-md-4">
                <div className="text-center">
                  <div className="my-5" />
                  <div className="csc_post_content">
                    <div
                      className="contain-aboutinfo"
                      style={{ paddingLeft: '150px', paddingRight: '150px' }}
                    >
                      <h1>About CSUC</h1>
                      <h3>
                        Christian Service University College is devoted to
                        excellence in teaching, learning and research and to
                        developing leaders in many disciplines who make a
                        difference globally. The University, which is based in
                        the Ashanti Region of Ghana, Kumasi, has
                        graduated&nbsp;&nbsp;over 6,500 degree candidates,
                        including undergraduate, graduate, and professional
                        students.
                      </h3>
                      <p>&nbsp;</p>
                      <h1>Our Vision Statement</h1>
                      <hr />
                      <h3>
                        To be a&nbsp;Christian University, Known for Excellence
                        in Teaching, Research and Training of Ethical Leaders
                        for societal advancement
                      </h3>
                      <p>&nbsp;</p>
                      <h1>Our Mission Statement</h1>
                      <hr />
                      <h3>
                        To promote knowledge for the training of men and women
                        in Christian values and principles, academic and
                        professional excellence for the transformation of
                        society
                      </h3>
                      <p>&nbsp;</p>
                      <hr />
                      <div className="col-md-12 pull-left">
                        <p>
                          The meaning of the Christian Service University
                          College logo is derived from the constituent elements.
                          <br />
                          The Logo has the following elements:
                        </p>
                        <ul>
                          Statement of Motto: ‘To Know Christ Better and To Make
                          Him Better Known’
                          <br />
                          Year Of Establishment of the Institution: 1974
                          <br />
                          Abbreviation of the name of Institution: CSUC
                          <br />
                          Symbols of the Institution: ‘The Cross of Christ’;
                          ‘Atumpan’- The talking drums of the Akans.
                        </ul>
                        <p>
                          The ‘Atumpan’ was used by the Akans in the olden days
                          to send messages to people within the community. In
                          the logo, the ‘Atumpan’ drums represent the primary
                          purpose of the University College: “To make Christ
                          better known”.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Profile
