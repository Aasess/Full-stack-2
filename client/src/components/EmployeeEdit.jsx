import React, { useEffect, useState } from 'react'

//API
import { graphQLCommand } from '../api/graphQLCommand'

//LIB
import { toast, ToastContainer } from 'react-toastify'
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
    <div className="container mx-auto mt-5">
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
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title:
          </label>
          <select
            className="form-select"
            name="title"
            value={employee.title}
            onChange={handleChange}
          >
            <option value="Employee">Employee</option>
            <option value="Manager">Manager</option>
            <option value="Director">Director</option>
            <option value="VP">VP</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="department" className="form-label">
            Department:
          </label>
          <select
            className="form-select"
            name="department"
            value={employee.department}
            onChange={handleChange}
          >
            <option value="IT">IT</option>
            <option value="Marketing">Marketing</option>
            <option value="HR">HR</option>
            <option value="Engineering">Engineering</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="status" className="form-label">
            Status:
          </label>
          <select
            className="form-select"
            aria-label="Default select example"
            name="currentStatus"
            value={employee.currentStatus}
            onChange={handleChange}
          >
            <option value={1}>Working</option>
            <option value={0}>Retired</option>
          </select>
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Edit
        </button>
      </form>
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
    </div>
  )
}

export default EmployeeEdit
