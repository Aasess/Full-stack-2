import React, { useState, useEffect } from 'react'

//COMPONENTS
import EmployeeSearch from './EmployeeSearch'
import EmployeeTable from './EmployeeTable'
import EmployeeCreate from './EmployeeCreate'

async function graphQLCommand(query, variables) {
  try {
    const response = await fetch('http://localhost:3002/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: variables
        ? JSON.stringify({ query, variables })
        : JSON.stringify({ query }),
    })

    if (response.ok) {
      const result = await response.json()
      return result.data
    } else {
      console.log('Error in sending data to server', response.statusText)
    }
  } catch (error) {
    console.log('Error', error)
  }
}

const EmployeeDirectory = () => {
  const [employees, setEmployees] = useState([])

  const addEmployee = async (employee) => {
    const query = `mutation addEmployee($employee: InputEmployee!) {
        addEmployee(employee: $employee) {
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
    const data = await graphQLCommand(query, { employee })
    if (data && data.addEmployee) {
      setEmployees([...employees, data.addEmployee])
    } else {
      setEmployees([...employees])
      console.log('Error: No data returned from addEmployee mutation.')
    }
  }

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
    <div className="row justify-content-between">
      <div className="col-lg-8 col-md-12">
        <EmployeeSearch />
        <EmployeeTable employees={employees} />
      </div>
      <div className="col-lg-3 col-md-12">
        <p className="text-center fw-bold">Add a new Employee</p>
        <hr />
        <EmployeeCreate addEmployee={addEmployee} />
      </div>
    </div>
  )
}

export default EmployeeDirectory
