import { useState, useEffect } from 'react'
import { Switch } from 'react-router-dom'
// reactstrap components
import { Container } from 'reactstrap'
// core components
import AdminNavbar from '../components/Navbars/AdminNavbar'
import AdminFooter from '../components/Footers/AdminFooter'
import Sidebar from '../components/Sidebar/Sidebar'
import routes from '../routes'
// import { UserContext } from '../Context'
// import { Attendance } from '../@types/decs'
import Login from '../views/templates/Login'
import { REPLIES } from '../Constants'
import { getRoutes, getBrandText } from './Admin.utils'
import { Attendance, Employee } from '../@types/decs'
import { UserContext } from '../Context'

const Admin = (props: any) => {
  const [emps, setEmps] = useState<Employee[]>([])
  const [att, setAtt] = useState<Attendance[]>([])

  const [withAuth, setWithAuth] = useState<boolean>(true)
  const handleAuth = (state: boolean) => {
    setWithAuth(state)
  }

  useEffect(() => {
    window.main.on(REPLIES.LOGIN, handleAuth)
    return () => {
      window.main.removeListener(REPLIES.LOGIN, handleAuth)
    }
  }, [])

  if (withAuth) {
    return (
      <UserContext.Provider value={{ emps, setEmps, att, setAtt }}>
        <Sidebar {...props} routes={routes} />
        <div className="main-content">
          <AdminNavbar {...props} brandText={getBrandText(props, routes)} />
          <Switch>{getRoutes(routes)}</Switch>
          <Container fluid>
            <AdminFooter />
          </Container>
        </div>
      </UserContext.Provider>
    )
  } else {
    return <Login />
  }
}

export default Admin
