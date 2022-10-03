import Index from './views/templates/Index'
import About from './views/templates/About'
import Settings from './views/templates/Settings'
import Employees from './views/templates/Employees'


const routes = [
  {
    path: '/index',
    name: 'Dashboard',
    icon: 'ni ni-tv-2 text-primary',
    component: Index,
  },
  {
    path: '/employees',
    name: 'Employees',
    icon: 'ni ni-badge text-blue',
    component: Employees,
  },
  {
    path: '/settings',
    name: 'Settings',
    icon: 'ni ni-settings-gear-65 text-orange',
    component: Settings,
  },
  {
    path: '/about',
    name: 'About',
    icon: 'ni ni-ui-04 text-yellow',
    component: About,
  },
]
export default routes
