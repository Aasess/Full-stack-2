import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { graphQLCommand } from '../api/graphQLCommand'

const EmployeeDetails = () => {
  const { id } = useParams()
  const [employee, setEmployee] = useState(null)

  useEffect(() => {
    const fetchEmployee = async () => {
      const query = `
        query GetSingleEmployee($id: ID!) {
          getEmployee(id: $id) {
            id
            firstName
            lastName
            age
            dateOfJoining
            title
            department
            employeeType
            currentStatus
          }
        }
      `

      const data = await graphQLCommand(query, { id })

      if (data && data.getEmployee) {
        setEmployee(data.getEmployee)
      } else {
        setEmployee(null)
      }
    }

    fetchEmployee()
  }, [id])

  if (!employee) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Employee Details</h2>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">
            {employee.firstName} {employee.lastName}
          </h5>
          <p className="card-text d-flex flex-column gap-2">
            <span>
              <strong>ID:</strong> {employee.id}
            </span>
            <span>
              <strong>Age:</strong> {employee.age}
            </span>
            <span>
              <strong>Date of Joining:</strong> {employee.dateOfJoining}
            </span>
            <span>
              <strong>Title:</strong> {employee.title}
            </span>
            <span>
              <strong>Department:</strong> {employee.department}
            </span>
            <span>
              <strong>Employee Type:</strong> {employee.employeeType}
            </span>
            <span>
              <strong>Status:</strong>{' '}
              {employee.currentStatus === 1 ? 'Working' : 'Retired'}
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default EmployeeDetails
