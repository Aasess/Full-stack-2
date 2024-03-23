import React from 'react'

//ROUTER-DOM
import { BrowserRouter as Router } from 'react-router-dom'

//COMPONENTS
import Navbar from './components/Navbar'
import RouteList from './RouteList'

//LIB
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <Navbar />
      <RouteList />
    </Router>
  )
}

export default App
