import Index from "views/Index";
import Profile from "views/examples/Profile";
import Maps from "views/examples/Maps";
import Tables from "views/examples/Tables";
import Icons from "views/examples/Icons";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin",
  },
  {
    path: "/icons",
    name: "Employees",
    icon: "ni ni-badge text-blue",
    component: Icons,
    layout: "/admin",
  },
  {
    path: "/maps",
    name: "Settings",
    icon: "ni ni-settings-gear-65 text-orange",
    component: Maps,
    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "About",
    icon: "ni ni-ui-04 text-yellow",
    component: Profile,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Tables",
    icon: "ni ni-bullet-list-67 text-red",
    component: Tables,
    layout: "/admin",
  },
];
export default routes;
