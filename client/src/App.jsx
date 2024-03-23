import React from 'react'

//ROUTER-DOM
import { BrowserRouter as Router } from 'react-router-dom'

//COMPONENTS
import Navbar from './components/Navbar'
import RouteList from './RouteList'

function App() {
  return (
    <Router>
      <Navbar />
      <div className="Employee-page container mt-5 mx-auto">
        <div className="row justify-content-between">
          <RouteList />
        </div>
      </div>
    </Router>
  )
}

export default App
