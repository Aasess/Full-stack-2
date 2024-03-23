import React from 'react'

const EmployeeTable = (props) => (
  <div className="mt-4">
    <table className="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Age</th>
          <th>Joined Date</th>
          <th>Title</th>
          <th>Department</th>
          <th>Employee Type</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {props.employees.map((employee, index) => (
          <Employee data={employee} key={index} count={index + 1} />
        ))}
      </tbody>
    </table>
  </div>
)

const Employee = (props) => {
  const { data, count } = props

  return (
    <tr>
      <td>{count}</td>
      <td>{data.firstName}</td>
      <td>{data.lastName}</td>
      <td>{data.age}</td>
      <td>{data.dateOfJoining}</td>
      <td>{data.title}</td>
      <td>{data.department}</td>
      <td>{data.employeeType}</td>
      <td>{data.currentStatus}</td>
    </tr>
  )
}

export default EmployeeTable
