import React, { useState, useEffect } from 'react'

//COMPONENTS
import EmployeeSearch from './EmployeeSearch'
import EmployeeTable from './EmployeeTable'

//API
import { graphQLCommand } from '../api/graphQLCommand'

//LIB
import { toast, ToastContainer } from 'react-toastify'

//REACT-ROUTER-DOM
import { useParams } from 'react-router-dom';

const EmployeeDirectory = () => {
  const params = useParams();
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
  `;

    const data = await graphQLCommand(query, { employeeType: type.charAt(0).toUpperCase() + type.slice(1) });
    if (data && data.getEmployees) {
      setEmployees(data.getEmployees);
    } else {
      setEmployees([]);
      toast.error('No employees found for the selected type');
    }
  }

  useEffect(() => {
    if(params.type){
      //if type is found then fetch data from server based on type
      fetchDataBasedOnType(params.type)
    }
    else {
      //get data from server
      fetchData()
    }
  }, [params])

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
