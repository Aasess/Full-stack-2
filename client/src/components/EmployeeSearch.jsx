import React from 'react'

const EmployeeSearch = () => (
  <div className="mb-3">
    <label htmlFor="employeeSearch" className="form-label">
      Search Employee:
    </label>
    <input
      type="text"
      id="employeeSearch"
      name="employeeSearch"
      className="form-control"
      placeholder="Enter employee name"
    />
  </div>
)

export default EmployeeSearch
