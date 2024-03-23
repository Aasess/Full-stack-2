import React, { useState, useEffect } from 'react'

//COMPONENTS
import EmployeeSearch from './EmployeeSearch'
import EmployeeTable from './EmployeeTable'

//API
import { graphQLCommand } from '../api/graphQLCommand'

const EmployeeDirectory = () => {
  const [employees, setEmployees] = useState([])

  const fetchData = async () => {
    const query = `query {
        getEmployees {
            firstName
            lastName
            age
            dateOfJoining
            title
            department
            employeeType
            currentStatus
        }
      }`
    const data = await graphQLCommand(query)
    setEmployees(data.getEmployees)
  }

  useEffect(() => {
    //get date from server
    fetchData()
  }, [])

  return (
    <div className="container mx-auto mt-5">
      <EmployeeSearch />
      <EmployeeTable employees={employees} />
    </div>
  )
}

export default EmployeeDirectory
