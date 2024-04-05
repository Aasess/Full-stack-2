import React from 'react'

// REACT-BOOTSTRAP
import { NavLink } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'

function CustomNavbar() {
  return (
    <Navbar bg="dark" expand="lg" variant="dark" className="p-3">
      <Navbar.Brand href="/">EMS</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-around">
        <Nav className="mr-auto">
          <Nav.Item>
            <NavLink className="nav-link" to="/employees">
              All Employees
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink className="nav-link" to="/fullTime">
              Full Time Employees
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink className="nav-link" to="/partTime">
              Part Time Employees
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink className="nav-link" to="/contract">
              Contract Employees
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink className="nav-link" to="/seasonal">
              Seasonal Employees
            </NavLink>
          </Nav.Item>
        </Nav>
        <Nav>
          <Nav.Item>
            <NavLink className="nav-link" to="/create">
              Create
            </NavLink>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default CustomNavbar
