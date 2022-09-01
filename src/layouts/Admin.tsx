import { SetStateAction, useState, useRef, useEffect } from 'react'
import { useLocation, Route, Switch, Redirect } from 'react-router-dom'
// reactstrap components
import { Container } from 'reactstrap'
// core components
import AdminNavbar from '../components/Navbars/AdminNavbar'
import AdminFooter from '../components/Footers/AdminFooter'
import Sidebar from '../components/Sidebar/Sidebar'
import routes from '../routes'
import { Context } from '../context'
import { Attendance } from '../@types/decs'

const Admin = (props: any) => {
  const mainContent = useRef(null)
  const location = useLocation()

  useEffect(() => {
    document.documentElement.scrollTop = 0
    // @ts-ignore: Object is possibly 'null'.
    document.scrollingElement.scrollTop = 0
    // @ts-ignore: Object is possibly 'null'.
    mainContent.current.scrollTop = 0
  }, [location])

  const getRoutes = (routes: any[]) => {
    routes = routes.map((prop, key) => {
      return <Route path={prop.path} component={prop.component} key={key} />
    })
    routes.push(<Route path={'/'} component={() => <Redirect to="/index" />} />)
    return routes
  }

  const getBrandText = (path: any) => {
    for (let i = 0; i < routes.length; i++) {
      if (
        props.location.pathname.indexOf(routes[i].layout + routes[i].path) !==
        -1
      ) {
        return routes[i].name
      }
    }
    return 'Brand'
  }

  const [emps, setEmps] = useState([])
  const [att, setAtt] = useState([])

  const handleSetEmps = (event: SetStateAction<never[]>[]) => {
    setEmps(event[0])
  }

  const handleSetAtt = (event: SetStateAction<never[]>[]) => {
    setEmps(event[0])
    ;(event[1] as Attendance[]).map((i: { datetime: string | Date }) => {
      let { datetime } = i
      datetime = new Date(datetime)
      datetime = `${datetime.toDateString()}, ${datetime.toLocaleTimeString()}`
      i.datetime = datetime
      return i
    })
    setAtt(event[1])
  }

  return (
    <Context.Provider value={{ emps, handleSetEmps, att, handleSetAtt }}>
      <Sidebar
        {...props}
        routes={routes}
        logo={{
          innerLink: '/',
          imgSrc: require('../assets/img/brand/argon-react.png').default,
          imgAlt: '...',
        }}
      />
      <div className="main-content" ref={mainContent}>
        <AdminNavbar
          {...props}
          brandText={getBrandText(props.location.pathname)}
        />
        <Switch>{getRoutes(routes)}</Switch>
        <Container fluid>
          <AdminFooter />
        </Container>
      </div>
    </Context.Provider>
  )
}

export default Admin
