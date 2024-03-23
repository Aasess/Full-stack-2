import React, { Suspense, lazy } from 'react'

//ROUTER-DOM
import { Route, Routes } from 'react-router-dom'

//COMPONENTS
import EmployeeCreate from './components/EmployeeCreate'
import EmployeeEdit from './components/EmployeeEdit'
const EmployeeDirectory = lazy(() => import('./components/EmployeeDirectory'))

const RouteList = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" exact element={<EmployeeDirectory />} />
        <Route path="/create" exact element={<EmployeeCreate />} />
        <Route path="/edit/:id" exact element={<EmployeeEdit />} />
      </Routes>
    </Suspense>
  )
}

export default RouteList
