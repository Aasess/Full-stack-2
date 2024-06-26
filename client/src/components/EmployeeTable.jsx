import React from 'react'

//ROUTER_DOM
import { Link, useNavigate } from 'react-router-dom'

//FONTAWESOME
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faEdit } from '@fortawesome/free-solid-svg-icons'

//REACT-BOOTSTRAP
import { Table, Button } from 'react-bootstrap'

const EmployeeTable = ({ employees, ...rest }) => (
  <div className="mt-1">
    {employees.length > 0 ? (
      <Table striped bordered hover>
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
      </Table>
    ) : (
      <div className="fw-bold d-flex justify-content-center align-items-center">
        No record founds
      </div>
    )}
  </div>
)

const Employee = (props) => {
  const { data, count, deleteEmployee } = props
  const navigate = useNavigate()

  const handleEmployeeClick = () => {
    //navigate to single detail page
    navigate(`/employee/detail/${data.id}`)
  }

  return (
    <tr>
      <td>{count}</td>
      <td
        className="text-primary fw-bold cursor-pointer"
        onClick={handleEmployeeClick}
      >
        {data.firstName}
      </td>
      <td>{data.lastName}</td>
      <td>{data.age}</td>
      <td>{data.dateOfJoining}</td>
      <td>{data.title}</td>
      <td>{data.department}</td>
      <td>{data.employeeType}</td>
      <td>{data.currentStatus === 1 ? 'Working' : 'Retired'}</td>
      <td className="d-flex gap-4">
        <Link to={`/edit/${data.id}`} className="fs-2 text-success">
          <FontAwesomeIcon icon={faEdit} className="fa-xs" />
        </Link>
        <Button
          variant='outline'
          size="sm"
          className="text-danger"
          onClick={() => {
            deleteEmployee(data.id, data.currentStatus)
          }}
        >
          <FontAwesomeIcon icon={faTrashCan} className="fa-lg" />
        </Button>
      </td>
    </tr>
  )
}

export default EmployeeTable
