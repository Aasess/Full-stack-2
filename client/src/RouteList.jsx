import React, { Suspense, lazy } from 'react'

//ROUTER-DOM
import { Route, Routes } from 'react-router-dom'

//COMPONENTS
const EmployeeDirectory = lazy(() => import('./components/EmployeeDirectory'))

const RouteList = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" exact element={<EmployeeDirectory />} />
      </Routes>
    </Suspense>
  )
}

export default RouteList
