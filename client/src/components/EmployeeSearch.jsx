import React from 'react'

// REACT-BOOTSTRAP
import { Form } from 'react-bootstrap'

const EmployeeSearch = ({ searchTerm, setSearchTerm }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label htmlFor="employeeSearch">Search Employee:</Form.Label>
      <Form.Control
        type="text"
        id="employeeSearch"
        name="employeeSearch"
        placeholder="Enter employee name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </Form.Group>
  )
}

export default EmployeeSearch
