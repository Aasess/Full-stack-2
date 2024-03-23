import React from 'react'

//ROUTER_DOM
import { Link } from 'react-router-dom'

//FONTAWESOME
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faEdit } from '@fortawesome/free-solid-svg-icons'

const EmployeeTable = ({ employees, ...rest }) => (
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
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee, index) => (
          <Employee data={employee} key={index} count={index + 1} {...rest} />
        ))}
      </tbody>
    </table>
  </div>
)

const Employee = (props) => {
  const { data, count, deleteEmployee } = props

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
      <td className="d-flex gap-4">
        <Link to={`/edit/${data.id}`} className="fs-2 text-success">
          <FontAwesomeIcon icon={faEdit} className="fa-xs" />
        </Link>
        <button
          className="btn fs-6 p-0 text-danger"
          onClick={() => {
            deleteEmployee(data.id)
          }}
        >
          <FontAwesomeIcon icon={faTrashCan} className="fa-lg" />
        </button>
      </td>
    </tr>
  )
}

export default EmployeeTable
