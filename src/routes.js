import Index from './views/Index'
import About from './views/examples/About'
import Settings from './views/examples/Settings'
import Employees from './views/examples/Employees'

const routes = [
  {
    path: '/index',
    name: 'Dashboard',
    icon: 'ni ni-tv-2 text-primary',
    component: Index,
    layout: '',
  },
  {
    path: '/employees',
    name: 'Employees',
    icon: 'ni ni-badge text-blue',
    component: Employees,
    layout: '',
  },
  {
    path: '/settings',
    name: 'Settings',
    icon: 'ni ni-settings-gear-65 text-orange',
    component: Settings,
    layout: '',
  },
  {
    path: '/about',
    name: 'About',
    icon: 'ni ni-ui-04 text-yellow',
    component: About,
    layout: '',
  },
]
export default routes
