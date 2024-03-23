import React, { Suspense, lazy } from 'react'

//ROUTER-DOM
import { Navigate, Route, Routes } from 'react-router-dom'

//COMPONENTS
import EmployeeCreate from './components/EmployeeCreate'
import EmployeeEdit from './components/EmployeeEdit'
const EmployeeDirectory = lazy(() => import('./components/EmployeeDirectory'))

const RouteList = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/employees" exact element={<EmployeeDirectory />} />
        <Route path="/create" exact element={<EmployeeCreate />} />
        <Route path="/edit/:id" exact element={<EmployeeEdit />} />
        <Route path="/employees/:type" element={<EmployeeDirectory />} />
        <Route path="/" element={<Navigate to="/employees" />} />
      </Routes>
    </Suspense>
  )
}

export default RouteList
