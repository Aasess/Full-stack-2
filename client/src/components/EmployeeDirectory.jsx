import React, { useState, useEffect } from 'react'

//COMPONENTS
import EmployeeSearch from './EmployeeSearch'
import EmployeeTab from './EmployeeTab'

//REACT-BOOTSTRAP
import { Container } from 'react-bootstrap'

//API
import { graphQLCommand } from '../api/graphQLCommand'

//LIB
import { toast, ToastContainer } from 'react-toastify'

//REACT-ROUTER-DOM
import { useParams } from 'react-router-dom'

const EmployeeDirectory = () => {
  const params = useParams()
  const [employees, setEmployees] = useState([])
  const [filteredEmployees, setFilteredEmployees] = useState([])

  const [searchTerm, setSearchTerm] = useState('')

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
  const deleteEmployee = async (id, status) => {
    //check if the status of employee is 'active' or 'working' (value is 1)
    if (status === 1) {
      // if so then display error messge
      toast.error("CAN'T DELETE EMPLOYEE - STATUS ACTIVE")
      return
    }

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

  const fetchDataBasedOnType = async (type) => {
    let query = `
    query GetEmployeeByType($employeeType: EmployeeType) {
      getEmployees(employeeType: $employeeType) {
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

    const data = await graphQLCommand(query, {
      employeeType: type.charAt(0).toUpperCase() + type.slice(1),
    })
    if (data && data.getEmployees) {
      setEmployees(data.getEmployees)
    } else {
      setEmployees([])
      toast.error('No employees found for the selected type')
    }
  }

  useEffect(() => {
    if (params.type) {
      //if type is found then fetch data from server based on type
      fetchDataBasedOnType(params.type)
    } else {
      //get data from server
      fetchData()
    }
  }, [params])

  useEffect(() => {
    //if search term is changed then filter the employees data
    const newFilteredEmployees = employees.filter((employee) => {
      return `${employee.firstName} ${employee.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    })

    setFilteredEmployees(newFilteredEmployees)
  }, [searchTerm])

  useEffect(() => {
    setFilteredEmployees(employees)
  }, [employees])

  return (
    <Container className="mx-auto mt-5">
      <EmployeeSearch {...{ searchTerm, setSearchTerm }} />
      <EmployeeTab employees={filteredEmployees} {...{ deleteEmployee }} />
      {/* <EmployeeTable {...{ deleteEmployee }} employees={filteredEmployees} /> */}
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
  )
}

export default EmployeeDirectory
