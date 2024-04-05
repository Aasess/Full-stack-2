import React from 'react'

//REACT-BOOTSTRAP
import { Tabs, Tab } from 'react-bootstrap'

//COMPONENT
import EmployeeTable from './EmployeeTable'

//HELPERS
import { getUpcomingRetirementEmployees } from '../helpers'

const EmployeeTab = ({ employees, ...rest }) => {
  

  return (
    <div className="mt-4">
      <Tabs defaultActiveKey="all" className="mb-3">
        <Tab eventKey="all" title="All Employees">
          <EmployeeTable employees={employees} {...rest} />
        </Tab>
        <Tab eventKey="upcomingRetirement" title="Upcoming Retirement">
          <EmployeeTable
            employees={getUpcomingRetirementEmployees(employees)}
            {...rest}
          />
        </Tab>
      </Tabs>
    </div>
  )
}

export default EmployeeTab
