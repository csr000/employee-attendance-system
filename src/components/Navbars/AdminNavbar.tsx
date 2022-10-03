import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
// reactstrap components
import { Navbar, Container } from 'reactstrap'

const AdminNavbar = (props: { brandText: {} | null | undefined }) => {
  return (
    <>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>
          <Link className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block" to="/">
            {props.brandText as ReactNode}
          </Link>
        </Container>
      </Navbar>
    </>
  )
}

export default AdminNavbar
