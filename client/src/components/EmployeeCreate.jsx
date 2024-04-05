import React, { useState } from 'react'

// REACT-BOOTSTRAP
import { Form, Button, Container, Row, Col } from 'react-bootstrap'

// LIB
import { toast, ToastContainer } from 'react-toastify'

// API
import { graphQLCommand } from '../api/graphQLCommand'

const initialState = {
  firstName: '',
  lastName: '',
  age: '',
  dateOfJoining: '',
  title: 'Employee',
  department: 'IT',
  employeeType: 'FullTime',
}

const EmployeeCreate = () => {
  const [employee, setEmployee] = useState(initialState)

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
      toast.success('Employee Record Saved!')
    } else {
      toast.error('Error Saving Employee Record!')
    }
  }

  const handleChange = (e) => {
    const newEmployee = {
      ...employee,
      [e.target.name]: e.target.value,
    }
    if (e.target.name === 'age') {
      newEmployee.age = Number(e.target.value)
    }
    setEmployee(newEmployee)
  }

  const handleSubmit = () => {
    addEmployee(employee)
    setEmployee(initialState)
  }

  return (
    <Container className="mt-5 mb-5">
      <h2 className="text-center fw-bold">Add a new Employee</h2>
      <hr />
      <Form>
        <Form.Group className="mb-3" controlId="firstName">
          <Form.Label>First Name:</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            value={employee.firstName}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="lastName">
          <Form.Label>Last Name:</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            value={employee.lastName}
            onChange={handleChange}
          />
        </Form.Group>

        <Row className="mb-3">
          <Col md={5}>
            <Form.Group controlId="age">
              <Form.Label>Age:</Form.Label>
              <Form.Control
                type="number"
                name="age"
                value={employee.age}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          <Col md={7}>
            <Form.Group controlId="dateOfJoining">
              <Form.Label>Date of Joining:</Form.Label>
              <Form.Control
                type="date"
                name="dateOfJoining"
                value={employee.dateOfJoining}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Title:</Form.Label>
          <Form.Select
            name="title"
            value={employee.title}
            onChange={handleChange}
          >
            <option value="Employee">Employee</option>
            <option value="Manager">Manager</option>
            <option value="Director">Director</option>
            <option value="VP">VP</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="department">
          <Form.Label>Department:</Form.Label>
          <Form.Select
            name="department"
            value={employee.department}
            onChange={handleChange}
          >
            <option value="IT">IT</option>
            <option value="Marketing">Marketing</option>
            <option value="HR">HR</option>
            <option value="Engineering">Engineering</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="employeeType">
          <Form.Label>Employee Type:</Form.Label>
          <Form.Select
            name="employeeType"
            value={employee.employeeType}
            onChange={handleChange}
          >
            <option value="FullTime">Full-Time</option>
            <option value="PartTime">Part-Time</option>
            <option value="Contract">Contract</option>
            <option value="Seasonal">Seasonal</option>
          </Form.Select>
        </Form.Group>

        <Button variant="primary" onClick={handleSubmit}>
          Add
        </Button>
      </Form>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </Container>
  )
}

export default EmployeeCreate
