import React, { useState } from 'react'

const EmployeeSearch = ({ searchTerm, setSearchTerm }) => {
  return (
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
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  )
}

export default EmployeeSearch
