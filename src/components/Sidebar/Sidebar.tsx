/*eslint-disable*/
import { useState } from 'react'
import { NavLink as NavLinkRRD, Link } from 'react-router-dom'


// reactstrap components
import {
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Media,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from 'reactstrap'
import moment from 'moment'
import React from 'react'

import routes from '../../routes'
import { getRoutes } from '../../layouts/Admin.utils'

const Sidebar = (props: { routes: any }) => {
  const [collapseOpen, setCollapseOpen] = useState<boolean>()
  // verifies if routeName is the one active (in browser input)
  // toggles collapse between opened and closed (true/false)
  const toggleCollapse = () => {
    setCollapseOpen(data => !data)
  }
  // closes the collapse
  const closeCollapse = () => {
    setCollapseOpen(false)
  }
  // creates the links that appear in the left menu / Sidebar
  const createLinks = (routes: any[]) => {
    return routes.map((prop, key) => {
      return (
        <NavItem key={key}>
          <NavLink to={prop.path} tag={NavLinkRRD} onClick={closeCollapse} activeClassName="active" id={prop.name}>
            <i className={prop.icon} />
            {prop.name}
          </NavLink>
        </NavItem>
      )
    })
  }

  const { routes } = props
  // const routes = getRoutes(routes)

  return (
    <Navbar className="navbar-vertical fixed-left navbar-light bg-white" expand="md" id="sidenav-main">
      <Container fluid>
        {/* Toggler */}
        <button className="navbar-toggler" type="button" onClick={toggleCollapse}>
          <span className="navbar-toggler-icon" />
        </button>
        {/* Brand */}

        <div className="d-flex align-items-center justify-content-center">
          <img style={{ height: 100, width: 100 }} src={require('../../assets/img/theme/logo.jpg').default} />
        </div>

        {/* User */}
        <Nav className="align-items-center d-md-none">
          <UncontrolledDropdown nav>
            <DropdownToggle nav>
              <Media className="align-items-center">
                <span className="avatar avatar-sm rounded-circle">
                  <img alt="..." src={require('../../assets/img/theme/logo.jpg').default} />
                </span>
              </Media>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-arrow" right>
              <DropdownItem className="noti-title" header tag="div">
                <h6 className="text-overflow m-0">Welcome!</h6>
              </DropdownItem>
              <DropdownItem to="/admin/user-profile" tag={Link}>
                <i className="ni ni-single-02" />
                <span>My profile</span>
              </DropdownItem>
              <DropdownItem to="/admin/user-profile" tag={Link}>
                <i className="ni ni-settings-gear-65" />
                <span>Settings</span>
              </DropdownItem>
              <DropdownItem to="/admin/user-profile" tag={Link}>
                <i className="ni ni-calendar-grid-58" />
                <span>Activity</span>
              </DropdownItem>
              <DropdownItem to="/admin/user-profile" tag={Link}>
                <i className="ni ni-support-16" />
                <span>Support</span>
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem href="#pablo" onClick={e => e.preventDefault()}>
                <i className="ni ni-user-run" />
                <span>Logout</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        {/* Collapse */}
        <Collapse navbar isOpen={collapseOpen}>
          {/* Collapse header */}
          <div className="navbar-collapse-header d-md-none">
            <Row>
              <Col className="collapse-close" xs="6">
                <button className="navbar-toggler" type="button" onClick={toggleCollapse}>
                  <span />
                  <span />
                </button>
              </Col>
            </Row>
          </div>
          {/* Form */}
          <Form className="mt-4 mb-3 d-md-none">
            <InputGroup className="input-group-rounded input-group-merge">
              <Input aria-label="Search" className="form-control-rounded form-control-prepended" placeholder="Add Attendance" type="search" />
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <span className="fa fa-search" />
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </Form>
          {/* Navigation */}
          <Nav navbar>{createLinks(routes)}</Nav>
          <Nav className="mb-md-3" navbar>
            <NavItem className="active-pro active">
              <NavLink href="#">
                <i className="ni ni-calendar-grid-58" />
                <p style={{ margin: 0 }}>{moment().format('MMMM Do YYYY')}</p>
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  )
}

export default Sidebar
