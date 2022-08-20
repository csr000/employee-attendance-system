import ReactDOM from 'react-dom'
import { HashRouter, Route, Switch } from 'react-router-dom'

import './assets/plugins/nucleo/css/nucleo.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './assets/scss/argon-dashboard-react.scss'

import AdminLayout from './layouts/Admin'

window.Main.sendMessage('ipc-example', ['ping']);

ReactDOM.render(
  <HashRouter>
    <Switch>
      <Route path="/" component={props => <AdminLayout {...props} />} />
      {/* <Route path="auth" component={props => <AuthLayout {...props} />} /> */}
    </Switch>
  </HashRouter>,
  document.getElementById('root')
)
