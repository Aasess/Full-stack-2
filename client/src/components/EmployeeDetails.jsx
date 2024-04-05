import React, { useState, useEffect } from 'react'

//ROUTER DOM
import { useParams } from 'react-router-dom'

//REACT-BOOTSTRAP
import { Card, Container } from 'react-bootstrap'

//API
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
    return <Container className="mt-5">Loading...</Container>
  }

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Employee Details</h2>
      <Card>
        <Card.Body>
          <Card.Title>
            {employee.firstName} {employee.lastName}
          </Card.Title>
          <Card.Text className="d-flex flex-column gap-2">
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
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default EmployeeDetails
