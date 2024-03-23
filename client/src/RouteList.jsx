import React, { Suspense, lazy } from 'react'

//ROUTER-DOM
import { Route, Routes } from 'react-router-dom'

//COMPONENTS
import EmployeeCreate from './components/EmployeeCreate'
const EmployeeDirectory = lazy(() => import('./components/EmployeeDirectory'))

const RouteList = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" exact element={<EmployeeDirectory />} />
        <Route path="/create" exact element={<EmployeeCreate />} />
      </Routes>
    </Suspense>
  )
}

export default RouteList
