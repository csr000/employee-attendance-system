import Index from './views/Index'
import Profile from './views/examples/Profile'
import Maps from './views/examples/Maps'
import Tables from './views/examples/Tables'
import Icons from './views/examples/Icons'

const routes = [
  {
    path: '/index',
    name: 'Dashboard',
    icon: 'ni ni-tv-2 text-primary',
    component: Index,
    layout: '',
  },
  {
    path: '/icons',
    name: 'Employees',
    icon: 'ni ni-badge text-blue',
    component: Icons,
    layout: '',
  },
  {
    path: '/maps',
    name: 'Settings',
    icon: 'ni ni-settings-gear-65 text-orange',
    component: Maps,
    layout: '',
  },
  {
    path: '/user-profile',
    name: 'About',
    icon: 'ni ni-ui-04 text-yellow',
    component: Profile,
    layout: '',
  },
  {
    path: '/tables',
    name: 'Tables',
    icon: 'ni ni-bullet-list-67 text-red',
    component: Tables,
    layout: '',
  },
]
export default routes
