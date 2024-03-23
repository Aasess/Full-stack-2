import React from 'react'

//ROUTER_DOM
import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3">
      <a className="navbar-brand" href="/">
        EMS
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className="collapse navbar-collapse justify-content-around"
        id="navbarNav"
      >
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink className="nav-link" to="/employees">
              All Employees
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/fullTime">
              Full Time Employees
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/partTime">
              Part Time Employees
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/contract">
              Contract Employees
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/seasonal">
              Seasonal Employees
            </NavLink>
          </li>
        </ul>
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink className="nav-link" to="/create">
              Create
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
