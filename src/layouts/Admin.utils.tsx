import { Route, Redirect } from "react-router-dom"

export const getRoutes = (routes: any[]) => {
  routes = routes.map((prop, key) => {
    return <Route path={prop.path} component={prop.component} key={key} />
  })
  routes.push(<Route path={'/'} component={() => <Redirect to="/index" />} />)
  return routes
}


export const getBrandText = (props: { location: { pathname: string | any[] } }, routes: string | any[]) => {
  for (let i = 0; i < routes.length; i++) {
    if (props.location.pathname.indexOf(routes[i].path) !== -1) {
      return routes[i].name
    }
  }
  return ''
}