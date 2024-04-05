import React, { useEffect, useState } from 'react'

//REACT-BOOTSTRAP
import { Container, Form, Button } from 'react-bootstrap';

//API
import { graphQLCommand } from '../api/graphQLCommand'

//LIB
import { toast, ToastContainer } from 'react-toastify'

//ROUTER DOM
import { useNavigate, useParams } from 'react-router-dom'

const EmployeeEdit = () => {
  const [employee, setEmployee] = useState({
    firstName: '',
    lastName: '',
    age: '',
    dateOfJoining: '',
    title: '',
    department: '',
    employeeType: '',
    currentStatus: '',
  })

  const searchParams = useParams()
  const navigate = useNavigate()

  // function to edit employee record
  const editEmployee = async (id, employee) => {
    //convert currentStatus to an integer
    employee.currentStatus = parseInt(employee.currentStatus)

    const query = `mutation EditEmployee($id: ID!, $employee: InputEmployee!) {
        editEmployee(id: $id, employee: $employee) {
          id,
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
    // remove the id from the employee object
    const { id: _, ...employeeData } = employee

    const variables = { id, employee: employeeData }

    const data = await graphQLCommand(query, variables)
    if (data && data.editEmployee) {
      toast.success('Employee Record Edited!')
      setTimeout(() => {
        //after 1.5sec then only navigate to home page
        navigate('/')
      }, [1500])
    } else {
      toast.error('Error Editing Employee Record!')
    }
  }

  // function to fetch a single employee record
  const fetchSingleEmployee = async (id) => {
    const query = `
      query GetEmployee($id: ID!) {
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

    const variables = { id }

    const data = await graphQLCommand(query, variables)
    setEmployee(data.getEmployee)
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
    editEmployee(searchParams.id, employee)
  }

  useEffect(() => {
    fetchSingleEmployee(searchParams.id)
  }, [])

  return (
    <Container className="mx-auto mt-5">
      <p className="text-center fw-bold">Edit Employee</p>
      <hr />
      <div className="d-flex gap-2 fw-bold">
        <p>Name:</p>
        <p>
          {employee?.firstName} {employee?.lastName}
        </p>
      </div>
      <div className="d-flex gap-2 fw-bold">
        <p>Employee Type:</p>
        <p>{employee?.employeeType}</p>
      </div>
      <Form>
        <Form.Group className="mb-3">
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

        <Form.Group className="mb-3">
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

        <Form.Group className="mb-3">
          <Form.Label>Status:</Form.Label>
          <Form.Select
            name="currentStatus"
            value={employee.currentStatus}
            onChange={handleChange}
          >
            <option value={1}>Working</option>
            <option value={0}>Retired</option>
          </Form.Select>
        </Form.Group>

        <Button variant="primary" onClick={handleSubmit}>
          Edit
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
  );
}

export default EmployeeEdit
