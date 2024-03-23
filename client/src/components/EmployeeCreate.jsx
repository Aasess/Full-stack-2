import React, { useState } from 'react'

//API
import { graphQLCommand } from '../api/graphQLCommand'

//LIB
import { toast,ToastContainer } from 'react-toastify';

const EmployeeCreate = () => {
  const [employee, setEmployee] = useState({
    firstName: '',
    lastName: '',
    age: '',
    dateOfJoining: '',
    title: 'Employee',
    department: 'IT',
    employeeType: 'FullTime',
  })

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
  }

  return (
    <div className="container mx-auto mt-5">
      <p className="text-center fw-bold">Add a new Employee</p>
      <hr />
      <form>
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">
            First Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            name="firstName"
            value={employee.firstName}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">
            Last Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            name="lastName"
            value={employee.lastName}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3 row">
          <div className="col-5">
            <label htmlFor="age" className="form-label">
              Age:
            </label>
            <input
              type="number"
              className="form-control"
              id="age"
              name="age"
              value={employee.age}
              onChange={handleChange}
            />
          </div>

          <div className="col-7">
            <label htmlFor="dateOfJoining" className="form-label">
              Date of Joining:
            </label>
            <input
              type="date"
              className="form-control"
              id="dateOfJoining"
              name="dateOfJoining"
              value={employee.dateOfJoining}
              onChange={handleChange}
            />
          </div>
        </div>

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
          <label htmlFor="employeeType" className="form-label">
            Employee Type:
          </label>
          <select
            className="form-select"
            name="employeeType"
            value={employee.employeeType}
            onChange={handleChange}
          >
            <option value="FullTime">Full-Time</option>
            <option value="PartTime">Part-Time</option>
            <option value="Contract">Contract</option>
            <option value="Seasonal">Seasonal</option>
          </select>
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Add
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

export default EmployeeCreate
