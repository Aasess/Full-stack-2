import React from 'react'

//REACT-BOOTSTRAP
import { Tabs, Tab } from 'react-bootstrap'

//COMPONENT
import EmployeeTable from './EmployeeTable'

const EmployeeTab = ({ employees, ...rest }) => {
  // this function will filter out the employee records whose retirement is coming in next six month

  //   algorithm
  // 1. check if age of employee is greater than or equal to 65 (retirement age)
  // 2. check if date of joining is less than or equal to four months from now
  // 3. if both condition are met then add employee to upcoming retirement
  const getUpcomingRetirementEmployees = () => {
    const retirementAge = 65

    // calculate current date and date four months from now
    const fourMonthsFromNow = new Date()
    fourMonthsFromNow.setMonth(fourMonthsFromNow.getMonth() - 4)

    const upcomingRetirementEmployees = employees.filter((employee) => {
      const employeeAge = parseInt(employee.age)

      // check if employee's age is 65 or more and date of joining has passed 4 months from now
      if (
        employeeAge >= retirementAge &&
        new Date(employee.dateOfJoining) <= fourMonthsFromNow
      ) {
        return true
      }
      return false
    })

    return upcomingRetirementEmployees
  }

  return (
    <div className="mt-4">
      <Tabs defaultActiveKey="all" className="mb-3">
        <Tab eventKey="all" title="All Employees">
          <EmployeeTable employees={employees} {...rest} />
        </Tab>
        <Tab eventKey="upcomingRetirement" title="Upcoming Retirement">
          <EmployeeTable
            employees={getUpcomingRetirementEmployees()}
            {...rest}
          />
        </Tab>
      </Tabs>
    </div>
  )
}

export default EmployeeTab
