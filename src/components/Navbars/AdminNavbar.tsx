import { Link } from 'react-router-dom'
// reactstrap components
import { Navbar, Container } from 'reactstrap'

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
          <h1>Hey</h1>
        </Container>
      </Navbar>
    </>
  )
}

export default AdminNavbar
