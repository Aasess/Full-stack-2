import React, { useState, useEffect } from 'react'

//COMPONENTS
import EmployeeSearch from './EmployeeSearch'
import EmployeeTable from './EmployeeTable'

//API
import { graphQLCommand } from '../api/graphQLCommand'

//LIB
import { toast, ToastContainer } from 'react-toastify'


const EmployeeDirectory = () => {
  const [employees, setEmployees] = useState([])

  //function to fetch all employee records
  const fetchData = async () => {
    const query = `query {
        getEmployees {
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
      }`
    const data = await graphQLCommand(query)
    setEmployees(data.getEmployees)
  }

  //function to delete a employee record
  const deleteEmployee = async (id) => {
    const query = `mutation deleteEmployee($id: ID!) {
      deleteEmployee(id: $id) {
          id
          firstName
          lastName
      }
  }`

    const data = await graphQLCommand(query, { id })

    if (data && data.deleteEmployee) {
      toast.success('Employee Record Deleted!')
      fetchData() //once the employee record is deleted then again fetch the data
    } else {
      toast.error('Error Deleting Employee Record!')
    }
  }

  useEffect(() => {
    //get date from server
    fetchData()
  }, [])

  return (
    <div className="container mx-auto mt-5">
      <EmployeeSearch />
      <EmployeeTable {...{ employees, deleteEmployee }} />
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

export default EmployeeDirectory
